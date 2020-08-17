import Vue from 'vue'
import {
    getQuestions
} from './questions'
export async function mountQuestions({
    questionsHtmlString,
    selector
}) {
    // questionsHtmlString = '<el-button>good</el-button>'
    document.querySelector(selector).innerHTML = questionsHtmlString
    window.Vue = Vue
    new Vue({
        el: selector,
        data: function () {
            return {
                questions: getQuestions(),
                value: '',
                visible: false,
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }]
            }
        }
    })
    return true
}