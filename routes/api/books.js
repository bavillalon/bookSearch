
const router = require("express").Router();
const booksController = require("../../controllers/booksController");
const axios = require("axios");

const APIKey = process.env.GOOGLE_KEY;

router.route("/search")
  .get((req, res) => {
    console.log(req.query.q)
    axios
      .get("https://www.googleapis.com/books/v1/volumes?", { params: { q: req.query.q, key: APIKey } })
      .then(({ data: { items } }) => {
        res.json(items)
      })
      .catch(err => res.status(422).json(err));
  });

// Matches with "/api/books"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;
