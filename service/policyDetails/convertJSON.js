const fs = require('fs')

module.exports.toJSON = (parser, file, jsonFile) => {
    return new Promise((resolve, reject) => {
        let count = 0
        let convertor = parser().fromFile(file)

        convertor.on('data',(data)=>{
            count++
            let jsonStr = data.toString('utf8')
            let singleRow = JSON.parse(jsonStr)
            let arr = []
          
            singleRow['Sum Assured'] = singleRow['Sum Assured'].replaceAll(',', '')
            singleRow['Modal Premium'] = singleRow['Modal Premium'].replaceAll(',', '')
            singleRow['PT'] = singleRow['PT'].replaceAll(',', '')
            singleRow['PPT'] = singleRow['PPT'].replaceAll(',', '')

            for(let i= 1;i<=20;i++){
                let temp_sumAssured = 0
                let temp_premium = 0
                let temp_benefit = 0
                let temp_cashFlow = 0

                if(i == parseInt(singleRow['PT'].replaceAll(',', ''))){
                    temp_sumAssured = parseInt(singleRow['Sum Assured'].replaceAll(',', ''))
                    temp_benefit = temp_sumAssured
                    temp_cashFlow = temp_benefit
                }
                if(i <= parseInt(singleRow['PPT'].replaceAll(',', ''))){
                    temp_premium = parseInt(singleRow['Modal Premium'].replaceAll(',', ''))
                    temp_cashFlow = -temp_premium
                }

                let temp_obj = {
                    policyYear: i,
                    premium: temp_premium,
                    sumAssured: temp_sumAssured,
                    bonusRate: 0,
                    bonusAmount: 0,
                    totalBenefit: temp_benefit,
                    netCashflows: temp_cashFlow
                }

                arr.push(temp_obj)
            }
            singleRow['cal'] = [...arr]
            
            if(count == 1){
                jsonStr = `[${JSON.stringify(singleRow)}`
            }else{
                jsonStr = `,${JSON.stringify(singleRow)}`
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



