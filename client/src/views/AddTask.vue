<template>
  <div class="container" style="margin-top: 5%;">
    <div>
        <h1>CREATE NEW TASK</h1>
    </div>
    <form style="margin-top: 5%;" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="title">Task title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="title"
          placeholder="Title"
        />
        <small v-if="error_title" style="color: red;">Please fill the Title field.</small>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="description"
          placeholder="Description"
        />
      </div>

      <div class="form-group">
          <label for="dateTime">Date time</label>
          <input 
            type="datetime-local" 
            class="form-control" 
            id="dateTime"
            v-model="dateTime"
        />
        <small v-if="error_description" style="color: red;">Please fill the Date time field.</small>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
    data() {
      return {
        title: "",
        description: "",
        dateTime: "",
        error_title: false,
        error_description: false
      }
    },
    methods: {
      submitForm() {
        this.error_title = false;
        this.error_description = false;


        //Verify part
        if(!this.title) {
          this.error_title = true;
        }
        else if(!this.dateTime){
          this.error_description = true;
        }
        else {
          const data = {
            title: this.title,
            description: this.description,
            dueDate: this.dateTime
          }
          this.$store.dispatch("createTask", data)
            .then((res) => {
              console.log("create post: ",res);
              this.$swal({
                title: "Create Task Success!",
                text: "Click the button to continue.",
                icon: "success",
                confirmButtonColor: " #f5b342",
              })
              .then((result) => {
                if(result.isConfirmed) {
                  this.$router.push({name: "TaskManage"});
                }
              })
            })
            .catch((err) => {
              console.log(err);
            })
        }
      }
    }
}
</script>

<style scoped>
.form-control:focus {
  border-color: #f5b342;
  box-shadow: 0 0 0 0.2rem #ffdea4;
}
.btn-primary,
.btn-primary:active,
.btn-primary:visited {
  border-color: #f5b342;
  background-color: #f5b342 !important;
  text-decoration: bold;
  font-size: 2vh;
}
.btn-primary:hover {
  background-color: #383838 !important;
}
</style>
