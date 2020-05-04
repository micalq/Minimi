<template>
  <div id="app">

    <router-view/>
  </div>
</template>
<script>
import storage from "./storage/index"//导入storage
export default {
      mounted() {
        // storage.setItem("a",1)
        // storage.setItem("q",{qq:11},"user")
        // storage.clear("a")
        // storage.clear("q","user")
      },
}
</script>
<style>

</style>
