import _ from 'lodash'

const stemGenerator = {
    generate: ({
        type,
        stem,
        extend
    }) => {
        return `<div class="stem">${stem}</div>`
    }
}

// separate from stem?
const questionGenerator = {
    generate: ({
        question,
        type,
        extend
    }) => {
        let tag = "div"
        return `<${tag}, class="stem">${question}</${tag}>`
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
    return "<el-select v-model='value' placeholder='请选择'><el-option v-for='item in options'  :key='item.value ':label='item.label' :value='item.value'> </el-option> </el-select>"
}

function multipleChoiceInputGenerator({
    type,
    input,
    extend,
}) {
    return "<el-select v-model='value' placeholder='请选择'><el-option v-for='item in options'  :key='item.value ':label='item.label' :value='item.value'> </el-option> </el-select>"
}

const getInputGenerator = {
    generate: ({
        type,
        input,
        extend,
    }) => {
        switch (type) {
            case "SingleChoice":
                return singleChoiceInputGenerator;
                break;
            case "MultipleChoice":
                return multipleChoiceInputGenerator;
                break;
        }
    }
}

// singleChoice
function Strategy({
    stem,
    type,
    extend,
}) {
    let provideString = provideGenerator.generate({
        stem,
        extend
    })
    let inputGenerator = getInputGenerator({
        type
    })
    let inputString = inputGenerator.generate({
        stem,
        type,
        extend,
    })
    return provideString + inputString;
}

function getStrategy(questionType) {
    switch (questionType) {
        case "SingleChoice":
        case "MultipleChoice":
            return Strategy;
    }
}

export async function transferToHtml({
    questions
}) {
    return _.map(questions, (question) => {
        return getStrategy(question.type)(question)
    }).join('')
}


