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
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem(tagLocalStorageKeyName) || '[]');
    },
    createTag(state, name: string) {
      const names = state.tagList.map(item => item.name);
      if (names && names.indexOf(name) >= 0) {
        window.alert('标签名重复了');
        return 'duplicated';
      } else {
        const id = createId().toString();
        state.tagList.push({id, name});
        store.commit('saveTags');
        window.alert('添加成功');
        return 'success';
      }
    },
    saveTags(state) {
      window.localStorage.setItem(tagLocalStorageKeyName, JSON.stringify(state.tagList));
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit('saveTags');
      return true;
    },
    updateTag(state, id: string, name: string) {
      const idList = state.tagList.map(item => item.id);
      if (idList && idList.indexOf(id) >= 0) {
        const tag = state.tagList.filter(item => item.id === id)[0];
        if (tag) {
          if (tag.name === name) {
            return 'duplicated';
          } else {
            tag.name = name;
            store.commit('saveTags');
            return 'success';
          }
        }
      }
      return 'not found';
    }
  },
});

store.commit('fetchRecords');

export default store;
