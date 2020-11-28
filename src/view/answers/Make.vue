
<template>
  <div id="app">
    <el-row>
    <el-col :span="12">
      <a href="javascript:;" class="file">选择问题文件
        <input type="file" value="导入问题" id="questions_importer" onchange="return importQuestions()" onclick="return importQuestions()" />
      </a>
    </el-col>
    <el-col :span="12">
      <el-button type="primary" @click="exportAnswers">导出答案</el-button>
      <el-button @click="saveDraft">暂存答案</el-button>
      <el-button @click="readDraft">读取暂存答案</el-button>
      <!-- <input type="button" value="暂存答案" id="draft" onclick="saveDraft()">
      <input type="button" value="读取暂存答案" id="draft" onclick="readDraft()"> -->
      <!-- <el-button @click="score">查看得分</el-button> -->
        <a href="javascript:;" class="file">选择答案文件
        <input type="file" value="导入答案" id="uploadAnswers" onclick="return fileUpload_onclick()" onchange="return fileUpload_onselect()" />
        </a>
      <div id='questions'>
      </div>
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
      <!-- 引入 echarts.js -->
      <div id="main" style="width: 600px;height:400px;"></div>
    </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
import {
  getUrlParam
} from '@questions/core'
// 基于准备好的dom，初始化echarts实例
var echarts = require('echarts');
import {
    getQuestions, 
    setQuestions
} from '@questions/utils/questions'
import { getQuestionsFromUrl } from '@questions/utils/questions';
import {
  initialize
} from '@questions/utils/initialize'
export default {
  name: 'App',
  data() {
    return {
    }
  },
  methods: {
    async importQuestions() {
      console.log('importQuestions')
      // let questionsInUrl = getUrlParam('questions')
      let questionsInUrl = await getQuestionsFromUrl()
      if (questionsInUrl) {
        console.log('questions in url')
        console.log(questionsInUrl)
        await setQuestions({
          questions: questionsInUrl
        })
      } else {
      }
    },
    saveDraft () {
      return window.saveDraft()
    },
    readDraft () {
      return window.readDraft()
    },
    exportAnswers () {
      return window.exportAnswers()
    },
    // 获取总分
    async getSum () {
      let questions = await getQuestions()
      console.log(questions)
      window.questions = questions
      let score = _.sum(_.map(questions, (item) => {
          return item.score 
      }))
      // alert(score)
      return score
    },
    // 获取分数
    async score () {
      let score = await window.score();
      this.showScore({
        score
      });
    },
    // 显示分数
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
  async mounted () {
    await this.importQuestions()
    initialize()
  }
}
</script>

