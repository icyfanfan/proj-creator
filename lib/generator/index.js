let macro = require( '../util/macro' )
let { TypeSassLoader , TypeLessLoader } = macro


module.exports = function( userConfig = {} ){
    let { needTypeScript , cssLoaderType } = userConfig ,
        needLessLoader = cssLoaderType === TypeLessLoader ,
        needSassLoader = cssLoaderType === TypeSassLoader

    console.log( needTypeScript , needLessLoader , needSassLoader )
}