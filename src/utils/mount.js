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
    let questions = await getQuestions()
    new Vue({
        el: selector,
        data: function () {
            return {
                questions
            }
        }
    })
    return true
}
