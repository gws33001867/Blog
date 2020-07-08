<template>
  <div class="index">
    <article-list></article-list>
  </div>
</template>
<script>
import ArticleList from "@/views/Article/ArticleList.vue";
export default {
  name: "IndexPage",
  components: {
    ArticleList
  }
};
</script>
<style scoped>
.index {
  margin-top: 4.767rem;
}
</style>