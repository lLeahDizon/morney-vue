import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex); // 把 store 绑到 vue.prototype
const recordLocalStorageKeyName = 'recordList';
const tagLocalStorageKeyName = 'tagList';

const store = new Vuex.Store({
  state: { // data
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
  },
  mutations: { // methods
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem(recordLocalStorageKeyName) || '[]') as RecordItem[];
    },
    createRecord(state, record) {
      const deepClone: RecordItem = clone(record);
      deepClone.createdAt = new Date();
      state.recordList.push(deepClone);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem(recordLocalStorageKeyName, JSON.stringify(state.recordList));
    },
    createTag(state) {
      const name = window.prompt('请输入标签名');
      if (!name) {
        window.alert('标签名不能为空');
        return 'empty';
      } else {
        const names = state.tagList.map(item => item.name);
        if (names && names.indexOf(name) >= 0) {
          window.alert('标签名重复了');
          return 'duplicated';
        } else {
          const id = createId().toString();
          state.tagList.push({id, name});
          // this.saveTags();
          window.alert('添加成功');
          return 'success';
        }
      }
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem(tagLocalStorageKeyName) || '[]');
      return state.tagList;
    },
  },
});

store.commit('fetchRecords');

export default store;
