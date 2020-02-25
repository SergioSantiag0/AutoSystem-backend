import User from '../models/User';

class UserController {
  // Criação de usuarios
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      res.status(400).json({ error: 'O usuário já existe' });
    } else {
      const { id, name, email } = await User.create(req.body);
      return res.json({ id, name, email });
    }
    return this;
  }

  // Ediçaõ de cadastro de usuarios
  async update(req, res) {
    const { email, oldPassword } = req.body;
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'O usuario já existe' });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha antiga errada' });
    }

    const { name } = await user.update(req.body);

    return res.json({ id, name, email });
  }
}

export default new UserController();
