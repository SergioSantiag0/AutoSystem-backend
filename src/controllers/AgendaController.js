import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Aula from '../models/Aula';

class AgendaController {
  async index(req, res) {
    const { date } = req.query;
    const { instrutor_id } = req.params;
    const data = parseISO(date);

    const aulas = await Aula.findAll({
      where: {
        instrutor_id,
        canceled_at: null,
        date: { [Op.between]: [startOfDay(data), endOfDay(data)] },
      },
      include: [
        {
          association: 'aluno',
          attributes: ['nome'],
        },
      ],
      order: ['date'],
    });

    return res.json(aulas);
  }
}

export default new AgendaController();
