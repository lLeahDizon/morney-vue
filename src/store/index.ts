import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex); // 把 store 绑到 vue.prototype
const recordLocalStorageKeyName = 'recordList';
const tagLocalStorageKeyName = 'tagList';

type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag,
}

const store = new Vuex.Store({
  state: { // data
    recordList: [],
    tagList: [],
    currentTag: undefined,
  } as RootState,
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
      } else {
        const id = createId().toString();
        state.tagList.push({id, name});
        store.commit('saveTags');
        window.alert('添加成功');
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
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTags');
        router.back();
      } else {
        window.alert('删除失败');
      }
    },
    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList && idList.indexOf(id) >= 0) {
        const tag = state.tagList.filter(item => item.id === id)[0];
        if (tag) {
          if (tag.name === name) {
            window.alert('标签名重复了');
          } else {
            tag.name = name;
            store.commit('saveTags');
          }
        }
      }
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(t => t.id === id)[0];
    },
  },
});

store.commit('fetchRecords');

export default store;
