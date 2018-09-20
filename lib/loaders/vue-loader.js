const macro = require( '../util/macro' )
const { prodMode } = macro

const vueTest = /\.vue$/

exports.loader = function tsLoader( { mode , webpkc } ){
    const isProduction = mode === prodMode
    
    webpkc.module
        .rule( 'vue-loader' )
        .test( vueTest )
        .use( 'vue-loader' )
        .loader( 'vue-loader' )
        .options( {
            compilerOptions: {
                preserveWhitespace: false ,
            }
        } )
}

exports.devDependencies = [ 'vue-loader' , 'vue-template-compiler' ]