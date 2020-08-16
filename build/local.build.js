const webpack = require("webpack");
console.log(webpack.version);
const config = require("./webpack.config.js");
const compiler = webpack(config);
const path = require("path");
//compiler.watch监听模式启动
//返回的watching 可以用于关闭监听
const watching = compiler.watch({
    watchOptions:{
    //     不监听的文件和文件夹，支持正则
        ignore:/node_modules/,
    //     监听到变化等待300ms 再去执行文件防止文件更新太快导致编译频繁
    //     默认300ms
    //     aggregateTimeout: 300,
    //     判断文件是否发生变化是通过不停地询问系统指定文件有没有变化实现的
    //     poll:1000
    },
    watch:true,
    aggregateTimeout: 300
},(err,stats)=>{
    if(err || stats.hasErrors()){
        console.log(stats);
        console.log("构建过程出错！");
    }else{
        console.log("实时构建成功！");
    }
});
//关闭监听
watching.close(()=>{
    console.log("成功关闭监听！");
});