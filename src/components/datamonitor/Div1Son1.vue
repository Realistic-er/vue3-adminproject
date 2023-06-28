<template>
  <div id="chartcontainer1">
  </div>
</template>

<script setup lang="ts">
import {
  reactive, ref, defineComponent, inject, onMounted,
} from 'vue';
import * as echarts from 'echarts';

onMounted(() => {
  const myChart = (echarts as any).init(document.getElementById('chartcontainer1'));
  myChart.setOption({
    title: {
      text: '',
    },
    tooltip: {},
    xAxis: {
    },
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
      },
    ],
    yAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    },
  });
});
</script>

<style lang="scss" scoped>
#chartcontainer1 {
  width: 100%;
  height: 100%;
}
</style>
