const inquirer = require( 'inquirer' )
const generator = require( './generator/index' )
const macro = require( './util/macro' )
const copyDirStructure = require( './generator/copyDirStructure' )
const { LoaderLessLoader , LoaderSassLoader , devMode , prodMode } = macro
const { copyFile , writeConfig } = require( './generator/fileOperator' )

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
               baseWebpackConfig = webpk.getConfig( { mode: devMode } )
            
            writeConfig( rootPath , 'webpack.dev.conf.js' , baseWebpackConfig )
        } )
}
