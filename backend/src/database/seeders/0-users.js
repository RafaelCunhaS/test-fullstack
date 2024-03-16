module.exports = {
  up: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        name: 'John Doe',
        email: 'johndoe@email.com',
        cpf: '12345678901',
        phonenumber: '12345678901',
        status: 'Ativo'
      },
      {
        name: 'Jane Smith',
        email: 'janesmith@email.com',
        cpf: '98765432109',
        phonenumber: '98765432109',
        status: 'Inativo'
      },
      {
        name: 'Alice Johnson',
        email: 'alicejohnson@email.com',
        cpf: '45678901234',
        phonenumber: '45678901234',
        status: 'Aguardando ativação'
      },
      {
        name: 'Bob Williams',
        email: 'bobwilliams@email.com',
        cpf: '56789012345',
        phonenumber: '56789012345',
        status: 'Desativado'
      },
      {
        name: 'Sarah Davis',
        email: 'sarahdavis@email.com',
        cpf: '67890123456',
        phonenumber: '67890123456',
        status: 'Ativo'
      },
      {
        name: 'Michael Wilson',
        email: 'michaelwilson@email.com',
        cpf: '78901234567',
        phonenumber: '78901234567',
        status: 'Inativo'
      },
      {
        name: 'Emily Brown',
        email: 'emilybrown@email.com',
        cpf: '89012345678',
        phonenumber: '89012345678',
        status: 'Aguardando ativação'
      },
      {
        name: 'David Taylor',
        email: 'davidtaylor@email.com',
        cpf: '90123456789',
        phonenumber: '90123456789',
        status: 'Desativado'
      },
      {
        name: 'Olivia Martinez',
        email: 'oliviamartinez@email.com',
        cpf: '01234567890',
        phonenumber: '01234567890',
        status: 'Ativo'
      },
      {
        name: 'James Anderson',
        email: 'jamesanderson@email.com',
        cpf: '23456789012',
        phonenumber: '23456789012',
        status: 'Inativo'
      }
    ])
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.bulkDelete('users', null, {})
  }
}
