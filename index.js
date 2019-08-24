const express = require("express");
const server = express();
server.use(express.json());

/* CONSTANTE ONDE SERÁ ARMAZENADO OS PROJETOS */
const projetos = [];

/* VARIÁVEL ONDE SERÁ CRIADO O PROJETO */
let numberOfRequests = 0;

/* MIDDLEWARE - LOCAL */
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project_id = projetos.find(p => p.id == id);

  if (!project_id) {
    return res.status(400).json({ error: "Project not Found" });
  }

  req.project_id = project_id;

  return next();
}

/* MIDDLEWARE - GLOBAL */
function logRequests(req, res, next) {
  numberOfRequests++;

  console.log(`Requisições realizadas: ${numberOfRequests}`);

  return next();
}

server.use(logRequests);

/* ***** ROTAS ***** */

/* CADASTRA PROJETO */
server.post("/projects", (req, res) => {
  const { id, tittle } = req.body;

  const projeto = {
    id,
    tittle,
    task: []
  };

  projetos.push(projeto);

  return res.json(projeto);
});

/* CADASTRA TAREFA */
server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const projeto = projetos.find(p => p.id == id);

  projeto.task.push(task);

  return res.json(projeto);
});

/* LISTAR TODOS OS PROJETOS */
server.get("/projects", (req, res) => {
  return res.json(projetos);
});

/* EXCLUIR PROJETO */
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const id_projeto = projetos.findIndex(p => p.id == id);

  projeto.splice(id_projeto, 1);

  return res.send();
});

/* ALTERAR TÍTULO DO PROJETO */
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { tittle } = req.body;

  const projeto = projetos.find(p => p.id == id);
  projeto.tittle = tittle;

  return res.json(projeto);
});

/* LISTAR PROJETO */
server.get("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projeto = projetos.find(p => p.id == id);

  return res.json(projeto);
});

server.listen(3000);
