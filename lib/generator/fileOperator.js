const fs = require( 'fs' ) ,
    path = require( 'path' ) ,
    { chainToModule } = require( './configModule' )

exports.copyFile = function copyFile( src , dist ) {
    fs.createReadStream( src )
        .pipe( fs.createWriteStream( dist ) )
}


exports.writeConfig = function writeConfig( targetDir , filename , content ){
    let targetFile = path.resolve( targetDir , filename ) ,
        moduleStr = chainToModule( content )
    fs.writeFileSync( targetFile , moduleStr )
}
