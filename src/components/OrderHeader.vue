<template>
  <div>
    <div class="cart">
      <div class="header">
        <div class="container clearfix">
           <div class="logo fl"> <a href="/#/index" title="小米"></a></div>
             <div class="title fl">
                 <h2>{{title}} <slot name="tip"></slot></h2>
             </div>
                  <div class="username fr"><a href="">{{username}}</a></div>
            </div>
      </div>
    </div>
  </div>
</template>
<script>
import {  mapState} from "vuex";
export default {
  name:"order-header",
  props:{
    title:String,//传参
  },
  computed: {
    ...mapState(["username"])
  },
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
   .cart{
      .header{
      padding: 30px 0;
      border-bottom: 2px solid #f60;
      .container{
        position: relative;
       .logo {
  display: inline-block;
  width: 55px;
  background-color: #f60;
  // position: absolute;
  // left: 0;
  // top: -10px;需要加浮动
    a{
      display:inline-block;
      width: 110px;
      &:before{
        content: "";
        @include bgImg(55px ,55px,"../../public/imgs/mi-logo.png",55px);
        transition: margin .2s;
      }
      &:after{
        @include bgImg(55px ,55px,"../../public/imgs/mi-home.png",55px);
          content: "";
      }
      &:hover::before{
        margin-left: -55px;
        transition: margin .2s;
      }
    }
 }
              // @include flex();
               .title{
                 display: inline-block;
                 height: 55px;
                 line-height: 55px;
                  h2{
                  font-size: 25px;
                  margin-left: 50px;
                  span{
                    font-weight: normal;
                    font-size: 15px;
                      margin-left: 10px;
                      color: gray;
                  }
                }
               }
                .username{
                  font-size: 16px;
                  line-height: 55px;
                }
      }

    }
   }
</style>
