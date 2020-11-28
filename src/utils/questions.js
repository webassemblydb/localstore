import $ from 'jquery'
import {
    getUrlParam
} from '@questions/core'

var questionsCache = [
]

// 获取问题列表
export const getQuestions = async () => {
    let _questions = []
    return questionsCache
}


// 设置问题列表
export const setQuestions = async ({
    questions
}) => {
    questionsCache = questions
}

// 获取问题在线链接
export const getQuestionUrl = async ({
    pathname,
    origin,
    questions
}) => {
    let urlParamsObj = {}
    var _questions = questions || []
    let questionsStringifyString = JSON.stringify(_questions)
    var questions = (questionsStringifyString)
    urlParamsObj = {
        questions
    }
    let url = origin + pathname + '?' + $.param(urlParamsObj) + '#' + '/answers/make'
    return url || ''
}

// 从URL链接中获取questions
export const getQuestionsFromUrl = async () => {
    let questionsUrlParam = getUrlParam('questions')
    let questions = JSON.parse(questionsUrlParam)
    return questions
}