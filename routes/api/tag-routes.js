const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models'); //where am i supposed to use this producttag?

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, }]
    })
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [{ model: Product, through: ProductTag, }]
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

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      id: req.body.id,
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(tagData);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with that id' })
      return;
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id' })
      return;
    }
    res.status(200).json(tagData)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
