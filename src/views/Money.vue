<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes :value.sync="record.notes"/>
    <Tags :data-source.sync="tags" :value.sync="record.tags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import recordListModel from '@/models/recordListModel';
  import tagListModel from '@/models/tagListModel';

  // const version = window.localStorage.getItem('version') || '0';
  const recordList = recordListModel.fetch();
  tagListModel.fetch();
  // if (version === '0.0.1') {
  //   // 数据库升级，数据迁移
  //   recordList.forEach(record => {
  //     record.createdAt = new Date(2020, 0, 1);
  //   });
  //   // 保存数据
  //   window.localStorage.setItem('recordList', JSON.stringify(recordList));
  // }
  // window.localStorage.setItem('version', '0.0.2');

  @Component({
    components: {Tags, Notes, Types, NumberPad},
  })
  export default class Money extends Vue {
    tags = tagListModel.data;
    recordList: RecordItem[] = recordList;
    record: RecordItem = {tags: [], notes: '', type: '-', amount: 0};

    saveRecord() {
      const deepClone: RecordItem = recordListModel.clone(this.record);
      deepClone.createdAt = new Date();
      this.recordList.push(deepClone);
      console.log(this.recordList);
    }

    @Watch('recordList')
    onRecordListChange() {
      recordListModel.save(this.recordList);
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
