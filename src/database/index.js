import { Sequelize } from 'sequelize';
import dbConfig from '../config/database';

// Importação dos models
import User from '../models/User';
import Aluno from '../models/Aluno';
import Instrutor from '../models/Instrutor';
import Veiculo from '../models/Veiculo';
import Aula from '../models/Aula';
import Exame from '../models/Exame';

const connection = new Sequelize(dbConfig);

// Carregando o model
User.init(connection);
Aluno.init(connection);
Instrutor.init(connection);
Veiculo.init(connection);
Aula.init(connection);
Exame.init(connection);

// Associações
Instrutor.associate(connection.models);
Veiculo.associate(connection.models);
Aluno.associate(connection.models);
Aula.associate(connection.models);
Exame.associate(connection.models);
export default connection;
