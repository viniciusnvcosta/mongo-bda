/*
    Consultas no MongoDB
*/

// * Collection: consulta

db.consulta.find({ data: "2023-05-31" }).pretty();

db.consulta.find({
  data: { $gte: new Date("2023-05-01"), $lt: new Date("2023-06-01") },
});

db.consulta.find({ diagnostico: "Covid-19" }).pretty();

// Consultas realizadas pelo médico Marcos
db.consulta.find({ medico: "Dr. Marcos" }).pretty();

// Consultas em que o paciente foi internado
db.consulta.find({ internacao: { $ne: null } }).pretty();

// Quantidade de consultas em que o paciente não foi internado
db.consulta.find({ internacao: null }).count();

// Consultas em que o paciente teve fratura
db.consulta.find({ diagnostico: { $regex: /fratura/i } }).pretty();

// medicos que atenderam em consultas de atenção primária
db.consulta.distinct("medico");

// quantidade de cada CID atendido
db.consulta.aggregate([{ $group: { _id: "$cid", count: { $sum: 1 } } }]);

// * Collection: medico

// consultar medicos especialistas em clínica geral
db.medico.find({ especialidade: "Clínico Geral" });

db.medico
  .aggregate([{ $group: { _id: "$especialidade", count: { $sum: 1 } } }])
  .explain("executionStats");

// consultar medico com salario maior ou igual a 15000
db.medico.find({ "hospitais.salario": { $gte: 15000 } });

// consultar medicos que nasceram depois de 1988
db.medico.find({ dt_nasc: { $gt: "1988-01-01" } }).pretty();

// consultar medico mais velho
db.medico.find().sort({ dt_nasc: 1 }).limit(1).pretty();

// * Collection: paciente

db.paciente.find({ idade: { $gte: 30, $lte: 40 } });

// * Collection: enfermeiro

// enfermeiros do setor de emergência
db.enfermeiro.find({ setor: "Emergência" }).pretty();

// enfermeiros que não são chefes
db.enfermeiro.find({ chefe: { $ne: null } }).pretty();

// enfermeiro chefe de UTI do hospital 2
db.enfermeiro.findOne({ setor: "UTI", hospital: 2, chefe: { $ne: null } }).nome;

// * Collection: prontuario

// registros mensais com mais de 0 pacientes
db.prontuario.find({ qtd_pacientes: { $gt: 0 } }).pretty();

// * Collection: paciente

// nome de pacientes com mais de 1 consultas
db.paciente
  .find({ "historico_consultas.1": { $exists: true } }, { _id: 0, nome: 1 })
  .pretty();
