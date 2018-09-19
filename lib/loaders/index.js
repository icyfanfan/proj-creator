const path = require( 'path' )
const fs = require( 'fs' )

function loaderIndex( { loaderType , webpkc , mode } ){
    if ( loaderType === undefined || loaderType === null ) {
        console.warn( `请输入loader` )
        return
    }
    let file = path.resolve( __dirname , `${loaderType}.js` ) ,
        exist = fs.existsSync( file )
    if ( !exist ) {
        console.warn( `在loaders目录中，不存在${loaderType}对应的加载文件` )
        return
    }
    let loaderFn = require( file )  //  所有的loaderFn都是直接修改webpkc对象
    return loaderFn( { webpkc , mode } )
}

// loaderIndex( { loaderType: 'ts-loader' , mode: 'development' } )

module.exports = loaderIndex