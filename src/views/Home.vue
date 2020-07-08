<template>
  <div id="layout">
    <global-header></global-header>
    <div class="lance-main">
      <router-view :key="$route.fullPath" />
    </div>
    <div class="lance-footer"></div>
  </div>
</template>

<script>
// @ is an alias to /src
import SideBox from "@/components/SideBox";
import GlobalHeader from "@/components/GlobalHeader";
export default {
  name: "Home",
  components: {
    SideBox,
    GlobalHeader
  }
};
</script>
<style scoped>
#layout {
  min-height: 200px;
}
.lance-main {
  position: relative;
  padding-top: 10px;
  margin: 0px auto 0px;
  width: 100%;
  min-height: 800px;
}
</style>
