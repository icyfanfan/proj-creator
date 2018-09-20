
const WebpackChain = require('webpack-chain')
const baseConfig = require( './baseConfig' )
const generateLoader = require( '../loaders/index' )
const path = require( 'path' )
const { reserveDependencies } = require( '../util/macro' )

class webpkGenerator {
    constructor( appDirectory ){
        this.appDirectory = appDirectory
        // 预置loader
        this.loaders = [
            'babel-loader' ,
            'vue-loader'
        ]
    }
    // 添加loader
    appendLoaders( targetLoader ){
        if ( targetLoader ) {
            let { loaders } = this ,
                exist = loaders.includes( targetLoader )
            if ( exist ) {
                console.warn( `已经存在${targetLoader}了` )
            } else {
                this.loaders.push( targetLoader )
            }
        }
    }
    // 获取配置
    getConfig( { mode } ) {
        let { appDirectory } = this
        let webpkc = new WebpackChain()
        // 初始化
        baseConfig( { webpkc , mode , appDirectory } )
        // 添加loader
        this.loaders.forEach( loaderType => {
            generateLoader( { webpkc , loaderType , mode } )
        } )
        return webpkc
    }
    getDependencies(){
        let { loaders } = this ,
            result ,
            devDependencies = []
        loaders.forEach( loaderType => {
            let loaderFile = path.resolve( __dirname , '../loaders' , `${loaderType}.js` ) ,
                { devDependencies: deps } = require( loaderFile )
            if ( deps ) {
                devDependencies = devDependencies.concat( deps )
            }
        } )
        result = reserveDependencies.concat( devDependencies )
        // 去重
        return [ ...new Set( result ) ]
    }
}





module.exports = webpkGenerator