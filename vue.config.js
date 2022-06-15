module.exports = {
    publicPath:'',
    devServer:{
        host:'localhost',
        port:8088,
        proxy:{
            '/api':{
                // target:'http://119.23.255.187:9090',
                target:'http://localhost:9090',
                changeOrigin:true,
            },
        }
    }
}