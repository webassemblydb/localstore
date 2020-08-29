
<template>
  <div>
    <el-button @click="generateQuestions">生成试卷</el-button>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Questions',
  data() {
    return {
    }
  },
  methods: {
    generateQuestions () {
      this.$router.push('/questions/generate')
    }
  },
  mounted () {
  }
}
</script>

