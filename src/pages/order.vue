<template>
  <div>
   <!--  <order-header :title="title">
        <template slot="tip">
            <span>{{subtitle}}</span>
        </template>
    </order-header> -->
      <router-view></router-view>
      <service-bar></service-bar>
    <nav-footer>  </nav-footer>
  </div>
</template>
<script>
import OrderHeader from "../components/OrderHeader"
import ServiceBar from '../components/ServiceBar'
import NavFooter from '../components/NavFotter'
export default {
  data() {
    return {
      title:"",
      subtitle:"",
    }
  },
    components: {
      // OrderHeader,
      NavFooter,
      ServiceBar
    },
    mounted() {//只渲染一次不可以在这里判断
      /* const path=this.$route.path;
    if (path=="/order/confirm") {
          this.title="订单确认"
          this.subtitle="请确认订单信息无误"
    } else if(path=="/order/list"){
           this.title="订单列表"
          this.subtitle="请仔细核对订单列表信息"
    }else if(path=="/order/pay") {
         this.title="订单支付"
          this.subtitle="谨防诈骗确认交易金额"
    }
    else{
       this.title="订单支付"
          this.subtitle="谨防诈骗确认交易金额"
    } */
    },
}
</script>
