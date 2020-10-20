const http = require('http')

const { consultaProdutos, consultaProduto, incluiProduto, alteraProduto, excluiProduto } = require('./controllers/produtos.js')

const server = http.createServer( (req, res) => {

    if( req.method==='GET' && req.url==='/produtos' ) {

        consultaProdutos(req, res)

    } else if ( req.method==='GET' && req.url.match(/\/produtos\/([0-9]+)/) ) {

        const id = req.url.split('/')[2]

        consultaProduto(req, res, id)

    } else if ( req.method==='POST' && req.url==='/produtos' ) {

        incluiProduto(req, res)
        
    } else if ( req.method==='PUT' && req.url.match(/\/produtos\/([0-9]+)/) ) {

        const id = req.url.split('/')[2]

        alteraProduto(req, res, id)

    } else if ( req.method==='DELETE' && req.url.split('/')[1] === 'produtos' && req.url.split('/')[2].match(/^[0-9a-f]{7}-[0-9a-f]{4}-[1-5][0-9a-f]{4}-[89ab][0-9a-f]{4}-[0-9a-f]{12}$/i) ) {

        const id = req.url.split('/')[2]

        excluiProduto(req, res, id)
    
    } else {

            //console.log(req.url.split('/')[0])
            console.log(req.url.split('/')[1])
            console.log(req.url.split('/')[2])
            //console.log(req.url.split('/')[3])

            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end( JSON.stringify( {message: 'Nao encontrado'} ) )

    }

})

const port = 3021
server.listen(port, () => {
    console.log(`Server listening on localhost:${port}`)
})
