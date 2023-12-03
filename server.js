/*const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));


let contatos = [];

//obter os contatos
app.get('/contatos', (req, res) => {
    res.json(contatos);
});

//adicionar um novo contato
app.post('/contatos', (req, res) => {
    const novoContato = req.body;
    contatos.push(novoContato);
    res.json({ message: 'Contato adicionado com sucesso', contato: novoContato });
});

//obter um contato por ID
/*app.get('/contatos/:id', (req, res) => {
    const contatoId = req.params.id;
    const contato = contatos.find(c => c.id === contatoId);
    if (contato) {
        res.json(contato);
    } else {
        res.status(404).json({ message: 'Contato não encontrado' });
    }
});
app.get('/contatos/:id', (req, res) => {
    const contatoId = parseInt(req.params.id); // Converta para número
    const contato = contatos.find(c => c.id === contatoId);
    if (contato) {
        res.json(contato);
    } else {
        res.status(404).json({ message: 'Contato não encontrado' });
    }
});

//editar um contato existente
/*app.put('/contatos/:id', (req, res) => {
    const contatoId = req.params.id;
    const index = contatos.findIndex(c => c.id === contatoId);
    if (index !== -1) {
        contatos[index] = req.body;
        res.json({ message: 'Contato atualizado com sucesso', contato: contatos[index] });
    } else {
        res.status(404).json({ message: 'Contato não encontrado' });
    }
});
app.put('/contatos/:id', (req, res) => {
    const contatoId = parseInt(req.params.id); // Converta para número
    const index = contatos.findIndex(c => c.id === contatoId);
    if (index !== -1) {
        contatos[index] = req.body;
        res.json({ message: 'Contato atualizado com sucesso', contato: contatos[index] });
    } else {
        res.status(404).json({ message: 'Contato não encontrado' });
    }
});

//excluir um contato
/*app.delete('/contatos/:id', (req, res) => {
    const contatoId = req.params.id;
    contatos = contatos.filter(c => c.id !== contatoId);
    res.json({ message: 'Contato excluído com sucesso' });
});
app.delete('/contatos/:id', (req, res) => {
    const contatoId = parseInt(req.params.id); // Converta para número
    contatos = contatos.filter(c => c.id !== contatoId);
    res.json({ message: 'Contato excluído com sucesso' });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});*/

const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid'); // Importa a função v4 do módulo uuid
const app = express();
const port = process.env.PORT || 3000;
const path = require("path");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

let contatos = [];

// Função para gerar um ID único
function generateUniqueId() {
    return uuidv4();
}

//obter os contatos
app.get('/contatos', (req, res) => {
    res.json(contatos);
});

//adicionar um novo contato
app.post('/contatos', (req, res) => {
    const novoContato = { id: generateUniqueId(), ...req.body }; // Adiciona um ID único
    contatos.push(novoContato);
    res.json({ message: 'Contato adicionado com sucesso', contato: novoContato });
});

//obter um contato por ID
app.get('/contatos/:id', (req, res) => {
    const contatoId = req.params.id;
    const contato = contatos.find(c => c.id === contatoId);
    if (contato) {
        res.json(contato);
    } else {
        res.status(404).json({ message: 'Contato não encontrado' });
    }
});

//editar um contato existente
app.put('/contatos/:id', (req, res) => {
    const contatoId = req.params.id;
    const index = contatos.findIndex(c => c.id === contatoId);
    if (index !== -1) {
        contatos[index] = { id: contatoId, ...req.body }; // Mantém o ID original
        res.json({ message: 'Contato atualizado com sucesso', contato: contatos[index] });
    } else {
        res.status(404).json({ message: 'Contato não encontrado' });
    }
});

//excluir um contato
app.delete('/contatos/:id', (req, res) => {
    const contatoId = req.params.id;
    contatos = contatos.filter(c => c.id !== contatoId);
    res.json({ message: 'Contato excluído com sucesso' });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
