const configDatabase = {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'codeburger',
  username: 'postgres',
  password: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  },
}

export default configDatabase