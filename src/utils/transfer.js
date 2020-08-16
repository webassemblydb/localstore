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
    type,
    input,
    extend,
}) {
    console.log('singleChoiceInputGenerator')
    // return "<el-select v-model='value' placeholder='请选择'><el-option v-for='item in options'  :key='item.value ':label='item.label' :value='item.value'> </el-option> </el-select>"
    return `<el-select placeholder='请选择'>
            <el-option v-for='item in options' :key='item.value':label='item.label' :value='item.value'> 
            </el-option> 
        </el-select>`
}

function multipleChoiceInputGenerator({
    type,
    input,
    extend,
}) {
    return `<el-select placeholder='请选择'>
        <el-option v-for='item in options'  :key='item.value':label='item.label' :value='item.value'>
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
    let inputGenerator = getInputGenerator({
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
    return _.map(questions, (question) => {
        return getStrategy(question.type)(question)
    }).join('')
}


