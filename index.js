const express = require('express')
const app = express()
const cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb')
require('dotenv').config()

const client = new MongoClient(process.env.MONOG_URL)
const database = client.db("fcc-exercise")

app.use(cors())
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended : false}))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/users", async (req, res)=>{
  const { username } = req.body;
  const insertedUser = await database.collection("users")
    .insertOne({ username })
  if(!insertedUser.acknowledged) return res.json({ error : "user insertion failed"})
  return res.json({
    username,
    _id : insertedUser.insertedId
  })
}).get("/api/users", async (req, res)=>{
  const users = await database.collection("users")
    .find().toArray()
  return res.json(users)
})

app.post("/api/users/:_id/exercises", async (req, res)=>{
  const _id = req.params._id;
  const { description, duration, date } = req.body
  const dateToUse = new Date().toDateString(date || Date())
  if(!description || !duration) return res.json({error : "Invalid input"})
  const updatedLogs = await database.collection("users").findOneAndUpdate({
    _id : new ObjectId(_id)
  }, {$push : { logs : {
    duration : Number(duration),
    description,
    date : dateToUse
  }}})
  console.log("The updated logs are", updatedLogs)
  if(!updatedLogs) return res.json("log post modification failed")
  return res.json({
    username : updatedLogs.username,
    _id,
    date : dateToUse,
    duration,
    description
  })
})

app.get("/api/users/:_id/logs", async (req, res)=>{
  const _id = req.params._id
  const { from , to, limit } = req.query
  const user = await database.collection("users").findOne(
    { _id : new ObjectId(_id) })
  if(!user) return res.json("cannot find user")
    console.log("THe iso date ", new Date(user.logs[3].date))
  let userLogs = user.logs;
  if(from  && to){
    userLogs = userLogs.filter(log => ( new Date(log.date) >= new Date(from)) && (
      new Date(log.date) <= new Date(to) 
    ))
  }
  if(limit){
    userLogs = userLogs.slice(0, limit + 1)
  }
   return res.json({
    username : user.username,
    _id,
    log: userLogs,
    count: user.logs.length
  })
})


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
