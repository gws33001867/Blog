<template>
  <div id="layout">
    <keep-alive>
      <global-header></global-header>
    </keep-alive>
    <div class="lance-main">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="$route.fullPath" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
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
