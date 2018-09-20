const macro = require( '../util/macro' )
const { prodMode } = macro
const devConfig = {
        devtool: 'cheap-module-eval-source-map'
    } ,
    prodConfig = {
        devtool: 'source-map' ,
        output: {
            path: './build' ,
            filename: 'js/[name].[contenthash:8].js' ,
            chunkFilename: 'js/[name].[contenthash:8].js' ,
            publicPath: '/' ,
        } ,
    }
class HotModuleReplacementPlugin { }
HotModuleReplacementPlugin.__expression = `require('webpack/lib/HotModuleReplacementPlugin')`
class NoEmitOnErrorsPlugin {}
NoEmitOnErrorsPlugin.__expression = `require('webpack/lib/NoEmitOnErrorsPlugin')`
class ProgressPlugin {}
ProgressPlugin.__expression = `require('webpack/lib/ProgressPlugin')`
class HtmlWebpackPlugin {}
HtmlWebpackPlugin.__expression = `require('html-webpack-plugin')`
// https://github.com/symfony/webpack-encore/issues/311#issuecomment-390491179
class VueLoaderPlugin{} 
VueLoaderPlugin.__expression = `require('vue-loader/lib/plugin')`

module.exports = function baseConfig( { webpkc , mode , appDirectory } ){
    let isProd = prodMode === mode
    base = {
        mode ,
        context: appDirectory ,
        entry: {
            index: [ './src/index.js' ]
        }
    }
    Object.assign( base , isProd ? prodConfig : devConfig )
    webpkc.merge( base )
    webpkc.plugin( 'html资源' )
        .use( HtmlWebpackPlugin , [
            {
                template: `./public/index.html` ,
                filename: 'index.html' ,
            }
        ] )
        .end()
        .plugin( 'VueLoaderPlugin' )
        .use( VueLoaderPlugin )
        .end()

    if ( isProd ) {

    } else {
        webpkc.plugin( '热加载' )
            .use( HotModuleReplacementPlugin )
            .end()
            .plugin( '不输出错误日志' )
            .use( NoEmitOnErrorsPlugin )
            .end()
            .plugin( '展示编译进度' )
            .use( ProgressPlugin )
            .end()
    }
}