import fs from "fs";
import { getTodosPosts, criarPost, atualizarPost } from "../models/postModel.js";
import gerarDescricaoComGemini from "../services/geminiService.js";

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

export async function atualizaNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer, false);
        const altText = await gerarDescricaoComGemini(imgBuffer, true);
        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: altText
        };

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
        
    } catch (erro) {
        console.error(erro.message);
        res.status(500).json({"Error":"Falha na requisição."});
    }
}