import Exame from '../models/Exame';

class ExameAlunoController {
  async index(req, res) {
    const { aluno_id } = req.params;

    const exames = await Exame.findAll({
      where: { aluno_id, resultado: null },
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
}

export default new ExameAlunoController();
