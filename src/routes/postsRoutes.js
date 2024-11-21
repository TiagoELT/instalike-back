import express from "express";
import { listarPost } from "../controllers/postsControllers.js";

const routes = (app) => {
    // Habilita o middleware para analisar o corpo das requisições JSON.
    app.use(express.json());

    // Rota para obter todos os posts.
    app.get("/posts",listarPost);
};

export default routes;