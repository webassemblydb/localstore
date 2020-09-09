import VueI18n from 'vue-i18n'
Vue.use(vueI18n)
const messages = {
    en: {
        exportQuestion: "export question"
    },
    zh: {
        exportQuestion: "导出试卷"
    }
}
console.log(messages.zh)
export const i18n = new VueI18n({
    locale: localStorage.getItem('locale') || 'zh',
    messages
})