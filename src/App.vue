<template>
  <div id="app">

    <router-view/>
  </div>
</template>
<script>
import storage from "./storage/index"//导入storage
export default {
  data() {
    return {

      res:{}
    }
  },
      mounted() {
        // storage.setItem("a",1)
        // storage.setItem("q",{qq:11},"user")
        // storage.clear("a")
        // storage.clear("q","user")
       /*  this.axios.get("/mock/user/login.json").then((res)=>{ //第一种方法mock本地加载请求
          this.res=res
        }) */
       /*  this.axios.get("/user/login").then((res)=>{
          this.res=res
          console.log(res);
        }) */
        this.getUser()
        this.getCartCount()
      },
      methods: {
        getUser(){//获取用户信息
        this.axios.get("/user").then((res)=>{//把数据保存到vuex

        })
        },
        getCartCount(){//获取购物车数量
          this.axios.get("/carts/products/sum").then((res)=>{

          })
        }
      }
}
</script>
<style>
@import "./assets/scss/reset.scss";
@import "./assets/scss/button.scss";
</style>
