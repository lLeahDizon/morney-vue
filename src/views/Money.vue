<template>
  <Layout class-prefix="layout">
    {{ record }}
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <div class="notes">
      <FormItem
        field-name="备注"
        placeholder="在这里输入备注"
        :value.sync="record.notes"
      />
    </div>
    <Tags :data-source.sync="tags" :value.sync="record.tags"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Watch} from 'vue-property-decorator';
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import FormItem from '@/components/Money/FormItem.vue';
  import Tags from '@/components/Money/Tags.vue';
  import recordListModel from '@/models/recordListModel';
  import tagListModel from '@/models/tagListModel';

  const recordList = recordListModel.fetch();
  tagListModel.fetch();

  @Component({
    components: {Tags, FormItem, Types, NumberPad},
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

  .notes {
    padding: 12px 0;
  }
</style>
