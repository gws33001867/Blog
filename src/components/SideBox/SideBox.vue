<template>
        <div class="lance-box">
          <div class="lance-profile-intro d-flex">
            <div class="lance-box-avatar">
              <img src="https://data.zhangjia.io/user_files/1/avatar/avatar_1554997204.gif" height="48" width="48" alt="头像">
            </div>
            <div class="lance-box-userinfo">
              <div>
                <span class="lance-span-username">lance</span>
              </div>
              <div>
                <span class="lance-span-personal">已注册1天</span>
              </div>
            </div>
          </div>  
          <!-- side-box第一行 -->
          <div class="lance-data-info d-flex item-tiling">
            <dl class="text-center" title="100">
              <dt>
                <span class="lance-count">100</span>
              </dt>
              <dd>原创</dd>
            </dl>
            <dl class="text-center" title="13000">
              <dt>
                <span class="lance-count">1万+</span>
              </dt>
              <dd>粉丝</dd>
            </dl>
            <dl class="text-center" title="520">
              <dt>
                <span class="lance-count">520</span>
              </dt>
              <dd>获赞</dd>
            </dl>
            <dl class="text-center" title="4323">
              <dt>
                <span class="lance-count">4323</span>
              </dt>
              <dd>评论</dd>
            </dl>
             <dl class="text-center" title="8323">
              <dt>
                <span class="lance-count">8323</span>
              </dt>
              <dd>访问</dd>
            </dl>
          </div>
          <!--side-box 第二行 -->
          <div class="lance-data-info d-flex item-tiling">
            <dl class="text-center" title="5000">
              <dt>
                <span class="lance-count">5000</span>
              </dt>
              <dd>积分</dd>
            </dl>
            <dl class="text-center" title="13000">
              <dt>
                <span class="lance-count">1万+</span>
              </dt>
              <dd>收藏</dd>
            </dl>
            <dl class="text-center" title="520">
              <dt>
                <span class="lance-count">520</span>
              </dt>
              <dd>周排名</dd>
            </dl>
            <dl class="text-center" title="4323">
              <dt>
                <span class="lance-count">4323</span>
              </dt>
              <dd>总排名</dd>
            </dl>
             <dl class="text-center" title="5">
              <dt>
                <span class="lance-count">5</span>
              </dt>
              <dd>等级</dd>
            </dl>
          </div>
          <div class="lance-box-operation ">
            <a-button>TA的主页</a-button>
            <a-button>私信</a-button>
            <a-button type="danger">关注</a-button>
          </div>
        </div>
</template>
<script>
export default {
    name:"SideBox"
}
</script>

<style scoped>
  dd{
    color: #999aaa;
    font-size: 14px;
    line-height: 22px;
    padding: 0;
    margin: 0;
  }
  dl{
    padding-left: 20px;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  dt{
    padding: 0;
    margin: 0;
  }

  .lance-box-userinfo{
    padding-left: 20px;
  }
  .lance-span-username{
    color: #bb9444;
  }
   .lance-data-info{
    display: flex;
    display: -webkit-flex;
  }
   
  .lance-count{
    color: #4a4d52;
    font-size: 14px;
    font-weight: 500;
    line-height: 22px;
  }
  .text-center{
    text-align: center;
  }

  .lance-box-operation {
    display: flex;
    padding: 8px 16px 10px 16px;
    align-items: center;
    justify-content: space-between;
}
  .lance-profile-intro{
    padding: 16px 16px 16px 20px;
  
  }
  .item-tiling>* {
    width: 100%;
}
 .lance-span-personal{
    color: #999aaa;
    font-size: 13px;
    line-height: 20px;
  }
   .lance-box{
    margin-bottom: 8px;
    background-color: white;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
  }
 
 .d-flex{
    display: flex !important;
  }
  
</style>