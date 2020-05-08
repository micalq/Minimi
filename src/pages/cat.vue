<template>
  <div>
    <order-header title="我的购物车">
      <template slot="tip">
        <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
      </template>
    </order-header>
    <div class="wraper">
      <div class="container">
        <table>
          <tr>
            <!-- <th><input type="checkbox" name="" id="">全选</th> -->
            <th>
              <span class="checkbox" :class="{'checked':selectedAll}" @click="isChecked"></span>全选
            </th>
            <th>商品名称</th>
            <th>单价</th>
            <th>数量</th>
            <th>小计</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item) in cartList" :key="item.id">
            <!-- <td><input type="checkbox" v-bind:class="{'checked':item.productSelected}"></td> -->
            <td>
              <span
                class="checkbox"
                v-bind:class="{'checked':item.productSelected}"
                @click="update(item)"
              ></span>
            </td>
            <td class="two">
              <img v-lazy="item.productMainImage" alt />
              <!-- <p>Redmi K20 Pro 尊享版 , 骁龙855 Plus， 弹出全面屏</p> -->
              <p>{{item.productName+":"+item.productSubtitle}}</p>
            </td>
            <td>{{item.productPrice}}</td>
            <td>
              <span @click="update(item,'-')">-</span>
              <span>{{item.quantity}}</span>
              <span @click="update(item,'+')">+</span>
            </td>
            <td>{{item.productTotalPrice}}</td>
            <td>
              <div class="error" v-on:click="del(item)"></div>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="ad">
      <div class="container clearfix">
        <div class="on fl">
          <a href="/#/index">继续购物</a>
          共
          <span class="checked">{{cartList.length}}</span>件商品，已选择
          <span>{{checkNum}}</span>件
        </div>
        <div class="total fr">
          合计:
          <span>{{cartTotalPrice}}</span>元
          <a href="javascript:;" class="btn" @click="order">去结算</a>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>
<script>
import OrderHeader from "../components/OrderHeader";
import NavFooter from "../components/NavFotter";
import ServiceBar from "../components/ServiceBar";
export default {
  data() {
    return {
      cartList: [], //购物车集合
      selectedAll: false, //是否全选
      cartTotalPrice: 0, //商品总金额
      checkNum: 0 //全选数
    };
  },
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar
  },
  mounted() {
    this.getCartList();
  },
  methods: {
    getCartList() {
      //获取购物车列表
      this.axios.get("/carts").then(res => {
        // console.log(res);
        this.renderData(res);
      });
    },
    isChecked() {
      //是否全选
      const url = this.selectedAll ? "/carts/unSelectAll" : "/carts/selectAll";
      this.axios.put(url).then(res => {
        this.renderData(res);
      });
    },
    renderData(res) {
      //渲染购物车数据
      this.cartList = res.cartProductVoList || [];
      this.selectedAll = res.selectedAll;
      this.cartTotalPrice = res.cartTotalPrice;
      // this.checkNum=res.cartTotalQuantity;
      this.checkNum = this.cartList.filter(item => item.productSelected).length; //过滤
    },
    update(item, type) {
      //加减按钮以及单选框
      let quantity = item.quantity,
        selected = item.productSelected; //数量和单选框是否选中
      if (type == "+") {
        if (quantity > item.productStock) {
          //如果大于库存
          // alert("购买商品大于库存");
          this.$message.info("购买商品大于库存")
          return;
        }
        ++quantity;
      } else if (type == "-") {
        if (quantity <= 1) {
          // alert("已是一件了");
          this.$message.info("已是一件了")
          return;
        }
        --quantity;
      } else {
        selected = !item.productSelected;
      }
      this.axios
        .put(`/carts/${item.productId}`, {
          quantity,
          selected
        })
        .then(res => {
          this.renderData(res);
        });
    },
    del(item) {
      //删除购物车商品
      this.axios.delete(`/carts/${item.productId}`).then(res => {
        this.renderData(res);
      });
    },
    order() {
      //结算
      let ischecked = this.cartList.every(item => !item.productSelected); //如果一项都没选返回false
      if (ischecked) {
        // alert("请你最少选择一件商品");
        this.$message.info("请你最少选择一件商品")
      } else {
        this.$router.push("/order/confirm");
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
.wraper {
  background-color: #f5f5f5;
  padding: 30px 0 40px;
  .container {
    background-color: #fff;
    table {
      width: 1226px;
      tr {
        text-align: center;
        .two {
          width: 520px;
          font-size: 18px;
        }
        th {
          height: 70px;
          border-bottom: 1px solid;
          font-size: 20px;
          @include checked();
        }
        td {
          height: 126px;
          font-size: 20px;
          position: relative;
          border-bottom: 1px solid;
          img {
            width: 80px;
            height: 80px;
            vertical-align: middle;
            position: absolute;
            left: 0;
            top: 20px;
          }
          span {
            display: inline-block;
            width: 30px;
            height: 30px;
            line-height: 30px;
            border: 1px solid;
            cursor: pointer;
          }
          .error {
            @include bgImg(15px, 15px, "/imgs/icon-close.png");
            cursor: pointer;
          }
          @include checked();
        }
      }
    }
  }
}
.ad {
  background-color: #f5f5f5;
  padding-bottom: 100px;
  font-size: 15px;
  .on {
    a {
      margin-right: 20px;
    }
    span {
      color: #f60;
    }
  }
  .total {
    .btn {
      width: 210px;
      height: 40px;
      line-height: 40px;
      color: #fff;
      margin-left: 20px;
    }
  }
}
</style>
