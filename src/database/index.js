import Sequelize from "sequelize"
// import configDatabase from "../config/database"
import mongoose from "mongoose"
import dotenv from 'dotenv'
import User from "../app/models/User.js"
import Product from "../app/models/Product.js"
import Category from "../app/models/Category.js"
import configDatabase from "../config/database.cjs"

const models = [User, Product, Category]
dotenv.config()

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
        (model) => model.associate && model.associate(this.connection.models)
      )
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
  }
}

export default new Database()
