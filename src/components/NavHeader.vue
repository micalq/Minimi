<template>
  <div>
    <!-- 头部 -->
    <div class="header">
        <!-- 首页标题栏 -->
        <div class="nav-bar">
          <div class="container">
          <div class="nav-left">
            <a href="javascript:;">小米商城</a>
            <a href="javascript:;">MUI</a>
            <a href="javascript:;">云服务</a>
            <a href="javascript:;">企业团购</a>
            <a href="javascript:;">资质证照</a>
            <a href="javascript:;">下载app</a>
            <a href="javascript:;">SelectLocation</a>
            <a href="javascript:;">协议规则</a>
            <a href="javascript:;">协议规则</a>
          </div>
          <div class="nav-right">
            <a href="javascript:;" v-if="username">{{username}}</a>
            <a href="javascript:;" v-if="!username" @click="login">登录</a>
            <a href="javascript:;" v-if="username">我的订单</a>
            <a href="javascript:;" class="mycart" @click="goCart">
              <span class="icon"></span>购物车
            </a>
          </div>
    </div>
        </div>
  <!-- 首页下拉区 -->
            <div class="nav-menu">
                <div class="logo"> <a href="/#/index" title="小米"></a></div>
                <div class="menu">
                  <div class="item-menu"><span>小米手机</span>
                  <div class="children">
                    <ul>
                      <li class="nav-img" v-for="(item) in phoneList" :key="item.id">
                        <a :href="'/#/product/'+item.id" target="_blank">
                          <div class="pro-img">
                            <img v-lazy="item.mainImage" :alt="item.subtitle">
                          </div>
                          <div class="pro-name">{{item.name}}</div>
                          <div class="pro-price">{{item.price|money}}</div>
                        </a>
                      </li>
                    </ul>
                  </div>
                  </div>
                  <div class="item-menu"><span>RedMi红米</span>
                  <div class="children">
                     <ul>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img v-lazy="'https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1584946022.16048616.jpg'" alt="">
                          </div>
                          <div class="pro-name">Redmi K30 Pro</div>
                          <div class="pro-price">3399元</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1584945309.54424595.jpg" alt="">
                          </div>
                          <div class="pro-name">Redmi K30 Pro 变焦版</div>
                          <div class="pro-price">4499元</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/cff2977b8aab1e43b94b2f00083f4ae1.jpg?thumb=1&w=200&h=138&f=webp&q=90" alt="">
                          </div>
                          <div class="pro-name">Redmi K30</div>
                          <div class="pro-price">1599元</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1575882053.33827103.jpg" alt="">
                          </div>
                          <div class="pro-name">Redmi K30 5G</div>
                          <div class="pro-price">2199元</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="//cdn.cnbj1.fds.api.mi-img.com/mi-mall/d295c4fb500d163a7045dc715b47f808.jpg?thumb=1&w=250&h=250&f=webp&q=90" alt="">
                          </div>
                          <div class="pro-name">Redmi K30 Pro</div>
                          <div class="pro-price">3399元</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-shopapi-pms/pms_1584946022.16048616.jpg" alt="">
                          </div>
                          <div class="pro-name">Redmi8</div>
                          <div class="pro-price">699元起</div>
                        </a>
                      </li>
                     </ul>
                  </div>
                  </div>
                  <div class="item-menu"><span>米家电视</span>
                  <div class="children">
                     <ul>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="../../public/imgs/nav-img/nav-3-1.jpg" alt="">
                          </div>
                          <div class="pro-name">小米壁画电视 65英寸</div>
                          <div class="pro-price">6999元</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="../../public/imgs/nav-img/nav-3-2.jpg" alt="">
                          </div>
                          <div class="pro-name">小米全面屏电视 55英寸</div>
                          <div class="pro-price">1799元</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="../../public/imgs/nav-img/nav-3-3.png" alt="">
                          </div>
                          <div class="pro-name">小米电视4A 32英寸</div>
                          <div class="pro-price">699元</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="../../public/imgs/nav-img/nav-3-4.jpg" alt="">
                          </div>
                          <div class="pro-name">小米电视4A 55英寸</div>
                          <div class="pro-price">1799元</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="../../public/imgs/nav-img/nav-3-5.jpg" alt="">
                          </div>
                          <div class="pro-name">小米壁画电视 65英寸</div>
                          <div class="pro-price">6999元</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="../../public/imgs/nav-img/nav-3-6.png" alt="">
                          </div>
                          <div class="pro-name">小米壁画电视 65英寸</div>
                          <div class="pro-price">6999元</div>
                        </a>
                      </li>
                     </ul>
                  </div>
                  </div>
                  <div class="item-menu"><span>笔记本</span>
                  <div class="children">
                     <ul>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6abc701fb3cf48f2c7a3fd5ef053529a.jpg?thumb=1&w=200&h=138&f=webp&q=90" alt="">
                          </div>
                          <div class="pro-name">RedmiBook 13</div>
                          <div class="pro-price">4199元起</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/d712f71b3c4a3b562601c2b956a660ad.png?thumb=1&w=200&h=138" alt="">
                          </div>
                          <div class="pro-name">小米笔记本Pro15</div>
                          <div class="pro-price">6799元起</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/bb159dbe860ee434b52d8eed9e9fd424.png?thumb=1&w=200&h=138" alt="">
                          </div>
                          <div class="pro-name">小米笔记本15.6</div>
                          <div class="pro-price">3899元起</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6abc701fb3cf48f2c7a3fd5ef053529a.jpg?thumb=1&w=200&h=138&f=webp&q=90" alt="">
                          </div>
                          <div class="pro-name">RedmiBook 14</div>
                          <div class="pro-price">3999元起</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/33c6a31aaee90164ce963801bec48e64.png?thumb=1&w=200&h=138&f=webp&q=90" alt="">
                          </div>
                          <div class="pro-name">小米游戏本</div>
                          <div class="pro-price">6999元起</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/95c4329ce2c454e2a5fa1e0931528a46.png?thumb=1&w=200&h=138" alt="">
                          </div>
                          <div class="pro-name">小米笔记本Air 12.5"</div>
                          <div class="pro-price">3299元起</div>
                        </a>
                      </li>
                     </ul>
                  </div>
                  </div>
                  <div class="item-menu"><span>家电</span>
                  <div class="children">
                     <ul>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/03dc85cd792904ddc8027b2d781beed8.png?thumb=1&w=200&h=138&f=webp&q=90" alt="">
                          </div>
                          <div class="pro-name">米家互联网空调C1</div>
                          <div class="pro-price">1999元</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/e06b219c5bced9256467b17738a943c6.png?thumb=1&w=200&h=138" alt="">
                          </div>
                          <div class="pro-name">米家互联网空调</div>
                          <div class="pro-price">1999元</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/c5d772b7c2a159c3ed7d4e31bd293f18.jpg?thumb=1&w=200&h=138" alt="">
                          </div>
                          <div class="pro-name">Redmi全自动波轮洗衣机1A 8kg</div>
                          <div class="pro-price">749元起</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/11b8bca444aba2994fe852993eac9203.png?thumb=1&w=200&h=138" alt="">
                          </div>
                          <div class="pro-name">米家互联网洗烘一体机</div>
                          <div class="pro-price">1999元起</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b7a4e3ff7919ca2407ad970b78abd09a.jpg?thumb=1&w=200&h=138&f=webp&q=90" alt="">
                          </div>
                          <div class="pro-name">米家风冷对开门冰箱 483L</div>
                          <div class="pro-price">2099元起</div>
                        </a>
                      </li>
                      <li class="nav-img">
                        <a href="" target="_blank">
                          <div class="pro-img">
                            <img src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/40ad6e8398095e97309a5538b516a2de.jpg?thumb=1&w=200&h=138&f=webp&q=90" alt="">
                          </div>
                          <div class="pro-name">米家两门冰箱</div>
                          <div class="pro-price">3299元起</div>
                        </a>
                      </li>
                     </ul>
                  </div>
                  </div>
                </div>
                <div class="search">
                  <div class="wraper">
                    <input type="text" placeholder="小米10" >
                    <a href=""></a>
                  </div>
                </div>
              </div>
      </div>
  </div>
</template>

<script>
export default {
  name: "nav-header",
  data() {
    return {
      username:"",
      phoneList:[]//手机列表
    }
  },
  filters:{//局部过滤器
    money(val){
       if(!val) return 0;
       return "￥"+val.toFixed(2)+"元"
    }
  },
   mounted() {
      this.getPhoneList()
    },
  methods: {
   getPhoneList(){//获取手机信息
    // var instance = this.axios.create({ headers: {'content-type': 'application/x-www-form-urlencoded'} });
       /*  this.axios.get("/products",{params:{
           categoryId:"100012"
        }}) */
    // console.log(1);
      this.axios.get("/products",{params:{
        categoryId:"100012",
        pageSize:6,
      }}).then((res)=>{
       /*  if (res.list.length>6) {
            this.phoneList=res.list.slice(0,6)//截取6条数据
        } */
        this.phoneList=res.list;
      // console.log(res.list);
      })
    },
    login(){//登录
    this.$router.push("/login")
    },
    goCart(){
      this.$router.push("/cart")
    }
  },
};
</script>
<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
@import "../assets/scss/config.scss";
.header {
    .nav-bar {  //头部导航区
      background-color: #333;
      .container{
          height: 39px;
      width: 1226px;
      margin-left: auto;
      margin-right: auto;
      line-height: 39px;
    @include flex();//调用flex
      }
      a {
        text-decoration: none;
        color: #b0b0b0;
        margin-right: 17px;
      }
      .mycart {
        display: inline-block;
        width: 110px;
        text-align: center;
        background-color: #f60;
        color: #fff;
        .icon {
          @include bgImg(16px,12px,"../../public/imgs/icon-cart-checked.png");
          margin-right: 4px;
        }
      }
    }
    .nav-menu{//首页下拉菜单
      width: 1226px;
      height: 112px;
      margin-left: auto;
      margin-right: auto;
      text-align: center;
      // background-color: #f1a;
   @include flex();//调用flex
      position: relative;
      .logo{//图标
        display: inline-block;
        width: 55px;
        background-color: #f60;
          a{
            display:inline-block;
            width: 110px;
            &:before{
              content: "";
              @include bgImg(55px ,55px,"../../public/imgs/mi-logo.png",55px);
             /*   width:55px;
            height: 55px;
              display:inline-block ;
              background: url("../../public/imgs/mi-logo.png") no-repeat 50%;
              background-size: 55px; */
              transition: margin .2s;
            }
            &:after{
              @include bgImg(55px ,55px,"../../public/imgs/mi-home.png",55px);
                content: "";
            }
            &:hover::before{
              margin-left: -110px;
              transition: margin .2s;
            }
          }
      }
      .menu{//文字菜单区
        display: inline-block;
        // height: 112px;
        width: 600px;
        // padding-left: 209px;
        // background-color: pink;
        .item-menu{
          display: inline-block;
          line-height: 112px;
          margin-right: 20px;
          color: #111;
          font-size: 16px;
          span{
          font-weight: bold;
            cursor: pointer;
          }
          &:hover{
            color:$colorA;
            .children{
                opacity: 1;
                height: 220px;
            }
          }
          .children{
              position: absolute;
               top: 112px;//留出顶部距离
              left: 0;
              width: 1226px;
              border-top: 1px solid #e5e5e5;
              box-shadow: 0 7px 6px 0 rgba(0,0,0,.11);
              font-size: 12px;
              line-height: 12px;
              background-color: #fff;
              z-index: 2;
              height: 0px;//不加高度阴影重叠
              // opacity: 0;//默认隐藏下拉菜单
            opacity: 0;
                transition: all .5s;
                overflow: hidden;//溢出隐藏图片
              ul{
                display: flex;
                .nav-img{
              //     display: inline-block;
                // float: left;
                // width: 16.6%;
               flex: 1;
                 text-align: center;
                 a{
                   .pro-img{
                //  display: inline-block;
                // height: 140px;
                   display: inline-block;
                   margin-top: 20px;
                   img{
                   width: auto;//自己自适应
                 height: 111px;
                    border-right: 1px solid #eee;
                    img:last-child{
                      border: none;
                    }
                 }
                 }
                .pro-name{
                  font-weight: bold;
                  margin: 19px 0 8px 0;
                  color: $colorB;
                }
                .pro-price{
                  color: $colorA;
                  margin-bottom: 20px;
                }
               }
                }
              }
          }
        }
      }
      .search{//搜索框
      width: 319px;
      .wraper{
        height: 50px;
        display: flex;
        align-items: center;
            border: 1px solid #e0e0e0;
        input{ //输入框
          width: 265px;
          height: 50px;
          border: none;
          padding-left: 15px;
          border-right:  1px solid #e0e0e0;;
          box-sizing: border-box;//不包含padding
        }
        input:focus{ //错误
        border-color: orange;
        }
        a{//图标
        @include bgImg(18px,18px,"../../public/imgs/icon-search.png",contain);
        margin-left: 17px;
        }
      }
      }
    }
  }
</style>
