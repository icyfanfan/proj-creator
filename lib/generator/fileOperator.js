const fs = require( 'fs' ) ,
    path = require( 'path' ) ,
    { chainToModule } = require( './configModule' )
    
// 更新package.json的name,devDependencies
exports.updatePackageJson = function updatePackageJson( { rootPath } ) {
    let appName = path.basename( rootPath ) ,
        packageJSONPath = path.resolve( rootPath , 'package.json' ) ,
        existPackageJSON = fs.existsSync( packageJSONPath )
    if ( existPackageJSON ) {
        let json = require( packageJSONPath )
        json.name = appName
        fs.writeFileSync( packageJSONPath , JSON.stringify( json , null , 2 ) )
    } else {
        console.warn( `${packageJSONPath}不存在` )
    }
}


exports.writeConfig = function writeConfig( targetDir , filename , content ){
    let configPath = path.resolve( targetDir , 'config' ) ,
        targetFile = path.resolve( configPath , filename ) ,
        moduleStr = chainToModule( content )
    if( !fs.existsSync( configPath ) ) {
        fs.mkdirSync( configPath )
    }
    fs.writeFileSync( targetFile , moduleStr )
}
