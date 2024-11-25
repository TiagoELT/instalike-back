import express from "express";
import multer from "multer";
import { listarPost, postarNovoPost, uploadImagem } from "../controllers/postsControllers.js";

// Configuração para armazenar os arquivos enviados
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})


const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    // Habilita o middleware para analisar o corpo das requisições JSON.
    app.use(express.json());

    // Rota para obter todos os posts.
    app.get("/posts",listarPost);

    // Rota para criar um novo post.
    app.post("/posts", postarNovoPost);

    // Rota para postar uma nova foto.
    app.post("/upload", upload.single("imagem"), uploadImagem);
};

export default routes;