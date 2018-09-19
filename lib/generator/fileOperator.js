const fs = require( 'fs' ) ,
    path = require( 'path' ) ,
    { chainToModule } = require( './configModule' ) ,
    { findDependency } = require( '../util/macro' )
    
// 更新package.json的name,devDependencies
exports.updatePackageJson = function updatePackageJson( { rootPath , webpk } ) {
    let appName = path.basename( rootPath ) ,
        packageJSONPath = path.resolve( rootPath , 'package.json' ) ,
        existPackageJSON = fs.existsSync( packageJSONPath )
    if ( existPackageJSON ) {
        let json = require( packageJSONPath )
        json.name = appName
        let { loaders } = webpk ,
            devDependencies = [] ,
            depKeys = Object.keys( json.devDependencies )
        loaders.forEach( loaderType => {
             let deps = findDependency( loaderType )
             devDependencies = devDependencies.concat( deps )
        } )
        // 排除法
        depKeys.forEach( key => {
            let has = devDependencies.includes( key )
            if ( !has ) {
                delete json.devDependencies[ key ]
            }
        } )
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
