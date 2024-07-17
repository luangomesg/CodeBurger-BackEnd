import * as Yup from 'yup';
import Category from '../models/Category.js';
import User from '../models/User.js';

class CategoryController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err });
    }

    try {
      const user = await User.findByPk(request.userId);

      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }

      const { admin: isAdmin } = user;

      const { name } = request.body;
      const { filename: path } = request.file;

      const categoryExists = await Category.findOne({ where: { name } });

      if (categoryExists) {
        return response.status(400).json({ error: 'Category already exists' });
      }

      if (!isAdmin) {
        return response.status(401).json({ message: 'Only admin users are authorized' });
      }

      const { id } = await Category.create({
        name,
        path,
      });

      return response.status(200).json({ name, id });
    } catch (error) {
      console.error('Error storing category:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async index(request, response) {
    try {
      const categories = await Category.findAll();
      return response.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
    });

    try {
      await schema.validateSync(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err });
    }

    try {
      const user = await User.findByPk(request.userId);

      if (!user) {
        return response.status(404).json({ error: 'User not found' });
      }

      const { admin: isAdmin } = user;

      const { name } = request.body;
      const id = request.params.id;

      const category = await Category.findByPk(id);

      if (!category) {
        return response.status(404).json({ error: 'Category not found' });
      }

      let path;
      if (request.file) {
        path = request.file.filename;
      }

      if (!isAdmin) {
        return response.status(401).json({ message: 'Only admin users are authorized' });
      }

      await Category.update(
        {
          name,
          path,
        },
        {
          where: { id },
        }
      );

      return response.status(200).json();
    } catch (error) {
      console.error('Error updating category:', error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new CategoryController();
