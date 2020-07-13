<template>
  <a-result
    status="success"
    title="文章发布成功!"
    sub-title="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
  >
    <span>
      <router-link
        :to="{path:'/article',query:{articleId:$route.query.articleId,labelId:$route.query.labelId}}"
      >{{$route.query.title}}</router-link>
    </span>
    <template #extra>
      <a-button key="publish" type="primary" @click="publish">继续发表</a-button>
      <a-button key="gohome" @click="goHome">回到首页</a-button>
    </template>
  </a-result>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goHome() {
      this.$router.push("/index");
    },
    publish() {
      this.$router.push("/publish");
    }
  }
};
</script>
<style scoped>
a {
  font-size: 24px;
  text-align: center;
  margin-bottom: 60px;
  display: block;
  color: inherit;
  text-decoration: underline;
}
</style>