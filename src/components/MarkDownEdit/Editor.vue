<template>
  <div class="main">
    <mavon-editor
      ref="md"
      :ishljs="true"
      style="height:calc(100vh - 100px);z-index:1000"
      @save="saveDoc"
      @change="updateDoc"
      v-model="value"
    />
  </div>
</template>
<script>
import marked from "marked";

import { addArticle } from "@/api/article";
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
    eventBus.$on("save", data => {
      console.log(data);
      const article = {
        userId: this.$store.getters.userId,
        articleTitle: data.title,
        articleContentMd: this.$refs.md.d_value,
        articleContentHtml: this.$refs.md.d_render,
        labelId: data.tag.labelId
      };
      addArticle(article).then(result => {
        console.log(result);
      });
    });
  },
  mounted() {
    //console.log(window.history.length);
    history.pushState(null, null, document.URL);
    window.addEventListener("popstate", this.goBack, false);
    eventBus.$emit("addClick", null);
  },
  destroyed() {
    console.log(1);
    window.removeEventListener("popstate", this.goBack, false);
    eventBus.$emit("removeClick", null);
    //eventBus.$emit("initheader", null);
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
.main >>> .markdown-body pre {
  background-color: black !important;
}
</style>
