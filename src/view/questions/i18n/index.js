import VueI18n from 'vue-i18n'
import Vue from 'vue';
Vue.use(VueI18n)
const messages = {
    en: {
        exportQuestion: "export question",
        exportQuestionsWithAnswers: "export questions with answers"
    },
    zh: {
        exportQuestion: "导出试卷",
        exportQuestionsWithAnswers: "导出包含答案的试卷"
    }
}
console.log(messages.zh)
export const i18n = new VueI18n({
    locale: localStorage.getItem('locale') || 'zh',
    messages
})