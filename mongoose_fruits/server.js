require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const Fruit = require("./models/fruits");
const fruitsController = require("./controllers/fruits");

const app = express();
const PORT = process.env.PORT || 3000
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/basiccrud";

mongoose.connect("mongodb://localhost:27017/basiccrud");
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

app.use(express.urlencoded({ extended: true }));
app.use("/fruits", fruitsController);

// // Routes
// // seed route
// app.get("/fruits/seed", async (req, res) => {
//     try {
//         await Fruit.deleteMany({});
//         const newFruits = await Fruit.create(
//           [
//             {
//               name: "grapefruit",
//               color: "pink",
//               readyToEat: true,
//             },
//             {
//               name: "grape",
//               color: "purple",
//               readyToEat: false,
//             },
//             {
//               name: "avocado",
//               color: "green",
//               readyToEat: true,
//             },
//           ]);
//           res.send(newFruits);
//       } catch (error) {
//         res.send(error);
//       };
// });

// // index route
// app.get("/fruits/", async (req, res) => {
//     try {
//         const fruits = await Fruit.find();
//         res.send(fruits)
//       } catch (error) {
//         console.log(error);
//       }; 
// })

// // create route
// app.post("/fruits/", async (req, res) => {
//     if (req.body.readyToEat === "on") {
//       // if checked, req.body.readyToEat is set to 'on'
//       req.body.readyToEat = true;
//     } else {
//       // if not checked, req.body.readyToEat is undefined
//       req.body.readyToEat = false;
//     }
// try {
//     const fruit = await Fruit.create(req.body);
//     console.log(fruit);
// } catch (error) {
//     console.log(error);
// };
//     res.send(req.body);
//   });

// // SHOW route
// app.get("/fruits/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//         const fruit = await Fruit.findById(id);
//         res.send(fruit)
//     } catch (error) {
//         console.log(error);
//         res.send(error)
//     }
// })

// // delete route
// app.delete("/fruits/:id", async (req, res) => {
//     const { id } = req.params;
//     try {
//         const fruit = await Fruit.findByIdAndDelete(id);
//         res.send(fruit);
//     } catch (error) {
//         res.send(error)
//     }
// });

// // update route
// app.put("/fruits/:id", async (req, res) => {
//     const { id } = req.params;
//     if (req.body.readyToEat === "on") {
//         // if checked, req.body.readyToEat is set to 'on'
//         req.body.readyToEat = true;
//       } else {
//         // if not checked, req.body.readyToEat is undefined
//         req.body.readyToEat = false;
//       }
//       try {
//           const fruit = await Fruit.findByIdAndUpdate(id, req.body, { new: true });
//           res.send(fruit);
//       } catch (error) {
//       res.send(req.body);
//     }
//     });

// // test
// // app.get("/", (req, res) => {
// //     res.send("hi")
// // });

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});