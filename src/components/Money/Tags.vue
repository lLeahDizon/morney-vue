<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <ul class="current">
      <li
        v-for="tag in tagList"
        :key="tag.id"
        @click="toggle(tag.id)"
        :class="{selected:selectedTags.indexOf(tag.id)>=0}"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import store from '@/store/index2';

  @Component
  export default class Tags extends Vue {
    selectedTags: string[] = [];
    tagList = store.fetchTags();

    toggle(id: string) {
      const index = this.selectedTags.indexOf(id);
      if (index >= 0) {
        this.selectedTags.splice(index, 1);
      } else {
        this.selectedTags.push(id);
      }
      this.$emit('update:value', this.selectedTags);
    }

    createTag() {
      store.createTag();
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    background: white;
    flex-grow: 1;
    font-size: 14px;
    padding: 16px;
    display: flex;
    flex-direction: column-reverse;

    > .current {
      display: flex;
      flex-wrap: wrap;

      > li {
        $bg: #d9d9d9;
        background: #d9d9d9;
        $h: 24px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;

        &.selected {
          background: darken($bg, 50%);
          color: white;
        }
      }
    }

    > .new {
      padding-top: 16px;

      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }
</style>
