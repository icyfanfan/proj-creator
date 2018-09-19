
exports.LoaderTsLoader = 'ts-loader'

exports.LoaderLessLoader = 'less-loader'

exports.LoaderSassLoader = 'sass-loader'

exports.devMode = 'development'

exports.prodMode = 'production'

const dependencyMap = {
    [ exports.LoaderLessLoader ]: [ 'less' , 'less-loader' ] ,
    [ exports.LoaderTsLoader ]: [ 'typescript' , 'ts-loader' ] ,
}

exports.findDependency = function findDependency( loaderType ){
    let dependecies = dependencyMap[ loaderType ]
    return dependecies ? dependecies : []
}