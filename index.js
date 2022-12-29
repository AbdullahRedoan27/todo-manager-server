const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.zpaqsgt.mongodb.net/?retryWrites=true&w=majority`;
  console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

function run() {
    const tasksCollection = client.db('TaskManager').collection("tasks");
    
    app.post('/addtask', async(req, res)=>{
        const task = req.body;
        const result =await tasksCollection.insertOne(task);
        res.send(result);
    })

}
run();

app.get("/", async (req, res) => {
  res.send("todo server running");
});

app.listen(port, () => {
  console.log(`todo server running on ${port}`);
});
