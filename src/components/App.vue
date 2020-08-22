<template>
  <div id="app">
    <!-- <div id="nav">
      <el-button>按钮</el-button>
    </div> -->
    <el-form ref="form" :model="form" label-width="80px">
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
  </el-form>
    <el-button @click="addItem">add</el-button>
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
    getQuestions, setQuestions
} from '../utils/questions'
export default {
  name: 'App',
  data() {
    return {
      questions: [],
      question: {
        type: "SingleChoice",
        stem: ["Some animals are very big; some are small"],
        question: ["what is  the biggest animal"],
        input: {
            options: [
                {
                    value: 'A',
                    label: '黄金糕'
                },
                {
                    value: 'B',
                    label: 'choclate'
                },
                {
                    value: 'C',
                    label: 'choclate'
                },
                {
                    value: 'C',
                    label: 'choclate'
                }
            ]
        },
        score: 5,
        correctAnswer: "A",
        answer: '',
        extend: {}
    },
    }
  },
  methods: {
    addItem () {
      this.questions.push(this.question)
      console.log(this.question)
      console.log(this.questions)
      setQuestions({
        questions: this.questions
      })
    },
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

