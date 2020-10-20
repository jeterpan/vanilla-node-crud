const { getPostData } = require('../utils.js')
const Produtos = require('../models/produtos')


// Consulta todos os produtos
// @route: /produtos

async function consultaProdutos(_req, res) {

    try {
        const produtos2 = await Produtos.consultaProdutos()

        //console.log(produtos2)

        res.writeHead(200, {"Content-Type": "application/json"})
        res.write(JSON.stringify(produtos2))
        res.end()
   
    } catch (error) {
        console.log(error)
    }

}


// Consulta um produto especifico
// @route: /produtos/:id

async function consultaProduto(_req, res, id) {

    try {
        const produto = await Produtos.consultaProdutoPorID(id)

        if(produto) {

            res.writeHead(200, {"Content-Type": "application/json"})
            res.write(JSON.stringify(produto))
            res.end()

        } else {

            res.writeHead(404, {"Content-Type": "application/json"})
            res.write(JSON.stringify( { message: "Produto nao encontrado"} ))
            res.end()
        }
   
    } catch (error) {
        console.log(error)
    }

}


// Inclui produto
// @route: /produtos

async function incluiProduto ( req, res ) {
    try {

        const body = await getPostData(req)

        const { descricao, categoria } = JSON.parse(body)

        const produto = {
            descricao,
            categoria
        }

        //console.log(produto)

        const produtoNovo = await Produtos.incluirProduto(produto)
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.end( JSON.stringify(produtoNovo) )

    } catch (error) {
        console.log(error)
    }
}

// Altera produto
// @route: /produto

async function alteraProduto ( req, res, id ) {
    try {
        console.log("id: " + id)
        const produtoEncontrado = await Produtos.consultaProdutoPorID(id)

        if (produtoEncontrado) {
            
            const body = await getPostData(req)

            const { descricao, categoria } = JSON.parse(body)

            console.log(descricao)
            console.log(produtoEncontrado.descricao)
            console.log(categoria)
    
            const produto = {
                descricao: descricao || produtoEncontrado.descricao,
                categoria: categoria || produtoEncontrado.categoria
            }

            //console.log(produto)
    
            const produtoNovo = await Produtos.alterarProduto(id, produto)

            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end( JSON.stringify(produtoNovo) )
    
        } else {

            res.writeHead(404, {"Content-Type": "application/json"})
            res.write(JSON.stringify( { message: "Produto nao encontrado"} ))
            res.end()

        }

    } catch (error) {
        console.log(error)
    }
}

// Consulta um produto especifico
// @route: /produtos/:id

async function excluiProduto(_req, res, id) {

    try {
        const produto = await Produtos.consultaProdutoPorID(id)

        if(produto) {

            await Produtos.excluirProduto(id)

            res.writeHead(200, {"Content-Type": "application/json"})
            res.write(JSON.stringify( { mensagem: `Produto ${id} excluido com sucesso`} ))
            res.end()

        } else {

            res.writeHead(404, {"Content-Type": "application/json"})
            res.write(JSON.stringify( { message: "Produto nao encontrado"} ))
            res.end()
        }
   
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    consultaProdutos,
    consultaProduto,
    incluiProduto,
    alteraProduto,
    excluiProduto
}