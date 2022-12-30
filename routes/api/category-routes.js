const router = require('express').Router();
const { json } = require('sequelize/types');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  try {
    const categoryData = Category.findAll({
      include: [{ model: Category }, { model: Product }]
    })
    res.status(200),json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  try {
    const categoryData = Category.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Product }],
    });
      if (!categoryData) {
        res.status(404).json({ message: 'No category found'})
        return;
      }
      res.status(200).json(categoryData);
  } catch (err) {
    res.status(500),json(err);
  }
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  try {
    const categoryData = Category.create({
      id: req.body.id,
    });
    res.status(200),json(categoryData);
  } catch (err) {
    res.status(500).json(categoryData);
  };
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  try {
    const categoryData = Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category with that id'})
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = Category.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id'})
      return;
    }
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
