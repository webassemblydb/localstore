import Vue from 'vue'
import {
    getQuestions
} from './questions'
export async function mountQuestions({
    questionsHtmlString,
    selector
}) {
    // questionsHtmlString = '<el-button>good</el-button>'
    let node = document.querySelector(selector)
    if (!node) {
        return false
    } else {
        node.innerHTML = questionsHtmlString
        // window.Vue = Vue
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
}
