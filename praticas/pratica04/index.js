const express = require('express');
const app = express();
app.use(express.json());

let tarefas = [
  { id: 1, nome: "Estudar middleware", concluida: false },
  { id: 2, nome: "Praticar Express", concluida: true }
];

// Middleware de aplicação
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware de roteamento
const router = express.Router();

router.get('/', (req, res) => {
  res.json(tarefas);
});

router.get('/:id', (req, res, next) => {
  const tarefa = tarefas.find(t => t.id === Number(req.params.id));
  if (!tarefa) return next(new Error("Tarefa não localizada"));
  res.json(tarefa);
});

router.post('/', (req, res) => {
  const newTarefa = { id: Date.now(), ...req.body };
  tarefas.push(newTarefa);
  res.status(201).json(newTarefa);
});

router.put('/:id', (req, res, next) => {
  const tarefa = tarefas.find(t => t.id === Number(req.params.id));
  if (!tarefa) return next(new Error("Tarefa não localizada"));
  Object.assign(tarefa, req.body);
  res.json(tarefa);
});

router.delete('/:id', (req, res, next) => {
  const index = tarefas.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return next(new Error("Tarefa não localizada"));
  tarefas.splice(index, 1);
  res.json({ mensagem: "Tarefa deletada com sucesso" });
});

app.use('/tarefas', router);

// Middleware de erro
app.use((err, req, res, next) => {
  res.status(400).json({ codigo: 400, mensagem: err.message });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
