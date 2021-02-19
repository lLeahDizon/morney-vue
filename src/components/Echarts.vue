<template>
  <div ref="container"/>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {Component, Prop, Watch} from 'vue-property-decorator';
  import {init} from 'echarts';

  @Component
  export default class Echarts extends Vue {
    @Prop() readonly option;
    @Prop({type: Boolean, default: false}) readonly loading!: boolean;
    chart: any;

    @Watch('option')
    onOptionChange() {
      this.chart.setOption(this.option);
    }

    @Watch('loading')
    onLoadingChange() {}

    mounted() {
      const width = document.documentElement.clientWidth;
      const container = this.$refs.container as HTMLDivElement;
      container.style.width = `${width - 20}px`;
      container.style.height = `${(width - 20) * 0.6}px`;
      this.chart = init(container, 'default');
      this.chart.setOption(this.option);
    }
  }
</script>

<style lang="scss" scoped>

</style>
