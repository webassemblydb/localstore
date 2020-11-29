import $ from 'jquery'
// 获取问题在线链接
export const generateAnswerSheetLinkUrl = async ({
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
    let url = origin + pathname + '?' + $.param(urlParamsObj) + '#' + '/review'
    return url || ''
}
