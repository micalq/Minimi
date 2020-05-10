<template>
  <div>
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请仔细核对订单列表信息</span>
      </template>
    </order-header>
    <div class="orderlist">
      <nodata v-if="!loading&&orderList.length==0"></nodata>
      <div class="container">
        <loading v-if="loading"></loading>
        <div class="orderinfo" v-for="(item) in orderList" :key="item.orderNo">
          <div class="header clearfix">
            <div class="header-left fl">
              <span>{{item.createTime}}</span>
              <span>|</span>
              <span>{{item.receiverName}}</span>
              <span>|</span>
              <span>订单号:{{item.orderNo}}</span>
              <span>|</span>
              <span>{{item.paymentTypeDesc}}</span>
            </div>
            <div class="header-right fr">
              应付金额：
              <span>{{item.payment}}</span>元
            </div>
          </div>
          <div class="info clearfix" v-for="(item1) in item.orderItemVoList" :key="item1.productId">
            <div class="info-left fl">
              <img v-lazy="item1.productImage" alt />
              <span>{{item1.productName}}</span>
              <span>{{item1.totalPrice}}*{{item1.quantity}}</span>
            </div>
            <div class="info-right fr" v-if="item.statusDesc==20">
              <a href="javascript:;">{{item.statusDesc}}</a>
            </div>
            <div class="info-right fr" v-else>
              <a href="javascript:;" @click="goPay(item.orderNo)">{{item.statusDesc}}</a>
            </div>
          </div>
        </div>
        <div class="button">
          <!-- <el-button type="primary" :loading="loading1" @click="loademore" v-if="showbutton">加载更多</el-button> -->
          <el-pagination
            background
            layout="prev, pager, next,jumper"
            :total="total"
            :page-size="pageSize"
            @current-change="handle"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import OrderHeader from "./../components/OrderHeader";
import Loading from "./loading";
import Nodata from "../components/noData";
export default {
  data() {
    return {
      orderList: [], //订单列表
      loading: true, //加载
      pageSize: 5, //每页5条数据
      pageNum: 1, //默认第一页
      total: 0, //总数
      loading1: false,
      showbutton:true,//是否显示加载更多按钮
    };
  },
  mounted() {
    this.getOrderList();
  },
  methods: {
    getOrderList() {
      //获取订单信息
      this.loading1=true;
      this.axios
        .get("/orders", {
          params: {
            pageSize: this.pageSize,
            pageNum: this.pageNum
          }
        })
        .then(res => {
          // this.orderList=[]||res.list;//如果为空则nodata
          this.orderList = this.orderList.concat(res.list); //加载更多数据
          // this.orderList=res.list;//加载更多数据
          this.loading = false;
          this.loading1 = false;
          this.total = res.total;
          this.showbutton=res.hasNextPage
          console.log(res);
        })
        .catch(() => {
          this.loading = false;
        });
    },
    goPay(orderNo) {
      //如果没支付跳转支付
      // this.$router.push("/order/pay")
      this.$router.push({
        path: "/order/pay",
        query: {
          orderNo
        }
      });
    },
    handle(newPage) {
      this.pageNum = newPage;
      this.getOrderList();
    },
    loademore() {
      //加载更多数据
      this.pageNum++;
      this.getOrderList();
    }
  },
  components: {
    OrderHeader,
    Loading,
    Nodata
  }
};
</script>
<style lang="scss" scoped>
.orderlist {
  background-color: #f5f5f5;
  padding: 33px 0 100px 0;
  .container {
    .orderinfo {
      //  padding: 0 20px;
      border: 1px solid #d7d7d7;
      margin-bottom: 31px;
      .header {
        height: 70px;
        line-height: 70px;
        background-color: #fffaf7;
        padding: 0 20px;
        font-size: 15px;
        .header-left {
          span {
            margin-left: 15px;
          }
        }
        .header-right {
          span {
            font-size: 20px;
            font-weight: bold;
          }
        }
      }
      .info {
        background-color: #fff;
        padding: 30px 20px;
        font-size: 15px;
        .info-left {
          img {
            width: 110px;
            vertical-align: middle;
            display: inline-block;
          }
          span {
            margin-left: 10px;
          }
        }
        .info-right {
          margin-top: 30px;
          a {
            color: #ff6600;
          }
        }
      }
    }
    .el-pagination {
      text-align: right;
    }
    .button {
      // text-align: center;
      // display: flex;
      // justify-content: space-between;
    }
  }
}
</style>
