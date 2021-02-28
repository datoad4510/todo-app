const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const MongoClient = require("mongodb").MongoClient;
const { response } = require("express");
const url =
    "mongodb+srv://dato:Irakli58@cluster0.m8xlq.mongodb.net/test?retryWrites=true&w=majority";

app.get("/", (req, res) => {
    // pull list items from server
    res.send("Hello World!");
});

app.post("/", (req, res) => {
    //insert item into database
    const list_item = req.body;
    const client = new MongoClient(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    client.connect((err) => {
        const collection = client.db("test").collection("list-items");
        try {
            collection.insertOne(list_item);
            console.log(`Inserted ${list_item.data}`);
        } catch (error) {
            throw error;
        }
    });
    client.close();
    res.send(`Got a new list item ${list_item.data}`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
