<template>
  <div class="row">
    <div v-if="hasData" class="col">
      <div v-for="task in todayList" :key="task._id">
        <task-item :taskItem="task"></task-item>
      </div>
    </div>
    <div v-else class="vertical-center">
      <h1>NO TASK TODAY</h1>
    </div>
  </div>
</template>

<script>
import TaskItem from "./TaskItem";
export default {
  components: {
    TaskItem,
  },
  computed: {
    hasData() {
      return this.todayList.length !== 0;
    },
    todayList() {
      return this.$store.getters["getTaskList"];
    },
  },
};
</script>

<style>
.head-line {
  background-color: #f5b342;
  margin: 0 0.2%;
  padding: 3% 0;
  text-align: center;
  font-weight: bold;
}
.block {
  text-align: center;
}

.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
