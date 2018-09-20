
const WebpackChain = require('webpack-chain')
const baseConfig = require( './baseConfig' )
const generateLoader = require( '../loaders/index' )
const { findDependency , reserveDependencies } = require( '../util/macro' )

class webpkGenerator {
    constructor(){
        this.loaders = [ ]
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
        let webpkc = new WebpackChain()
        // 初始化
        baseConfig( { webpkc , mode } )
        // 添加loader
        this.loaders.forEach( loaderType => {
            generateLoader( { webpkc , loaderType , mode } )
        } )
        return webpkc
    }
    getDependencies(){
        let { loaders } = this ,
            devDependencies = []
        loaders.forEach( loaderType => {
            let deps = findDependency( loaderType )
            devDependencies = devDependencies.concat( deps )
       } )
       return reserveDependencies.concat( devDependencies )
    }
}





module.exports = webpkGenerator