import _ from 'lodash'
const stemGenerator = {
    generate: ({
        type,
        stem = [],
        extend
    }) => {
        if (_.isString(stem)) {
            return `<div class="stem">${stem}</div>`

        } else {
            return `<div class="stem">${stem.join('')}</div>`
        }
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
        if (_.isString(question)) {
            return `<${tag} class="question">${question}</${tag}>`
        } else {
            return `<${tag} class="question">${question.join('')}</${tag}>`
        }
    }
}

const provideGenerator = {
    generate: ({
        stem,
        question,
        type,
        extend
    }) => {
        let stemString = stemGenerator.generate({
            stem,
            question,
            type,
            extend
        })
        console.log('stemString:', stemString)
        let questionString = questionGenerator.generate({
            stem,
            question,
            type,
            extend
        })
        console.log('questionString:', questionString)
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
            <el-option v-for='item in questions[${index}].input.options' :key='item.value':label='item.label' :value='item.value'> 
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
        <el-option v-for='item in questions[${index}].input.options'  :key='item.value':label='item.label' :value='item.value'>
        </el-option> 
    </el-select>`
}

const getInputGenerator = ({
    index,
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

// 策略
function Strategy({
    question,
    index,
    stem,
    type,
    extend,
}) {
    let provideString = provideGenerator.generate({
        question,
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
    let inputString = inputGenerator({
        stem,
        type,
        extend,
        index
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


