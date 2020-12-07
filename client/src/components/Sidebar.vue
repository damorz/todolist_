<template>
<div id="mySidebar" class="sidebar">
    <div @click="changeRoute('Home')" 
        class="brand"
        style="color: #fff;"
    >
      <i class="fas fa-calendar-check fa-2x"></i>
      <span> TO DO LIST</span>
    </div>
    <div @click="changeRoute('Home')">
      <i class="fas fa-home"></i>
      Home
    </div>
    <div @click="changeRoute('AddTask')">
      <i class="fas fa-calendar-plus"></i>
      Create new task
    </div>
</div>
</template>

<script>
export default {
    methods: {
        changeRoute(compName) {
            if(this.$route.name !== compName) {
                this.$router.push({name: compName});
            }
        }
    }
}
</script>

<style>

.brand {
    background-color: #241e16; 
    margin-bottom: 10%;
}
.sidebar {
  overflow: hidden;
  min-height: 100vh;
  width: 15%;
  top: 0;
  background-color: #f5b342;
  padding-top: 60px;
}

.sidebar div {
  padding: 8px 8px 8px 32px;
  text-decoration: bold;
  font-size: 100%;
  color: #252000;
  display: block;
  cursor: pointer;
}

.sidebar div:hover {
  background-color: #7a5b24;
  color: #f1f1f1;
}


@media screen and (max-height: 450px) {
  .sidebar {
    padding-top: 15px;
  }
  .sidebar div {
    font-size: 18px;
  }
}
</style>
