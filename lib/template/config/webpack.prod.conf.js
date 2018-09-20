const webpack = require( 'webpack' )
const execSync = require( 'child_process' ).execSync
const path = require( 'path' )

const webpackConfig /*%=webpackConfig%*/


function build(){
    let appBuild = path.resolve( process.cwd() , 'build' )
    try{
        execSync( `rm -rf ${appBuild}` , { stdio: 'ignore' } )
    } catch( e ) {
        console.warn( e )
        return
    }
    webpack( webpackConfig ,  ( err , stats ) => {
        if ( err ) {
            console.error( err.stack || err )
            if ( err.details ) {
                console.error( err.details )
            }
            return
        }
        const info = stats.toJson()
        if ( stats.hasErrors() ) {
            console.error( info.errors )
        }
        if ( stats.hasWarnings() ) {
            console.warn( info.warnings )
        }
    } )
}

build()