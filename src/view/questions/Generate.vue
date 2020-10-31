
<template>
  <div id="app">
    <el-row>
    <el-col :span="12">
      <el-row class="row-bg">
        <el-col :span="6">
          <el-button type="primary" @click="addItem">新增问题</el-button>
        </el-col>
        <el-col :span="18">
          <el-row type="flex" class="row-bg" justify="end">
            <el-col :span="24">
              <el-button @click="readDraftQuestions">读取暂存试卷</el-button>
              <a href="javascript:;" class="file">选择答案文件:
                <input type="file" value="导入答案" id="uploadAnswers" onclick="return fileUpload_onclick()"
                    onchange="return fileUpload_onselect()" />
              </a>
              <a href="javascript:;" class="file">选择问题文件
                <input type="file" value="导入问题" id="questions_importer" onchange="return importQuestions()" onclick="return importQuestions()" />
              </a>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
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
    </el-col>

    <el-col :span="12">
      <el-button type="primary" @click="exportQuestions">{{$t('exportQuestion')}}</el-button>
      <el-button @click="exportQuestionsWithAnswers">{{$t('exportQuestionsWithAnswers')}}</el-button>
      <el-button @click="exportCorrectAnswers">导出答案</el-button>
      <el-button @click="saveDraftQuestions">暂存试卷</el-button>
      <div id='questions'>
        <div v-for="(question, index) in questions">
        <el-select v-model='question.answer'  placeholder='请选择'>
                <el-option v-for='item in question.input.options' :key='item.value':label='item.label' :value='item.value'> 
                </el-option> 
            </el-select>
          <span v-if="question.correctAnswer" label="D">正确答案： {{question.correctAnswer}}</span>
        </div>
      </div>
    </el-col>
    </el-row>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
import _ from 'lodash'
import {
  i18n
} from './i18n'
// 基于准备好的dom，初始化echarts实例
import {
    getQuestions, 
    setQuestions
} from '@questions/utils/questions'
import {
  initialize
} from '@questions/utils/initialize'
import Vue from 'vue';
export default {
  i18n,
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
      this.questions.push(_.cloneDeep(this.question)) // deep copy into
      console.log(this.question)
      console.log(this.questions)
      setQuestions({
        questions: this.questions
      })
    },
    // 导出试卷
    exportQuestions (){
      return window.exportQuestions({
        isIncludeAnswers: false
      })
    },
    // 导出试卷和答案
    exportQuestionsWithAnswers (){
      return window.exportQuestions({
        isIncludeAnswers: true
      })
    },
    // 导出答案
    exportCorrectAnswers() {
      return window.exportCorrectAnswers()
    },
    // 
    async saveDraftQuestions() {
      let instance = await getInstance({
          autoIncrement: true,
          databaseName: 'Questions',
          tableName: 'draftQuestions',
          version: 1
      })
      instance.add({
          id: 1,
          data: {
              date: +new Date(),
              questions: this.questions
          }
      })
    },
    // 获取暂存的问题
    async readDraftQuestions() {
      let instance = await getInstance({
          autoIncrement: true,
          databaseName: 'Questions',
          tableName: 'draftQuestions',
          version: 1
      });
      let drafts = await instance.readAll({})
      if (_.isEmpty(drafts)) {
          Vue.prototype.$message('There are no drafts yet');
      } else {
          let draftQuestions = _.last(drafts).value.questions
          console.log(draftQuestions)
          // 设置问题列表
          await setQuestions({
              questions: draftQuestions
          })
          this.questions = draftQuestions
          window.draftQuestions= draftQuestions
          initialize()
      }
    }
  },
  mounted () {
  }
}
</script>