import conectarAoBanco from "../config/db-config.js";

// Conexão com o banco de dados MongoDB.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO_MONGODB);

// Função para obter todos os posts do banco de dados.
export async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
  }