<template>
  <div>
    <el-button @click="makeAnswers">回答问题</el-button>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
import _ from 'lodash'
// 基于准备好的dom，初始化echarts实例
export default {
  name: 'Answers',
  data() {
    return {
    }
  },
  methods: {
    makeAnswers () {
      this.$router.push('/answers/make')
    },
  },
  mounted () {
  }
}
</script>


