import { zonedTimeToUtc } from 'date-fns-tz';
import Aluno from '../models/Aluno';

class AlunoController {
  async store(req, res) {
    const alunoExists = await Aluno.findOne({ where: { cpf: req.body.cpf } });

    if (alunoExists) {
      return res.status(400).json({ erro: 'O aluno já está cadastrado' });
    }

    if (!req.body.data_nasc) {
      req.body.data_nasc = new Date();
    }

    if (!req.body.data_matric) {
      req.body.data_matric = new Date();
    }

    const data_nasc = zonedTimeToUtc(req.body.data_nasc, 'America/Sao_Paulo');

    const data_matric = zonedTimeToUtc(
      req.body.data_matric,
      'America/Sao_Paulo'
    );

    const aluno = await Aluno.create({ ...req.body, data_matric, data_nasc });
    return res.json(aluno);
  }

  async show(req, res) {
    const alunos = await Aluno.findAll({
      attributes: [
        'id',
        'cpf',
        'rg',
        'nome',
        'telefone',
        'email',
        'data_nasc',
        'sexo',
        'nome_pai',
        'nome_mae',
        'endereco',
        'bairro',
        'cidade',
        'uf',
        'categoria',
        'data_matric',
        'profissao',
        'local_trab',
        'ativo',
      ],
      include: [
        {
          association: 'instrutor',
          attributes: ['id', 'nome'],
        },
        {
          association: 'veiculo',
          attributes: ['placa'],
        },
      ],
    });

    if (!alunos) {
      return res.status(404).json({ error: 'Não existem alunos cadastrados' });
    }
    return res.json(alunos);
  }

  async index(req, res) {
    try {
      const { cpf } = req.params;
      const id_aluno = await Aluno.findOne({
        where: { cpf },
      });

      const { id } = id_aluno;

      const aluno = await Aluno.findByPk(id, {
        attributes: [
          'id',
          'cpf',
          'rg',
          'nome',
          'telefone',
          'email',
          'data_nasc',
          'sexo',
          'nome_pai',
          'nome_mae',
          'endereco',
          'instrutor_id',
          'veiculo_id',
          'bairro',
          'cidade',
          'uf',
          'categoria',
          'data_matric',
          'profissao',
          'local_trab',
          'ativo',
        ],
        include: [
          {
            association: 'instrutor',
            attributes: ['nome'],
          },
          {
            association: 'veiculo',
            attributes: ['placa'],
          },
        ],
      });

      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }
      return res.json(aluno);
    } catch (error) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
  }

  async update(req, res) {
    const { id } = req.params;

    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }
    const data_nasc = zonedTimeToUtc(req.body.data_nasc, 'America/Sao_Paulo');

    const data_matric = zonedTimeToUtc(
      req.body.data_matric,
      'America/Sao_Paulo'
    );
    await aluno.update({ ...req.body, data_nasc, data_matric });
    return res.json(aluno);
  }

  async delete(req, res) {
    const { id } = req.params;

    const aluno = await Aluno.findByPk(id);

    if (!aluno) {
      return res.status(404).json({ error: 'Aluno não encontrado' });
    }

    try {
      await aluno.destroy();
    } catch (err) {
      return res.json({ err: err });
    }
    return res.json({ Success: 'Aluno excluido com sucesso' });
  }
}

export default new AlunoController();
