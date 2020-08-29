<template>
  <div id="app">
    <!-- <div id="nav">
      <el-button>按钮</el-button>
    </div> -->
    <!-- <router-view></router-view> -->
    <!-- <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="stem">
        <el-input v-model="question.stem"></el-input>
      </el-form-item>
      <el-form-item label="question">
        <el-input v-model="question.question"></el-input>
      </el-form-item>
      <el-form-item label="option one">
        <el-input v-model="question.input.options[0].label"></el-input>
        <el-input v-model="question.input.options[0].value"></el-input>
      </el-form-item>
      <el-form-item label="option two">
        <el-input v-model="question.input.options[1].label"></el-input>
        <el-input v-model="question.input.options[1].value"></el-input>
      </el-form-item>
      <el-form-item label="option three">
        <el-input v-model="question.input.options[2].label"></el-input>
        <el-input v-model="question.input.options[2].value"></el-input>
      </el-form-item>
      <el-form-item label="option four">
        <el-input v-model="question.input.options[3].label"></el-input>
        <el-input v-model="question.input.options[3].value"></el-input>
      </el-form-item>
  </el-form> -->
    <el-button @click="generateQuestions">生成试卷</el-button>
    <el-button @click="makeAnswers">回答问题</el-button>
    <el-button @click="addItem">新增问题</el-button>
    <el-button @click="score">得分</el-button>
    <input type="button" value="存草稿" id="draft" onclick="saveDraft()">
    <input type="button" value="读草稿" id="draft" onclick="readDraft()">
    <input type="button" value="导出试卷" id="export" onclick="exportQuestions()">
    <input type="button" value="导出答案" id="export" onclick="exportAnswers()">
    <!-- hidden import file -->
    <div>
      <label for="uploadAnswers">选择答案文件:</label>
      <input type="file" value="导入答案" id="uploadAnswers" onclick="return fileUpload_onclick()"
          onchange="return fileUpload_onselect()" />
    </div>
    <div>
      <label for="questions_importer">选择问题文件:</label>
      <input type="file" value="导入问题" id="questions_importer" onchange="return importQuestions()" onclick="return importQuestions()" />
    </div>

    <div id='questions'>

    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
    <!-- 引入 echarts.js -->
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
import _ from 'lodash'
// 基于准备好的dom，初始化echarts实例
var echarts = require('echarts');
import {
    getQuestions, setQuestions
} from '../utils/questions'
export default {
  name: 'App',
  data() {
    return {
    //   questions: [],
    //   question: {
    //     type: "SingleChoice",
    //     stem: ["Some animals are very big; some are small"],
    //     question: ["what is  the biggest animal"],
    //     input: {
    //         options: [
    //             {
    //                 value: 'A',
    //                 label: '黄金糕'
    //             },
    //             {
    //                 value: 'B',
    //                 label: 'choclate'
    //             },
    //             {
    //                 value: 'C',
    //                 label: 'choclate'
    //             },
    //             {
    //                 value: 'C',
    //                 label: 'choclate'
    //             }
    //         ]
    //     },
    //     score: 5,
    //     correctAnswer: "A",
    //     answer: '',
    //     extend: {}
    // },
    }
  },
  methods: {
    // 新增问题
    addItem () {
      this.questions.push(this.question)
      console.log(this.question)
      console.log(this.questions)
      setQuestions({
        questions: this.questions
      })
    },
    // 获取总分
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
  mounted () {
  }
}
</script>

