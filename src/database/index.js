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
    this.connection = new Sequelize('postgresql://postgres:VWYYzNVxiSrIcvPqbJXmgeILWycxVZmw@viaduct.proxy.rlwy.net:57201/railway')
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://mongo:blNIbbdVaRgjNbxFJZodOkuKybhYIdIw@roundhouse.proxy.rlwy.net:38484',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
  }
}

export default new Database()
