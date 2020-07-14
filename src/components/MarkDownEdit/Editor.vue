<template>
  <div class="main">
    <mavon-editor
      ref="md"
      :ishljs="true"
      style="height:calc(110vh - 100px);z-index:1000"
      @save="saveDoc"
      @change="updateDoc"
      v-model="value"
    />
  </div>
</template>
<script>
import marked from "marked";

import { addArticle, editArticle, getArticleById } from "@/api/article";
import eventBus from "@/eventBus";
const markdownOption = {
  bold: true, // 粗体
  italic: true, // 斜体
  header: true // 标题
};

export default {
  name: "editor",
  data() {
    return {
      value: ""
    };
  },
  methods: {
    saveDoc(markDown, html) {},
    updateDoc(markDown, html) {},
    goBack() {
      // console.log("点击了浏览器的返回按钮");
      history.pushState(null, null, document.URL);
    }
  },
  created() {
    eventBus.$emit("initPublish", null);
    eventBus.$on("save", data => {
      const article = {
        userId: this.$store.getters.userId,
        articleTitle: data.title,
        articleContentMd: this.$refs.md.d_value,
        articleContentHtml: this.$refs.md.d_render,
        labelId: data.tag.labelId
      };
      //文章修改
      if (this.$route.query.editFlag) {
        article.articleId = this.$route.query.articleId;

        editArticle(article).then(res => {
          console.log(res);
          this.$router.push({
            path: "/article",
            query: { labelId: article.labelId, articleId: article.articleId }
          });
        });
      } else {
        addArticle(article).then(result => {
          console.log(result);
          this.$router.push({
            path: "/published",
            query: {
              articleId: result.data.article.articleId,
              labelId: result.data.labelId,
              title: result.data.article.articleTitle
            }
          });
        });
      }
    });
  },
  activated() {
    //console.log(window.history.length);
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", this.goBack, false);
    eventBus.$emit("addClickBind", null);
    eventBus.$emit("buttonName", this.$route.query.publishOrEdit);
    if (this.$route.query.editFlag) {
      document.title = "文章修改";
    } else {
      document.title = "文章发布";
    }

    if (this.$route.query.editFlag && this.$route.query.articleId) {
      //console.log(this.$route.query);
      getArticleById(this.$route.query.articleId).then(res => {
        // console.log(res);
        this.$refs.md.d_value = res.data.article.articleContentMd;
        const data = {
          title: res.data.article.articleTitle,
          labelId: res.data.labelId,
          labelName: res.data.labelName,
          editFlag: this.$route.query.editFlag
        };
        eventBus.$emit("setTitleAndTag", data);
      });
    }
  },
  destroyed() {
    window.removeEventListener("popstate", this.goBack, false);
    eventBus.$emit("removeClick", null);
    //eventBus.$emit("initheader", null);
  },
  beforeRouteLeave(to, from, next) {
    window.removeEventListener("popstate", this.goBack, false);
    eventBus.$emit("removeClickBind", null);
    console.log("离开editor");
    next();
  },
  beforeRouteEnter(to, from, next) {
    // eventBus.$emit("addClickBind", null);
    console.log("进入editor");
    next();
  }
};
</script>

<style scoped>
.main {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 100%;
  height: 100%;
}
.markdown-body >>> pre {
  padding: 0;
}
</style>
