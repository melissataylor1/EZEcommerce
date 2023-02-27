const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

//get route for category and any associated product models
router.get('/', (req, res) => {
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

//find cateogy by id value
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
router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
