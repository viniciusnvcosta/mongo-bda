// MongoDB CRUD - base de dados hospitais

db.createCollection(
  "hospital",
  { capped: true, size: 50 },
  {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["codHospital", "nome", "endereco"],
        properties: {
          codHospital: {
            bsonType: "int",
            description: "Código do hospital",
          },
          nome: {
            bsonType: "string",
            description: "Nome do hospital",
          },
          endereco: {
            bsonType: "object",
            required: ["rua", "bairro", "numero", "cidade", "cep"],
            properties: {
              rua: {
                bsonType: "string",
                description: "Rua do hospital",
              },
              bairro: {
                bsonType: "string",
                description: "Bairro do hospital",
              },
              numero: {
                bsonType: "string",
                description: "Número do hospital",
              },
              cidade: {
                bsonType: "string",
                description: "Cidade do hospital",
              },
              cep: {
                bsonType: "string",
                description: "CEP do hospital",
              },
            },
          },
          medicos: {
            bsonType: "array",
            description: "Médicos do hospital",
            items: {
              bsonType: "object",
              required: ["crm", "salario"],
              properties: {
                crm: {
                  bsonType: "int",
                  description: "CRM do médico",
                },
                salario: {
                  bsonType: "float",
                  description: "Salário do médico",
                },
              },
            },
          },
        },
      },
    },
  }
);
db.createCollection("medico");
db.createCollection(
  "paciente",
  { capped: true, size: 100000 },
  {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["cpf", "nome", "dt_nasc"],
        properties: {
          cpf: {
            bsonType: "string",
            description: "CPF do paciente",
          },
          nome: {
            bsonType: "string",
            description: "Nome do paciente",
          },
          dt_nasc: {
            bsonType: "date",
            description: "Data de nascimento do paciente",
          },
          endereco: {
            bsonType: "object",
            required: ["rua", "bairro", "numero", "cidade", "cep"],
            properties: {
              rua: {
                bsonType: "string",
                description: "Rua do paciente",
              },
              bairro: {
                bsonType: "string",
                description: "Bairro do paciente",
              },
              numero: {
                bsonType: "string",
                description: "Número do paciente",
              },
              cidade: {
                bsonType: "string",
                description: "Cidade do paciente",
              },
              cep: {
                bsonType: "string",
                description: "CEP do paciente",
              },
            },
          },
          historico_consultas: {
            bsonType: "array",
            description: "Histórico de consultas do paciente",
            items: {
              bsonType: "object",
              required: ["data", "medico", "especialidade", "diagnostico"],
              properties: {
                data: {
                  bsonType: "date",
                  description: "Data da consulta",
                },
                medico: {
                  bsonType: "string",
                  description: "Nome do médico",
                },
                especialidade: {
                  bsonType: "string",
                  description: "Especialidade do médico",
                },
                diagnostico: {
                  bsonType: "string",
                  description: "Diagnóstico da consulta",
                },
              },
            },
          },
        },
      },
    },
  }
);
db.createCollection("consulta");
db.createCollection("enfermeiro");
db.createCollection("prontuario");

// * Coleção hospital

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


// * Coleção medico

db.medico.insertMany([
  {
    crm: "2200001",
    dt_nasc: "1980-01-21",
    nome: "Dr. Guipa",
    especialidade: "Clínico Geral",
    hospitais: [
      { codHospital: "1", salario: 10000 },
      { codHospital: "2", salario: 8000 },
    ],
  },
  {
    crm: "3200005",
    dt_nasc: "1986-05-19",
    nome: "Dr. Marcos",
    especialidade: "Ortopedista",
    hospitais: [
      { codHospital: "2", salario: 12000 },
      { codHospital: "3", salario: 9000 },
    ],
  },
  {
    crm: "4200009",
    dt_nasc: "1978-12-12",
    nome: "Dr. João",
    especialidade: "Pediatra",
    hospitais: [
      { codHospital: "1", salario: 15000 },
      { codHospital: "3", salario: 11000 },
    ],
  },
  {
    crm: "5200013",
    dt_nasc: "1982-08-10",
    nome: "Dr. Carla",
    especialidade: "Dermatologista",
    hospitais: [
      { codHospital: "2", salario: 11000 },
      { codHospital: "3", salario: 9000 },
    ],
  },
  {
    crm: "6200040",
    dt_nasc: "1975-03-27",
    nome: "Dr. Renato",
    especialidade: "Cardiologista",
    hospitais: [
      { codHospital: "1", salario: 13000 },
      { codHospital: "2", salario: 10000 },
    ],
  },
  {
    crm: "7200052",
    dt_nasc: "1988-11-05",
    nome: "Dr. Ana",
    especialidade: "Ginecologista",
    hospitais: [
      { codHospital: "1", salario: 12000 },
      { codHospital: "3", salario: 9500 },
    ],
  },
  {
    crm: "1122001",
    dt_nasc: "1979-06-15",
    nome: "Dr. Rafael",
    especialidade: "Psiquiatra",
    hospitais: [
      { codHospital: "2", salario: 10500 },
      { codHospital: "3", salario: 8500 },
    ],
  },
  {
    crm: "1223007",
    dt_nasc: "1984-09-03",
    nome: "Dra. Camila",
    especialidade: "Oftalmologista",
    hospitais: [
      { codHospital: "1", salario: 14000 },
      { codHospital: "2", salario: 11000 },
    ],
  },
  {
    crm: "1324003",
    dt_nasc: "1981-07-18",
    nome: "Dr. André",
    especialidade: "Neurologista",
    hospitais: [
      { codHospital: "3", salario: 10000 },
      { codHospital: "4", salario: 9000 },
    ],
  },
  {
    crm: "1425009",
    dt_nasc: "1989-02-24",
    nome: "Dra. Mariana",
    especialidade: "Psicóloga",
    hospitais: [
      { codHospital: "4", salario: 8000 },
      { codHospital: "5", salario: 7500 },
    ],
  },
]);

// * Coleção paciente

db.paciente.insertMany([
  {
    cpf: "12345678900",
    nome: "Maria Silva",
    dt_nasc: "1990-10-05",
    endereco: {
      rua: "Avenida das Flores",
      bairro: "Vila Nova",
      numero: "123",
      cidade: "São Paulo",
      cep: "12345-678",
    },
    historico_consultas: [
      {
        data: "2023-02-02",
        medico: "Dr. Guipa",
        especialidade: "Clínico Geral",
        diagnostico: "Resfriado",
      },
      {
        data: "2023-04-10",
        medico: "Dr. Marcos",
        especialidade: "Ortopedista",
        diagnostico: "Fratura no braço",
      },
    ],
  },
  {
    cpf: "98765432100",
    nome: "João Santos",
    dt_nasc: "1985-07-15",
    endereco: {
      rua: "Rua das Palmeiras",
      bairro: "Centro",
      numero: "456",
      cidade: "São Paulo",
      cep: "54321-987",
    },
    historico_consultas: [
      {
        data: "2023-03-20",
        medico: "Dr. Marcos",
        especialidade: "Ortopedista",
        diagnostico: "Entorse no tornozelo",
      },
      {
        data: "2023-05-05",
        medico: "Dr. João",
        especialidade: "Pediatra",
        diagnostico: "Amigdalite",
      },
    ],
  },
  {
    cpf: "43678901234",
    nome: "Pedro Oliveira",
    dt_nasc: "1992-03-12",
    endereco: {
      rua: "Rua das Palmas",
      bairro: "Jardim Botânico",
      numero: "789",
      cidade: "São Paulo",
      cep: "54321-123",
    },
    historico_consultas: [
      {
        data: "2023-06-18",
        medico: "Dr. Guipa",
        especialidade: "Clínico Geral",
        diagnostico: "Gripe",
      },
      {
        data: "2023-08-05",
        medico: "Dr. João",
        especialidade: "Pediatra",
        diagnostico: "Amigdalite",
      },
    ],
  },
  {
    cpf: "34829012345",
    nome: "Ana Santos",
    dt_nasc: "1988-09-25",
    endereco: {
      rua: "Avenida das Rosas",
      bairro: "Vila Feliz",
      numero: "456",
      cidade: "São Paulo",
      cep: "98765-432",
    },
    historico_consultas: [
      {
        data: "2023-07-10",
        medico: "Dr. Guipa",
        especialidade: "Clínico Geral",
        diagnostico: "Dor de cabeça",
      },
      {
        data: "2023-09-20",
        medico: "Dr. Marcos",
        especialidade: "Ortopedista",
        diagnostico: "Torção no tornozelo",
      },
    ],
  },
  {
    cpf: "48789012823",
    nome: "Carlos Oliveira",
    dt_nasc: "1982-03-12",
    endereco: {
      rua: "Rua dos Lírios",
      bairro: "Jardim Primavera",
      numero: "789",
      cidade: "São Paulo",
      cep: "98765-432",
    },
    historico_consultas: [
      {
        data: "2023-06-25",
        medico: "Dr. João",
        especialidade: "Pediatra",
        diagnostico: "Bronquite",
      },
      {
        data: "2023-08-10",
        medico: "Dr. Guipa",
        especialidade: "Clínico Geral",
        diagnostico: "Gripe",
      },
    ],
  },
  {
    cpf: "99362772544",
    nome: "Ana Rodrigues",
    dt_nasc: "1975-09-18",
    endereco: {
      rua: "Avenida Central",
      bairro: "Centro",
      numero: "987",
      cidade: "São Paulo",
      cep: "56789-123",
    },
    historico_consultas: [
      {
        data: "2023-07-15",
        medico: "Dr. Marcos",
        especialidade: "Ortopedista",
        diagnostico: "Torção no tornozelo",
      },
      {
        data: "2023-09-02",
        medico: "Dr. Guipa",
        especialidade: "Clínico Geral",
        diagnostico: "Sinusite",
      },
    ],
  },
  {
    cpf: "12345678900",
    nome: "Maria Silva",
    dt_nasc: "1990-10-05",
    endereco: {
      rua: "Avenida das Flores",
      bairro: "Vila Nova",
      numero: "123",
      cidade: "São Paulo",
      cep: "12345-678",
    },
    historico_consultas: [
      {
        data: "2023-02-02",
        medico: "Dr. Guipa",
        especialidade: "Clínico Geral",
        diagnostico: "Resfriado",
      },
      {
        data: "2023-04-10",
        medico: "Dr. Marcos",
        especialidade: "Ortopedista",
        diagnostico: "Fratura no braço",
      },
    ],
  },
  {
    cpf: "98765432100",
    nome: "João Santos",
    dt_nasc: "1985-07-15",
    endereco: {
      rua: "Rua das Palmeiras",
      bairro: "Centro",
      numero: "456",
      cidade: "São Paulo",
      cep: "54321-987",
    },
    historico_consultas: [
      {
        data: "2023-03-20",
        medico: "Dr. Marcos",
        especialidade: "Ortopedista",
        diagnostico: "Entorse no tornozelo",
      },
      {
        data: "2023-05-05",
        medico: "Dr. João",
        especialidade: "Pediatra",
        diagnostico: "Amigdalite",
      },
    ],
  },
  {
    cpf: "11223344556",
    nome: "Ana Souza",
    dt_nasc: "1978-12-20",
    endereco: {
      rua: "Rua das Flores",
      bairro: "Jardim Primavera",
      numero: "789",
      cidade: "São Paulo",
      cep: "54321-123",
    },
    historico_consultas: [
      {
        data: "2023-01-15",
        medico: "Dr. Guipa",
        especialidade: "Clínico Geral",
        diagnostico: "Gripe",
      },
      {
        data: "2023-03-02",
        medico: "Dr. João",
        especialidade: "Pediatra",
        diagnostico: "Sinusite",
      },
    ],
  },
  {
    cpf: "99887766554",
    nome: "Pedro Costa",
    dt_nasc: "1995-05-12",
    endereco: {
      rua: "Rua dos Pinheiros",
      bairro: "Jardim Sul",
      numero: "321",
      cidade: "São Paulo",
      cep: "12345-543",
    },
    historico_consultas: [
      {
        data: "2023-02-18",
        medico: "Dr. Marcos",
        especialidade: "Ortopedista",
        diagnostico: "Lesão no joelho",
      },
      {
        data: "2023-04-05",
        medico: "Dr. Guipa",
        especialidade: "Clínico Geral",
        diagnostico: "Dor de cabeça",
      },
    ],
  },
  {
    cpf: "69367625566",
    nome: "José Santos",
    dt_nasc: "1995-08-12",
    endereco: {
      rua: "Rua das Oliveiras",
      bairro: "Jardim Botânico",
      numero: "789",
      cidade: "São Paulo",
      cep: "98765-432",
    },
    historico_consultas: [
      {
        data: "2023-07-10",
        medico: "Dr. Guipa",
        especialidade: "Clínico Geral",
        diagnostico: "Dor de cabeça",
      },
      {
        data: "2023-09-15",
        medico: "Dr. João",
        especialidade: "Pediatra",
        diagnostico: "Gripe",
      },
    ],
  },
]);

// * Coleção consulta
// ToDo Adicionar id de consulta
db.consulta.insertMany([
  {
    data: "02/02/2023",
    medico: "Dr. Guipa",
    crm: "2200001",
    paciente: "Maria Silva",
    diagnostico: "Resfriado",
    cid: "J00",
    internacao: null, // Não há internação associada a esta consulta
  },
  {
    data: "25/04/2023",
    medico: "Dr. Marcos",
    crm: "3200005",
    paciente: "Maria Silva",
    diagnostico: "Fratura no braço",
    cid: "S52.5",
    internacao: {
      data_admissao: "25/04/2023",
      data_alta: "26/04/2023",
      setor: "Emergência",
      hospital: "Hospital São Paulo",
    },
  },
  {
    data: "20/03/2023",
    medico: "Dr. Marcos",
    crm: "3200005",
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
    crm: "4200009",
    paciente: "João Santos",
    diagnostico: "Amigdalite",
    cid: "J03.9",
    internacao: null,
  },
  {
    data: "15/06/2022",
    medico: "Dr. Guipa",
    crm: "2200001",
    paciente: "Maria Silva",
    diagnostico: "Gripe",
    cid: "J10",
    internacao: null,
  },
  {
    data: "25/07/2022",
    medico: "Dr. Marcos",
    crm: "3200005",
    paciente: "Maria Silva",
    diagnostico: "Fratura na perna",
    cid: "S82.1",
    internacao: {
      data_admissao: "25/07/2022",
      data_alta: "27/07/2022",
      setor: "UTI",
      hospital: "Hospital São Paulo",
    },
  },
  {
    data: "10/08/2022",
    medico: "Dr. João",
    crm: "4200009",
    paciente: "João Santos",
    diagnostico: "Otite",
    cid: "H66.9",
    internacao: null,
  },
  {
    data: "05/09/2022",
    medico: "Dr. Guipa",
    crm: "2200001",
    paciente: "Maria Silva",
    diagnostico: "Dor de cabeça",
    cid: "R51",
    internacao: null,
  },
  {
    data: "20/09/2022",
    medico: "Dr. Marcos",
    crm: "3200005",
    paciente: "João Santos",
    diagnostico: "Torção no tornozelo",
    cid: "S93.4",
    internacao: null,
  }
]);
// Index hash para data
db.consulta.createIndex({ data: "hashed" });

// * Coleção enfermeiro
// Ana e João são enfermeiros chefes
db.enfermeiro.insertMany([
  {
    coren: "54321",
    nome: "Enfermeira Ana",
    dt_nasc: "12/03/1992",
    setor: "Emergência",
    chefe: null,
    hospital: 1,
  },
  {
    coren: "98765",
    nome: "Enfermeiro João",
    dt_nasc: "20/09/1988",
    setor: "UTI",
    chefe: null,
    hospital: 2,
  },
  {
    coren: "33333",
    nome: "Enfermeira Laura",
    dt_nasc: "15/02/1993",
    setor: "Emergência",
    chefe: "54321",
    hospital: 1,
  },
  {
    coren: "44444",
    nome: "Enfermeiro Gabriel",
    dt_nasc: "25/06/1991",
    setor: "UTI",
    chefe: "98765",
    hospital: 2,
  },
  {
    coren: "32749",
    nome: "Enfermeira Juliana",
    dt_nasc: "29/03/1987",
    setor: "Emergência",
    chefe: "54321",
    hospital: 1,
  }
]);

// * Coleção prontuario
// o prontuario eh unificado a todos os hospitais
// a coleção gera um relatorio mensal
db.prontuario.insertMany([
  {
    mes_ano: "2022-01",
    qtd_pacientes: 2
  },
  {
    mes_ano: "2022-02",
    qtd_pacientes: 0
  },
  {
    mes_ano: "2022-03",
    qtd_pacientes: 0
  },
  {
    mes_ano: "2022-04",
    qtd_pacientes: 0
  },
  {
    mes_ano: "2022-05",
    qtd_pacientes: 0
  },
  {
    mes_ano: "2022-06",
    qtd_pacientes: 0
  },
  {
    mes_ano: "2022-07",
    qtd_pacientes: 0
  },
  {
    mes_ano: "2022-08",
    qtd_pacientes: 0
  },
  {
    mes_ano: "2022-02",
    qtd_pacientes: 0
  },
  {
    mes_ano: "2022-09",
    qtd_pacientes: 0
  },
  {
    mes_ano: "2022-10",
    qtd_pacientes: 0
  },
  {
    mes_ano: "2022-11",
    qtd_pacientes: 0
  },
  {
    mes_ano: "2022-12",
    qtd_pacientes: 0
  },
  {
    mes_ano: "2023-01",
    qtd_pacientes: 0,
  },
  {
    mes_ano: "2023-02",
    qtd_pacientes: 1
  },
  {
    mes_ano: "2023-04",
    qtd_pacientes: 1
  },
  {
    mes_ano: "2023-05",
    qtd_pacientes: 1
  },
  {
    mes_ano: "2023-06",
    qtd_pacientes: 1
  },
  {
    mes_ano: "2023-07",
    qtd_pacientes: 1
  },
]);
