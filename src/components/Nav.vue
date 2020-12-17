<template>
  <div class="nav">
    <router-link to="/money">
      记账
    </router-link>
    |
    <router-link to="/labels">标签</router-link>
    |
    <router-link to="/statistics">统计</router-link>
  </div>
</template>

<script lang="ts">

// 引入所有的 svg
const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext)
try {importAll(require.context('../assets/icons/', true, /\.svg$/))} catch (error) {console.log(error)}

export default {
  name: 'Nav'
}
</script>

<style lang="scss" scoped> /*scoped只会影响当前template的样式*/
.nav {
  border: 1px solid red;
}
</style>
