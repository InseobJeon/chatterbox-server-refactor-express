const express = require('express')
const app = express();
const PORT = process.env.NODE_ENV === 'production' ? 3001: 3002 

// setting router
// const router = express.Router()

// using middleware list
const bodyParser = require('body-parser');
const cors = require('cors');

// adding middleware to express

// using body-parser's json parser
app.use(bodyParser.json());
// cors setting and enable all preflight request
app.use(cors());
app.options('*', cors());

let container = {
    "results": []
}

// router section 
app.get('/messages',(req,res)=>{
    res.send(JSON.stringify(container));
});
app.post('/messages',(req,res)=>{
    container.results.push(req.body);
    res.send(JSON.stringify(req.body));
});

app.listen(PORT,()=>{
   console.log(`server listen on ${PORT}`)
});


