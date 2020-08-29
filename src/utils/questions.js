
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
