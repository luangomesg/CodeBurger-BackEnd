
const configDatabase = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Para ambientes de desenvolvimento, pode ser necessário desativar a verificação de certificado
    }
  },
  url: 'postgresql://luan_kyu1_user:pSycvwIWQYQXBInpwwezAqvmB7JyHOtU@dpg-cr29nftsvqrc73cld4r0-a/luan_kyu1',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
};

export default configDatabase;

