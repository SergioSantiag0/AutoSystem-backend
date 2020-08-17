import { zonedTimeToUtc } from 'date-fns-tz';
import Instrutor from '../models/Instrutor';

class InstrutorController {
  async store(req, res) {
    const instrutorExists = await Instrutor.findOne({
      where: { cpf: req.body.cpf },
    });

    if (instrutorExists) {
      return res.status(400).json({ error: 'O instrutor já está cadastrado' });
    }

    if (!req.body.data_carteira) {
      req.body.data_carteira = new Date();
    }

    if (!req.body.data_curso) {
      req.body.data_curso = new Date();
    }

    req.body.password = req.body.cpf;

    const data_carteira = zonedTimeToUtc(
      req.body.data_carteira,
      'America/Sao_Paulo'
    );

    const data_curso = zonedTimeToUtc(req.body.data_curso, 'America/Sao_Paulo');

    const instrutor = await Instrutor.create({
      ...req.body,
      data_carteira,
      data_curso,
    });
    return res.json(instrutor);
  }

  async show(req, res) {
    const instrutores = await Instrutor.findAll({
      attributes: ['id', 'nome', 'cpf', 'data_carteira', 'data_curso'],
      include: {
        association: 'veiculo',
        attributes: ['placa'],
      },
    });

    if (!instrutores) {
      return res
        .status(400)
        .json({ error: 'Não existe instrutores cadastrados' });
    }
    return res.json(instrutores);
  }

  async index(req, res) {
    const { id } = req.params;

    const instrutor = await Instrutor.findByPk(id, {
      attributes: ['id', 'nome', 'cpf', 'data_carteira', 'data_curso'],
      include: {
        association: 'veiculo',
        attributes: ['placa'],
      },
    });

    if (!instrutor) {
      return res.status(400).json({ error: 'Instrutor não encontrado' });
    }
    return res.json(instrutor);
  }

  async update(req, res) {
    const { id } = req.params;

    const instrutor = await Instrutor.findByPk(id);

    if (!instrutor) {
      return res.status(400).json({ error: 'Instrutor não encontrado' });
    }

    const data_carteira = zonedTimeToUtc(
      req.body.data_carteira,
      'America/Sao_Paulo'
    );

    const data_curso = zonedTimeToUtc(req.body.data_curso, 'America/Sao_Paulo');

    await instrutor.update({ ...req.body, data_carteira, data_curso });
    return res.json(instrutor);
  }

  async delete(req, res) {
    const { id } = req.params;

    const instrutor = await Instrutor.findByPk(id);

    if (!instrutor) {
      return res.status(400).json({ error: 'Instrutor não encontrado' });
    }
    await instrutor.destroy();
    return res.json({ success: 'Instrutor excluido com sucesso' });
  }
}

export default new InstrutorController();
