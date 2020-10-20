function getPostData (req) {
    return new Promise ( (resolve, _reject) => {
        try {
            let body = ''

            req.on('data', chunck => {
                body += chunck.toString()
            })
    
            req.on('end', () => {
                resolve(body)
            })
    
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getPostData
}