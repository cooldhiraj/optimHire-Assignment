const fs = require('fs')

module.exports.toJSON = (parser, file, jsonFile) => {
    return new Promise((resolve, reject) => {
        let count = 0
        let convertor = parser().fromFile(file)

        convertor.on('data',(data)=>{
            count++
            let jsonStr = data.toString('utf8')
            
            if(count == 1){
                jsonStr = `[${jsonStr}`
            }else{
                jsonStr = `,${jsonStr}`
            }

            fs.appendFile(jsonFile, `${jsonStr}`, function (err) {
                if (err) throw err;
            });
        })

        convertor.on('done', (err) => {
            if(err){
                reject(err)
            }
            fs.appendFile(jsonFile, `]`, function (err) {
                if (err) reject(err);
                resolve(true)
            });
        })

        convertor.on('error', (err) => {
                reject(err)
        })

    }) 
}



