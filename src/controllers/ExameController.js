import { zonedTimeToUtc } from 'date-fns-tz';
import { isBefore, parseISO } from 'date-fns';
import Exame from '../models/Exame';

class ExameController {
  async store(req, res) {
    const { aluno_id, instrutor_id, categoria, date } = req.body;

    if (isBefore(parseISO(date), new Date())) {
      return res.status(400).json({ erro: 'A data informada já passou' });
    }

    const examExists = await Exame.findOne({
      where: { aluno_id, resultado: null },
    });

    if (examExists) {
      return res
        .status(400)
        .json({ erro: 'O aluno já tem um exame em aberto' });
    }

    const date_formatted = zonedTimeToUtc(date, 'America/Sao_Paulo');

    const exame = await Exame.create({
      aluno_id,
      instrutor_id,
      categoria,
      date: date_formatted,
    });

    return res.json(exame);
  }

  async show(req, res) {
    const exames = await Exame.findAll({
      where: { resultado: null },
      order: ['date'],
      attributes: ['id', 'date', 'categoria', 'resultado'],
      include: [
        {
          association: 'instrutor',
          attributes: ['id', 'nome'],
        },
        {
          association: 'aluno',
          attributes: ['id', 'nome'],
        },
      ],
    });

    if (!exames) {
      return res.status(404).json({ error: 'Não existem exames agendados' });
    }

    return res.json(exames);
  }

  async index(req, res) {
    const { categoria } = req.params;

    const exames = await Exame.findAll({
      where: { categoria, resultado: null },
      order: ['date'],
      attributes: ['id', 'date', 'categoria', 'resultado'],
      include: [
        {
          association: 'instrutor',
          attributes: ['id', 'nome'],
        },
        {
          association: 'aluno',
          attributes: ['id', 'nome'],
        },
      ],
    });

    return res.json(exames);
  }

  async update(req, res) {
    const { id } = req.params;

    const exame = await Exame.findByPk(id);

    await exame.update(req.body);

    return res.json(exame);
  }

  async delete(req, res) {
    const { id } = req.params;

    const exame = await Exame.findByPk(id);

    if (!exame) {
      return res.status(404).json({ error: 'Exame não encontrado' });
    }
    await exame.destroy();
    return res.json({ Success: 'Exame cancelado com sucesso' });
  }
}

export default new ExameController();
