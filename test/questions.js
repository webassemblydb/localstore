
var questionsCache = [
    {
        type: "SingleChoice",
        stem: ["Some animals are very big; some are small"],
        question: ["what is  the biggest animal"],
        input: {
            options: [
                {
                    value: 'A',
                    label: '黄金糕'
                },
                {
                    value: 'B',
                    label: 'choclate'
                }
            ]
        },
        score: 5,
        correctAnswer: "A",
        answer: '',
        extend: {}
    },
    {
        type: "MultipleChoice",
        stem: ["Some animals lives in forest and some lives in sea"],
        question: ["Which animals are living in forest"],
        input: {
            options: [
                {
                    value: 'A',
                    label: '黄金糕'
                },
                {
                    value: 'B',
                    label: 'chocalate'
                },
                {
                    value: 'C',
                    label: 'cool'
                },
                {
                    value: 'D',
                    label: 'dog'
                },
            ]
        },
        score: 5,
        correctAnswer: "B",
        answer: '',
        extend: {
        }
    }
]