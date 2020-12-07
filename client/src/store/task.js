import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);
const BASE_API_URL = "http://localhost:5000/api";

export default new Vuex.Store({
  state: {
    taskList: [],
    todoList: [],
    doingList: [],
    doneList: [],
    dateSelected: ""
  },
  mutations: {
    SET_DATE_SELECTED(state, date) {
      state.dateSelected = date;
    },
    SET_TASK_LIST(state, data) {
      state.taskList = data;
    },
    SET_TODO_LIST(state, data) {
      state.todoList = data;
    },
    SET_DOING_LIST(state, data) {
      state.doingList = data;
    },
    SET_DONE_LIST(state, data) {
      state.doneList = data;
    }
  },
  actions: {
    setDateSelected(context, date) {
      context.commit("SET_DATE_SELECTED", date);
    },
    async setTaskList(context) {
      const res1 = await axios.get(`${BASE_API_URL}/todotasks`);
      const res2 = await axios.get(`${BASE_API_URL}/doingtasks`);
      const res3 = await axios.get(`${BASE_API_URL}/donetasks`);

      context.commit("SET_TODO_LIST", res1.data);
      console.log("GET TODO LIST: status",res1.status);
      console.log("GET TODO LIST: data", res1.data);

      context.commit("SET_DOING_LIST", res2.data);
      console.log("GET DOING LIST: status",res2.status);
      console.log("GET DOING LIST: data", res2.data);

      context.commit("SET_DONE_LIST", res3.data);
      console.log("GET DONE LIST: status",res3.status);
      console.log("GET DONE LIST: data", res3.data);
    },
    async setTodayTask(context, day) {
      const preDay = new Date(day)
      const nextDay = new Date(preDay.setDate(preDay.getDate()+1));
      const data = {
        day: day,
        nextDay: nextDay
      }
      const res = await axios.get(`${BASE_API_URL}/tasks`, {params: data});

      context.commit("SET_TASK_LIST", res.data);
      console.log("GET TASK LIST: status",res.status);
      console.log("GET TASK LIST: data", res.data);
    },
    async createTask(context, data) {
      const response = await axios.post(`${BASE_API_URL}/createtask`, data);
      console.log("POST NEW TASK: status", response.status);
    },
    async deleteTask(context, taskId) {
      const params = {
        taskId: taskId
      }
      const response = await axios.delete(`${BASE_API_URL}/tasks/${taskId}`, {params});
      console.log("DELETE TASK: status",response.status);
      const res = {
        status: response.status,
        data: response.data
      }
      return res;
    },
    async updateTask(context, data) {
      // const params = data
      const response = await axios.put(`${BASE_API_URL}/tasks/${data._id}`,data);
      console.log("UPDATE STATUS TASK: status",response.status);
      const res = {
        status: response.status,
        data: response.data
      }
      return res;
    }
  },
  getters :{
    getDateSelected: (state) => state.dateSelected,
    getTaskList: (state) => state.taskList,
    getTodoList: (state) => state.todoList,
    getDoingList: (state) => state.doingList,
    getDoneList: (state) => state.doneList
  }
});

