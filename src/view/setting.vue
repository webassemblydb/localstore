<template>
    <div>
        setting{{count}}
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
    </div>
</template>
<script>
import {
    getQuestions, setQuestions
} from '@questions/utils/questions'
export default {
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
                            value: 'C',
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
        addItem () {
            this.questions.push(this.question)
            console.log(this.question)
            console.log(this.questions)
            setQuestions({
                questions: this.questions
            })
        },
    }
}
</script>
<style scoped>

</style>