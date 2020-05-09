import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/home.vue'
import Index from '../pages/index.vue'
import Product from '../pages/product.vue'
import Detail from '../pages/detail.vue'
import Cart from '../pages/cat.vue'
import Order from '../pages/order.vue'
import OrderConfirm from '../pages/orderConfirm.vue'
import OrderList from '../pages/orderList.vue'
import OrderPay from '../pages/orderPay.vue'
import Alipay from '../pages/alipay.vue'
import Login from '../pages/login.vue'
Vue.use(VueRouter)
const routes = [
      { path: '/', component: Home ,redirect: "/index",children:[
        { path: '/index', component: Index ,name:"index"},
        { path: '/product/:id', component: Product },
        { path: '/detail/:id', component: Detail },
      ]},
      { path: '/cart', component: Cart },
      { path: '/login', component: Login },
      { path: '/order', component: Order,children:[
        {path:'Confirm',component:OrderConfirm},
        { path: 'list', component: OrderList },
        { path: 'Pay', component: OrderPay },
        { path: 'alipay', component: Alipay }
      ] }
]
const router = new VueRouter({
  routes
})
export default router
