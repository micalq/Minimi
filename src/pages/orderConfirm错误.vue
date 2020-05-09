<template >
  <div>
    <div class="confirm">
        <div class="container">
              <div class="orderbox">
               <div class="adress clearfix" >
                  <h2>收货地址</h2>
                  <div class="origin-adress fl" v-for="(item) in addressList" :key="item.id">
                    <p>数量:<span>个</span></p>
                    <div class="phone">手机号:<span>{{item.receiverMobile}}</span></div>
                    <div class="street">地址：<span>{{item.receiverProvince+","+item.receiverCity+","+item.receiverDistrict
                      +","+item.receiverAddress}}</span></div>
                    <div class="action clearfix">
                      <a href="javascript:;" class="fl" @click="del(item)"><i class="el-icon-delete"></i></a>
                      <a href="javascript:;" class="fr"><i class="el-icon-edit"></i></a>
                    </div>
                  </div>
                  <div class="new-adress fl">
                        <div class="ad">
                           <a href="javascript:;" @click="addAdress"><i class="el-icon-circle-plus-outline"></i></a>
                    <p>添加新地址</p>
                        </div>
                  </div>
               </div>
               <!-- 添加地址对话框 -->
               <el-dialog  title="添加地址" width="50%"  :visible.sync="dialogVisible" @close="reset">
                 <!-- 表单 -->
                 <el-form :model="checkItem" :rules="addrules" ref="addFormref" label-width="100px" class="demo-ruleForm">
  <el-form-item label="姓名:" prop="receiverName">
    <el-input v-model="checkItem.receiverName"></el-input>
  </el-form-item>
  <el-form-item label="手机号:" prop="receiverMobile">
    <el-input v-model="checkItem.receiverMobile"></el-input>
  </el-form-item>
          <!-- 级联下拉框 -->
<el-form-item label="省市区：" prop="adress">
  <el-cascader
    v-model="addruleForm.adress"
    :options="cityData"
    :props="{ expandTrigger: 'hover' }"></el-cascader>
</el-form-item>
<el-form-item label="详细地址:" prop="receiverAddress">
    <el-input v-model="checkItem.receiverAddress"></el-input>
  </el-form-item>
<el-form-item label="邮编:" prop="receiverZip">
    <el-input v-model="checkItem.receiverZip"></el-input>
  </el-form-item>
                 </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click=sureValidate>确 定</el-button>
  </span>
</el-dialog>
                    <div class="product">
                      <h2>商品</h2>
                      <hr>
                      <div class="product-info "  v-for="(item) in cartList" :key="item.id">
                      <div class="a-left">
                          <img v-lazy="item.productMainImage" alt="" class="fl">
                        <span class="">{{item.productName+":"+item.productSubtitle}}</span>
                      </div>
                        <span class="price">{{item.productPrice}}元*{{item.quantity}}</span>
                        <div class="total ">{{item.productTotalPrice}}元</div>
                      </div>
                    </div>
                    <div class="deliver">
                      <h2>配送方式</h2>
                      <p>包邮 </p>
                    </div>
                    <div class="invoice">
                      <h2>发票</h2>
                      <p>电子发票  个人</p>
                    </div>
                    <div class="detail clearfix">
                      <div class="da fr">
                         <div class="num">商品件数：<span>{{count}}件</span></div>
                      <div class="total">商品总价：<span>1212</span></div>
                      <div class="num">优惠活动：<span>五折</span></div>
                      <div class="deliver-price">运费：<span>11</span></div>
                      <div class="price">应付总额<span>{{totalPrice+11}}</span></div>
                      </div>
                    </div>
                       <div class="clearfix">
                      <a href="javascript:;" class="fr"> <el-button type="primary">去结算</el-button></a>
                      <a href="/#/cart" class="fr"> <el-button type="success" >返回购物车</el-button></a>
                    </div>
              </div>
        </div>
    </div>
    <model title="删除确认" btnType="1" :showModel="delmodel" @cacel="delmodel=false" >
      <template slot="body">
          <p>你确定删除吗？</p>
      </template>
    </model>
  </div>
</template>
<script>
import  cityData from '../assets/citydata';
import Model from '../components/Model'
export default {
        data() {
          //自定义验证规则
          const checkMobiel=(rule,value,cb)=>{
            let mobileReg=/^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
            if (mobileReg.test(value)) {
              return cb()//通过
            }
            cb(new Error("请输入正确手机号"))
          };
          const checkZip=(rule,value,cb)=>{
            let zipReg=/[1-9]\d{5}(?!\d)/;
            if (zipReg.test(value)) {
              return cb()
            }
            cb(new Error("请输入正确邮编"))
          }
          return {
            addressList:[],//收货地址
            cartList:[],//购物车货物
            totalPrice:0,//商品总金额
            count:0,//商品总件数
            dialogVisible:false,//添加地址对话框
            cityData,//省市区地址
            delmodel:false,//删除弹框
            addruleForm:{//添加地址信息
                  receiverName:"",//姓名
                  receiverMobile:"",//手机号
                  receiverZip:"",//邮编
                 adress:{
                    receiverProvince:[],//省市区地址
                    receiverCity:[],
                    receiverDistrict:[],
                 },
                receiverAddress:'',//详细地址
            },
            checkItem:{},
            userAction:"",//0新增1编辑2删除
            addrules:{//验证
                  receiverName:[//姓名
                    {required:"true",meaasge:"请输入姓名",trigger:"blur"},
                    {min:2,max:5,trigger:"blur"}
                  ],
                  receiverMobile:[//手机号
                    {validator:checkMobiel,trigger:"blur"},
                  ],
                receiverZip:[//邮编
                    {validator:checkZip,trigger:"blur"},
                ],
                addressCity:[//地址
                  // {required:true,meaasge:"请选择地址",trigger:"blur"}
                ],
                addressDetail:[//详细地址
                  {required:"true",meaasge:"请输入详细地址",trigger:"blur"}
                ]
            }
          }
        },
        components:{
          Model
        },
        mounted() {
          this.getAdress()
          this.getCart()
        },
        methods: {
          getAdress(){//获取购物地址
            this.axios.get("/shippings").then((res)=>{
              this.addressList=res.list;
              // console.log(res);

            })
          },
          getCart(){//获取购物车列表
          this.axios.get("/carts").then((res)=>{
            // console.log(res);
          const list=res.cartProductVoList;
              this.totalPrice=res.cartTotalPrice;
              this.cartList=list.filter(item=>item.productSelected)//过滤已选中商品
              this.cartList.map(item=>{
                this.count+=item.quantity
              })
          })
          },
          addAdress(){//添加地址
          this.dialogVisible=true;
          },
          reset(){//重置
          this.$refs.addFormref.resetFields()
          },
          sureValidate(){//确定预校验
              this.$refs.addFormref.validate(valid=>{
                if(!valid){//不通过
                  return this.$message.warning("验证不通过")
                }
                //通过

              })
          },

          del(item){//删除
          this.checkItem=item;
          this.userAction=2;
          this.delmodel=true;
          },
          closeModel(){//关闭下拉框
            this.checkItem={},
            this.userAction="",
            this.delmodel=false;
          }
        }
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
  .confirm{
    background-color: #f5f5f5;
    padding: 30px 0 85px;
    .container{
      position: relative;
      .orderbox{
          background-color: #fff;
          padding: 0 0 40px 40px;
          .adress{
            padding-top: 20px;
            .origin-adress{
              @include adress();
              padding: 10px;
              box-sizing: border-box;
              margin-top: 10px;
              p{
                margin-top: 10px;
              }
              .phone,.street{
                margin-top: 10px;
              }
              .action{
                height: 50px;
                line-height: 50px;
                margin-top: 50px;
              }
            }
              .new-adress{
              @include adress();
                  margin: 10px;
              box-sizing: border-box;
              text-align: center;
                @include flex(center)
              }

          }
          .product{
            margin-top: 20px;
            .product-info{
              height: 60px;
              line-height: 60px;
              border-bottom:1px solid ;
              font-size: 15px;
              display: flex;
              img{
                width: 30px;
                height: 30px;
               margin-top: 10px;
              }
              .a-left{
                flex: 5;
              }
              .price{
                flex: 2;
              }
              .total{
                margin-right: 40px;
                color: #f60;
              }
            }
          }
          .deliver{
                         @include deliver()
          }
          .invoice{
              @include deliver()
          }
          .detail{
            border-bottom: 1px solid #eee;
              .da{
                margin-right: 20px;
                font-size: 15px;
                div{
                  margin-top: 10px;
                  &:last-child{
                    margin-bottom: 10px;
                  }
                }
            span{
              margin-left: 15px;
              color: #f60;
            }
              }
          }
          .el-button{
            margin: 20px;
          }
      }
    }
    .el-cascader{
      width: 100%;
    }

  }
</style>
