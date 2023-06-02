// deletar o medico X da lista de médicos
db.medico.deleteOne({crm: "6200040"})

// Deleta todos os medicos com idade maior que X anos
db.medico.deleteMany({
    $expr: {
      $gt: [
        { $subtract: [new Date(), { $toDate: "$dt_nasc" }] },
        80 * 365 * 24 * 60 * 60 * 1000 // 80 anos em milissegundos
      ]
    }
  });

// Deleta todos os medicos que a quantidade de hospitais seja menor que 1
db.medico.deleteMany({$expr: {$lt: [{$size: "$hospitais"}, 1]}})