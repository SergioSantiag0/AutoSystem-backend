import express from 'express';

// Importando controllers
import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';

import VeiculoController from './controllers/VeiculoController';

import InstrutorController from './controllers/InstrutorController';

import AlunoController from './controllers/AlunoController';

import AulaController from './controllers/AulaController';

import AgendaController from './controllers/AgendaController';

import DisponivelController from './controllers/DisponivelController';

const routes = express.Router();
// User
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
// Session
routes.post('/session', SessionController.store);

// Veiculos
routes.post('/veiculos', VeiculoController.store);
routes.get('/veiculos', VeiculoController.show);
routes.get('/veiculos/:id', VeiculoController.index);
routes.put('/veiculos/:id', VeiculoController.update);
routes.delete('/veiculos/:id', VeiculoController.delete);

// Instrutores
routes.post('/instrutores', InstrutorController.store);
routes.get('/instrutores', InstrutorController.show);
routes.get('/instrutores/:id', InstrutorController.index);
routes.put('/instrutores/:id', InstrutorController.update);
routes.delete('/instrutores/:id', InstrutorController.delete);

// Horários disponiveis
routes.get('/instrutores/:instrutorId/disponivel', DisponivelController.index);
// Alunos
routes.post('/alunos', AlunoController.store);
routes.get('/alunos', AlunoController.show);
routes.get('/alunos/:cpf', AlunoController.index);
routes.put('/alunos/:id', AlunoController.update);
routes.delete('/alunos/:id', AlunoController.delete);

// Aulas
routes.get('/aulas/:id', AulaController.index);
routes.post('/aulas', AulaController.store);
routes.delete('/aulas/:id', AulaController.delete);

// Agenda Instrutor
routes.get('/Agenda/:instrutor_id', AgendaController.index);

export default routes;

// Já estou criando Usuários, veiculos, instrutores e alunos e fazendo login

// Fazer agora edição de usuarios, instrutores, veiculos e alunos
