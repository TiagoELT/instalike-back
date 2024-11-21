import { getTodosPosts } from "../models/postModel.js";

export async function listarPost(req, res) {
    const posts = await getTodosPosts();
    // Envia os posts como resposta em formato JSON com status 200 (sucesso).
    res.status(200).json(posts);
}