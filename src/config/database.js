
const configDatabase = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'codeburger',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  }
};

export { configDatabase }; 
