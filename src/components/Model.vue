<template>
  <transition name="slide">
    <div class="model" v-if="showModel">
      <div class="mask"></div>
      <div class="model-dialog">
        <div class="model-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="icon-close" @click="$emit('cacel')"></a>
        </div>
        <div class="model-body">
          <slot name="body"></slot>
        </div>
        <div class="model-footer">
          <!-- emit向父组件传递方法 -->
          <a
            href="javascript:;"
            class="btn"
            v-if="btnType=='1'"
            @click="$emit('submit')"
          >{{sureText}}</a>
          <a
            href="javascript:;"
            class="btn"
            v-if="btnType=='2'"
            @click="$emit('cacel')"
          >{{cancelText}}</a>
          <div class="btn-group" v-if="btnType=='3'">
            <!-- $emit相当于jq中的trigger事件，只不过是用子组件来触发父组件的方法。所以里面的this是父组件。 -->
            <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn btn-default" @click="$emit('cacel')">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: {
    //自定义模态框类型
    modelType: {
      // 弹框类型：小small、中middle、大large、表单form
      type: String,
      default: "form"
    },
    title: String,
    btnType: String, // 按钮类型: 1:确定按钮 2：取消按钮 3：确定取消
    sureText: {
      //确认文本框
      type: String,
      default: "确认"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    showModel: Boolean
  }
};
</script>
<style lang="scss">
@import "../assets/scss/mixin.scss";
@import "../assets/scss/model.scss";
</style>
