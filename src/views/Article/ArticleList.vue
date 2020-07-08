<!--待拆分重新整理-->
<template>
  <div class="welcome-main">
    <div class="welcome-view">
      <div class="welcome-context">
        <div class="welcome-context-left">
          <ul
            class="entry-list"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="10"
          >
            <li class="item" v-for="(article,id) in articleList" :key="id">
              <div class="entry">
                <router-link
                  target="_blank"
                  :to="{path:'/article',query:{labelId:`${article.labelId}`,articleId:`${article.articleId}`}}"
                >
                  <div class="context-box">
                    <div class="info-box">
                      <div class="info-row meta-row">
                        <ul class="meta-list">
                          <li>专栏 ·</li>
                          <li class="info">{{article.userName}} ·</li>
                          <li class="info">{{article.labelName}} ·</li>
                          <li>{{article.articleDate}}</li>
                        </ul>
                      </div>
                      <div class="info-row title-row">
                        <router-link
                          target="_blank"
                          :to="{path:'/article',query:{labelId:`${article.labelId}`,articleId:`${article.articleId}`}}"
                          class="title"
                        >{{article.articleTitle}}</router-link>
                      </div>
                      <div class="info-row">转载</div>
                    </div>
                  </div>
                </router-link>
              </div>
            </li>
          </ul>
          <a-spin :spinning="spinning" />
          <span v-if="loading">————已加载完全部内容————</span>
        </div>
        <div class="welcome-context-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBox from "@/components/SideBox";
import { getArticle } from "@/api/article";
import { publishDate } from "@/utils/date";
export default {
  name: "ArticleList",
  components: {},
  props: {
    queryBy: {
      String,
      default: ""
    },
    articleId: {
      String,
      default: ""
    }
  },
  data() {
    return {
      articleList: [
        {
          articleId: "",
          articleTitle: "",
          labelId: "",
          labelName: "",
          articleDate: "",
          userName: ""
        }
      ],
      busy: false,
      pageNo: 1,
      pageSize: 10,
      spinning: false,
      loading: false
    };
  },
  mounted() {
    // getArticle(this.pageNo, this.pageSize).then(res => {
    //   this.articleList = res.data;
    //   this.pageNo++;
    //   //console.log(this.articleList);
    // });
    this.articleList = [];
  },
  methods: {
    loadMore() {
      this.busy = true;
      this.spinning = true;
      getArticle(this.pageNo, this.pageSize, this.queryBy, this.articleId).then(
        res => {
          //this.articleList.push(res.data);

          for (let i = 0; i < res.data.length; i++) {
            // console.log(res.data[i]);
            const article = {
              articleId: res.data[i].article.articleId,
              labelId: res.data[i].labelId,
              labelName: res.data[i].labelName,
              articleTitle: res.data[i].article.articleTitle,
              articleDate: publishDate(res.data[i].article.articleDate),
              userName: res.data[i].userName
            };
            this.articleList.push(article);
          }

          this.pageNo++;
          this.spinning = false;
          //console.log(this.articleList);
          if (res.data.length == this.pageSize) {
            this.busy = false;
            this.loading = true;
          }
        }
      );
      //   this.articleList.push({
      //     articleTitle: "test111"
      //   });
      //   this.busy = false;
    }
  }
};
</script>
<style scoped>
.welcome-main {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
}
.welcome-main .welcome-view {
  margin-top: 10px;
}
.welcome-main .welcome-view .welcome-context {
  display: flex;
  align-items: flex-start;
  margin-top: 0.33rem;
}
.entry-list {
  width: 100%;
  background-color: #fff;
}
.item {
  border-bottom: 1px solid rgba(178, 186, 194, 0.15);
}
ul {
  margin: 0;
  padding: 0;
  display: block;
}
li {
  list-style: none;
  display: list-item;
  padding-right: 5px;
  font-size: 13px;
  text-align: -webkit-match-parent;
}
.info-box {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
}
.meta-row {
  font-size: 1rem;
  color: #b2bac2;
}
.welcome-context-left {
  overflow: hidden;
  flex-grow: 1;
}
.welcome-context-right {
  width: 240px;
  min-width: 240px;
  margin-left: 20px;
}
.context-box {
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;
}
.meta-list {
  display: flex;
  align-items: baseline;
  white-space: nowrap;
}
.title-row {
  margin: 0.5rem 0 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.title {
  font-size: 1.4rem;
  font-weight: 600;
  line-height: 1.2;
  color: black;
}
a {
  margin: initial;
}
.info-row {
  display: flex;
}
span {
  display: block;
  font-size: 0.9rem;
  color: #909090;
  padding: 20px;
}
li.info:hover {
  color: #007fff;
}
</style>