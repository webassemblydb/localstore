<template>
  <div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<script>
import _ from 'lodash'
import {
    getQuestions, setQuestions
} from '@questions/utils/questions'
export default {
  name: 'Main',
  data() {
    return {
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>

