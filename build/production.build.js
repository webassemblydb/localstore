const webpack = require("webpack");
const config = require("./webpack.config.js");
webpack(config, (err, res) => {
    if (err || res.hasErrors()) {
        console.log(err)
        console.log(res)
        console.log("构建过程出错！");
    } else {
        console.log("构建成功！");
    }
})