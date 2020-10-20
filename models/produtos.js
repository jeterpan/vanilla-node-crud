const { v4: uuidv4 } = require('uuid')

const { writeDataToFile } = require('../data/text_api.js')
let produtos = require('../data/produtos.json')

function consultaProdutos() {
    return new Promise( (resolve, _reject) => {
        resolve(produtos)
    })
}

function consultaProdutoPorID(id) {
    return new Promise( (resolve, _reject) => {
        console.log("id2: " + id)
        const produto = produtos.find( e => e.id === id)
        resolve(produto)
    })
}

function incluirProduto(produto) {
    return new Promise( (resolve, _reject) => {
        const produtoNovo = {id: uuidv4(), ...produto}
        produtos.push(produtoNovo)
        writeDataToFile('produtos.json', produtos)
        resolve(produtoNovo)
    })
}

function alterarProduto(id, produto) {
    return new Promise( (resolve, _reject) => {
        const index = produtos.findIndex(e => e.id === id )
        produtos[index] = {
            id,
            ...produto
        }
        console.log(produtos[index])
        writeDataToFile('produtos.json', produtos)
        resolve(produtos[index])
    })
}

function excluirProduto(id) {
    return new Promise( (resolve, _reject) => {
        produtos = produtos.filter( e => e.id !== id)
        writeDataToFile('produtos.json', produtos)
        resolve()
    })
}

module.exports = {
    consultaProdutos,
    consultaProdutoPorID,
    incluirProduto,
    alterarProduto,
    excluirProduto
}