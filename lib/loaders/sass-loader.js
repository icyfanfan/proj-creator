const macro = require( '../util/macro' )
const { prodMode } = macro

const sassTest = /\.sass$/

class MiniCssExtractPlugin {}
MiniCssExtractPlugin.__expression = `require('mini-css-extract-plugin')`

exports.loader = function sassLoader( { mode , webpkc } ){
    const isProduction = mode === prodMode ,
        test = webpkc.module.rule( 'sass' ).test( sassTest )
    if ( isProduction ) {
        test.use( 'MiniCssExtractLoader' )
            .loader( `mini-css-extract-plugin/dist/loader` )
            .options( {
                publicPath: '../' ,
            } )
            .end()
        webpkc.plugin( 'MiniCssExtractPlugin' )
            .use( MiniCssExtractPlugin , [
                {
                    filename: 'css/[name].[contenthash:8].css',
                    chunkFilename: 'css/[name].[contenthash:8].css'
                }
            ] )
            .end()
    } else {
        test.use( 'style' )
            .loader( 'vue-style-loader' )
            .options( {
                sourceMap: false ,
                shadowMode: false
            } )
            .end()
    }
    test.use( 'css' )
        .loader( 'css-loader' )
        .options( {
            sourceMap: false ,
            importLoaders: 2
        } )
        .end()
        .use( 'postcss' )
        .loader( 'postcss-loader' )
        .options( {
            sourceMap: false ,
        } )
        .end()
        .use( 'sass' )
        .loader( 'sass-loader' )
        .options( {
            sourceMap: false ,
        } )
}

exports.devDependencies = [ 
    'autoprefixer' ,        // postcss-loader 依赖
    'postcss-loader' ,
    'css-loader' ,
    'vue-style-loader' ,
    'mini-css-extract-plugin' ,
    'node-sass' ,
    'sass-loader'
]