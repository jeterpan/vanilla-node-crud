const fs = require('fs')
const path = require('path')

function writeDataToFile(filename, content) {

    fs.writeFileSync( path.join(__dirname, filename), JSON.stringify(content), 'utf8', error => {
        console.log(error)
    })

    console.log('passou')

}

module.exports = {
    writeDataToFile
}