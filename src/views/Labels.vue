<template>
  <Layout>
    <div class="tags-wrapper">
      <div class="tags">
        <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
          <span>{{ tag.name }}</span>
          <Icon name="right"/>
        </router-link>
      </div>
      <div class="createTag-wrapper">
        <Button class="createTag" @click="createTag">新建标签</Button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Button from '@/components/Button.vue';

  @Component({
    components: {Button},
    computed: {
      tags() {
        // TODO
        // store.tagList;
        return [];
      }
    }
  })
  export default class Labels extends Vue {
    createTag() {
      // TODO
      // store.createTag();
    }
  }
</script>

<style lang="scss" scoped>
  .tags-wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;

    > .tags {
      font-size: 16px;
      padding-left: 16px;
      overflow: auto;
      flex-grow: 1;
      background: white;

      > .tag {
        min-height: 44px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;

        svg {
          width: 18px;
          height: 18px;
          color: #666;
          margin-right: 16px;
        }
      }
    }

    > .createTag {
      background: #767676;
      color: white;
      border-right: 4px;
      border: none;
      height: 40px;
      padding: 0 16px;

      &-wrapper {
        text-align: center;
        padding: 16px;
        margin-top: 28-16px;
      }
    }
  }
</style>
