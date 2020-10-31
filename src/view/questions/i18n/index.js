import VueI18n from 'vue-i18n'
import Vue from 'vue';
Vue.use(VueI18n)
const messages = {
    en: {
        questionDescription: 'question description',
        optionFirst: 'option one',
        optionSecond: 'option second',
        optionThird: 'option third',
        optionFourth: 'option fourth',
        exportQuestion: "export question",
        exportQuestionsWithAnswers: "export questions with answers"
    },
    zh: {
        questionDescription: '问题描述',
        optionFirst: '选项1',
        optionSecond: '选项2',
        optionThird: '选项3',
        optionFourth: '选项4',
        exportQuestion: "导出试卷",
        exportQuestionsWithAnswers: "导出包含答案的试卷"
    }
}
console.log(messages.zh)
export const i18n = new VueI18n({
    locale: localStorage.getItem('locale') || 'zh',
    messages
})