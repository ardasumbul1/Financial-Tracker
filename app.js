require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const shortid = require('shortid');


mongoose.connect(process.env.MONGODB_URL)

const Transition = mongoose.model('Transition',{
    id: String,
    type: String,
    amount: Number,
    currency: String,
    explanation: String,
    date: Date,
    dollarValue: Number

});

const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

let todays_rates;
let currency_codes = []; 
let last_fetch;
let wantedCurrencyValue;
let wantedCurrencyName ="";


async function fetchData(){

    var myHeaders = new Headers();
    myHeaders.append("apikey", process.env.API_KEY);
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    await fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOptions)
    .then(response => response.text())
    .then(result => {
      
      const parsedData = JSON.parse(result);
      for (const key in parsedData.symbols) {
        currency_codes.push(key);
      }
    })
    .catch(error => console.log('error', error));
    
    await fetch("https://api.apilayer.com/exchangerates_data/latest?symbols="+currency_codes+"&base=USD", requestOptions)
      .then(response => response.text())
      .then(result => {
        let parsedResult = JSON.parse(result);
        todays_rates =  parsedResult.rates;
        last_fetch = new Date().getDate();
      }
    )
}
 
app.get('/', async (req, res) => {

    // Check fetchData run once a day for lower api usage.
    if(last_fetch != new Date().getDate()){
        await fetchData();
    }
    if(wantedCurrencyName.length >0){
      wantedCurrencyValue = todays_rates[wantedCurrencyName];
    }else{
      wantedCurrencyName = "USD";
      wantedCurrencyValue = todays_rates["USD"];

    }
 

    const transitions = await Transition.find();
    const incomes = await Transition.find({type:"income"});
    const expenses = await Transition.find({type:"expense"});
    
    res.render("index",{transitions:transitions, currencies:currency_codes, rateOfcurrency: wantedCurrencyValue,currencyName:wantedCurrencyName, incomes:incomes, expenses: expenses});
})

app.post('/', async (req, res) => {

    const amount = req.body.amount;
    let type = req.body.toggle;
    const currency = req.body.currency;
    const explanation = req.body.explanation;
    let date = new Date();

    const action = new Transition({
        id: shortid.generate(),
        type: type ==="income"?"income":"expense",
        amount: amount,
        currency: currency,
        explanation: explanation,
        date: date,
        dollarValue: amount/(todays_rates[currency])
    })

    action.save().then(()=>{ console.log("success!"); })
    res.redirect("/");
})


app.post("/delete",async function(req,res){
  const selected_item_id = req.body.delete;

  await Transition.findOneAndDelete({id:selected_item_id});
  res.redirect("/");

})

app.post("/filter",async function(req,res){
  const selected_item_id = req.body.currency2;
  wantedCurrencyName = selected_item_id;
  res.redirect("/");

})

app.listen(3000,()=>{
    console.log('listening on port 3000');
})