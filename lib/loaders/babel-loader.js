const macro = require( '../util/macro' )
const { prodMode } = macro

const jsTest = /\.jsx?$/

exports.loader = function tsLoader( { mode , webpkc } ){
    const isProduction = mode === prodMode
    
    webpkc.module
        .rule( 'babel-loader' )
        .test( jsTest )
        .use( 'babel' )
        .loader( 'babel-loader' )
}

exports.devDependencies = [ 'babel-loader' ]