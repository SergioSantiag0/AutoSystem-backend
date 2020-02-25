import Veiculo from '../models/Veiculo';

class VeiculoController {
  // Criação de veiculos
  async store(req, res) {
    const veiculoExists = await Veiculo.findOne({
      where: { placa: req.body.placa },
    });

    if (veiculoExists) {
      res.status(400).json({ error: 'O Veiculo já está cadastrado' });
    } else {
      const veiculo = await Veiculo.create(req.body);
      return res.json(veiculo);
    }
    return this;
  }

  async show(req, res) {
    const veiculos = await Veiculo.findAll({
      attributes: ['id', 'placa', 'cor', 'modelo', 'ano'],
    });

    if (!veiculos) {
      return res.status(400).json({ error: 'Não existe veiculos cadastrados' });
    }
    return res.json(veiculos);
  }

  async index(req, res) {
    const { id } = req.params;

    const veiculos = await Veiculo.findByPk(id, {
      attributes: ['id', 'placa', 'cor', 'modelo', 'ano'],
    });

    if (!veiculos) {
      return res.status(400).json({ error: 'Instrutor não encontrado' });
    }
    return res.json(veiculos);
  }

  async update(req, res) {
    const { id } = req.params;

    const veiculo = await Veiculo.findByPk(id);

    if (!veiculo) {
      return res.status(400).json({ error: 'Veiculo não encontrado' });
    }
    await veiculo.update(req.body);
    return res.json(veiculo);
  }

  async delete(req, res) {
    const { id } = req.params;

    const veiculo = await Veiculo.findByPk(id);

    if (!veiculo) {
      return res.status(400).json({ error: 'Veiculo não encontrado' });
    }
    await veiculo.destroy();
    return res.json({ success: 'Veiculo excluido com sucesso' });
  }
}

export default new VeiculoController();
