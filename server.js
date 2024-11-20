import express from "express";

const posts = [
  {
    id: 1,
    descricao: "Uma foto de teste",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 2,
    descricao: "Outro post de teste",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 3,
    descricao: "Mais um post",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 4,
    descricao: "Este é o último post",
    imagem: "https://placecats.com/millie/300/150",
  }
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log("Bem vindo ao servidor");
});

app.get("/posts", (req, res) => {
    res.status(200).json(posts);
});

function buscarIndexPost(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}

app.get("/posts/:id", (req, res) => {
  const index = buscarIndexPost(req.params.id);
  if (index === -1) {
    res.status(404).json({ mensagem: "Post não encontrado" });
  }
  else {
    res.status(200).json(posts[index]);
  }  
});