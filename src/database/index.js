import Sequelize from 'sequelize'
import User from '../app/models/User.js'
import Product from '../app/models/Product.js'
import Category from '../app/models/Category.js'
import mongoose from 'mongoose'
import configDatabase from '../config/database.js'
import dotenv from 'dotenv'

const models = [User, Product, Category]
dotenv.config()

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize('postgresql://luan:OKeO7ZZZxbTq9gRGgIqXIn1Tc0zYd91x@dpg-cqbhikggph6c73c0j1sg-a.oregon-postgres.render.com/codeburger_1m2g')
    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models),
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    )
  }
}

export default new Database()
