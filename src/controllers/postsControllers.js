import fs from "fs";
import { getTodosPosts, criarPost } from "../models/postModel.js";

export async function listarPost(req, res) {
    const posts = await getTodosPosts();
    // Envia os posts como resposta em formato JSON com status 200 (sucesso).
    res.status(200).json(posts);
}

export async function postarNovoPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarPost(novoPost);
        res.status(200).json(postCriado);
        
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Error":"Falha na requisição."});
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };
    try {
        const postCriado = await criarPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(200).json(postCriado);
        
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Error":"Falha na requisição."});
    }
}