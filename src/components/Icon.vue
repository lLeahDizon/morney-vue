<template>
  <svg class="icon" @click="$emit('click', $event)">
    <use :xlink:href="'#'+name"/>
  </svg>
</template>

<script lang="ts">

  // 引入所有的 svg
  const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
  try {importAll(require.context('../assets/icons/', true, /\.svg$/));} catch (error) {console.log(error);}

  export default {
    props: ['name'],
    name: 'Icon'
  };
</script>

<style lang="scss" scoped>
  .icon {
    /*宽高一个字大小 参考 Iconfont 文档*/
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
