
const Config = require('webpack-chain')
const baseConfig = require( './baseConfig' )
const init = Symbol( 'init' )

class webpkGenerator {
    constructor(){
        let config = new Config()
        this.config = config
        this.loaders = []
        this[ init ]()
    }
    // 初始化基本的配置 entry , output
    [ init ](){
        let base = baseConfig()
        this.config.merge( base )
    }
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
}





module.exports = webpkGenerator