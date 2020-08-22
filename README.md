# localstore

# question format 

## SingleChoice 

- type: Choice 
- stem: some introduction [] 
- question: [] 
- answer: []

example:

[
    {
        type: ["SingleChoice"],
        stem: ["Some animals are very big; some are small"],
        question: ["what is  the biggest animal"],
        input: [{"A": "monkey"}, {"B": "elepant"}, {"C": "fish"}, {"D": "tiger"}]  
        answer: ["A"],
        extend: {}
    }
]

## MultipleChoice

- type: MultipleChoice 
- stem: some introduction [] 
- question: [] 
- answer: []
- extend: [{}]

example:

[
    {
        type: ["MultipleChoice"],
        stem: ["Some animals lives in forest and some lives in sea"],
        question: ["Which animals are living in forest"],
        input: [{"A": "monkey"}, {"B": "elepant"}, {"C": "fish"}, {"D": "tiger"}]  
        answer: ["A", "B", "D"],
        extend: {
            
        }
    }
]





# reference
https://www.jianshu.com/p/0878e893c8f8
https://stackoverflow.com/questions/21909932/indexeddb-retrieve-item-with-max-value/21911709#21911709
