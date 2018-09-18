const inquirer = require( 'inquirer' )
const generator = require( './generator/index' )
const macro = require( './util/macro' )
const { LoaderLessLoader , LoaderSassLoader } = macro

module.exports = function custom(){
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
        let webpk = generator( answers )

        console.log( webpk.config.toString() )
    } )
}
