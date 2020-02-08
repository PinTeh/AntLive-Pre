module.exports = {
    publicPath:'',
    devServer:{
        host:'localhost',
        port:8000,
        proxy:{
            '/mock':{
                target:'http://localhost:9090',
                ws:false,
                //true => 删掉/mock
                changeOrigin:false
            }
        }
    }
}