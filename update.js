// incrementar o salário de um médico
db.medico.updateOne(
    { crm: "2200001" }, // Critério de filtro para selecionar o médico
    { $inc: { "hospitais.$[h].salario": 10000 } }, // Atualização do valor do salário
    { arrayFilters: [ { "h.cnpjHosp": "28478400000100" } ] } // Filtro para selecionar o hospital específico
  );

// Adicionar mais um histórico de consulta para um paciente
db.paciente.updateOne(
    { cpf: "12345678900" }, // Critério de filtro para selecionar o paciente
    { $push: { "historico_consultas": { data: "2023-06-01", medico: "Dr. Renato", especialidade: "Cardiologista", diagnostico: "Arritmia"}}}
    );

//Muda o enfermeiro chefe associado ao infermeiro
db.enfermeiro.updateOne(
    { coren: "33333" }, // Critério de filtro para selecionar o enfermeiro
    { $set: { "enfermeiroChefe": "98765" }} // Coren do enfermeiro chefe
    );

// Remove a internação de um paciente
db.consulta.updateOne(
    { cid: "S52.5"},
    { $unset: {internacao: null}}
    );

// Seta um valor base para o salário de todos os médicos de X especialidade
db.medico.updateMany(
    { especialidade: "Cardiologista" }, // Critério de filtro para selecionar os médicos
    { $min: { "hospitais.$[].salario": 20.670 } }, // Atualização do valor do salário para o valor maximo da profissão
    );

// Altera a tipagem de dado da data de todas as consultas
db.consulta.updateMany({}, [{ $set: { data: { $toDate: "$data" } } }])