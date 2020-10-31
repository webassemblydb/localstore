
<template>
  <div id="app">
    <el-button @click="generateQuestions">生成试卷</el-button>
    <el-button @click="makeAnswers">回答问题</el-button>
    <el-button @click="review">评阅</el-button>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
import _ from 'lodash'
// 基于准备好的dom，初始化echarts实例
export default {
  name: 'App',
  data() {
    return {
    }
  },
  methods: {
    generateQuestions () {
      this.$router.push({
        path: 'questions/generate'
      })
    },
    makeAnswers () {
      this.$router.push({
        path: 'answers/make'
      })
    },
    review () {
      this.$router.push({
        path: 'review'
      })
    },
  },
  mounted () {
  }
}
</script>

