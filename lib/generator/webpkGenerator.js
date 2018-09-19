
const WebpackChain = require('webpack-chain')
const baseConfig = require( './baseConfig' )
const generateLoader = require( '../loaders/index' )

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
        let base = baseConfig()
        webpkc.merge( base )
        // 添加loader
        this.loaders.forEach( loaderType => {
            generateLoader( { webpkc , loaderType , mode } )
        } )
        return webpkc
    }
}





module.exports = webpkGenerator