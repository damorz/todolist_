<template>
    <div style="margin-top: 4%;">
      <task-list></task-list>
    </div>
</template>

<script>
import TaskList from "../components/TaskList.vue";


export default {
  components: {
    TaskList
  },
  mounted() {
    this.$store.dispatch("setTaskList");
    console.log("Home Mounted.")
  }
};
</script>

