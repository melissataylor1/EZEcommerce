const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//get route for category and any associated product models
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll ({
      include: [
        { model: Product }
      ],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500),json(err);
  }
});

//find category by id value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product}],
});
if (!categoryData) {
  res.status(404).json({ message: 'No category found with that id!' });
  return;
}
res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
  console.log(err);
}
});

//post route for creating new category 
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

//updates an existing category in the database with the data provided in the request body.
router.put('/:id', async (req, res) => {
  Category.update(
    {
      id: req.body.id,
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
