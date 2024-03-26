import * as Yup from 'yup'
import Category from '../models/Category'
import User from '../models/User'

class CategoryController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    const { name } = request.body

    const { filename: path } = request.file

    const categoryExists = await Category.findOne({ where: { name } })

    if (categoryExists) {
      return response.status(400).json({ error: 'Category already exists' })
    }

    if (!isAdmin) {
      return response
        .status(401)
        .json({ message: 'only admin users are authorized' })
    }

    const { id } = await Category.create({
      name,
      path,
    })

    return response.status(200).json({ name, id })
  }

  async index(request, response) {
    const categories = await Category.findAll()

    return response.json(categories)
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err })
    }

    const { admin: isAdmin } = await User.findByPk(request.userId)

    const { name } = request.body

    const id = request.params.id

    const category = await Category.findByPk(id)

    if (!category) {
      return response
        .status(401)
        .json({ error: 'make sure your category id is correct' })
    }

    let path
    if (request.file) {
      path = request.file.filename
    }

    if (!isAdmin) {
      return response
        .status(401)
        .json({ message: 'only admin users are authorized' })
    }

    await Category.update(
      {
        name,
        path,
      },
      {
        where: { id },
      },
    )

    return response.status(200).json()
  }
}

export default new CategoryController()
