const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  const tagData = await Tag.findAll({
    include: Product
  }).catch((err) => {
    res.json(err);
  });
  res.json(tagData);
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  try {
    const tagData = await Tag.findByPk(req.params.id, {
     
    });

    if (!tagData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    // 200 status code means the request is successful
    res.status(200).json(tagData);
  } catch (err) {
    // 400 status code means the server could not understand the request
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body,{where: {id:req.params.id}})

    if (!tagData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    

    res.status(200).json({message: "Updated the data for id " + req.params.id});
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.findByPk(req.params.id);

    if (!tagData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }else{
      await tagData.destroy();
    }

    res.status(200).json({message: "Destroyed the data for id " + req.params.id});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
