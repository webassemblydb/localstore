/**
 * @file 
 */
import Vue from 'vue'
import {
    getQuestions
} from './questions'
import {
    isInBrowser
} from '@questions/core'
export async function mountQuestions({
    questionsHtmlString,
    selector
}) {
    if (!isInBrowser()) {
        console.error('not in browser environment')
        return false
    }
    let node = document.querySelector(selector)
    if (!node) {
        return false
    } else {
        node.innerHTML = questionsHtmlString
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
