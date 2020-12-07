<template>
  <div id="app" style="display: flex;">
      <side-bar></side-bar>
      <div id="content" class="overflow-auto" style="padding:0; flex: 1;">
        <router-view />
      </div>
  </div>
</template>

<script>
import sideBar from "./components/Sidebar";
export default {
  name: "App",
  components: {
    sideBar
  }
}
</script>

<style>
#app {
  top:0px;
  right:0px;
  bottom:0px;
  left:0px;
  position: absolute;;
  min-height: 100%;
  overflow-x:hidden; 
}

#content::-webkit-scrollbar {
  display: none;
}


</style>
