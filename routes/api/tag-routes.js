const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//find singular tag
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id,{
      include: [{ model: Product, through: ProductTag }],
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

//update
router.put('/:id', async (req, res) => {
  Tag.update(
    //all aspects of route body that can be displayed for update 
    {
      id: req.body.id,
      tag_name: req.body.tag_name,
    }, { // get request for category from id given in request body
      where: {
        id: req.params.id,
      },
    }
  ) //update tag and then respond with the updated tag in JSON
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

//delete
router.delete('/:id', async (req, res) => {
  try {
    const tagDestroy = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagDestroy) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagDestroy);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
