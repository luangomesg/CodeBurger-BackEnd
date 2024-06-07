import Sequelize from 'sequelize'
// import configDatabase from '../config/database'
import User from '../app/models/User.js'
import Product from '../app/models/Product.js'
import Category from '../app/models/Category.js'
import mongoose from 'mongoose'

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize('postgres://luan:cPOWr1vLpHazdAW8mCNz7HjuPW6rawmk@dpg-cphi8m8cmk4c73eieig0-a.oregon-postgres.render.com/codeburger')
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://mongo:jwPRmXAQNXTsgpkMgUyzVtUVmKCiLnIk@roundhouse.proxy.rlwy.net:10343',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
  }
}

export default new Database()
