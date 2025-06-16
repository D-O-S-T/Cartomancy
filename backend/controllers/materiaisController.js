const Carta = require('../models/Carta');
const Video = require('../models/Video');
const Pdf = require('../models/Pdf');

const listarMateriais = async (req, res) => {
    const { trilha_id } = req.query;

    if (!trilha_id) {
        return res.status(400).json({ erro: 'Parâmetro trilha_id é obrigatório' });
    }

    try {
        console.log('trilha_id recebida:', trilha_id);

        const whereClause = { trilha_id: trilha_id };

        const cartas = await Carta.findAll({ where: whereClause, attributes: ['id', 'name'], raw: true });
        const videos = await Video.findAll({ where: whereClause, attributes: ['id', 'titulo'], raw: true });
        const pdfs = await Pdf.findAll({ where: whereClause, attributes: ['id', 'titulo'], raw: true });

        const materiais = [
            ...cartas.map(c => ({ id: c.id, name: c.name, tipo: 'carta', trilha_id: c.trilha_id })),
            ...videos.map(v => ({ id: v.id, titulo: v.titulo, tipo: 'video', trilha_id: v.trilha_id })),
            ...pdfs.map(p => ({ id: p.id, titulo: p.titulo, tipo: 'pdf', trilha_id: p.trilha_id })),
        ];


        res.json(materiais);
    } catch (erro) {
        console.error('Erro ao buscar materiais:', erro);
        res.status(500).json({ erro: 'Erro ao buscar materiais' });
    }
};

module.exports = { listarMateriais };