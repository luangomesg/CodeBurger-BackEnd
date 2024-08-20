
const configDatabase = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Para ambientes de desenvolvimento, pode ser necessário desativar a verificação de certificado
    }
  },
  url: 'postgresql://luan:OKeO7ZZZxbTq9gRGgIqXIn1Tc0zYd91x@dpg-cqbhikggph6c73c0j1sg-a/codeburger_1m2g',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};

export default configDatabase;

