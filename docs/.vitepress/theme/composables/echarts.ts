import * as core from 'echarts/core';
import * as renderers from 'echarts/renderers';
import * as charts from 'echarts/charts';
import VChart from 'vue-echarts';
import * as components from 'echarts/components';

const { use } = core;
const { CanvasRenderer } = renderers;
const { PieChart } = charts;
const { TitleComponent, TooltipComponent, LegendComponent } = components;

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

import { defineComponent, h } from 'vue';

export default defineComponent({
  name: '集成Echarts 可视化图表库',
  render() {
    return h(VChart, {
      style: {
        height: '100vh',
      },
      option: {
        title: {
          text: 'vitepress 集成 Echarts 可视化图表库',
          left: 'center',
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: [
            'Direct',
            'Email',
            'Ad Networks',
            'Video Ads',
            'Search Engines',
          ],
        },
        series: [
          {
            name: 'Traffic Sources',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
              { value: 335, name: 'Direct' },
              { value: 310, name: 'Email' },
              { value: 234, name: 'Ad Networks' },
              { value: 135, name: 'Video Ads' },
              { value: 1548, name: 'Search Engines' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      },
    });
  },
});
