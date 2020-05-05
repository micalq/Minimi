<template>
  <div>
        <div class="container">
            <ul>
              <li><span class="repair"></span><a href="javascript:;">预约维修服务</a></li>
              <li><span class="return"></span><a href="javascript:;">7天无理由退货</a></li>
              <li><span class="fi"></span><a href="javascript:;">15天免费换货</a></li>
              <li><span class="send"></span><a href="javascript:;">满150元包邮</a></li>

            </ul>
      </div>
  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
@import "../assets/scss/mixin.scss";
  div{
    // background-color: #666;
    // box-shadow: 3px 1px 1px #eee;
    .container{
   font-size: 16px;
      color: #666;
      padding: 33px 0;
      background-color:#f11;
      ul{
        display: flex;
        li{
          flex: 1;
          text-align: center;
          border-right: 1px solid #111;
.repair{
            @include icon(20px,20px,8px);
            // display: inline-block;
            // width: 20px;
            // height: 20px;
            background: url(/imgs/icon-setting.png) no-repeat 50%;
            background-size: contain;
            // vertical-align: middle;
            // margin-right: 8px;
          }
          .return{
            @include icon(20px,20px,8px);
            background: url(/imgs/icon-7day.png) no-repeat 50%;
            background-size: contain;
          }
          .fi{
            @include icon(20px,20px,8px);
            background: url(/imgs/icon-15day.png) no-repeat 50%;
            background-size: contain;
          }
          .send{
            @include icon(20px,20px,8px);
            background: url(/imgs/icon-post.png) no-repeat 50%;
            background-size: contain;

          }


        }
      }
}
  }

</style>
