const express = require("express");
const Fruit = require("../models/fruits");

const router = express.Router();

// Routes
// seed route
router.get("/seed", async (req, res) => {
    try {
        await Fruit.deleteMany({});
        const newFruits = await Fruit.create(
          [
            {
              name: "grapefruit",
              color: "pink",
              readyToEat: true,
            },
            {
              name: "grape",
              color: "purple",
              readyToEat: false,
            },
            {
              name: "avocado",
              color: "green",
              readyToEat: true,
            },
          ]);
          res.send(newFruits);
      } catch (error) {
        res.send(error);
      };
});

// index route
router.get("/", async (req, res) => {
    try {
        const fruits = await Fruit.find();
        res.send(fruits)
      } catch (error) {
        console.log(error);
      }; 
})

// create route
router.post("/", async (req, res) => {
    if (req.body.readyToEat === "on") {
      // if checked, req.body.readyToEat is set to 'on'
      req.body.readyToEat = true;
    } else {
      // if not checked, req.body.readyToEat is undefined
      req.body.readyToEat = false;
    }
try {
    const fruit = await Fruit.create(req.body);
    console.log(fruit);
} catch (error) {
    console.log(error);
};
    res.send(req.body);
  });

// SHOW route
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const fruit = await Fruit.findById(id);
        res.send(fruit)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
})

// delete route
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const fruit = await Fruit.findByIdAndDelete(id);
        res.send(fruit);
    } catch (error) {
        res.send(error)
    }
});

// update route
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    if (req.body.readyToEat === "on") {
        // if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
      } else {
        // if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
      }
      try {
          const fruit = await Fruit.findByIdAndUpdate(id, req.body, { new: true });
          res.send(fruit);
      } catch (error) {
      res.send(req.body);
    }
    });

// test
// app.get("/", (req, res) => {
//     res.send("hi")
// });

module.exports = router;