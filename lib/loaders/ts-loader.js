const macro = require( '../util/macro' )
const { prodMode } = macro

const tsTest = /\.ts$/

module.exports = function tsLoader( { mode , webpkc } ){
    const isProduction = mode === prodMode ,
        test = webpkc.module.rule( 'ts' ).test( tsTest )
    // 加快打包速度
    if ( isProduction ) {
        test.use( 'thread-loader' )
            .loader( 'thread-loader' )
    }
    test.use( 'babel' )
        .loader( 'babel-loader' )
        .end()
        .use( 'ts' )
        .loader( 'ts-loader' )
        .options( {
            transpileOnly: true ,
            appendTsSuffixTo: [
                /\.vue$/ ,          // '\\.vue$'
            ] ,
            happyPackMode: isProduction
        } )
}