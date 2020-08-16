import Vue from 'vue';
import ElementUI from 'element-ui';
import $ from 'jquery'
// import 'element-ui/lib/theme-chalk/index.css';
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
        var pointsTxt = oFREvent.target.result;
        // your code。。。。
        console.log(pointsTxt)
    }
}
async function initialize() {
    let questions = await getQuestions()
    let questionsHtmlString = await transferToHtml({
        questions
    });
    let result = await mountQuestions({
        questionsHtmlString,
        selector: '#app'
    })
    if (result) {
        console.log('successfully')
    }
}
initialize()


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