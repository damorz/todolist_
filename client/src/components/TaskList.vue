<template>
    <div class="container" style="padding: 1%;">
        <div class="row">
            <div class="col-4">
                <div class="head-line">TODO</div>
            </div>
            <div class="col-4">
                <div class="head-line">DOING</div>
            </div>
            <div class="col-4">
                <div class="head-line">DONE</div>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div v-for="task in todoList" :key="task._id">
                    <task-item :taskItem="task"></task-item>
                </div>
            </div>
            <div class="col-4">
                <div v-for="task in doingList" :key="task._id">
                    <task-item :taskItem="task"></task-item>
                </div>
            </div>
            <div class="col-4">
                <div v-for="task in doneList" :key="task._id">
                    <task-item :taskItem="task"></task-item>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import TaskItem from "./TaskItem";
export default {
    components: {
        TaskItem
    },
    computed: {
        todoList() {
            return this.$store.getters["getTodoList"];
        },
        doingList() {
            return this.$store.getters["getDoingList"];
        },
        doneList() {
            return this.$store.getters["getDoneList"];
        }
    },
}
</script>

<style>
.head-line {
    background-color: #f5b342;
    margin: 0 0.2%;
    padding: 3% 0 ;
    text-align: center;
    font-weight: bold;
}
</style>