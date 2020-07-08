<template>
  <div class="view user-view">
    <div class="major-area">
      <div class="user-info-block block shadow"></div>
      <user-article-list></user-article-list>
    </div>
    <div class="minor-area"></div>
  </div>
</template>
<script>
import UserArticleList from "@/views/Article/UserArticleList.vue";
export default {
  name: "UserCenter",
  components: {
    UserArticleList
  }
};
</script>
<style scoped>
.view {
  max-width: 960px;
  margin: 3.767rem auto 0px;
}
.user-view {
  display: flex;
  margin-bottom: 6rem;
}
.major-area {
  flex: 1 1 auto;
  min-width: 0;
}
.user-info-block {
  display: flex;
  padding: 2.5rem;
}
.block {
  background-color: #fff;
  border-radius: 2px;
}
.shadow {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.minor-area {
  flex: 0 0 auto;
  margin-left: 1rem;
  width: 20rem;
  line-height: 1.2;
}
</style>