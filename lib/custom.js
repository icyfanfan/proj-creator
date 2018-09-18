const inquirer = require( 'inquirer' )
const generator = require( './generator/index' )
const macro = require( './util/macro' )
const { TypeSassLoader , TypeLessLoader } = macro

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
                TypeLessLoader ,
                TypeSassLoader ,
            ]
        }
    ] )
    .then( answers => {
        let config = generator( answers )

        console.log( config )
    } )
}
