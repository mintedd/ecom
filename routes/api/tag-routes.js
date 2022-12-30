const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  try {
    const tagData = Tag.findAll({
      include: [{ model: Tag }, { model: Product }]
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = Tag.findByPk(req.params.id, {
      include: [{ model: Tag }, { model: Product }]
    })
    if (!tagData) {
      res.status(404).json({ message: 'No tags found' })
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    const tagData = Tag.create({
      id: req.body.id,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(tagData);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with that id'})
    return;
    }
    res.status(200).json(tagData)
  } catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id'})
      return;
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
