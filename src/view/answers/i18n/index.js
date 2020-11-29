import VueI18n from 'vue-i18n'
import Vue from 'vue';
Vue.use(VueI18n)
const messages = {
    en: {
    },
    zh: {
    }
}
export const i18n = new VueI18n({
    locale: localStorage.getItem('locale') || 'zh',
    messages
})