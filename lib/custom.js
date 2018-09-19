const inquirer = require( 'inquirer' )
const generator = require( './generator/index' )
const macro = require( './util/macro' )
const chalk = require('chalk')
const path = require( 'path' )
const copyDirStructure = require( './generator/copyDirStructure' )
const { LoaderLessLoader , LoaderSassLoader , devMode , prodMode } = macro
const { updatePackageJson , writeConfig } = require( './generator/fileOperator' )
const { install , shouldUseYarn } = require( './generator/install' )

module.exports = function custom( rootPath ){
    inquirer
        .prompt( [
            {
                type: 'confirm' ,
                name: 'needTypeScript' ,
                message: '是否使用typescript?' ,
                default: true ,
            } ,
            {
                type: 'list' ,
                name: 'cssLoaderType' ,
                message: '请选择css加载器' ,
                default: 0 ,
                choices: [
                    LoaderLessLoader ,
                    LoaderSassLoader ,
                ]
            }
        ] )
        .then( answers => {
            copyDirStructure( rootPath )
            let webpk = generator( answers ) ,
                appName = path.basename( rootPath ) ,
                devConfig = webpk.getConfig( { mode: devMode } ) ,
                prodConfig = webpk.getConfig( { mode: prodMode } ) ,
                devStr = devConfig.toString() ,
                prodStr = prodConfig.toString() ,
                devDependencies = webpk.getDependencies()
            // 更新工程package.json的name,devDependencies
            updatePackageJson( {
                rootPath ,
            } )
            writeConfig( rootPath , 'webpack.dev.conf.js' , devStr )
            writeConfig( rootPath , 'webpack.prod.conf.js' , prodStr )

            // 安装依赖
            console.log( chalk.yellow(
                `正在安装依赖，请稍等...`
            ) )
            let useYarn = shouldUseYarn() ,
                displayedCommand = useYarn ? 'yarn' : 'npm'

            install( rootPath , useYarn , devDependencies , false ).then( () => {
                console.log()
                console.log(`安装成功! ${appName}工程的目录在 ${rootPath}`)
                console.log('在工程目录中，你可以执行:')
                console.log()
                console.log(chalk.cyan(`  ${displayedCommand} start`))
                console.log('    启动开发服务器.')
                console.log()
                console.log(
                  chalk.cyan(`  ${displayedCommand} ${useYarn ? '' : 'run '}build`)
                );
                console.log('    生成环境打包.')
                console.log()
            } ).catch( e => {
                console.warn( `安装报错` , e )
            } )
        } )
}
