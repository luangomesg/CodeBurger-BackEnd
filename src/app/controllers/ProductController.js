import * as Yup from 'yup'
import Product from '../models/Product.js'
import Category from '../models/Category.js'
import User from '../models/User.js'

class ProductsController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      price: Yup.number().required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ message: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)
    if (!isAdmin) {
      return response
        .status(401)
        .json({ message: 'only admin user are authorized' })
    }

    const { filename: path } = request.file
    const { name, price, category_id, offer } = request.body

    const product = await Product.create({
      name,
      price: Number(price),
      category_id,
      path,
      offer,
    })

    return response.status(200).json(product)
  }

  async index(request, response) {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      ],
    })
    return response.json(products)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      price: Yup.number(),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    if (!isAdmin) {
      return response
        .status(401)
        .json({ message: 'only admin users are authorized' })
    }

    const id = request.params.id

    const product = await Product.findByPk(id)

    if (!product) {
      return response
        .status(401)
        .json({ error: 'make sure your product ID is correct' })
    }

    let path
    if (request.file) {
      path = request.file.filename
    }

    const { name, price, category_id, offer } = request.body

    await Product.update(
      {
        name,
        price,
        category_id,
        path,
        offer,
      },
      { where: { id } },
    )

    return response.status(200).json()
  }

  async delete(request, response) {
    const { admin: isAdmin } = await User.findByPk(request.userId)

    if (!isAdmin) {
      return response
        .status(401)
        .json({ message: 'only admin users are authorized' })
    }

    const id = request.params.id

    const product = await Product.findByPk(id)

    if (!product) {
      return response
        .status(401)
        .json({ error: 'make sure your product ID is correct' })
    }

    await Product.destroy({ where: { id } })

    return response.status(200).json({ message: 'Product deleted successfully' })
  }
}



export default new ProductsController()
