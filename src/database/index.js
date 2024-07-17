import Sequelize from 'sequelize'
import User from '../app/models/User.js'
import Product from '../app/models/Product.js'
import Category from '../app/models/Category.js'
import mongoose from 'mongoose'
import configDatabase from '../config/database.js'

const models = [User, Product, Category]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(configDatabase)
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb+srv://luangomesdv:codeburger123@codeburger.ualxxky.mongodb.net/?retryWrites=true&w=majority&appName=CodeBurger',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
  }
}

export default new Database()
