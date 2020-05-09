<template >
  <div>
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
              <span>1111元</span>
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
          <div class="pay-ali"></div>
          <div class="pay-wechat"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      orderNo: this.$route.query.orderNo,
      orderList: [],//获取收货地址
      orderlist1: [],//获取商品信息
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
      });
    }
  },
  mounted() {
    this.getOrderList();
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
    .pay-ali {
      @include bgImg(300px, 80px, "/imgs/pay/icon-ali.png");
      @include al();
    }
    .pay-wechat {
      @include bgImg(200px, 80px, "/imgs/pay/icon-wechat.png");
      @include al();
      margin-left: 20px;
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
