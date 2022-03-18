var router = require("express").Router();

const tutorials = require("../controllers/tutorial.controller.js");
const auth = require("./../middleware/auth");


// get all
router.get("/", tutorials.findAll);

// all published
router.get("/published", tutorials.findAllPublished);

// get by id
router.get("/:id", tutorials.findOne);

// create
router.post("/", tutorials.create);

// update 
router.put("/:id/:published", tutorials.update);
router.put("/:id", tutorials.update);

// del
router.delete("/:id", auth, tutorials.delete);

// truncate
router.post("/login/", tutorials.login);

// Create a new Tutorial
//router.delete("/", tutorials.deleteAll);

module.exports = router;