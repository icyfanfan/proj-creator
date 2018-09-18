

module.exports = function baseConfig( webpackChain ){
    return {
        entry: {
            index: [ 'src/index.js' ]
        } ,
        output: {
            filename: '[name].bundle.js'
        }
    }
}