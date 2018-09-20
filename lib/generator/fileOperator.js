const fs = require( 'fs' ) ,
    path = require( 'path' )
    
// 更新package.json的name,devDependencies
const updatePackageJson = ( rootPath ) => {
    let appName = path.basename( rootPath ) ,
        packageJSONPath = path.resolve( rootPath , 'package.json' ) ,
        existPackageJSON = fs.existsSync( packageJSONPath )
    if ( existPackageJSON ) {
        let json = require( packageJSONPath )
        json.name = appName
        fs.writeFileSync( packageJSONPath , JSON.stringify( json , null , 2 ) )
    } else {
        console.warn( `${packageJSONPath}不存在` )
    }
}

// 写webpack配置
exports.writeConfig = ( targetDir , filename , content ) => {
    let configPath = path.resolve( targetDir , 'config' ) ,
        targetFile = path.resolve( configPath , filename ) ,
        moduleStr = content
    if( !fs.existsSync( configPath ) ) {
        fs.mkdirSync( configPath )
    }
    if ( fs.existsSync( targetFile ) ) {
        let data = fs.readFileSync( targetFile , 'utf-8' )
        // webpack.##.conf.js flag 需要proj-creator注入webpack配置
        // 锚点替换 /*%=webpackConfig%*/
        moduleStr = data.replace( /\/\*\%\=webpackConfig\%\*\// , `= ${moduleStr}` )
    }
    fs.writeFileSync( targetFile , moduleStr )
}
const vueTsScheme = `declare module '*.vue' {
    import vue from 'vue';
    export default vue;
}`

// 根据选择项，适配工程目录文件结构
exports.updateFileStructure = ( { rootPath , needTypeScript } ) => {
    let isTs = needTypeScript === true
    // 更新工程package.json的name
    updatePackageJson( rootPath )
    if ( isTs ) {
        let indexPath = path.resolve( rootPath , 'src' , 'index.js' ) ,
            targetName = indexPath.replace( /\.js$/ , '.ts' )
        // index.js -> index.ts
        if ( fs.existsSync( indexPath ) ) {
            fs.renameSync( indexPath , targetName ) 
        }
        // 添加shims-vue.d.ts声明文件
        let tsSchemePath = path.resolve( rootPath , 'src' , 'shims-vue.d.ts' )
        fs.writeFileSync( tsSchemePath , vueTsScheme )
    }
}

