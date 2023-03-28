module.exports = {
    publicPath: './',
    // publicPath: process.env.VUE_APP_BASE_URL,
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'http://192.168.62.139:5000',
                changeOrigin:true,
                ws: true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}