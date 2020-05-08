<template>
  <div>
    <div class="index">
      <div class="container">
        <!-- 轮播 -->
        <div class="swiper-wrapper">
          <!-- 轮播区导航 -->
          <div class="menu">
            <ul>
              <li class="menuli">
                <a href="javascript:;">手机 电话卡</a>
                <div class="children">
                  <!-- 双重循环取出第一组数据，再循环第一组数据子数据 -->
                  <ul v-for="(item, index) in menuList" :key="index">
                    <li v-for="(item1, index) in item" :key="index">
                      <a :href="item1?'/#/product/'+item1.id:''">
                        <img :src="item1?item1.img:'/imgs/item-box-1.png'" alt />
                        {{item1?item1.name:"小米10"}}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="menuli">
                <a href="javascript:;">电视 盒子</a>
              </li>
              <li class="menuli">
                <a href="javascript:;">笔记本 平板</a>
              </li>
              <li class="menuli">
                <a href="javascript:;">家电 插线板</a>
              </li>
              <li class="menuli">
                <a href="javascript:;">出行 穿戴</a>
              </li>
              <li class="menuli">
                <a href="javascript:;">智能 路由器</a>
              </li>
              <li class="menuli">
                <a href="javascript:;">电源 配件</a>
              </li>
              <li class="menuli">
                <a href="javascript:;">生活 箱包</a>
              </li>
            </ul>
          </div>
          <div v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
              <div class="swiper-slide" :key="banner.id" v-for="banner in slideList">
                <a :href="'/#/product/'+banner.id">
                <img v-lazy="banner.img" />
                </a>
              </div>
            </div>
            <div class="swiper-button-prev"></div>
            <!--左箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <div class="swiper-button-next"></div>
            <!--右箭头。如果放置在swiper-container外面，需要自定义样式。-->
            <div class="swiper-pagination"></div>
          </div>
        </div>
        <!-- 导航 -->
        <div class="swiper-nav">
          <ul>
            <li v-for="(item) in adList" :key="item.id">
              <a :href="'/#/product/'+item.id">
                <img v-lazy="item.img" alt />
              </a>
            </li>
          </ul>
        </div>
        <!-- banner图 -->
        <div class="swiper-banner">
          <a :href="'/#/product/30'">
            <img v-lazy="'/imgs/banner-1.png'" alt />
          </a>
        </div>
      </div>
      <!-- 手机展示区 -->
      <div class="swiper-phone">
        <div class="container">
          <h2>手机</h2>
          <div class="wraper">
            <div class="wraper-left">
              <a :href="'/#/product/35'">
                <img v-lazy="'/imgs/mix-alpha.jpg'" alt />
              </a>
            </div>
            <div class="wraper-right">
              <ul v-for="(item, index) in phoneList" :key="index">
                <li v-for="(item1, index) in item" :key="index">
                  <span class="newgood">新品</span>
                  <div class="img">
                    <img v-lazy="item1.mainImage" alt />
                  </div>
                  <h3>{{item1.name}}</h3>
                  <p>{{item1.subtitle}}</p>
                  <a href="javascript:;">
                    <span class="price" @click="addCart(item1.id)">{{item1.price|money}}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <model
      title="提示"
      sureText="查看购物车"
      btnType="1"
      modelType="middle"
      :showModel="showModel"
      @submit="goToCart()"
      @cacel="showModel=false"
    >
      <template v-slot:body>
        <p>商品添加成功</p>
      </template>
    </model>
  </div>
</template>
<script>
import ServiceBar from "../components/ServiceBar"; //预约维修组件
import Model from "../components/Model"; //模态框组件
import { directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "carrousel",
  data() {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        effect: "cube", //立方体效果
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        navigation: {
          //左右按钮
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          hideOnClick: true
        },
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
          clickable: true //点击分页器播放
        }
      },
      slideList: [
        //图片轮播数组
        {
          id: "42",
          img: "/imgs/slider/slide-1.jpg" //注意不可以加../../
        },
        {
          id: "45",
          img: "/imgs/slider/slide-2.jpg"
        },
        {
          id: "46",
          img: "/imgs/slider/slide-3.jpg"
        },
        {
          id: "1",
          img: "/imgs/slider/slide-4.jpg"
        },
        {
          id: "2",
          img: "/imgs/slider/slide-5.jpg"
        }
      ],
      menuList: [
        //手机二维数组
        [
          {
            id: 30,
            name: "小米9 CC",
            img: "/imgs/item-box-1.png"
          },
          {
            id: 31,
            name: "小米8青春版",
            img: "/imgs/item-box-2.png"
          },
          {
            id: 32,
            name: "RedMi K20 Pro",
            img: "/imgs/item-box-3.jpg"
          },
          {
            id: 33,
            name: "移动5G专区",
            img: "/imgs/item-box-4.jpg"
          }
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      adList: [
        //广告图
        {
          id: 33,
          img: "/imgs/ads/ads-1.png"
        },
        {
          id: 48,
          img: "/imgs/ads/ads-2.jpg"
        },
        {
          id: 45,
          img: "/imgs/ads/ads-3.png"
        },
        {
          id: 47,
          img: "/imgs/ads/ads-4.jpg"
        }
      ],
      phoneList: [[], []],
      showModel: false //模态框默认隐藏
    };
  },
  components: {
    ServiceBar,
    Model
  },
  directives: {
    swiper: directive
  },
  mounted() {
    this.getPhoneList();
  },
  filters: {
    money(val) {
      if (!val) return 0;
      return "￥" + val;
    }
  },
  methods: {
    getPhoneList() {
      //获取手机列表
      /*   const {data:res} =   await this.axios.get("/products",{params:{
                categoryId:100012,
                pageSize:8
              }}) */
      // if(status!==0){console.log("失败")}
      this.axios
        .get("/products", {
          params: {
            categoryId: 100012,
            pageSize: 14
          }
        })
        .then(res => {
          // console.log(res.list);
          res.list = res.list.slice(6, 14); //不和上面重复
          this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)]; //截取二维数组
        });
    },
    addCart(id) {
      //添加购物车
      // return;
      this.axios
        .post("/carts", {
          productId: id,
          selected: true
        })
        .then(() => {
      this.showModel = true;
      this.$store.dispatch('getCart', cartTotalQuantity)
        })
        .catch(() => {
          this.showModel=true
        });
    },
    goToCart() {
      //跳转购物车
      this.$router.push("/cart");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
.container {
  .swiper-wrapper {
    //轮播
    height: 451px;
    .menu {
      //轮播区导航
      width: 265px;
      height: 451px;
      padding: 26px 0;
      background-color: #8080806b;
      position: absolute;
      z-index: 2;
      box-sizing: border-box;
      // position: relative;
      ul {
        .menuli {
          height: 50px;
          line-height: 50px;
          // position: relative;
          a {
            padding-left: 30px;
            color: #fff;
            font-size: 16px;
            display: block;
            position: relative;
            &:after {
              content: "";
              @include bgImg(10px, 15px, "../../public/imgs/icon-arrow.png");
              position: absolute;
              right: 30px;
              top: 17px;
            }
          }
          &:hover {
            background-color: #f60;
            transition: all 0.2s;
            .children {
              //手机信息显示
              display: block;
            }
          }
          .children {
            width: 961px;
            height: 451px;
            position: absolute;
            top: 0;
            left: 265px;
            background-color: #fff;
            border: 1px solid #e5e5ee;
            display: none;
            ul {
              display: flex;
              justify-content: space-between;
              li {
                flex: 1;
                height: 75px;
                line-height: 75px;
                padding-left: 23px;
                a {
                  color: #111;
                  img {
                    width: 42px;
                    height: 35px;
                    vertical-align: middle;
                    margin-right: 15px;
                  }
                }
              }
            }
          }
        }
      }
    }
    .swiper-container {
      width: 100%;
    }
    .swiper-slide {
      img {
        width: 100%;
        height: 451px;
      }
    }
    .swiper-button-prev {
      position: absolute;
      left: 270px;
    }
  }
  //广告位
  .swiper-nav {
    ul {
      display: flex;
      justify-content: space-between;
      li {
        // flex: 1;
        margin: 10px 0 30px 0;
        a {
          img {
            width: 297px;
            height: 167px;
          }
        }
      }
    }
  }
  .swiper-banner {
    //banner图
    width: 1226px;
    height: 130px;
    margin-bottom: 50px;
    img {
      width: 1226px;
    }
  }
}
.swiper-phone {
  //手机  单独灰色需要单独写
  background-color: #f5f5f5;
  padding: 30px 0 50px;
  .container {
    h2 {
      height: 21px;
      line-height: 21px;
      font-size: 21px;
      margin-bottom: 20px;
    }
    .wraper {
      display: flex;
      .wraper-left {
        margin-right: 16px;
        img {
          width: 224px;
          height: 619px;
        }
      }
      .wraper-right {
        ul {
          width: 986px;
          /*  display: flex;
              justify-content: space-between;
              align-items: center; */
          @include flex();
          li {
            // flex: 1;
            width: 236px;
            height: 302px;
            background-color: #fff;
            text-align: center;
            margin-bottom: 14px;
            // margin-left: 10px;
            position: relative;
            .newgood {
              // position: absolute;
              // left: 50%;
              // transform: translateX(-50%);
              display: block;
              width: 66px;
              height: 25px;
              line-height: 25px;
              background-color: #7ecf68;
              margin-left: auto;
              margin-right: auto;
            }
            .img {
              width: 100%;
              height: 195px;
              img {
                width: 100%;
                height: 181px;
              }
            }
            p {
              color: #999;
              margin: 6px 0 15px;
            }
            .price {
              margin-top: 20px;
              color: #f20a0a;
              font-weight: 700;
              font-size: 16px;
              &::after {
                content: "";
                @include bgImg(22px, 20px, "/imgs/icon-cart-hover.png");
                vertical-align: middle;
              }
            }
          }
        }
      }
    }
  }
}
</style>

