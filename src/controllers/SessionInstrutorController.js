import Instrutor from '../models/Instrutor';

class SessionInstrutorController {
  async store(req, res) {
    const { cpf, password } = req.body;

    const instrutor = await Instrutor.findOne({ where: { cpf } });

    if (!instrutor) {
      return res.status(401).json({ error: 'instrutor not found' });
    }

    if (!(await instrutor.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, nome, data_carteira, data_curso } = instrutor;

    return res.json({ id, nome, cpf, data_carteira, data_curso });
  }
}

export default new SessionInstrutorController();
