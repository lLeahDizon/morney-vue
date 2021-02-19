<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type"/>
    <echarts v-if="groupList.length > 0" :option="option"/>
    <ol v-if="groupList.length > 0">
      <li v-for="(group, index) in groupList" :key="index">
        <h3 class="title">{{ beautify(group.title) }} <span>￥{{ group.total }}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.id"
              class="record"
          >
            <span>{{ tagString(item.tags) }}</span>
            <span class="notes">{{ item.notes }}</span>
            <span>￥{{ item.amount }}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">
      目前没有相关记录
    </div>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';
  import Tabs from '@/components/Tabs.vue';
  import recordTypeList from '@/constants/recordTypeList';
  import dayjs from 'dayjs';
  import clone from '@/lib/clone';
  import Echarts from '@/components/Echarts.vue';

  @Component({
    components: {Echarts, Tabs}
  })
  export default class Statistics extends Vue {
    tagString(tags: Tag[]) {
      return tags.length === 0 ? '无' :
        tags.map(t => t.name).join('，');
    }

    beautify(string: string) {
      const day = dayjs(string);
      const now = dayjs();
      if (day.isSame(now, 'day')) {
        return '今天';
      } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
        return '昨天';
      } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
        return '前天';
      } else if (day.isSame(now, 'year')) {
        return day.format('M月D日');
      } else {
        return day.format('YYYY年M月D日');
      }
    }

    get recordList() {
      return (this.$store.state as RootState).recordList;
    }

    get groupList() {
      const {recordList} = this;
      type Result = { title: string, total?: number, items: RecordItem[] }[]
      const newList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
      if (newList.length === 0) { return [] as Result; }
      const result: Result = [{title: dayjs(newList[0].createdAt).format('YYYY-MM-DD'), items: [newList[0]]}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
          last.items.push(current);
        } else {
          result.push({title: dayjs(current.createdAt).format('YYYY-MM-DD'), items: [current]});
        }
      }
      result.map(group => {
        group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
      });
      return result;
    }

    get option() {
      const {recordList} = this;
      type Result = { name: string, value: number }[]
      const newList = clone(recordList)
        .filter(r => r.type === this.type);
      if (newList.length === 0) { return [] as Result; }
      const result: Result = [{name: newList[0].tags[0].name, value: newList[0].amount}];
      for (let i = 1; i < newList.length; i++) {
        const current = newList[i];
        const last = result[result.length - 1];
        if (last.name === current.tags[0].name) {
          last.value += current.amount;
        } else {
          result.push({name: current.tags[0].name, value: current.amount});
        }
      }
      const total: number = result.reduce((sum, item) => sum + item.value, 0);
      return {
        width: '60%',
        legend: {
          orient: 'vertical',
          align: 'left',
          top: '22%',
          left: 'right',
          data: result,
          formatter: result.length > 0 ? (name) => {
            const value = result.filter(item => item.name === name)[0].value;
            return name + ' ' + (value / total * 100).toFixed(1) + ' %';
          } : '{name}',
        },
        series: [
          {
            name: '账单统计',
            type: 'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
            },
            data: result
          }
        ]
      };
    }

    beforeCreate() {
      this.$store.commit('fetchRecords');
    }

    type = '-';
    recordTypeList = recordTypeList;
  }
</script>

<style lang="scss" scoped>
  .noResult {
    padding: 16px;
    text-align: center;
  }

  ::v-deep {
    .type-tabs-item {
      background: #c4c4c4;

      &.selected {
        background: white;

        &::after {
          display: none;
        }
      }
    }

    .interval-tabs-item {
      height: 48px;
    }
  }

  %item {
    padding: 8px 16px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
    align-content: center;
  }

  .title {
    @extend %item;
  }

  .record {
    @extend %item;
    background: white;
  }

  .notes {
    margin-right: auto;
    margin-left: 16px;
    color: #999;
  }
</style>
