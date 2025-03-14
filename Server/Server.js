express = require('express')
eobj=express()
port=5100

const {MongoClient} = require("mongodb");
const URL="mongodb://localhost:27017"
const client=new MongoClient(URL)

async function getConnected() {
    let result = await client.connect()
    let db = result.db("Marvellous")
    return db.collection("BatchesList")
}

async function showData() {
    let data = await getConnected()
    data = await data.find().toArray();
    console.log("This data is retrieved from MongoDB")
    console.log(data)
}

async function addData() {
    let data = await getConnected()
    let result = await data.insertOne({
        "Name":"LSP","Fees":"19000","Duration":"3 months"
    })
    if(result.acknowledged){
        console.log("Data is inserted successfully into MongoDB")
    }
}

async function changeData() {
    let data = await getConnected()
    let result = await data.updateOne({
        "Name":"LSP"
    },
    {$set:{"Fees":"20500"}})
    if(result.acknowledged){
        console.log("Data is updated successfully inside MongoDB")
    }
    
}

async function removeData() {
    let data = await getConnected()
    let result = await data.deleteOne({
        "Name":"LSP"
    })
    if(result.acknowledged){
        console.log("This data is removed from MongoDB")
    }
}

async function serverDisplay() {
    eobj.listen(port, function(req,res){
        console.log("Marvellous Server is started succesfully");
      });
      
      //Handling cors Cross Origine Resource sharing
      eobj.use((req,res,next)=>{
        res.header("Access-Control-Allow-Origin",
        "http://localhost:4200");
      
        res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-with, Content-Type, Accept");
      
        next();
      });
      
      eobj.get('/',MarvellousGet);
      
      function MarvellousGet(req,res)
      {
        res.send("Marvellous Server is ON");
      }
      
      eobj.get('/getBatches',MarvellousGetBatches);
      
      function MarvellousGetBatches(req,res)
      {
        res.json(data);
      }
}

function main(){
    let ret;

    ret=getConnected();
    console.log(ret)
    console.log("Database connection is successfully live")
    showData()
    // addData()
    // changeData()
    // removeData()
    // showData()
    serverDisplay()
}

main()