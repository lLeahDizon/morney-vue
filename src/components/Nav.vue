<template>
  <div class="nav">
    <router-link to="/money">
      <svg>
        <use xlink:href="#label"/>
      </svg>
      记账
    </router-link>
    |
    <router-link to="/labels">标签</router-link>
    |
    <router-link to="/statistics">统计</router-link>
  </div>
</template>

<script lang="ts">
import x from '@/assets/icons/label.svg';
import y from '@/assets/icons/money.svg';

console.log(x);
console.log(y);

export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped> /*scoped只会影响当前template的样式*/
.nav {
  border: 1px solid red;
}
</style>
