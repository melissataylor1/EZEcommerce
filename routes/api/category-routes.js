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

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
