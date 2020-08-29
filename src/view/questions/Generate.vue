
<template>
  <div id="app">
    <el-button @click="exportQuestions">导出试卷</el-button>
    <el-button @click="exportAnswers">导出答案</el-button>
    <!-- <input type="button" value="导出试卷" id="export" onclick="exportQuestions()">
    <input type="button" value="导出答案" id="export" onclick="exportAnswers()"> -->
    <div>
      <label for="uploadAnswers">选择答案文件:</label>
      <input type="file" value="导入答案" id="uploadAnswers" onclick="return fileUpload_onclick()"
          onchange="return fileUpload_onselect()" />
    </div>
    <div>
      <label for="questions_importer">选择问题文件:</label>
      <input type="file" value="导入问题" id="questions_importer" onchange="return importQuestions()" onclick="return importQuestions()" />
    </div>
        setting{{count}}
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="问题背景">
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
      <el-form-item label="选项4">
        <el-input v-model="question.input.options[3].label"></el-input>
        <el-input v-model="question.input.options[3].value"></el-input>
      </el-form-item>
      <el-form-item label="答案">
        <el-radio v-model="question.correctAnswer" label="A">A</el-radio>
        <el-radio v-model="question.correctAnswer" label="B">B</el-radio>
        <el-radio v-model="question.correctAnswer" label="C">C</el-radio>
        <el-radio v-model="question.correctAnswer" label="D">D</el-radio>
      </el-form-item>
  </el-form>
    <el-button @click="addItem">新增问题</el-button>
    <div id='questions'>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
import _ from 'lodash'
// 基于准备好的dom，初始化echarts实例
import {
    getQuestions, 
    setQuestions
} from '@questions/utils/questions'
export default {
  name: 'GenerateQuestions',
    data() {
        return {
            count: this.$store.state.count,
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
                            value: 'D',
                            label: 'choclate'
                        }
                    ]
                },
                score: 5,
                correctAnswer: "A",
                answer: '',
                extend: {}
            }
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
    exportQuestions (){
      return window.exportQuestions()
    },
    exportAnswers() {
      return window.exportCorrectAnswers()
    }
  },
  mounted () {
  }
}
</script>