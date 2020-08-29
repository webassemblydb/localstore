import {
    getQuestions,
    setQuestions
} from '@questions/utils/questions'
import {
   transferToHtml 
} from '@questions/utils/transfer'
import {
    mountQuestions
} from '@questions/utils/mount'
export async function initialize() {
    console.log('initialize.....')
    let questions = await getQuestions()
    let questionsHtmlString = await transferToHtml({
        questions
    });
    console.log('questionHtmlString:', questionsHtmlString)
    let result = await mountQuestions({
        questionsHtmlString,
        selector: '#questions'
    })
    if (result) {
        console.log('successfully')
    } else {
        console.error(result)
    }
}