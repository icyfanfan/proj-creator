const macro = require( '../util/macro' )
const { LoaderSassLoader , LoaderLessLoader , LoaderTsLoader } = macro
const webpkGenerator = require( './webpkGenerator' )



module.exports = function( userConfig = {} ){
    let { needTypeScript: isTs , cssLoaderType , rootPath: appDirectory } = userConfig

    let webpk = new webpkGenerator( {
            appDirectory ,
            isTs ,
        } ) ,
        needLessLoader = cssLoaderType === LoaderLessLoader ,
        needSassLoader = cssLoaderType === LoaderSassLoader
    if ( isTs ) {
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