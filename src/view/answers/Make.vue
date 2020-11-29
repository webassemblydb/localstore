
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
      <el-button @click="generateOnlineAnswerSheetLink">生成答案链接</el-button>
      <el-button @click="saveDraft">暂存答案</el-button>
      <el-button @click="readDraft">读取暂存答案</el-button>
      <a href="javascript:;" class="file">从文件中读取暂存答案
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
/**
 * @description 回答页面
 */
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
import { generateAnswerSheetLinkUrl } from '@questions/utils/answers';
import {
  initialize
} from '@questions/utils/initialize'
import {
  copyToClip
} from '@questions/core'
import {
  i18n
} from './i18n'
export default {
  name: 'MakeAnswer',
  data() {
    return {
    }
  },
  methods: {
    // 生成答案链接
    async generateOnlineAnswerSheetLink() {
      // 生成答案链接
      let questions = await getQuestions()
      let url = await generateAnswerSheetLinkUrl({
        questions,
        pathname:location.pathname,
        origin: location.origin 
      })
      // 拷贝到剪贴板
      copyToClip({
        content: url,
        message: '拷贝成功'
      })
    },
    // 从文件中读取问题列表
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
    // 暂存答案到indexedDB
    saveDraft () {
      return window.saveDraft()
    },
    // 从indexedDB读取数据
    readDraft () {
      return window.readDraft()
    },
    // 导出答案
    exportAnswers () {
      return window.exportAnswers()
    },
    // 获取总分
    async getSum () {
      let questions = await getQuestions()
      console.log(questions)
      let score = _.sum(_.map(questions, (item) => {
          return item.score 
      }))
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
    // 从URL链接中自动获取问题列表并显示
    await this.importQuestions()
    initialize()
  }
}
</script>

