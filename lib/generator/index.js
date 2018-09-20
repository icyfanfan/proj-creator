const macro = require( '../util/macro' )
const { LoaderSassLoader , LoaderLessLoader , LoaderTsLoader } = macro
const webpkGenerator = require( './webpkGenerator' )



module.exports = function( userConfig = {} ){
    let { needTypeScript , cssLoaderType , rootPath } = userConfig

    let webpk = new webpkGenerator( rootPath ) ,
        needLessLoader = cssLoaderType === LoaderLessLoader ,
        needSassLoader = cssLoaderType === LoaderSassLoader
    if ( needTypeScript ) {
        webpk.appendLoaders( LoaderTsLoader )
    }
    if ( needLessLoader ) {
        webpk.appendLoaders( LoaderLessLoader )
    }
    if ( needSassLoader ) {
        webpk.appendLoaders( LoaderSassLoader )
    }
    return webpk
}