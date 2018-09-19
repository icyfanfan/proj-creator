
const child_process = require('child_process')
const path = require( 'path' ) ,
    fs = require( 'fs' ) ,
    sourceDir = path.resolve( __dirname , '../tmpls' )

function copyDir(src, dist) {
    child_process.spawn('cp', ['-r', src, dist])
}
/**
 * 拷贝目录结构至
 * @param {String} targetDir 
 */
module.exports = function copyDirStructure( targetDir ){
    let exist = fs.existsSync( targetDir )
    if ( exist ) {
        console.warn( `目录已经存在，新建项目失败` )
        return
    }
    copyDir( sourceDir , targetDir )
}