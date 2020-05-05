<template>
  <div>
      <div class="footer">
        <div class="footer-logo">
          <img src="../../public/imgs/logo-footer.png" alt="">
        <p>小米商城</p>
        </div>
        <div class="link">
          <a href="javascript:;"> MIUI</a><span>|</span>
          <a href="javascript:;">米家</a><span>|</span>
          <a href="javascript:;">米聊</a><span>|</span>
          <a href="javascript:;">政企服务</a><span>|</span>
          <a href="javascript:;">小米天猫店</a><span>|</span>
          <a href="javascript:;">小米集团隐私政策</a><span>|</span>
          <a href="javascript:;"> 小米商城隐私政策</a>
          <p>Copyright ©2019 <span>mi.futurefe.com</span> All Rights Reserved.</p>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'nav-footer'
}
</script>
<style lang="scss" scoped>
@import "../assets/scss/config.scss";
.footer{
  height: 235px;
  background-color: $colorB;
  border-top: 5px solid #f60;
  font-size: $fontI;
  color: $colorD;
  text-align: center;
    .footer-logo{
      margin-top: 46px;
      margin-bottom: 31px;
      img{
        width: 53px;
        height: 36px;
        margin-bottom: 18px;
      }
    }
    .link{
      // display: block;
          position: relative;
a{
          color: gray ;
          margin: 0 6px;
        }
        p{
          margin-top: 10px;
          span{
            color: #f60;
          }
        }
      }
}
</style>
