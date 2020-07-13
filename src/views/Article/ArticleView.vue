<template>
  <div class="view">
    <div class="user-article">
      <div class="lance-left">
        <!-- 博主个人信息介绍，主页链接 -->
        <!-- <side-box></side-box> -->

        <!-- 最新文章导航栏 -->
        <!-- <div id="asideNewArticle" class="lance-box">
          <h3 class="aside-title">最新文章</h3>
          <div class="aside-content">
            <ul class="info-list clearfix">
              <li class="clearfix">
                <a>JVM的学习</a>
              </li>
              <li class="clearfix">
                <a>Docker学习</a>
              </li>
            </ul>
          </div>
        </div>-->
      </div>

      <div class="lance-right">
        <div class="article-content">
          <div class="author-info">
            <div>
              <a href="#">
                <div class="avatar" :style="{'background-image': bgimage}"></div>
              </a>
            </div>
            <div class="auth-info-box">
              <a href="#" class="username">{{userName}}</a>
              <div class="lance-blog-meta">
                <time class="time">{{articleDate | formatDate}}</time>
                <span class="article-view">{{`阅读 ${articleViews}`}}</span>
                <span
                  class="article-view"
                  style="font-weight:500;color:black"
                  v-if="seen_tag"
                >{{tag}}</span>
              </div>
            </div>
          </div>

          <h1 style="padding-top:20px;text-align:left">{{title}}</h1>
          <mavon-editor
            ref="md"
            :boxshadow="false"
            :ishljs="true"
            v-model="md"
            defaultOpen="preview"
            :subfield="false"
            :toolbarsFlag="false"
            style="z-index:1000;box-shadow:none;"
            codeStyle="atom-one-dark"
          />
          <!-- <div class="markdown-body" style="text-align:left;margin:20px" v-html="content"></div> -->
          <div class="comment-list-box">
            <div class="article-comment" id="a01">评论</div>
            <div class="comment-form focused">
              <div class="avatar-box">
                <a-avatar class="avatar" :size="38" :src="avatar" style="margin-left:50px" />
              </div>
              <div class="form-box">
                <div class="input-box">
                  <a-textarea
                    placeholder="请输入评论..."
                    size="small"
                    style="resize: none;height:20px;vertical-align:middle"
                    v-model="commentData.commentContent"
                  />
                </div>
                <div class="action-box">
                  <a-button @click="comment">评论</a-button>
                </div>
              </div>
            </div>
            <div class="comment-list"></div>
          </div>
        </div>
        <div class="article-recommend">
          <div style="text-align:left;padding:20px;" class="recommend-title">
            <h3>相关推荐</h3>
          </div>
          <article-list
            :queryBy="`${this.$route.query.labelId}`"
            :articleId="`${this.$route.query.articleId}`"
          ></article-list>
        </div>
        <div id="right-bar">
          <li
            :class="{'with-badge':isActive}"
            :style="{'color':dianzanColor}"
            @click="dianzan"
            :badge="countDianzan"
          >
            <icon-font style="fontSize:20px;" type="icon-dianzan" />
          </li>
          <li @click="goAnchor">
            <icon-font style="fontSize:20px;" type="icon-pinglun" />
          </li>
          <li>
            <icon-font style="fontSize:20px;" type="icon-shoucang" />
          </li>
          <li>
            <icon-font style="fontSize:20px;" type="icon-fenxiang" />
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBox from "@/components/SideBox";
import ArticleList from "@/views/Article/ArticleList.vue";
import {
  getArticle,
  getArticleById,
  addComment,
  getUserLike,
  addLike
} from "@/api/article";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import { Icon } from "ant-design-vue";
import { formatDate } from "@/utils/date";
import globalObj from "@/global";
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: globalObj.iconfontUrl
});

const renderer = new marked.Renderer();

marked.setOptions({
  renderer: renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  }
});

// let html = marked(props.article_content);

export default {
  name: "ArticleView",
  components: {
    SideBox,
    IconFont,
    ArticleList
  },
  data() {
    return {
      bgimage: "",
      title: "",
      labelId: "",
      articleDate: "",
      articleViews: "",
      userName: "",
      userId: "",
      content: "",
      md: "",
      markdownOption: {
        htmlcode: false,
        navigation: true
      },
      tag: "",
      seen_tag: false,
      commentData: {
        userId: "",
        articleId: "",
        parentCommentId: "1",
        commentContent: ""
      },

      countDianzan: 0,
      isUserLike: false
    };
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy年MM月dd日");
    }
  },
  computed: {
    avatar: function() {
      return this.$srcUrl + this.$store.getters.avatar;
    },
    isActive: function() {
      return this.countDianzan == 0 ? false : true;
    },
    dianzanColor: function() {
      return this.isUserLike ? "#52c41a" : "";
    }
  },
  mounted() {
    if (JSON.stringify(this.$route.query) === "{}") {
      this.$router.push("/");
    } else {
      getArticleById(this.$route.query.articleId).then(res => {
        //  console.log(res);
        this.content = marked(res.data.articleContentMd || "", {
          sanitize: true
        });
        // console.log(res.data);
        this.title = res.data.article.articleTitle;
        this.md = res.data.article.articleContentMd;
        this.articleDate = res.data.article.articleDate;
        this.articleViews = res.data.article.articleViews;
        this.userName = res.data.userName;
        this.userId = res.data.article.userId;
        this.tag = res.data.labelName;
        this.labelId = res.data.labelId;
        this.bgimage = `url(${this.$srcUrl + res.data.avatar})`;
        if (this.tag != "") {
          this.seen_tag = true;
        }
        document.title = this.title;
        this.countDianzan = res.data.article.articleLikeCount;
        // console.log(this.$refs.md.style);
      });
      //用户已登陆则需要验证用户是否已点赞
      if (this.$store.getters.userId) {
        getUserLike(
          this.$store.getters.userId,
          this.$route.query.articleId
        ).then(res => {
          this.isUserLike = res.data;
        });
      }
    }
  },
  methods: {
    goAnchor() {
      this.$el.querySelector("#a01").scrollIntoView(true);
    },
    comment() {
      this.commentData.userId = this.$store.getters.userId;
      this.commentData.articleId = this.$route.query.articleId;
      // console.table(this.commentData);
      addComment(this.commentData).then(res => {
        //console.log(res);
      });
    },
    dianzan() {
      //this.dianzanColor = "#52c41a";

      if (this.$store.getters.userId) {
        addLike(this.$store.getters.userId, this.$route.query.articleId).then(
          res => {
            if (res.data === 1) {
              this.isUserLike = false;
              this.countDianzan--;
            } else {
              this.isUserLike = true;
              this.countDianzan++;
            }
          }
        );
      }
    }
  }
};
</script>
<style scoped>
.view {
  margin-top: 3.767rem;
}
.lance-left {
  position: relative;
  float: left;
  width: 200px;
}
.lance-right {
  position: relative;
  float: right;
  width: calc(100% - 200px);
  margin-bottom: 1.5rem;
  padding: 0 2rem;
  padding-top: 0px;
  padding-right: 2rem;
  padding-bottom: 0px;
  padding-left: 2rem;
}
.author-info {
  display: flex;
  align-items: center;
  padding: 30px;
}
.username {
  display: inline-block;
  max-width: 100%;
  font-size: 1.3rem;
  font-weight: 700;
  color: #333;
  text-align: left;
}
a {
  text-decoration: none;
  cursor: pointer;
  color: #909090;
  font-size: 0;
  margin: initial;
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
}
h3.aside-title {
  position: relative;
  padding: 16px 16px 0;
  font-size: 14px;
  color: #333;
  font-weight: bold;
  text-align: left;
}
.aside-content {
  padding: 12px 16px 16px 16px;
  overflow: hidden;
  line-height: 30px;
}
#asideNewArticle ul li a {
  display: block;
  color: #555666;
}
#asideNewArticle ul li {
  display: inline;
  padding-top: 14px;
  text-align: left;
}
.user-article {
  margin-left: 5%;
}
.lance-box {
  margin-bottom: 8px;
  background-color: white;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
}
.article-comment {
  color: #8a9aa9;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
  padding: 1.67rem 0 5px;
}

.article-content {
  width: 700px;
  max-width: 100%;
  background-color: #fff;
  border-radius: 2px;
  box-sizing: border-box;
  margin-bottom: 1.5rem;
  padding: 0 2rem;
  padding-top: 0px;
  padding-right: 2rem;
  padding-bottom: 0px;
  padding-left: 2rem;
}

.article-recommend {
  margin-top: 20px;
  width: 700px;
  background-color: white;
}
.comment-list-box {
  position: relative;
  background-color: #fff;
}
.comment-form {
  margin: 1.333rem 0;
  display: flex;
  position: relative;
  padding: 1rem 1.333rem;
  background-color: #fafbfc;
  border-radius: 3px;
}
.avatar {
  margin: 0 1rem 0 0;
  width: 2.667rem;
  height: 2.667rem;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  background-position: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #eee;
}
.avatar-box {
  flex: 0 0 auto;
}
.form-box {
  flex: 1 1 auto;
  position: relative;
}
.input-box {
  font-size: 0;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  border-radius: 3px;
}
.action-box {
  display: flex;
  align-items: center;
  margin: 0.65rem 0 0;
}
ul {
  padding-left: 10px;
}
#right-bar {
  position: fixed;
  z-index: 99999;
  position: fixed !important;
  right: 200px;
  bottom: 300px;
}
#right-bar li {
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin-bottom: 22px;
  background-color: #fff;
  border-radius: 100%;
  cursor: pointer;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  transition: all 0.3s ease;
  list-style: none;
  color: #b2bac2;
}
#right-bar > li:hover {
  color: grey;
}

.lance-blog-meta {
  font-size: 1.1rem;
  color: #909090;
  text-align: left;
}
.time {
  letter-spacing: 1px;
  font-size: 15px;
}
.article-view {
  letter-spacing: 1px;
  font-size: 15px;
  margin-left: 20px;
}
input::placeholder {
  vertical-align: middle;
}
h3 {
  color: grey;
}
.recommend-title {
  border-bottom: 1px solid rgba(178, 186, 194, 0.15);
  padding: 1.3rem 2rem;
  padding-top: 1.3rem;
  padding-right: 2rem;
  padding-bottom: 1.3rem;
  padding-left: 2rem;
}

.markdown-body >>> pre {
  padding: 0;
}
.with-badge::after {
  content: attr(badge);
  position: absolute;
  top: 0;
  left: 75%;
  padding: 0.1rem 0.4rem;
  font-size: 1rem;
  text-align: center;
  line-height: 1;
  white-space: nowrap;
  color: #fff;
  background-color: #b2bac2;
  border-radius: 0.7rem;
  transform-origin: left top;
  transform: scale(0.75);
}
</style>