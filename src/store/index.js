import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // state 存放状态 mutations state成员操作 getters 加工state成员给外界 actions 异步操作 modules 模块化状态管理
  state: {//状态
      username:"",//登录用户名
      cartCount:1,//购物车数量
  },
  mutations: {
    saveUserName(state,username){//mutations是操作state数据的方法的集合，比如对该数据的修改、增加、删除等等。
      // 而在组件中，我们需要这样去调用这个mutation——例如在App.vue的某个method中:this.$store.commit('edit')
        state.username=username
    },
    getCart(state,count){
        state.cartCount=count;
    }
  },
  actions: {//由于直接在mutation方法中进行异步操作，将会引起数据失效。所以提供了Actions来专门进行异步操作，最终提交mutation方法。
    saveUserName(context,username){//保存用户名
        context.commit("saveUserName",username)//提交mutations
    },
    getCart(context,count){
      context.commit("getCart",count)
    }
  },
  modules: {
  }
})
