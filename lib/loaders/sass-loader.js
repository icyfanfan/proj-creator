const macro = require( '../util/macro' )
const { prodMode } = macro

const sassTest = /\.sass$/

exports.loader = function sassLoader( { mode , webpkc } ){
    const isProduction = mode === prodMode ,
        test = webpkc.module.rule( 'sass' ).test( sassTest )
    
    test.use( 'sass' )
        .loader( 'sass-loader' )
        .options( {
            sourceMap: false ,
        } )
}

exports.devDependencies = [ 'node-sass' , 'sass-loader' ]