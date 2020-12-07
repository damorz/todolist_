<template>
  <div class="container" style="margin-top: 4%; padding: 1%;">
    <div>
      <h1>TASK OF THE DAY</h1>
    </div>
    <form>
      <div class="form-group">
        <span
          data-toggle="collapse"
          href="#collapseExample"
          role="button"
          aria-expanded="false"
          aria-controls="collapseExample"
        >
          {{ formDate }}&nbsp;<i class="fas fa-pen"></i>
        </span>
        <div class="collapse" id="collapseExample">
          <input
            type="datetime-local"
            class="form-control"
            id="dateTime"
            v-model="date"
          />
        </div>
      </div>
    </form>
    <today-task-list></today-task-list>
  </div>
</template>

<script>
import TodayTaskList from "../components/TodayTaskList.vue";
import moment from "moment";
export default {
  components: {
    TodayTaskList,
  },
  data() {
    return {
      date: new Date().toString(),
    };
  },
  computed: {
    formDate() {
      return moment(this.date).format("LLLL");
    }
  },
  watch: {
    date() {
      this.$store.dispatch("setDateSelected", day);
      const day = moment(this.date).format();
      this.$store.dispatch("setTodayTask", day);
    }
  },
  mounted() {
    this.$store.dispatch("setDateSelected", day);
    const day = moment(this.date).format();
    this.$store.dispatch("setTodayTask", day);
    console.log("Home Mounted.");
  },
};
</script>
