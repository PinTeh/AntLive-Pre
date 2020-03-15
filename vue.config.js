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
            },
            '/socket.io': {
                target: 'http://127.0.0.1:9000', // target host
                changeOrigin: true, // needed for virtual hosted sites
                logLevel: 'debug'
            }
        }
    }
}