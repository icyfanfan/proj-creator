const webpack = require( 'webpack' )
const webpackDevServer = require( 'webpack-dev-server' )
const chalk = require( 'chalk' )

const host = '0.0.0.0' ,
    port = 8081 ,
    url = `http://${host}:${port}`
    
const webpackConfig /*%=webpackConfig%*/

const options = {
    compress: true ,
    clientLogLevel: 'none' ,
    contentBase: './public' ,
    hot: true ,
    watchContentBase: true ,
    publicPath: '/' ,
    quiet: true ,   // 禁止显示devServer的console信息
    watchOptions: {
      ignored: /node_modules/
    } ,
    https: false ,
    host ,
    overlay: {
        warnings: false ,
        errors: true ,
    }
}
  
webpackDevServer.addDevServerEntrypoints( webpackConfig , options )
const compiler = webpack( webpackConfig ) ;

const devServer = new webpackDevServer( compiler , options )

devServer.listen( port , host , err => {
    if ( err ) {
        return console.error( err ) ;
    }
} )

;['SIGINT', 'SIGTERM'].forEach( signal => {
    process.on( signal , () => {
        devServer.close(() => {
            process.exit(0)
        } )
    } )
} )

compiler.hooks.done.tap( 'serve start' , stats => {
    if ( stats.hasErrors() ) {
        return
    }
    console.log()
    console.log(`  App running at:`)
    console.log(`  - Local:   ${chalk.cyan( url )}`)
    console.log()
} )