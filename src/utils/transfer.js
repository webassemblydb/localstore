import _ from 'lodash'

const stemGenerator = {
    generate: ({
        type,
        stem = [],
        extend
    }) => {
        return `<div class="stem">${stem.join('')}</div>`
    }
}

// separate from stem?
const questionGenerator = {
    generate: ({
        question = [],
        type,
        extend
    }) => {
        let tag = "div"
        return `<${tag} class="stem">${question.join('')}</${tag}>`
    }
}

const provideGenerator = {
    generate: ({
        question,
        type,
        extend
    }) => {
        let stemString = stemGenerator.generate({
            question,
            type,
            extend
        })
        let questionString = questionGenerator.generate({
            question,
            type,
            extend
        })
        return stemString + questionString;
    }
}

function singleChoiceInputGenerator({
    index,
    type,
    input,
    extend,
}) {
    console.log('singleChoiceInputGenerator')
    return `<el-select v-model='questions[${index}].answer'  placeholder='请选择'>
            <el-option v-for='item in questions[${index}].options' :key='item.value':label='item.label' :value='item.value'> 
            </el-option> 
        </el-select>`
}

function multipleChoiceInputGenerator({
    index,
    type,
    input,
    extend,
}) {
    return `<el-select v-model='questions[${index}].answer' placeholder='请选择'>
        <el-option v-for='item in questions[${index}].options'  :key='item.value':label='item.label' :value='item.value'>
        </el-option> 
    </el-select>`
}

const getInputGenerator = ({
    type,
    input,
    extend,
}) => {
    console.log(type)
    let generator = null
    switch (type) {
        case "SingleChoice":
            generator = singleChoiceInputGenerator;
            break;
        case "MultipleChoice":
            generator = multipleChoiceInputGenerator;
            break;
    }
    return generator
}

// singleChoice
function Strategy({
    stem,
    type,
    extend,
}) {
    let provideString = provideGenerator.generate({
        type,
        stem,
        extend
    })
    console.log('type:',type)
    let inputGenerator = getInputGenerator({
        index,
        type
    })
    console.log('inputGenerator:', inputGenerator)
    debugger
    let inputString = inputGenerator({
        stem,
        type,
        extend,
    })
    return (provideString || '') + (inputString || '');
}

function getStrategy(questionType) {
    let strategy = null
    switch (questionType) {
        case "SingleChoice":
        case "MultipleChoice":
            strategy = Strategy;
            break;
        default: strategy = Strategy;
    }
    console.log('stategy:', strategy)
    return strategy
}

export async function transferToHtml({
    questions
}) {
    return _.map(questions, (question, index) => {
        return getStrategy(question.type)({
            ...question,
            index
        })
    }).join('')
}


