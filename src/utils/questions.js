const questions = [
    {
        type: "SingleChoice",
        stem: ["Some animals are very big; some are small"],
        question: ["what is  the biggest animal"],
        input: {
            options: {
                value: '选项1',
                label: '黄金糕'
            }
        },
        answer: ["A"],
        extend: {}
    },
    {
        type: "MultipleChoice",
        stem: ["Some animals lives in forest and some lives in sea"],
        question: ["Which animals are living in forest"],
        input: {
            options: {
                value: '选项1',
                label: '黄金糕'
            }
        },
        answer: ["A", "B", "D"],
        extend: {
        }
    }
]

export const getQuestions = async () => {
    return questions;
}