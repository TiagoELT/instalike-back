import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPost, postarNovoPost, uploadImagem, atualizaNovoPost } from "../controllers/postsControllers.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

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
    // Habilita o middleware para habilitar o CORS.
    app.use(cors(corsOptions));

    // Rota para obter todos os posts.
    app.get("/posts",listarPost);

    // Rota para criar um novo post.
    app.post("/posts", postarNovoPost);

    // Rota para postar uma nova foto.
    app.post("/upload", upload.single("imagem"), uploadImagem);

    // Rota para atualizar um post.
    app.put("/upload/:id", atualizaNovoPost);
};

export default routes;