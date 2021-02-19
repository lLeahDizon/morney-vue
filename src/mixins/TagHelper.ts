import Vue from 'vue';
import Component from 'vue-class-component';
import {Modal} from 'ant-design-vue';

const map: { [key: string]: string } = {
  'tag name duplicated': '标签名重复了'
};

@Component
export class TagHelper extends Vue {
  createTag() {
    const name = window.prompt('请输入标签名');
    if (!name) { return Modal.warning({title: '标签名不能为空'}); }
    this.$store.commit('createTag', name);
    if (this.$store.state.createTagError) {
      Modal.warning({title: map[this.$store.state.createTagError.message] || '报错'});
    }
  }
}

export default TagHelper;
