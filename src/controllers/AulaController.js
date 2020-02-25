import { startOfHour, parseISO, isBefore, subHours } from 'date-fns';
import Aula from '../models/Aula';

class AulaController {
  async index(req, res) {
    const { id } = req.params;
    const aulas = await Aula.findAll({
      where: { aluno_id: id, canceled_at: null },
      attributes: ['past', 'cancelavel', 'id', 'date'],
      order: ['date'],
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
    return res.json(aulas);
  }

  async store(req, res) {
    const { aluno_id, instrutor_id, date } = req.body;

    const horaInicial = startOfHour(parseISO(date));

    // Verificando se a hora informada já não passou
    if (isBefore(horaInicial, new Date())) {
      return res.status(400).json({ error: 'O horário informado já passou' });
    }

    const checkDisponibilidade = await Aula.findOne({
      where: {
        instrutor_id,
        canceled_at: null,
        date: horaInicial,
      },
    });

    if (checkDisponibilidade) {
      return res
        .status(400)
        .json({ error: 'O horário informado não está disponivel' });
    }

    const aula = await Aula.create({
      aluno_id,
      instrutor_id,
      date,
    });

    return res.json(aula);
  }

  async delete(req, res) {
    const aula = await Aula.findByPk(req.params.id);

    // Se o usuario tentar cancelar a aula até 2 horas antes, ele conseguirá, caso contrario nao
    const checkHora = subHours(aula.date, 2);

    if (isBefore(checkHora, new Date())) {
      return res.status(401).json({
        error: 'Não foi possivel cancelar a aula, voce está a menos de 2 horas',
      });
    }

    aula.canceled_at = new Date();

    await aula.save();

    return res.json(aula);
  }
}

export default new AulaController();
