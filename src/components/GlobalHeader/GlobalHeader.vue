<template>
  <div class="lance-header fixed">
    <div class="lance-header-left" v-if="seen_home">
      <img alt="logo" height="50" src="../../assets/logo-blog.png" />
    </div>
    <div class="lance-header-menu" v-if="seen_home">
      <ul>
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>论坛</li>
        <li>问答</li>
        <li>留言板</li>
      </ul>
    </div>
    <div class="lance-article-title" v-if="seen_save">
      <input class="lance-title" v-model="article_title" placeholder="请输入文章标题..." />
    </div>
    <div class="lance-header-right">
      <a-input-search
        placeholder="文章检索"
        style="width: 200px;padding-left:100px;"
        @search="onSearch"
        v-if="seen_home"
      />
      <!-- 用户如果已登陆则 登录注册按钮不可见，替换成用户头像信息 -->
      <a-button
        type="primary"
        style="margin-left:30px"
        @click.prevent="publish"
        v-show="seen_home"
      >写文章</a-button>
      <a-button type="primary" style="margin-left:30px" size="small" @click="login" v-if="seen">登录</a-button>
      <a-button
        type="danger"
        style="margin-left:10px"
        size="small"
        @click="showModal"
        v-if="seen"
      >注册</a-button>
      <a-button style="margin-left:400px" id="openTagPanel" v-if="seen_save">{{publishOrEdit}}</a-button>
      <a-popover placement="bottomRight" trigger="click">
        <template slot="content">
          <ul>
            <li>
              <router-link @click.native="goHome" to>
                <icon-font type="icon-htmal5icon06" />
                <span>主页</span>
              </router-link>
            </li>
            <li>
              <router-link @click.native="goUser" to>
                <icon-font type="icon-gerenzhongxin" />
                <span>个人中心</span>
              </router-link>
            </li>
            <li>
              <router-link @click.native="goUserInfo" to>
                <icon-font type="icon-shezhi" />
                <span>设置</span>
              </router-link>
            </li>
            <!-- <li>
              <a href>
                <icon-font type="icon-combinedshapecopy2" />
                <span>写文章</span>
              </a>
            </li>-->
            <li>
              <router-link @click.native="logout" to>
                <icon-font type="icon-log-out" />
                <span>退出登录</span>
              </router-link>
            </li>
          </ul>
        </template>
        <a-avatar :size="38" :src="avatar" style="margin-left:50px;cursor: pointer;" v-if="seen2" />
      </a-popover>
      <div class="article-tag" id="articleTag" v-show="seen_tag">
        <div class="title" style="padding-bottom:10px;">{{publishOrEdit}}文章</div>
        <div style="width:100%">
          <span style="font-size:1rem">标签</span>
          <div style="display:flex;flex-wrap: wrap;">
            <a-tag
              id="tag"
              @click="removeTag"
              style="margin-bottom:10px;font-size:1.4rem"
              v-for="(tag,id) in addTags"
              :key="id"
            >{{tag.labelName}}</a-tag>
          </div>
        </div>
        <div class="tag-input" v-show="seen_input">
          <input
            type="text"
            class="input"
            placeholder="添加一个标签"
            v-model="tags"
            @input="handleChange"
          />
        </div>
        <ul>
          <li @click="addTag(tag)" v-for="(tag,id) in articletags" :key="id">{{tag.labelName}}</li>
        </ul>
        <a-button @click.prevent="saveData">确定并{{publishOrEdit}}</a-button>
      </div>
    </div>
    <!-- 注册与登录模态框 -->
    <a-modal v-model="visible" :title="Title" :ok-text="oktext" cancel-text="取消" @ok="submit" @>
      <a-form :label-col="labelCol" :wrapper-col="wrapperCol" :form="form" v-if="flag">
        <a-form-item
          label="用户名"
          has-feedback
          :validate-status="userName_status"
          :help="userName_help"
        >
          <a-input id="userName" v-model="form.userName" @blur="checkName" placeholder="用户名长度3-10" />
        </a-form-item>
        <a-form-item
          label="密码"
          has-feedback
          :validate-status="password_status"
          :help="password_help"
        >
          <a-input
            id="password"
            v-model="form.password"
            @blur="checkPwd"
            type="password"
            placeholder="密码长度8-20"
          />
        </a-form-item>
        <a-form-item
          label="确认密码"
          has-feedback
          :validate-status="confirmpassword_status"
          :help="confirmpassword_help"
        >
          <a-input
            id="confirmpassword"
            v-model="form.confirmpassword"
            @blur="confirmPwd"
            type="password"
            placeholder="再次输入密码"
          />
        </a-form-item>
      </a-form>
      <a-form v-if="login_flag">
        <a-form-item style="margin-left:100px">
          <a-input style="width:300px;" placeholder="Username" v-model="login_userName">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item style="margin-left:100px">
          <a-input
            style="width:300px;"
            type="password"
            placeholder="Password"
            v-model="login_password"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { register, login } from "@/api/user";
import { Icon, Tag } from "ant-design-vue";
import eventBus from "@/eventBus";
import { getTags } from "@/api/article";
import globalObj from "@/global";
const set = new Set();
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: globalObj.iconfontUrl
});
export default {
  name: "GlobalHeader",
  components: {
    IconFont
  },
  data() {
    return {
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 }
      },
      ava_postion: "margin-left:100px;",
      article_title: "",
      seen: true,
      seen2: false,
      oktext: "",
      userName: "",
      login_userName: "",
      login_password: "",
      Title: "用户注册",
      login_flag: false, //模态框登录表单显示
      flag: true, //模态框注册表单显示
      boolean_userName: false,
      boolean_password: false,
      boolean_confirmpassword: false,
      userName_status: "",
      userName_help: "",
      password_status: "",
      password_help: "",
      confirmpassword_status: "",
      confirmpassword_help: "",
      form: {
        userName: "",
        password: "",
        confirmpassword: ""
      },
      tags: "",
      articletags: [],
      addTags: [],
      seen_tag: false,
      seen_input: true,
      publishOrEdit: "发布"
    };
  },
  computed: {
    register_flag: function() {
      return (
        this.boolean_userName &&
        this.boolean_password &&
        this.boolean_confirmpassword
      );
    },
    avatar: function() {
      if (this.$store.getters.avatar == null) {
        return "./default.jpg";
      }

      return this.$srcUrl + this.$store.getters.avatar;
    },
    seen_home: function() {
      return this.$store.getters.seen_home;
    },
    seen_save: function() {
      return !this.$store.getters.seen_home;
    }
  },
  methods: {
    onSearch() {
      console.log(11);
    },
    init() {
      this.boolean_userName = false;
      this.boolean_password = false;
      this.boolean_confirmpassword = false;
      this.form.userName = "";
      this.form.password = "";
      this.form.confirmpassword = "";
      this.userName_status = "";
      this.userName_help = "";
      this.password_status = "";
      this.password_help = "";
      this.confirmpassword_status = "";
      this.confirmpassword_help = "";
      this.login_userName = "";
      this.login_password = "";
    },
    login() {
      this.Title = "用户登录";
      this.oktext = "登录";
      this.login_flag = true;
      this.flag = false;
      this.visible = true;
    },
    showModal() {
      this.visible = true;
      this.Title = "用户注册";
      this.oktext = "注册";
      this.login_flag = false;
      this.flag = true;
      this.visible = true;
    },
    //登录|注册 提交按钮点击事件
    async submit() {
      //this.visible = false;
      if (this.register_flag && this.flag) {
        console.log("注册");
        const data = {
          userName: this.form.userName,
          password: this.form.password
        };
        register(data).then(res => {
          if ((res.status = true)) {
            this.visible = false;
            this.init();
          }
        });
      } else if (this.login_flag) {
        const data = {
          userName: this.login_userName,
          password: this.login_password
        };
        await this.$store.dispatch("user/login", data).then(() => {
          this.visible = false;
          this.init();
          this.seen = false;
          this.seen2 = true;
          //this.seen_home = true;
          //this.avatar = this.$srcUrl + this.$store.getters.avatar;
        });
      }
    },
    checkName() {
      const { userName } = this.form;
      if (
        Array.from(userName.trim()).length < 3 ||
        Array.from(userName.trim()).length > 10
      ) {
        this.userName_status = "error";
        this.userName_help = "用户名长度不符";
        this.boolean_userName = false;
      } else {
        this.userName_status = "success";
        this.userName_help = "";
        this.boolean_userName = true;
      }
    },
    checkPwd() {
      const { password } = this.form;
      if (
        Array.from(password.trim()).length < 8 ||
        Array.from(password.trim()).length > 20
      ) {
        this.password_status = "error";
        this.password_help = "密码长度不符";
        this.boolean_password = false;
      } else {
        this.password_status = "success";
        this.password_help = "";
        this.boolean_password = true;
      }
    },
    confirmPwd() {
      const { password, confirmpassword } = this.form;
      if (!Object.is(password, confirmpassword)) {
        this.confirmpassword_status = "error";
        this.confirmpassword_help = "两次密码不一致";
        this.boolean_confirmpassword = false;
      } else {
        this.confirmpassword_status = "success";
        this.confirmpassword_help = "";
        this.boolean_confirmpassword = true;
      }
    },
    logout() {
      this.$store.dispatch("user/logout").then(() => {});
      this.$router.go(0);
    },
    publish() {
      if (this.$store.getters.name) {
        //this.$router.push("/publish");
        let routeUrl = this.$router.resolve({
          path: "/publish",
          query: { publishOrEdit: "发布" }
        });
        window.open(routeUrl.href, "_blank");
      }
    },
    saveData() {
      const data = {
        title: this.article_title,
        tag: this.addTags[0]
      };
      if (typeof this.addTags[0] == "undefined") {
        alert("请选择标签");
      } else {
        eventBus.$emit("save", data);
      }
    },
    goHome() {
      //console.log(this);
      this.$router.push("/index");
      //this.seen_home = this.$store.getters.seen_home;
    },
    goUser() {
      this.$router.push("/user");
      //this.seen_home = this.$store.getters.seen_home;
    },
    goUserInfo() {
      this.$router.push("/userInfo");
      // this.seen_home = this.$store.getters.seen_home;
    },
    handleChange() {
      getTags(this.tags.trim()).then(res => {
        this.articletags = [];
        for (let i = 0; i < res.data.length; i++) {
          this.articletags.push(res.data[i]);
        }
      });
    },
    removeTag() {
      //阻止点击事件的冒泡
      event.stopPropagation();
      this.addTags = [];
      this.seen_input = true;
    },
    addTag(tag) {
      let addFlag = true;
      if (this.addTags.length == 0) {
        addFlag = true;
      } else {
        for (let i = 0; i < this.addTags.length; i++) {
          if (
            this.addTags[i].labelId == tag.labelId ||
            this.addTags[i].labelName == tag.labelName
          ) {
            addFlag = false;
          }
        }
      }
      if (addFlag) {
        this.addTags.push(tag);
        this.seen_input = false;
        this.tags = "";
        getTags("").then(res => {
          this.articletags = [];
          for (let i = 0; i < res.data.length; i++) {
            this.articletags.push(res.data[i]);
          }
        });
      }
    },
    openTag(e) {
      const flag = this;

      let box = document.getElementById("articleTag");
      let open = document.getElementById("openTagPanel");

      if (open.contains(e.target)) {
        flag.seen_tag = !flag.seen_tag;
      } else if (box.contains(e.target)) {
        flag.seen_tag = true;
      } else {
        flag.seen_tag = false;
      }
    },
    clickBind() {
      //点击article-tag弹窗外部关闭弹窗
      // eventBus.$on("addClick", () => {
      //console.log("addClick:" + this.seen_tag);
      console.log("aa");
      document.addEventListener("click", this.openTag);
      // });
    },
    removeClickBind() {
      // eventBus.$on("removeClick", () => {
      this.seen_tag = false;
      document.removeEventListener("click", this.openTag);
      // });
    }
  },
  created() {
    //console.log(this.$store.getters.name);
    if (this.$store.getters.name) {
      this.seen = false;
      this.seen2 = true;
    }
  },
  mounted() {
    // //点击article-tag弹窗外部关闭弹窗
    // eventBus.$on("addClick", () => {
    //   //console.log("addClick:" + this.seen_tag);
    //   document.addEventListener("click", this.openTag);
    // });

    // eventBus.$on("removeClick", () => {
    //   this.seen_tag = false;
    //   document.removeEventListener("click", this.openTag);
    // });
    // this.clickBind();
    // this.removeClickBind();
    eventBus.$on("addClickBind", () => {
      console.log(111);
      this.clickBind();
    });
    eventBus.$on("removeClickBind", () => {
      this.removeClickBind();
    });

    eventBus.$on("setTitleAndTag", data => {
      this.article_title = data.title;
      this.addTags.push({
        labelName: data.labelName,
        labelId: data.labelId
      });
      this.seen_input = false;
    });
    eventBus.$on("buttonName", data => {
      console.log(data);
      this.publishOrEdit = data;
    });

    // eventBus.$on("initPublish", () => {
    //   location.reload();
    // });
  },
  beforeRouteUpdate() {
    console.log(asa);
  }
};
</script>

<style scoped>
.lance-header {
  position: fixed;
  top: 0;
  display: flex;
  display: -webkit-flex;
  /* 大于mavon-editor 的显示层级 */
  z-index: 1001;
  background-color: white;
  width: 100%;
  height: 50px;
  flex-wrap: nowrap;
  justify-content: flex-start;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
.lance-header-left {
  padding-left: 17%;
}

.lance-header-right {
  display: flex;
  padding-left: 5%;
  justify-content: flex-end;
  align-items: center;
  margin-block-start: 0.75em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-right: 0;
}
/* ul全局默认值 padding-left：40 */

.lance-header-menu ul {
  padding: 0;
  margin: 0;
  display: block;
  list-style-type: disc;
}
.lance-header-menu li {
  display: inline;
  padding-left: 30px;
  line-height: 50px;
}
.ant-popover-inner-content ul {
  padding: 0;
  margin: 0;
  display: block;
  list-style-type: none;
}
.ant-popover-inner-content ul li {
  line-height: 40px;
  font-size: normal;
}
.ant-popover-inner-content a {
  color: #71777c;
}
.ant-popover-inner-content a span {
  padding-left: 10px;
  padding-right: 30px;
}
.ant-popover .ant-popover-placement-bottomRight {
  width: 13.1rem;
}
.lance-title {
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  border: none;
  outline: none;
  height: 100%;
  width: 700px;
  padding-left: 20px;
}
.article-tag {
  text-align: left;
  position: absolute;
  margin: 0 3rem 0 0;
  padding: 2rem;
  top: 100%;
  right: 0;
  width: 20rem;
  font-size: 1.2rem;
  white-space: nowrap;
  color: #909090;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 0 1px 2px #f1f1f1;
  cursor: default;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 100;
}

/* 通过样式穿透覆盖 */
.input {
  padding: 0.4em 0;
  width: 100%;
  font-size: 1em;
  border: none;
  border-bottom: 1px solid #f1f1f1;
  border-radius: 0;
  outline: none;
}

.tag-input input::placeholder {
  color: #c7c2c2;
  font-size: 0.6rem;
}
ul {
  margin: 0;
  padding: 0;
  display: block;
}
li {
  list-style: none;
  display: list-item;
  text-align: -webkit-match-parent;
  font-size: 15px;
}
* {
  box-sizing: border-box;
}
</style>