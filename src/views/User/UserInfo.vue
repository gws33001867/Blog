<template>
  <div class="view user-view">
    <div class="major-area">
      <div class="user-info-block block shadow">
        <div class="setting-profile-view">
          <h1>个人资料</h1>
          <ul class="setting-list">
            <li class="item">
              <span class="title">头像</span>
              <img src id="image" width="60px" height="60px" alt />
              <input
                id="files"
                type="file"
                name="file"
                @change="preview"
                accept="image/jpg, image/png, image/gif"
                placeholder="选择上传头像"
                enctype="multipart/form-data"
              />
              <div class="item-action-box">
                <div class="hint">支持 jpg、png、gif 格式大小 3M 以内的图片</div>
                <button @click="upload" class="upload-btn">点击上传</button>
              </div>
            </li>
            <li class="item">
              <span class="title">用户名</span>
              <div class="profile-input">
                <input
                  @change="changeBtn"
                  type="text"
                  placeholder="请输入用户名"
                  class="input"
                  v-model="changeName"
                />
                <div class="action-box">
                  <button class="btn" v-if="noShow">
                    <img
                      src="https://b-gold-cdn.xitu.io/v3/static/img/edit-icon.6d6382b.svg"
                      alt
                      class="icon"
                    />
                    <span>修改</span>
                  </button>
                  <div v-if="show">
                    <button class="btn" @click="changeUserName">保存</button>
                    <button class="btn cancel-btn" @click="cancelChange">取消</button>
                  </div>
                </div>
              </div>
            </li>
            <li class="item">
              <span class="title">个人介绍</span>
            </li>
            <li class="item">
              <span class="title">个人主页</span>
            </li>
          </ul>

          <!-- <a-button>取消上传</a-button> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
import { Icon, Tag } from "ant-design-vue";
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_1880897_uymq20s7zcr.js"
});
import { postAvatar, changeName } from "@/api/user.js";
export default {
  name: "UserInfo",
  components: {
    IconFont
  },
  data() {
    return {
      changeName: ""
    };
  },
  computed: {
    show: function() {
      return !(this.$store.getters.name == this.changeName);
    },
    noShow: function() {
      return this.$store.getters.name == this.changeName;
    }
  },
  methods: {
    preview() {
      //console.log(this.$el.querySelector("#files").files[0]);
      let file = this.$el.querySelector("#files").files[0];
      if (typeof file == "undefined") {
        return;
      }
      let fileType = file.type.split("/")[0];
      if (fileType != "image") {
        alert("请上传图片");
        return;
      }
      let fileSize = Math.round(file.size / 1024 / 1024);
      if (fileSize >= 3) {
        alert("请上传小于3M的图片");
        return;
      }

      let img = this.$el.querySelector("#image");
      let reader = new FileReader();
      //根据url将文件添加的流中
      reader.readAsDataURL(file);
      //实现onload接口
      reader.onload = function(e) {
        //获取文件在流中url
        let url = reader.result;
        //将url赋值给img的src属性
        img.src = url;
      };
      var formData = new FormData();
      formData.append("file", file);
      formData.append("userId", this.$store.getters.userId);
      postAvatar(formData).then(() => {
        this.$store.dispatch("user/getInfo", this.$store.getters.token);
      });
    },
    upload() {
      this.$el.querySelector("#files").click();
    },
    cancel() {
      this.$el.querySelector("#image").src = "";
      this.$el.querySelector("#files").value = "";
    },
    changeBtn() {
      console.log(1);
    },
    cancelChange() {
      this.changeName = this.$store.getters.name;
    },
    changeUserName() {
      changeName(this.changeName, this.$store.getters.userId).then(() => {
        this.$store.dispatch("user/getInfo", this.$store.getters.token);
      });
    }
  },
  mounted() {
    this.$el.querySelector("#image").src =
      this.$srcUrl + this.$store.getters.avatar;
    this.changeName = this.$store.getters.name;
    console.log(this.$store.getters.name);
    document.title = this.$store.getters.name + "的个人信息";
  }
};
</script>
<style scoped>
.view {
  max-width: 760px;
  margin: 4.767rem auto 0px;
  margin-left: 20rem;
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
  position: relative;
  padding: 2.7rem 4rem 7rem;
  background-color: #fff;
  border-radius: 2px;
  width: 60rem;
}
.block {
  background-color: #fff;
  border-radius: 2px;
}
.shadow {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
#files {
  display: none;
}
.setting-profile-view {
  text-align: left;
  font-size: 12px;
  line-height: normal;
}
.item {
  display: flex;
  align-items: center;
  padding: 2rem 0;
  border-top: 1px solid #f1f1f1;
}
.setting-list {
  padding: 0;
  margin: 0;
}
.title {
  font-size: 1.2rem;
  color: #333;
  width: 10rem;
}
.hint {
  color: #909090;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}
.item-action-box {
  margin-left: 1rem;
}
.upload-btn {
  -webkit-appearance: none;
  appearance: none;
  background-color: #007fff;
  color: #fff;
  border-radius: 2px;
  border: none;
  padding: 0.5rem 1.3rem;
  outline: none;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
}
.input {
  flex: 1;
  display: inline-block;
  border: none;
  outline: none;
  color: #909090;
  font-size: 1.3rem;
}
.action-box {
  margin-left: 1rem;
}
.profile-input {
  display: flex;
  justify-content: flex-end;
  flex: 1;
}
.btn {
  background-color: transparent;
  color: #007fff;
  font-size: 1.2rem;
  padding: 0;
  white-space: nowrap;
  transition: background-color 0.3s, color 0.3s;
  cursor: pointer;
  border-radius: 2px;
  border: none;
}
.icon {
  vertical-align: bottom;
  height: 1.5rem;
  margin-right: 0.6rem;
}
.cancel-btn {
  color: #666;
}
button + button {
  margin-left: 0.8rem;
}
</style>