<template>
  <div>
    <product-param :title="productInfo.name"></product-param>
    <div class="wraper">
      <div class="container clearfix">
        <div class="swiper fl">
          <swiper ref="mySwiper" :options="swiperOptions">
            <swiper-slide v-for="(item) in slideImg" :key="item.id">
              <img :src="item.img" alt />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="content fr">
          <h2 class="title">{{productInfo.name}}</h2>
          <p class="carmea">
            相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红
            <br />外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏
          </p>
          <div class="mi">小米自营</div>
          <div class="price">
            {{productInfo.price}}
            <del>1999</del>
          </div>
          <hr />
          <div class="addr">
            <i class="icon-ad"></i>
            <div class="addre">北京 北京市 朝阳区 安定门街道</div>
            <p>有现货</p>
          </div>
          <div class="version clearfix">
            <h2>选择版本</h2>
            <div
              class="version-left fl"
              :class="{'checked':version==1}"
              @click="version=1"
            >6GB+64GB 全网通</div>
            <div
              class="version-right fr"
              :class="{'checked':version==2}"
              @click="version=2"
            >4GB+64GB 移动4G</div>
          </div>
          <div class="color">
            <h2>选择颜色</h2>
            <div class="check-color">
              <span></span>深空灰
            </div>
          </div>
          <div class="ad">
            <div class="count clearfix">
              <div class="count-left fl">红米Note 7 {{version==1?'6GB+64GB 全网通':'4GB+64GB 移动4G'}} 深灰色</div>
              <div class="count-right fr">{{productInfo.price}}</div>
            </div>
            <div class="total">总计： {{productInfo.price}}元</div>
          </div>
          <div class="btn-group">
            <a href="javascript:;" class="btn" @click="addCart">加入购物车</a>
          </div>
        </div>
      </div>
    </div>
    <div class="price-info">
      <div class="container">
        <h2>价格说明</h2>
        <div class="desc">
          <img src="/imgs/detail/item-price.jpeg" alt />
        </div>
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>
<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import ProductParam from "../components/ProductParam";
import ServiceBar from "../components/ServiceBar";
export default {
  data() {
    return {
      productInfo: {}, //获取产品信息
      version: 1, //按钮切换样式
      id: this.$route.params.id, //获取商品id
      swiperOptions: {
        autoplay: true,
        loop: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
        // Some Swiper option/callback...
      },
      slideImg: [
        //图片轮播集合
        {
          id: 1,
          img: "/imgs/detail/phone-1.jpg"
        },
        {
          id: 2,
          img: "/imgs/detail/phone-2.jpg"
        },
        {
          id: 3,
          img: "/imgs/detail/phone-3.jpg"
        },
        {
          id: 4,
          img: "/imgs/detail/phone-4.jpg"
        }
      ]
    };
  },
  components: {
    ProductParam,
    ServiceBar,
    Swiper,
    SwiperSlide
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      // const id=this.$route.params.id;
      this.axios.get(`/products/${this.id}`).then(res => {
        this.productInfo = res;
        // console.log(res);
      });
    },
    addCart() {
      this.axios
        .post(`/carts/`, {
          productId: this.id,
          selected: true
        })
        .then((res = { cartProductVoList: 0 }) => {
          this.$store.dispatch("getCart", cartTotalQuantity); //实时获取购物车数量
          // console.log(res);
          this.$router.push("/cart"); //加入成功跳转购物车
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
.wraper {
  .container {
    .swiper {
      width: 640px;
      height: 617px;
      // background-color: pink;
      .swiper-slide {
        width: 640px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .content {
      width: 585px;
      height: 870px;
      // background-color: pink;
      box-sizing: border-box;
      .title {
        font-size: 28px;
        padding: 20px 0;
      }
      .carmea {
        font-size: 15px;
      }
      .mi {
        font-size: 16px;
        color: #ff6700;
        margin: 26px 0 15px;
      }
      .price {
        font-size: 20px;
        color: #ff6700;
        del {
          color: gray;
        }
      }
      .addr {
        height: 108px;
        background-color: #fafafa;
        border: 1px solid #e5e5e5;
        padding: 31px 0 0 65px;
        font-size: 14px;
        line-height: 15px;
        box-sizing: border-box;
        position: relative;
        .icon-ad {
          @include position(absolute, 27px, 35px, 20px, 20px);
          background: url(/imgs/detail/icon-loc.png) no-repeat 50%;
          background-size: contain;
        }
        p {
          margin-top: 20px;
          color: #ff6700;
        }
      }
      .version {
        margin-top: 30px;
        .version-left,
        .version-right {
          // width: 287px;
          //     height: 50px;
          //     line-height: 50px;
          //     border: 1px solid #f60;
          //     color: #f60;
          //     text-align: center;
          //     margin: 20px 0 30px;
          //     cursor: pointer;
          // font-size: 16px;
          @include border();
          &.checked {
            border: 1px solid #f60;
            color: #f60;
          }
        }
        .version-right {
          border-color: #e5e5e5;
          color: #111;
        }
      }
      .color {
        .check-color {
          @include border();
          border: 1px solid #f60;
          color: #f60;
        }
        span {
          display: inline-block;
          width: 15px;
          height: 15px;
          background-color: gray;
          margin-right: 10px;
        }
      }
      .ad {
        height: 108px;
        background-color: #fafafa;
        padding: 0 20px;
        .count-left,
        .count-right {
          font-size: 15px;
          margin-top: 25px;
        }
        .total {
          margin-top: 15px;
          color: #f60;
          font-size: 18px;
        }
      }
      .btn {
        width: 300px;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        color: #fff;
      }
    }
  }
}
.price-info {
  background-color: #f3f3f3;
  height: 340px;
  margin-top: 20px;
  .container {
    //  box-sizing: border-box;
    h2 {
      padding: 30px 0;
    }
    .desc {
    }
  }
}
</style>
