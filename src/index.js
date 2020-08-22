import Vue from 'vue';
import ElementUI from 'element-ui';
import $ from 'jquery'
import _ from 'lodash'
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.css';

// get questions
import {
    getQuestions
} from './utils/questions'
import {
   transferToHtml 
} from './utils/transfer'
import {
    mountQuestions
} from './utils/mount'
Vue.use(ElementUI);

$("#import").click(function(){
   $("#upload").click();//代码去触发点击
})
function fileUpload_onclick(){
}
window.fileUpload_onclick = fileUpload_onclick;


// export answers
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

async function getAnswers() {
    let questions = await getQuestions()
    let answers = _.map(questions, (item) => { return _.get(item, 'answer')});
    return answers;
}

// export answers
window.exportAnswers = async () => {
    let answers = await getAnswers();
    let answersString = JSON.stringify(answers)
    console.log(answersString)
    // answers = 'xxx'
    let eleLink = document.createElement('a')
    eleLink.download = 'answer.txt'
    eleLink.style.display = 'none'
    var blob = new Blob([answersString])
    eleLink.href = URL.createObjectURL(blob, {
        type: "text/plain;charset=utf-8"
    })
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
}

// file selected
function fileUpload_onselect(){
    console.log("onselect");
    var path = $("#upload").val();//文件路径
    console.log(path);
    var selectedFile = document.getElementById("upload").files[0];
    var name = selectedFile.name;//读取选中文件的文件名
    var size = selectedFile.size;//读取选中文件的大小
    console.log("wenjianming:"+name+"daxiao:"+size);
    var reader = new FileReader();//这是核心！！读取操作都是由它完成的
    reader.readAsText(selectedFile);

    reader.onload = function(oFREvent){//读取完毕从中取值
        var answersString = oFREvent.target.result;
        let answers = JSON.parse(answersString)
        setAnswers({
            answers
        })
        // your code。。。。
        console.log(answersString)
    }
}
window.fileUpload_onselect = fileUpload_onselect

// set answers
window.setAnswers = async function setAnswers ({
    answers
}) {
    let questions = await getQuestions()
    _.each(answers, (item, index) => {
        questions[index].answer = item
    })
}


// save draft
window.saveDraft = async function saveDraft() {
    let answers = await getAnswers();
    let instance = await getInstance({
        autoIncrement: true,
        databaseName: 'questions',
        tableName: 'draft',
        version: 1
    });
    instance.add({
        id: 1,
        data: {
            date: +new Date(),
            answers
        }
    })
}



async function initialize() {
    let questions = await getQuestions()
    let questionsHtmlString = await transferToHtml({
        questions
    });
    console.log('questionHtmlString', questionsHtmlString)
    let result = await mountQuestions({
        questionsHtmlString,
        selector: '#app'
    })
    if (result) {
        console.log('successfully')
    }
}
initialize()

window.score = async function score() {
    let questions = await getQuestions()
    let score = _.sum(_.map(questions, (item) => {
        return _.isEqual(item.correctAnswer, item.answer) ? item.score : 0
    }))
    console.log(questions)
    alert(score)
}
// var echarts = require('echarts');
// // 基于准备好的dom，初始化echarts实例
// var myChart = echarts.init(document.getElementById('main'));
// // 绘制图表
// myChart.setOption({
//     title: {
//         text: 'ECharts 入门示例'
//     },
//     tooltip: {},
//     xAxis: {
//         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
//     },
//     yAxis: {},
//     series: [{
//         name: '销量',
//         type: 'bar',
//         data: [5, 20, 36, 10, 10, 20]
//     }]
// });