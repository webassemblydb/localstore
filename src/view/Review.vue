
<template>
  <div id="app">
    <el-row>
     <el-col :span="12"> 
    <!-- <div> -->
      <a href="javascript:;" class="file">选择包含答案的问题文件
        <input type="file" value="导入问题" id="questions_importer" onchange="return importQuestions()" onclick="return importQuestions()" />
      </a>
      <a href="javascript:;" class="file">选择答案文件
        <input type="file" value="导入答案" id="uploadAnswers" onclick="return fileUpload_onclick()" onchange="return fileUpload_onselect()" />
      </a>
      <el-button @click="score">查看得分</el-button>
    </el-col>
    <el-col :span="12">
      <!-- 引入 echarts.js -->
      <div id="main" style="width: 600px;height:400px;" v-if='isScoreVisible'></div>
      <div id='questions'>
      </div>
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
    </el-col>
    </el-row>

  </div>
</template>

<script>
import _ from 'lodash'
// 基于准备好的dom，初始化echarts实例
var echarts = require('echarts');
import {
    getQuestions, 
    setQuestions
} from '@questions/utils/questions'
export default {
  name: 'App',
  data() {
    return {
      isScoreVisible: false
    }
  },
  methods: {
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
      let sum = await this.getSum()
      this.isScoreVisible = true
      this.$nextTick(function(){
        var myChart = echarts.init(document.getElementById('main'))
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
        })
      })
    }
  },
  mounted () {
  }
}
</script>

