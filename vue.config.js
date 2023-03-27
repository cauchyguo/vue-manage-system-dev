module.exports = {
    publicPath: './',
    // publicPath: process.env.VUE_APP_BASE_URL,
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'http://10.6.12.97:5000',
                changeOrigin:true,
                ws: true,
                pathRewrite:{
                    '^/api':''
                }
            }
        }
    }
}