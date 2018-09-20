const path = require( 'path' )
const fs = require( 'fs' )

function searchLoader( { loaderType , webpkc , mode } ){
    if ( loaderType === undefined || loaderType === null ) {
        console.warn( `请输入loader` )
        return
    }
    let file = path.resolve( __dirname , '../loaders' , `${loaderType}.js` ) ,
        exist = fs.existsSync( file )
    if ( !exist ) {
        console.warn( `在loaders目录中，不存在${loaderType}对应的加载文件` )
        return
    }
    let { loader: loaderFn } = require( file )  //  所有的loaderFn都是直接修改webpkc对象
    if ( loaderFn ) {
        loaderFn( { webpkc , mode } )
    } else {
        console.warn( `模块未找到exports.loader的输出` )
    }
}


module.exports = searchLoader