const express = require("express");
const app = express();
const PORT = 8080;

// MIDDLEWARE - Shared code that runs before every endpoint.
// Here, we'll use MIDDLEWARE to parse our content(body) into JSON
app.use(express.json());

// req(obj) - incoming data
// res(obj) - outgoing data, what's sent back to the client (front end)
// http://localhost:8080/tshirt
app.get("/tshirt", (req, res) => {
  res.status(200).send({
    sizes: ["S", "M", "L", "XL"],
    colors: ["green", "mustard", "brick"],
    icon: "👕",
  });
});

// Post request - Looking to create new data on a server
// :id , captures dynamic values inside the URL
app.post("/tshirt/:id", (req, res) => {
  const { id } = req.params;
  const { icon } = req.body;

  if (!icon) {
    res.status(418).send({
      message: "Mayday! Mayday! NEED Logo.",
    });
  }

  res.send({
    tshirt: `${icon} tshirt is on the way to ID: ${id}.`,
  });
});

app.listen(PORT, () => console.log(`🎗️ It's ALIVEEEEE! Check port: ${PORT}`));
