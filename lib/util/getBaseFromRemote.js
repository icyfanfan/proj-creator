const fs = require('fs-extra')
const path = require('path')
const download = require('download-git-repo')

// 从github获取项目初始目录结构
module.exports = async function(url, taretDir){
    
    await new Promise((resolve, reject) => {
        
        download(`direct:${url}`, taretDir, { clone: true }, function (err) {
            if (err) return reject(err)
            resolve()
        })
    })

    // 删除.git文件
    await fs.remove(path.join(taretDir,'.git'))

    
}