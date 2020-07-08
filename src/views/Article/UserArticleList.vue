<template>
  <div class="postList">
    <ul class="entry-list">
      <li class="item" v-for="(article,id) in articleList" :key="id">
        <div class="user-info-row">
          <div class="avatar" :style="{'background-image': bgimage}"></div>
          <span class="username">{{userName}}</span>
          <span class="date">{{article.articleDate}}</span>
        </div>
        <div class="abstract-row">
          <router-link
            class="title"
            :to="{path:'/article',query:{labelId:`${article.labelId}`,articleId:`${article.articleId}`}}"
          >{{article.articleTitle}}</router-link>
        </div>
        <div class="action-row">
          <ul class="action-list">
            <li class="action">
              <img src="https://b-gold-cdn.xitu.io/v3/static/img/zan.e9d7698.svg" alt />
            </li>
          </ul>
          <div class="entry-action-box">
            <div class="read-action view-count">{{`阅读`+article.articleViews}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { getArticleListByUser } from "@/api/user.js";
import { publishDate } from "@/utils/date";
export default {
  name: "UserArticleList",
  data() {
    return {
      articleList: {
        articleId: "",
        articleTitle: "",
        articleDate: "",
        articleViews: "",
        labelId: ""
      }
    };
  },
  computed: {
    bgimage: function() {
      return `url(${this.$srcUrl + this.$store.getters.avatar})`;
    },
    userName: function() {
      return this.$store.getters.name;
    }
  },
  methods: {
    getArticles() {
      getArticleListByUser(this.$store.getters.userId).then(res => {
        for (let i = 0; i < res.data.length; i++) {
          const article = {
            articleId: res.data[i].article.articleId,
            articleTitle: res.data[i].article.articleTitle,
            articleDate: publishDate(res.data[i].article.articleDate),
            articleViews: res.data[i].article.articleViews,
            labelId: res.data[i].labelId
          };
          this.articleList.push(article);
        }
      });
    }
  },
  mounted() {
    this.articleList = [];
    this.getArticles();
  }
};
</script>
<style scoped>
ul {
  padding: 0;
  margin: 0;
}
.item {
  padding: 2.5rem;
  border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
}
li {
  list-style: none;
}
.postList {
  background-color: #fff;
  margin-top: 1rem;
}
.user-info-row {
  display: flex;
  align-items: center;
  font-size: 1.16rem;
  padding: 0.3rem 0 1.3rem;
  color: #8b8b8b;
}
.avatar {
  flex: 0 0 auto;
  margin-right: 1rem;
  width: 3.333rem;
  height: 3.333rem;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #eee;
  cursor: pointer;
}
.username {
  cursor: pointer;
  margin-left: 1rem;
  margin-right: 1rem;
}
.abstract-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.abstract-row .title {
  width: 100%;
  margin-bottom: 0.8rem;
  font-size: 1.5rem;
  color: #000;
  line-height: 1.3;
  font-weight: 600;
  word-break: break-word;
  word-wrap: break-word;
  letter-spacing: 0.04rem;
  text-align: left;
}
.action-list {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.entry-action-box {
  display: flex;
  align-items: center;
}
.action {
  cursor: pointer;
  padding: 0 1rem;
  height: 25px;
  line-height: 25px;
  white-space: nowrap;
  border: 1px solid #f1f1f1;
  border-radius: 1px;
  background-color: #fff;
  transition: color, border-color, background-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
img {
  width: auto;
  height: auto;
}
.read-action {
  margin-left: 2rem;
  position: relative;
}
.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  color: rgba(24, 37, 50, 0.3);
}
</style>