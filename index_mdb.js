const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const { MongoClient, ServerApiVersion } = require("mongodb");

const {
  parsed: { URI_MDB: uri },
} = require("dotenv").config();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Successful connection
    const collection = await client
      .db("sample_airbnb")
      .collection("listingsAndReviews");

    const pipeline = [
      {
        $project: {
          name: 1,
          amenities: 1,
          price: 1,
          images: 1,
          description: 1,
        },
      },
      { $limit: 2 },
    ];

    const agg = await collection.aggregate(pipeline).toArray();
    console.log(agg);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
