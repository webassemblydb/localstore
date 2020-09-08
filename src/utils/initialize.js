import {
    getQuestions
} from '@questions/utils/questions'
import {
    transferToHtml
} from '@questions/utils/transfer'
import {
    mountQuestions
} from '@questions/utils/mount'
export async function initialize() {
    console.log('initialize.....')
    // 获取问题列表
    let questions = await getQuestions()
    // 转换成字符串
    let questionsHtmlString = await transferToHtml({
        questions
    });
    console.log('questionHtmlString:', questionsHtmlString)
    // 挂载节点
    let result = await mountQuestions({
        questionsHtmlString,
        selector: '#questions'
    })
    if (result) {
        // 成功挂载
        console.log('successfully')
    } else {
        // 失败挂载
        console.error(result)
    }
}