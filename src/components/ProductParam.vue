<template>
  <div class="productparam" :class="{'isfixd':isfixd}">
    <div class="container">
      <div class="nav-left">
        <h2>{{title}}</h2>
      </div>
      <div class="nav-right">
        <a href="javascript:;">概述</a>
        <span>|</span>
        <a href="javascript:;">参数</a>
        <span>|</span>
        <a href="javascript:;">用户评价</a>
        <span>|</span>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
   props:{
        title:String
    },
  data() {
    return {
      isfixd: false
    };
  },
  mounted() {
    window.addEventListener("scroll", this.fixed);
  },
  destroyed(){//销毁
    window.removeEventListener("scroll",this.fixed,false)
  },
  methods: {
    fixed() {
      //吸顶
      let scrollHeight =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      this.isfixd = scrollHeight > 152 ? true : false;
      // console.log(scrollHeight,this.isfixd);
    }
  }
};
</script>
<style lang="scss">
@import "../assets/scss/mixin.scss";
.productparam {
  // width: 100%;
  height: 70px;
  line-height: 70px;
  border-top: 1px solid #e5e5e5;
  background-color: #fff;
  // z-index: 5;
  &.isfixd {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    box-shadow: 0 5px 5px #eee;
  }
  .container {
    @include flex();
    .nav-left {
    }
    .nav-right {
      a {
        font-size: 15px;
        color: #111;
      }
      span {
        margin: 0 10px;
      }
      .btn {
        color: #fff;
      }
    }
  }
}
</style>
