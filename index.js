const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
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
    const completedTasksCollection = client.db('TaskManager').collection("completed");
    
    app.post('/addtask', async(req, res)=>{
        const task = req.body;
        const result =await tasksCollection.insertOne(task);
        res.send(result);
    })

    app.get('/task', async(req, res)=>{
        const id = req.query.id;
        const query = {_id: ObjectId(id)}
        const result =await tasksCollection.findOne(query);
        res.send(result);
    })

    app.post('/completed', async(req, res)=>{
        const task = req.body.completedTask;
        delete task._id;
        const result =await completedTasksCollection.insertOne(task);
        res.send(result);
    })

    app.get('/mytasks', async(req, res) =>{
        const email = req.query.email;
        const query = {email: email};
        const result = await tasksCollection.find(query).toArray();
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
