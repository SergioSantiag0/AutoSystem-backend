import {
  startOfDay,
  endOfDay,
  setHours,
  setMinutes,
  setSeconds,
  format,
  isAfter,
} from 'date-fns';
import { Op } from 'sequelize';
import Aula from '../models/Aula';

class DisponivelController {
  async index(req, res) {
    const { date } = req.query;

    if (!date) {
      return res.status(404).json({ error: 'Data inválida' });
    }

    const data = Number(date);

    const aulas = await Aula.findAll({
      where: {
        instrutor_id: req.params.instrutorId,
        canceled_at: null,
        date: {
          [Op.between]: [startOfDay(data), endOfDay(data)],
        },
      },
    });

    const horarios = [
      '07:00',
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '15:00',
      '16:00',
      '17:00',
      '18:00',
      '19:00',
    ];

    const disponiveis = horarios.map(time => {
      const [hour, minute] = time.split(':');

      const valor = setSeconds(setMinutes(setHours(data, hour), minute), 0);

      return {
        time,
        valor: format(valor, "yyyy-MM-dd'T'HH:mm:ssxxx"),
        // Verificando se o horário já passou
        disponivel:
          isAfter(valor, new Date()) &&
          !aulas.find(a => format(a.date, 'HH:mm') === time),
      };
    });

    return res.json(disponiveis);
  }
}

export default new DisponivelController();
