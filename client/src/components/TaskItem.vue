<template>
  <div class="card" style="margin-top: 7%;">
    <!-- Edit mode -->
    <div v-if="editing" class="edit-card">
      <form style="margin: 5%;" @submit.prevent="editSubmit">
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="title"
            v-model="editItem.title"
            placeholder="Title"
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control"
            id="description"
            v-model="editItem.description"
            placeholder="Description"
          />
        </div>
        <div class="form-group">
          <span style="color: white;" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            {{editDueDate}}&nbsp;<i class="fas fa-pen"></i>
          </span>
          <div class="collapse" id="collapseExample">
          <input
            type="datetime-local"
            class="form-control"
            id="dateTime"
            v-model="editItem.dueDate"
          />
          </div>
        </div>
        <button type="submit" class="btn btn-dark">Save</button>
        <button type="button" class="btn btn-light" style="margin-left: 3%;" @click="editEnd">cancel</button>
      </form>
    </div>

    <!-- Display mode -->
    <div v-else>
      <div class="card-header">
        <div class="row">
          <div class="col-10">
            <h5>{{ taskItem.title }}</h5>
          </div>
          <div class="col-2 dropdown">
            <i
              id="dropdownMenuButton"
              class="fas fa-caret-square-down"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style="cursor: pointer; right:0;"
            ></i>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a class="dropdown-item" @click="editBegin">Edit task</a>
              <a class="dropdown-item" @click="deleteTask">Delete task</a>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p style="font-size: 0.9em">
            {{ taskItem.description }}
          </p>
          <p style="font-size: 0.7em">
            Due Date: <span :class="lateCheck">{{ dueDate }}</span>
          </p>
        </blockquote>
        <div v-if="!isHome" class="dropdown">
          <div 
            id="dropdownStatus" 
            data-toggle="dropdown" 
            aria-haspopup="true" 
            aria-expanded="false" 
            :class="statusClass"
          >
            {{taskItem.status}}
          </div>
          <div 
            class="dropdown-menu" 
            aria-labelledby="dropdownStatus"
            style="width: 100%; text-align: center;"
          >
            <a class="dropdown-item" @click="changeStatus('TODO')">TODO</a>
            <a class="dropdown-item" @click="changeStatus('DOING')">DOING</a>
            <a class="dropdown-item" @click="changeStatus('DONE')">DONE</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {

  data() {
    return {
      editing: false,
      editItem: {
        status: this.taskItem.status,
        _id: this.taskItem._id,
        title: this.taskItem.title,
        description: this.taskItem.description,
        dueDate: this.taskItem.dueDate,
        __v: this.taskItem.__v
      }
    };
  },

  props: {
    taskItem: {
      type: Object,
      require: true,
    },
  },

  computed: {
    isHome() {
      return this.$route.name === "Home";
    },
    statusClass() {
      if(this.taskItem.status === "TODO") {
        return "status-todo";
      }
      else if(this.taskItem.status === "DOING") {
        return "status-doing";
      }
      else if(this.taskItem.status === "DONE") {
        return "status-done";
      }
      return "";
    },
    isNothingChange() {
      let oldData = JSON.stringify(this.taskItem);
      let newData = JSON.stringify(this.editItem);
      if(oldData === newData) {
        return true;
      }
      return false;
    },
    editDueDate() {
      const dayObj = new Date(this.editItem.dueDate);
      return moment(dayObj).format("LLLL");
    },
    dueDate() {
      const dayObj = new Date(this.taskItem.dueDate);
      return moment(dayObj).format("LLLL");
    },
    lateCheck() {
      const dayObj = new Date(this.taskItem.dueDate);
      const currentDate = new Date();
      let diffTime = dayObj.getTime() - currentDate.getTime();
      let diffDay = diffTime / (1000 * 3600 * 24);
      if (diffDay > 0 && diffDay < 2) {
        return "almost-due-date";
      } else if (dayObj >= currentDate) {
        return "intime";
      }
      return "late";
    },
  },

  methods: {
    async changeStatus(status) {
      this.editItem.status = status;
      if(!this.isNothingChange) {
        const editedData = this.editItem;
        const response = await this.$store.dispatch("updateTask", editedData);
        if(response.status === 200) {
          console.log("CHANGE OK");
          this.$store.dispatch("setTaskList");
          if(this.isHome) {
            this.$router.go({name: "Home"})
          }
        }
        else {
          this.$swal({
            title: "Update fail!",
            text: "Something went wrong.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "red",
          })
        }
      } 
    },
    async editSubmit() {
      // alert("SUBMIT TO SAVE");
      if(this.isNothingChange) {
        this.$swal({
          title: "Nothing changed!",
          text: "You must change something.",
          icon: "error",
          confirmButtonText: "OK",
          confirmButtonColor: "red",
        });
      } 
      else {
        const editedData = this.editItem;
        const response = await this.$store.dispatch("updateTask", editedData);
        if(response.status === 200) {
          this.$swal({
            title: "Update complete!",
            text: "Click OK button to continue.",
            icon: "success",
            confirmButtonText: "OK",
            confirmButtonColor: "#f5b342",
          });
          this.editing = false;
          this.$store.dispatch("setTaskList");
          if(this.isHome) {
            this.$router.go({name: "Home"})
          }
        }
        else {
          this.$swal({
            title: "Update fail!",
            text: "Something went wrong.",
            icon: "error",
            confirmButtonText: "OK",
            confirmButtonColor: "red",
          })
        }
      }
    },
    editBegin() {
      this.editing = true;
    },
    editEnd() {
      this.editItem.title = this.taskItem.title
      this.editItem.description = this.taskItem.description
      this.editItem.dueDate = this.taskItem.dueDate
      this.editItem.status = this.taskItem.status
      this.editing = false;
    },
    deleteTask() {
      this.$swal({
        title: "Are you sure?",
        text: "This task will be deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel!",
        confirmButtonColor: "red",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.$store.dispatch("deleteTask", this.taskItem._id);
          if (response.status === 200) {
            this.$swal({
              title: "Delete Complete.",
              icon: "success",
              confirmButtonColor: " #f5b342",
            }).then(() => {
              this.$store.dispatch("setTaskList");
              if(this.isHome) {
                this.$router.go({name: "Home"})
              }
            });
          } else {
            this.$swal({
              title: "Something wrong!",
              icon: "error",
              confirmButtonColor: "red",
            });
          }
        }
      });
    },
  },

  mounted() {
    this.editing = false;
    console.log("TaskItem Mounted.");
    console.log(this.taskItem)
  },
};
</script>

<style scoped>

.status-todo {
  background-color: rgb(0, 152, 240); 
  width: 100%; 
  padding: 1px;
  text-align: center;
  color: white;
  font-weight: bold;
  border-radius: 2px;
  cursor: pointer;
}

.status-doing {
  background-color: rgb(252, 0, 176); 
  width: 100%; 
  padding: 1px;
  text-align: center;
  color: white;
  font-weight: bold;
  border-radius: 2px;
  cursor: pointer;
}

.status-done {
  background-color: rgb(0, 153, 59); 
  width: 100%; 
  padding: 1px;
  text-align: center;
  color: white;
  font-weight: bold;
  border-radius: 2px;
  cursor: pointer;
}

.status-todo:hover ,.status-doing:hover ,.status-done:hover {
  background-color: rgb(54, 54, 54);
}

.edit-card {
  background-color: #f5b342;
  border-radius: 4px;
}

.dropdown-item {
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f5b342;
}

.late {
  color: red;
}

.intime {
  color: green;
}

.almost-due-date {
  color: orange;
}
</style>
