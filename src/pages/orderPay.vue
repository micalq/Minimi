<template >
  <div>
      <order-header title="订单支付">
      <template v-slot:tip>
        <span>谨防诈骗确认交易金额</span>
      </template>
    </order-header>
    <div class="pay">
      <div class="container">
        <div class="info">
          <div class="icon"></div>
          <h2>订单提交成功！去付款咯～</h2>
          <div class="qq">
            <p>
              请在
              <span>30分</span>内完成支付, 超时后将取消订单
            </p>
            <p>收货信息:{{orderList}}</p>
          </div>
          <div class="total">
            <p>
              应付总额:
              <span>{{price}}元</span>
            </p>
            <p @click="order">订单详情</p>
          </div>
          <!-- 订单详情下拉框 -->
          <el-dialog
            title="订单详情"
            :visible.sync="dialogVisible"
            width="50%"
            v-for="(item) in orderlist1"
            :key="item.productId"
          >
            <p>
              订单号：
              <span>{{item.orderNo}}</span>
            </p>
            <p>
              收货信息：
              <span>{{orderList}}</span>
            </p>
            <p>
              商品名称：
              <img :src="item.productImage" alt />
              <span>{{item.productName}}</span>
            </p>
            <p>
              发票信息：
              <span>电子发票 个人</span>
            </p>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="method">
          <h3>选择以下支付方式付款</h3>
          <hr />
          <p>支付平台</p>
          <div class="qq">
            <div class="p pay-ali" :class="{'checked':paytype==1}" @click="paySubmit(1)"></div>
            <div class="p pay-wechat" :class="{'checked':paytype==2}" @click="paySubmit(2)"></div>
          </div>
        </div>
      </div>
    </div>
    <scan-pay-code v-if="showpay" @close="closemodel" :img="payImg"></scan-pay-code>
    <model
      title="支付确认信息"
      btnType="3"
      :showModel="payModel"
      sureText="查看订单"
      cancelText="未支付"
      @cacel="payModel=false"
      @submit="haspay"
    >
      <template slot="body">
        <p>你确认是否完成了支付</p>
      </template>
    </model>
  </div>
</template>
<script>
import QRCode from "qrcode";
import ScanPayCode from "../components/ScanPayCode";
import Model from "../components/Model";
import OrderHeader from './../components/OrderHeader'
export default {
  data() {
    return {
      dialogVisible: false,
      orderNo: this.$route.query.orderNo,
      orderList: [], //获取收货地址
      orderlist1: [], //获取商品信息
      paytype: "", //支付方式
      showpay: false, //微信支付弹框
      payImg: "", //微信之付二维码
      payModel: false, //支付确认弹框
      price: 0 //应付总金额
    };
  },
  methods: {
    order() {
      this.dialogVisible = true;
    },
    getOrderList() {
      //获取订单数据
      this.axios.get(`/orders/${this.orderNo}`).then(res => {
        const item = res.shippingVo;
        this.orderList = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince}
                ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress} ${item.receiverZip}`;
        this.orderlist1 = res.orderItemVoList;
        this.price = res.payment;
      });
    },
    paySubmit(paytype) {
      if (paytype == 1) {
        //支付宝支付
        window.open("/#/order/alipay?orderId=" + this.orderNo, "_blank"); //跳转新窗口
      } else {
        //微信支付
        this.axios
          .post("/pay", {
            orderId: this.orderNo,
            orderName: "Vue高仿小米商城--陈小政", //扫码支付时订单名称
            amount: 0.1, //单位元
            payType: 2 //1支付宝，2微信
          })
          .then(res => {
            // QRCode.toDataURL('我喜欢春天的花，夏天的风，秋天的黄昏，冬日的太阳，还有每天的你。--陈小政!')
            QRCode.toDataURL(res.content)
              .then(url => {
                this.showpay = true;
                this.payImg = url;
                this.loopOrderState();
              })
              .catch(() => {
                this.$mesasage.warning("微信二维码生产失败了");
              });
          });
      }
    },
    loopOrderState() {
      //轮询最新订单状态
      this.T = setInterval(() => {
        this.axios.get(`/orders/${this.orderNo}`).then(res => {
          if (res.status == 20) {
            //已完成支付
            clearInterval(this.T);
            this.haspay();
          }
        });
      }, 1000);
    },
    closemodel() {
      //关闭微信弹框
      this.showpay = false;
      this.payModel = true;
      clearInterval(this.T);
    },
    haspay() {
      //微信支付确认
      this.showpay = false;
      this.$router.push("/order/list");
    }
  },
  mounted() {
    this.getOrderList();
  },
  components: {
    ScanPayCode,
    Model,
    OrderHeader
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
.pay {
  background-color: #f5f5f5;
  padding-top: 30px;
  padding-bottom: 40px;
  .info {
    background-color: #fff;
    padding: 62px 50px;
    .icon {
      @include bgImg(90px, 90px, "/imgs/icon-gou.png");
      background-color: #80c58a;
      border-radius: 90px;
      background-size: 60px;
      vertical-align: top;
    }
    h2 {
      display: inline-block;
      margin-left: 20px;
    }
    .qq {
      margin: -30px 0 0 100px;
      p {
        font-size: 15px;
        span {
          color: #f60;
        }
      }
    }
    .total {
      margin-left: 700px;
      margin-top: -70px;
      font-size: 15px;
      p {
        margin-top: 10px;
        span {
          font-size: 20px;
          color: #f60;
        }
        &:last-child {
          cursor: pointer;
        }
        &:last-child::after {
          content: "";
          width: 16px;
          height: 16px;
          border-left: 1px solid gray;
          border-bottom: 1px solid gray;
          position: absolute;
          transform: rotate(-45deg);
          margin: 0 10px;
          cursor: pointer;
        }
      }
    }
  }
  .method {
    // height: 300px;
    background-color: #fff;
    margin-top: 30px;
    padding: 0 30px 30px;
    h3 {
      padding-top: 20px;
      font-size: 20px;
    }
    hr {
      margin-top: 20px;
    }
    p {
      font-size: 21px;
      margin-top: 30px;
    }
    .qq {
      .p {
        width: 200px;
        height: 60px;
        border: 1px solid #d7d7d7;
        cursor: pointer;
        margin-top: 20px;
        display: inline-block;
        &.checked {
          border-color: #f60;
        }
      }
      .pay-ali {
        @include bgImg(200px, 80px, "/imgs/pay/icon-ali.png");
        background-size: 103px 38px;
      }
      .pay-wechat {
        @include bgImg(200px, 80px, "/imgs/pay/icon-wechat.png");
        margin-left: 20px;
        background-size: 103px 38px;
      }
    }
  }
  .el-dialog p {
    margin-top: 16px;
    img {
      width: 30px;
      vertical-align: middle;
    }
  }
}
</style>
