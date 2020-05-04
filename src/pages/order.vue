<template>
  <div>
    order
    <Order-header></Order-header>
      <router-view></router-view>
    <nav-footer>  </nav-footer>
  </div>
</template>
<script>
import OrderHeader from "../components/OrderHeader"
import NavFooter from '../components/NavFotter'
export default {
    components: {
      OrderHeader,
      NavFooter
    }
}
</script>
