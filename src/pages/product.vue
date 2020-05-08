<template>
  <div>
    <product-param :title="productInfo.name">
      <template slot="buy">
        <!-- <a href="j"></a> -->
        <a href="JavaScript:;" class="btn" @click="toBuy">立即购买</a>
      </template>
    </product-param>
    <div class="content">
      <!-- 背景图片一 -->
      <div class="bg">
        <h2>{{productInfo.name}}</h2>
        <h3>{{productInfo.subtitle}}</h3>
        <p>
          <a href="JavaScript:;">全球首款双频 GP</a>
          <span>|</span>
          <a href="JavaScript:;">晓龙845</a>
          <span>|</span>
          <a href="JavaScript:;">AI变焦双摄</a>
          <span>|</span>
          <a href="JavaScript:;">红外人脸识别</a>
        </p>
        <div class="price">
          <span>{{productInfo.price|price}}</span>
        </div>
      </div>
      <!-- 背景图片2 -->
      <div class="bg1"></div>
      <!-- 背景图片2 -->
      <div class="bg3"></div>
      <!-- 轮播 -->
      <div class="bg-swiper">
        <div v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide" :key="banner.id" v-for="banner in slidelist">
              <img :src="banner.img" />
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
      <!-- 视频 -->
      <div class="video">
        <h2>
          60帧超慢动作摄影
          <br />慢慢回味每一瞬间的精彩
        </h2>
        <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！</p>
        <p>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
        <!-- <div class="video-bg" @click="showSlide=true"></div> -->
        <div class="video-bg" @click="showSlide='slidedown'"></div>
        <div class="video-box" v-if="showSlide">
          <!-- <div class="overlay" v-if="showSlide"></div> -->
          <div class="overlay"></div>
          <!-- <div class="video" :class="{'slide':showSlide}"> -->
          <div class="video" :class="showSlide">
            <!-- <span class="close" @click="showSlide=false"></span> -->
            <span class="close" @click="closeVideo"></span>
            <!-- 单独设置autoplay不可以自动播放  配合muted静音播放才可 -->
            <video src="/imgs/product/video.mp4" controls autoplay muted></video>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import ProductParam from "../components/ProductParam";
export default {
  data() {
    // name:"product";
    return {
      // showSlide:false,//过度实现动画
      showSlide: "", //animation
      productInfo: {}, //产品信息集合
      swiperOption: {
        autoplay: true,
        loop: true,
        slidesPerView: 3, //设置slider容器能够同时显示的slides数量(carousel模式)。
        spaceBetween: 30, //图片之间距离
        freeMode: true, //默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动可能不止一格且不会贴合。
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
        // ...
      },
      slidelist: [
        //图片轮播数组
        {
          id: "2",
          img: "/imgs/product/gallery-2.png"
        },
        {
          id: "3",
          img: "/imgs/product/gallery-3.png"
        },
        {
          id: "4",
          img: "/imgs/product/gallery-4.png"
        },
        {
          id: "5",
          img: "/imgs/product/gallery-5.jpg"
        },
        {
          id: "6",
          img: "/imgs/product/gallery-6.jpg"
        }
      ]
    };
  },
  components: {
    ProductParam
  },
  directives: {
    swiper: directive
  },
  mounted() {
    this.getProductInfo();
  },
  methods: {
    getProductInfo() {
      //获取产品信息
      let id = this.$route.params.id; //获取id
      // console.log(id);
      this.axios.get(`/products/${id}`).then(res => {
        this.productInfo = res;
        // console.log(res);
      });
    },
    toBuy() {
      //跳转商品详情页
      let id = this.$route.params.id;
      this.$router.push(`/detail/${id}`);
    },
    closeVideo() {
      //动画完清除元素
      this.showSlide = "slideup";
      setTimeout(() => {
        this.showSlide = "";
      }, 6000);
    }
  },
  filters: {
    price(val) {
      if (!val) return;
      return "￥" + val;
    }
  }
};
</script>
<style lang="scss" >
@import "../assets/scss/mixin.scss";
.content {
  .bg {
    background: url(/imgs/product/product-bg-1.png) no-repeat 50%;
    height: 718px;
    text-align: center;
    h2 {
      padding-top: 55px;
      font-size: 80px;
    }
    h3 {
      font-size: 22px;
      letter-spacing: 5px;
    }
    p {
      margin-top: 25px;
      a {
        color: #111;
        font-size: 15px;
      }
      span {
        margin: 0 10px;
      }
    }
    .price {
      margin-top: 25px;
      span {
        font-size: 30px;
      }
    }
  }
  .bg1 {
    background: url(/imgs/product/product-bg-2.png) no-repeat 50%;
    height: 480px;
    background-size: 86%;
  }
  .bg-swiper {
    margin: 36px auto 52px;
    .swiper-wrapper {
      .swiper-slide {
        width: 480px !important;
        img {
          height: 280px;
        }
      }
    }
  }
  .video {
    height: 900px;
    background-color: #111;
    margin-bottom: 76px;
    color: #fff;
    text-align: center;
    h2 {
      font-size: 60px;
      text-shadow: 2px 2px 5px #eee;
      padding-top: 40px;
      box-sizing: border-box;
    }
    p {
      font-size: 25px;
      margin-top: 20px;
    }
    .video-bg {
      @include bgImg(1226px, 540px, "/imgs/product/gallery-1.png", cover);
      margin: 20px auto;
    }
    .video-box {
      .overlay {
        @include position(fixed);
        background-color: rgba($color: #000000, $alpha: 0.5);
      }
      @keyframes slideDown {
        from {
          top: -50%;
          opacity: 0;
        }
        to {
          top: 50%;
          opacity: 1;
        }
      }
      @keyframes slideUp {
        from {
          top: 50%;
          opacity: 1;
        }
        to {
          top: -50%;
          opacity: 0;
        }
      }
      .video {
        /*  position: fixed;
            top: 50%;
            left: 50%; */
        @include position(fixed, -50%, 50%);
        transform: translate(-50%, -50%);
        z-index: 5;
        width: 1000px;
        height: 536px;
        /*   transition: top .5s;//过度实现动画
            opacity: 0;
            &.slide{//不加&没效果  这个时候就可以使用&父选择器标识符，它的作用就相当于一个父选择器的占位符。
                top: 50%;
                opacity: 1;
              } */
        &.slidedown {
          animation: slideDown 0.6s linear forwards; //动画完停留原地
          // top: 50%;
        }
        &.slideup {
          animation: slideUp 0.6s linear;
        }
        video {
          position: relative;
          width: 100%;
          height: 100%;
          object-fit: cover; //object-fit CSS 属性指定可替换元素的内容应该如何适应到其使用的高度和宽度确定的框。
        }
        .close {
          // position: absolute;
          display: inline-block;
          @include iconposi(
            absolute,
            20px,
            20px,
            20px,
            20px,
            "/imgs/icon-close.png"
          );
          z-index: 6;
          cursor: pointer;
          border-radius: 20px;
          background-color: red;
        }
      }
    }
  }
}
</style>
