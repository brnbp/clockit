module.exports = {
    clock: {
      in: {
        success: 'check in pela manhã feito 👩‍💻',
        error: 'check in pela manhã já foi realizado',
      },
      lunch: {
        in: {
          success: 'check in para o almoço feito 🍝',
          error: 'check in para o almoço já foi realizado',
        },
        out: {
          success: 'marcação da volta do almoço realizada com sucesso 🍽',
          error: 'marcação da volta do almoço já foi realizada anteriormente',
          rule: 'you should clockin for lunch before clockout',
        },
      },
      out: {
        success: 'marcação da saida realizado 👋😎',
        error: 'marcação da saida já foi realizado anteriormente',
        rule: 'Você deve marcar a volta do almoço antes de marcar a saida do trabalho',
      },
      errNotClokedYet: 'Você não fez nenhuma marcação para o dia ainda 🤔',
      noRecordsFound: 'Nenhum Registro Encontrado! 📭',
    },
    table: {
      date: 'Dia',
      in: 'Entrada',
      lin: 'Almoço Ida',
      lout: 'Almoço Volta',
      out: 'Saída',
      total: 'Total',
    }
  };