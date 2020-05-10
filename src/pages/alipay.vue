<template>
  <div>
      <div class="form" v-html="content"></div>
  <loading v-if="loading"></loading>
  </div>
</template>
<script>
import Loading from '../pages/loading';
export default {
        data() {
          return {
            orderId:this.$route.query.orderId,
            content:"",
            loading:true,
          }
        },
        mounted() {
          this.subPay()
        },
        methods: {
          subPay(){
            this.axios.post("/pay",{
              orderId:this.orderId,
              orderName:"Vue高仿小米商城--陈小政" ,//扫码支付时订单名称
              amount:0.1, //单位元
              payType:1,//1支付宝，2微信
            }).then((res)=>{
              this.content=res.content;
             setTimeout(()=>{
                document.forms[0].submit();//提交表单
             },111)
            })
          }
        },
        components: {
          Loading
        }
}
</script>
