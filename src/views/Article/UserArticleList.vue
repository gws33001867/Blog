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
            <div class="read-action more-action" @click="openEdit(article)">
              <div class="icon ion-ios-more">
                <icon-font type="icon-more" style="fontSize:1.4rem" />
              </div>
              <div class="more-action-list" v-show="article.isShow">
                <div class="more-action-item" @click="editArticle(article)">编辑</div>
                <div class="more-action-item" @click="showModal(article)">删除</div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <a-modal v-model="visible" title="提示" @ok="deleteArticle(articleForEdit)">
      <h3>删除文章后不可恢复，确认删除吗？</h3>
    </a-modal>
  </div>
</template>
<script>
import { getArticleListByUser } from "@/api/user.js";
import { deleteArticle } from "@/api/article.js";
import { publishDate } from "@/utils/date";
import { Icon, Tag } from "ant-design-vue";
import globalObj from "@/global";
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: globalObj.iconfontUrl
});
export default {
  name: "UserArticleList",
  components: {
    IconFont
  },
  data() {
    return {
      articleList: {
        articleId: "",
        articleTitle: "",
        articleDate: "",
        articleViews: "",
        labelId: "",
        isShow: false //表示当前文章的编辑删除弹窗不可见
      },
      visible: false,
      articleForEdit: {}
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
            labelId: res.data[i].labelId,
            isShow: false
          };
          this.articleList.push(article);
        }
      });
    },
    openEdit(article) {
      article.isShow = !article.isShow;
    },
    deleteArticle(article) {
      deleteArticle(article.articleId).then(() => {
        this.articleList.splice(
          this.articleList.findIndex(
            item => item.articleId == article.articleId
          ),
          1
        );
        this.visible = false;
      });
    },
    showModal(article) {
      this.visible = true;
      this.articleForEdit = article;
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
  font-size: 1rem;
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
.read-action .icon {
  font-size: 2rem;
  cursor: pointer;
}
.more-action-list {
  position: absolute;
  padding: 1rem 0;
  right: -2.5rem;
  top: -0.6rem;
  min-width: 10rem;
  white-space: nowrap;
  border-radius: 2px;
  border: 1px solid #f1f1f1;
  background-color: #fff;
  box-shadow: 0 1px 2px 1px hsla(0, 0%, 94.5%, 0.5);
  transform: translateY(-100%);
}
.more-action-item {
  padding: 0.6rem 2rem;
  color: #8b8b8b;
  cursor: pointer;
}
</style>