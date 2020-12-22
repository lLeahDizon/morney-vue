<template>
  <label class="notes">
    <span class="name">备注</span>
    <input
      type="text"
      v-model="notes"
      @input="$emit('update:value', notes)"
      placeholder="在这里添加备注"
    >
  </label>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop} from 'vue-property-decorator';

  @Component
  export default class Notes extends Vue {
    @Prop() readonly value!: string;
    notes = this.value;
  }
</script>

<style lang="scss" scoped>
  .notes {
    font-size: 14px;
    background: #f5f5f5;
    padding-left: 16px;
    display: flex;
    align-items: center;

    .name {
      padding-right: 16px;
    }

    input {
      height: 64px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
</style>
