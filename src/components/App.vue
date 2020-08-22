<template>
  <div id="app">
    <!-- <div id="nav">
      <el-button>按钮</el-button>
    </div> -->
    <input type="button" value="导入" id="import" />
    <input type="button" value="导出" id="export" onclick="exportAnswers()">
    <input type="button" value="导出questions" id="export" onclick="exportQuestions()">
    <input type="button" value="草稿" id="draft" onclick="saveDraft()">
    <input type="button" value="读草稿" id="draft" onclick="readDraft()">
    <!-- hidden import file -->
    <input type="file" value="导入范围" id="upload" style="display:none;" onclick="return fileUpload_onclick()"
        onchange="return fileUpload_onselect()" />
    <input type="file" value="导入questions" id="questions_importer" onchange="return importQuestions()" />
    <el-button @click="score">得分</el-button>
    <div id='questions'>

    </div>
    <!-- 引入 echarts.js -->
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import _ from 'lodash'
// 基于准备好的dom，初始化echarts实例
var echarts = require('echarts');
import {
    getQuestions
} from '../utils/questions'
export default {
  name: 'App',
  methods: {
    async getSum () {
      let questions = await getQuestions()
      console.log(questions)
      window.questions = questions
      let score = _.sum(_.map(questions, (item) => {
          return item.score 
      }))
      alert(score)
      return score
    },
    async score () {
      let score = await window.score();
      this.showScore({
        score
      });
    },
    async showScore ({
      score
    }) {
      let sum = await this.getSum();
      var myChart = echarts.init(document.getElementById('main'));
      console.log(score)
      console.log(sum)
      myChart.setOption({
          title: {
              text: '分'
          },
          tooltip: {},
          xAxis: {
              data: ['得分', '扣分']
          },
          yAxis: {},
          series: [{
              name: '分',
              type: 'bar',
              data: [score, sum - score]
          }]
      });
    }
  },
  mounted () {
  }
}
</script>

