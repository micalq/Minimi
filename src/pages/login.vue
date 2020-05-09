<template>
  <div>
    <div class="login">
      <!-- logo -->
      <div class="container">
        <a href="/#/index">
          <img src="../../public/imgs/login-logo.png" alt />
        </a>
      </div>
      <!-- banner图 -->
      <div class="banner">
        <div class="container">
          <div class="form">
            <h3>
              <span>账号登录</span>
              <span class="login-span">|</span>
              <span>扫码登录</span>
            </h3>
            <div class="input">
              <input type="text" placeholder="请输入账号" v-model="username" />
              <input type="text" placeholder="请输入密码" v-model="password" />
            </div>
            <div class="bt">
              <a href="javascript:;" class="btn" @click="login">登录</a>
            </div>
            <div class="tips">
              <div class="tips-left">手机短信登录/注册</div>
              <div class="tips-right">
                <span @click="register">立即注册</span>
                <span class="tips-r">|</span>
                <span>忘记密码?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import Footer from '../components/NavFotter'
/* 你在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用
mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）： */
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "",
      password: "",
      userId: ""
      // res:{}
    };
  },
  components: {
    // Footer,
  },
  methods: {
    login() {
      //登录
      const { username, password } = this; //解构
      this.axios
        .post("/user/login", {
          username,
          password
        })
        .then(res => {
          // this.res=res;
          // console.log(res);
          this.$cookie.set("userId", res.id, { expires: "Session" }); //设置cookie过期时间
          // this.$router.push("/index");
          this.$router.push({
            name:"index",
            params:{
              from:"login"
            }
          })
          // this.$store.dispatch('saveUserName', res.username)
          this.saveUserName(res.username);
        });
    },
    ...mapActions(["saveUserName"]),
    register() {      //注册
      this.axios
        .post("/user/register", {
          username: "陈小政",
          password: "199711",
          email: "chen@123.cn"
        })
        .then(() => {
          // alert("注册成功了");
          this.$message.success("注册成功了")
        });
    }
  }
};
</script>
<style lang="scss">//其他地方也要使用不加scoped
@import "../assets/scss/mixin.scss";
.login {
  .container {
    height: 113px;
    img {
      width: auto;
      height: 100%;
    }
  }
  .banner {
    //  background:url(/imgs/login-bg.jpg) no-repeat 50%
    @include bgImg(100%, 576px, "/imgs/login-bg.jpg");
    background-size: cover;
    .container {
      // height: 576px;
      position: relative;
      .form {
        position: absolute;
        top: 30px;
        right: 0;
        width: 410px;
        height: 510px;
        padding: 0 31px;
        background-color: #fff;
        box-sizing: border-box;
        h3 {
          text-align: center;
          margin-top: 30px;
          font-size: 25px;
          cursor: pointer;
          margin: 40px auto 48px;
          .login-span {
            margin: 0 30px;
          }
          span {
            &:first-child {
              color: #f60;
            }
          }
        }
        .input {
          input {
            display: block;
            width: 95%;
            height: 50px;
            padding-left: 5px;
            &:last-child {
              margin-top: 20px;
            }
          }
        }
        .bt {
          a {
            color: #fff;
            font-size: 16px;
          }
          .btn {
            width: 97%;
            margin-top: 30px;
            height: 50px;
            line-height: 50px;
          }
        }
        .tips {
          margin-top: 15px;
          cursor: pointer;
          .tips-left {
            float: left;
            color: #f60;
          }
          .tips-right {
            float: right;
          }
          .tips-r {
            margin: 0 10px;
          }
        }
      }
    }
  }
}
</style>
