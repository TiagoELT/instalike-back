import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/db-config.js";

// Conexão com o banco de dados MongoDB.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO_MONGODB);

// Função para obter todos os posts do banco de dados.
export async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
  }

// Função para criar um post do banco de dados.
export async function criarPost(novoPost) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  return colecao.insertOne(novoPost);
}

// Função para atualizar um post do banco de dados.
export async function atualizarPost(id, novoPost) {
  const db = conexao.db("imersao-instabytes");
  const colecao = db.collection("posts");
  const objID = ObjectId.createFromHexString(id);
  return colecao.updateOne({ _id: new ObjectId(objID) }, { $set: novoPost });
}