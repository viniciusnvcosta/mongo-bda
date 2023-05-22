// MongoDB CRUD - base de dados hospitais

db.createCollection("hospital");
db.createCollection("medico");
db.createCollection("paciente");
db.createCollection("consulta");
db.createCollection("enfermeiro");
db.createCollection("prontuario");

// Coleção medico

db.medico.insertMany([
  {
    crm: "2200001",
    dt_nasc: "21/01/1980",
    nome: "Dr. Guipa",
    especialidade: "Clínico Geral",
    hospitais: [
      { codHospital: "1", salario: 10000 },
      { codHospital: "2", salario: 8000 },
    ],
  },
  {
    crm: "3200005",
    dt_nasc: "19/05/1986",
    nome: "Dr. Marcos",
    especialidade: "Ortopedista",
    hospitais: [
      { codHospital: "2", salario: 12000 },
      { codHospital: "3", salario: 9000 },
    ],
  },
  {
    crm: "4200009",
    dt_nasc: "12/12/1978",
    nome: "Dr. João",
    especialidade: "Pediatra",
    hospitais: [
      { codHospital: "1", salario: 15000 },
      { codHospital: "3", salario: 11000 },
    ],
  },
]);

// Coleção hospital

db.hospital.insertMany([
  {
    codHospital: "1",
    nome: "Hospital São Paulo",
    endereco: {
      rua: "Rua dos Bobos",
      bairro: "Centro",
      numero: "0",
      cidade: "São Paulo",
      cep: "11000-456",
    },
    medicos: [
      { crm: "2200001", salario: 10000 },
      { crm: "4200009", salario: 15000 },
    ],
  },
  {
    codHospital: "2",
    nome: "Hospital São José",
    endereco: {
      rua: "Rua dos Bichos",
      bairro: "Jardim Paulista",
      numero: "1504",
      cidade: "São Paulo",
      cep: "11002-777",
    },
    medicos: [
      { crm: "2200001", salario: 8000 },
      { crm: "3200005", salario: 12000 },
    ],
  },
  {
    codHospital: "3",
    nome: "Hospital São Lucas",
    endereco: {
      rua: "Rua dos Gatos",
      bairro: "Jardim América",
      numero: "2000",
      cidade: "São Paulo",
      cep: "11004-999",
    },
    medicos: [
      { crm: "3200005", salario: 9000 },
      { crm: "4200009", salario: 11000 },
    ],
  },
]);

// Coleção paciente

db.paciente.insertMany([
  {
    cpf: "12345678900",
    nome: "Maria Silva",
    dt_nasc: "05/10/1990",
    endereco: {
      rua: "Avenida das Flores",
      bairro: "Vila Nova",
      numero: "123",
      cidade: "São Paulo",
      cep: "12345-678",
    },
    historico_consultas: [
      {
        data: "02/02/2023",
        medico: "Dr. Guipa",
        especialidade: "Clínico Geral",
        diagnostico: "Resfriado",
      },
      {
        data: "10/04/2023",
        medico: "Dr. Marcos",
        especialidade: "Ortopedista",
        diagnostico: "Fratura no braço",
      },
    ],
  },
  {
    cpf: "98765432100",
    nome: "João Santos",
    dt_nasc: "15/07/1985",
    endereco: {
      rua: "Rua das Palmeiras",
      bairro: "Centro",
      numero: "456",
      cidade: "São Paulo",
      cep: "54321-987",
    },
    historico_consultas: [
      {
        data: "20/03/2023",
        medico: "Dr. Marcos",
        especialidade: "Ortopedista",
        diagnostico: "Entorse no tornozelo",
      },
      {
        data: "05/05/2023",
        medico: "Dr. João",
        especialidade: "Pediatra",
        diagnostico: "Amigdalite",
      },
    ],
  },
]);

// Coleção consulta

db.consulta.insertMany([
  {
    data: "02/02/2023",
    medico: "Dr. Guipa",
    especialidade: "Clínico Geral",
    paciente: "Maria Silva",
    diagnostico: "Resfriado",
    cid: "J00",
    internacao: null
  },
  {
    data: "25/04/2023",
    medico: "Dr. Marcos",
    especialidade: "Ortopedista",
    paciente: "Maria Silva",
    diagnostico: "Fratura no braço",
    cid: "S52.5",
    internacao: {
      data_admissao: "25/04/2023",
      data_alta: "26/04/2023",
      setor: "Emergência",
      hospital: "Hospital São Paulo",
    }
  },
  {
    data: "20/03/2023",
    medico: "Dr. Marcos",
    especialidade: "Ortopedista",
    paciente: "João Santos",
    diagnostico: "Entorse no tornozelo",
    cid: "S93.4",
    internacao: {
      data_admissao: "20/03/2023",
      data_alta: "22/03/2023",
      setor: "UTI",
      hospital: "Hospital São José",
    },
  },
  {
    data: "05/05/2023",
    medico: "Dr. João",
    especialidade: "Pediatra",
    paciente: "João Santos",
    diagnostico: "Amigdalite",
    cid: "J03.9",
    internacao: null // Não há internação associada a esta consulta
  },
  {
    data: "15/06/2022",
    medico: "Dr. Guipa",
    especialidade: "Clínico Geral",
    paciente: "Maria Silva",
    diagnostico: "Gripe",
    cid: "J10",
    internacao: null // Não há internação associada a esta consulta
  },
  {
    data: "25/07/2022",
    medico: "Dr. Marcos",
    especialidade: "Ortopedista",
    paciente: "Maria Silva",
    diagnostico: "Fratura na perna",
    cid: "S82.1",
    internacao: {
      data_admissao: "25/07/2022",
      data_alta: "27/07/2022",
      setor: "UTI",
      hospital: "Hospital São Paulo",
    }// Não há internação associada a esta consulta
  },
  {
    data: "10/08/2022",
    medico: "Dr. João",
    especialidade: "Pediatra",
    paciente: "João Santos",
    diagnostico: "Otite",
    cid: "H66.9",
    internacao: null // Não há internação associada a esta consulta
  },
  {
    data: "05/09/2022",
    medico: "Dr. Guipa",
    especialidade: "Clínico Geral",
    paciente: "Maria Silva",
    diagnostico: "Dor de cabeça",
    cid: "R51",
    internacao: null // Não há internação associada a esta consulta
  },
]);


// Coleção enfermeiro

db.enfermeiro.insertMany([
  {
    coren: "54321",
    nome: "Enfermeira Ana",
    dt_nasc: "12/03/1992",
    endereco: {
      rua: "Rua das Flores",
      bairro: "Vila Nova",
      numero: "789",
      cidade: "São Paulo",
      cep: "98765-432",
    },
    setor: "Emergência",
  },
  {
    coren: "98765",
    nome: "Enfermeiro João",
    dt_nasc: "20/09/1988",
    endereco: {
      rua: "Rua dos Lírios",
      bairro: "Centro",
      numero: "321",
      cidade: "São Paulo",
      cep: "12345-678",
    },
    setor: "UTI",
  },
]);

// + adicionar colecao prontuario
// a coleção gera um relatorio mensal
db.prontuario.insertMany([
  {
    mes_ano: "01/2023",
  }
]);