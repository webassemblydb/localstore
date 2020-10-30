import Vue from 'vue';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
import $ from 'jquery'
import _ from 'lodash'
import 'element-ui/lib/theme-chalk/index.css';
import './styles/index.css';
import * as indexedDB from './utils/indexedDB'
import App from './components/App.vue'
import Main from './components/Main.vue'
import { router } from './router'
import VueRouter from 'vue-router'
import vueI18n from 'vue-i18n'
import { store } from './store'

Vue.use(VueRouter) // install
Vue.use(Vuex)
Vue.use(vueI18n)

// get questions
import {
    getQuestions,
    setQuestions
} from './utils/questions'
import {
   transferToHtml 
} from './utils/transfer'
import {
    mountQuestions
} from './utils/mount'
Vue.use(ElementUI);


new Vue({
  router,
  store,
  render: (h) => h(Main),
}).$mount('#app');

// $("#import").click(function(){
//    $("#upload").click();//代码去触发点击
// })
// function fileUpload_onclick(){
// }
// window.fileUpload_onclick = fileUpload_onclick;


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

async function getCorrectAnswers() {
    let questions = await getQuestions()
    let answers = _.map(questions, (item) => { return _.get(item, 'correctAnswer')});
    return answers;
}

async function getAnswers() {
    let questions = await getQuestions()
    let answers = _.map(questions, (item) => { return _.get(item, 'answer')});
    return answers;
}

// export questions
window.exportQuestions = async () => {
    let questions = await getQuestions();
    let questionsStrigify = JSON.stringify(questions)
    let eleLink = document.createElement('a')
    eleLink.download = 'questions.txt'
    eleLink.style.display = 'none'
    var blob = new Blob([questionsStrigify])
    eleLink.href = URL.createObjectURL(blob, {
        type: "text/plain;charset=utf-8"
    })
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
}

// export answers
window.exportAnswers = async () => {
    let answers = await getAnswers();
    let answersString = JSON.stringify(answers)
    console.log(answersString)
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

// export answers
window.exportCorrectAnswers = async () => {
    let answers = await getCorrectAnswers();
    let answersString = JSON.stringify(answers)
    console.log(answersString)
    let eleLink = document.createElement('a')
    eleLink.download = 'correctAnswer.txt'
    eleLink.style.display = 'none'
    var blob = new Blob([answersString])
    eleLink.href = URL.createObjectURL(blob, {
        type: "text/plain;charset=utf-8"
    })
    document.body.appendChild(eleLink)
    eleLink.click()
    document.body.removeChild(eleLink)
}

async function importQuestions(){
    var selectedFile = document.getElementById("questions_importer").files[0];
    var name = selectedFile.name;//读取选中文件的文件名
    var size = selectedFile.size;//读取选中文件的大小
    console.log("wenjianming:"+name+"daxiao:"+size);
    var reader = new FileReader();//这是核心！！读取操作都是由它完成的
    reader.readAsText(selectedFile);
    reader.onload = async function(oFREvent){//读取完毕从中取值
        var questionsString = oFREvent.target.result;
        let questions = JSON.parse(questionsString)
        console.log(questions)
        await setQuestions({
            questions
        })
        initialize()
        // your code。。。。
    }
}
window.importQuestions = importQuestions

// file selected
// import answers
function fileUpload_onselect(){
    console.log("onselect");
    var path = $("#uploadAnswers").val();//文件路径
    console.log(path);
    var selectedFile = document.getElementById("uploadAnswers").files[0];
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
    console.log('fetched questions:', questions)
    _.each(answers, (answer, index) => {
        if (!answer) {
            console.error('answer item error', answer)
        } else {
            if (questions[index]) {
                questions[index].answer = answer
            } else {
                console.error('there is no specific question')
            }
        }
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

// readDraft
window.readDraft = async function readDraft() {
    let instance = await getInstance({
        autoIncrement: true,
        databaseName: 'questions',
        tableName: 'draft',
        version: 1
    });
    let drafts = await instance.readAll({})
    if (_.isEmpty(drafts)) {
        Vue.prototype.$message('There are no drafts yet');
    } else {
        let draftAnswers = _.last(drafts).value.answers
        setAnswers({
            answers: draftAnswers
        })
    }
}

async function initialize() {
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
// initialize()

window.score = async function score() {
    let questions = await getQuestions()
    let score = _.sum(_.map(questions, (item) => {
        return _.isEqual(item.correctAnswer, item.answer) ? item.score : 0
    }))
    console.log(questions)
    // alert(score)
    return score
}
