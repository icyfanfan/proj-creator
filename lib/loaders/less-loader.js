const macro = require( '../util/macro' )
const { prodMode } = macro

const lessTest = /\.less$/

exports.loader = function tsLoader( { mode , webpkc } ){
    const isProduction = mode === prodMode ,
        test = webpkc.module.rule( 'less' ).test( lessTest )
    
    test.use( 'less' )
        .loader( 'less-loader' )
        .options( {
            sourceMap: false ,
        } )
}

exports.devDependencies = [ 'less' , 'less-loader' ]