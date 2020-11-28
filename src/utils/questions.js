import $ from 'jquery'
var questionsCache = [
]

export const getQuestions = async () => {
    let _questions = []
    return questionsCache
}

export const setQuestions = async ({
    questions
}) => {
    questionsCache = questions
}

export const getQuestionUrl = async ({
    pathname,
    origin,
    questions
}) => {
    let urlParamsObj = {}
    var _questions = questions || []
    let questionsStringifyString = JSON.stringify(_questions)
    var questionsUrlComponent = (JSON.stringify(questionsStringifyString))
    urlParamsObj = {
        questionsUrlComponent
    }
    let url = origin + pathname + '?' + $.param(urlParamsObj) + '#' + '/answers/make'
    return url || ''
}