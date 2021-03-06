import axios from "axios";

const apiKey = process.env.ALPHA_API_KEY;

export default {
  getCompany: function(companyName){
    console.log("Company Name");
    return axios.get("/api/company/:"+companyName);
  },
  //Searching Nytimes with their API
  searchstocks: function (search){
    console.log(search);
   
   
    console.log("API.js searchStocks")
   return axios.get( "https://www.alphavantage.co/query?function=BATCH_STOCK_QUOTES&symbols="+search+"&apikey="+ apiKey);
  
   // return axios.get( "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&outputsize=compact&symbol=" + search + "&interval="+strInt+"&apikey="+ apiKey);
  },
  individualstock: function (search){
    console.log("Individual %s", search);
    return axios.get( "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&outputsize=compact&symbol=" + search + "&interval=5min&apikey="+ apiKey);
  
  },
  getScrape: function(){
    let ticker = sessionStorage.individual;
    console.log("api zacks ticker: "+ticker);
    return axios.get("/api/stock/scrape/"+ticker);
  },
  scrapeZacks:function(){
    let ticker = sessionStorage.individual;
    console.log("api scraping ticker: "+ticker);
    return axios.get("/api/stock/zack/"+ticker);
  },
 getTrump: function (){
   console.log("axios trump");
   return axios.get("api/stock/tweets/trump");
 },
  // Gets all stock
  getallstocks: function(id) {
    console.log("API %s",id);
    return axios.get("/api/stock/" +id);
  },
  //Scrape Investopedia
  getInvesto: function(){
    console.log("axios getInvesto");
    return axios.get("/api/stock/investo");
  },
 
  // // Deletes the stock with the given id
  deletestock: function(id,ticker) {
    console.log("Ticker: " +ticker);
    return axios.put("/api/stock/delete/" + id,ticker);
  },
  // Saves a stock to the database
  savestock: function(stockData,id) {
    console.log("hit API.js updating symbol array");
    console.log(stockData);
    return axios.put("/api/stock/"+id, stockData);
  },
  signInUser: function(content) {
    console.log("hit API.js signInUser");
    console.log(content.userName+"\n"+content.password);
    
    return axios.post("/api/stock/signin/:"+content.userName+"/:"+content.password,content);
  },
  signUpUser: function(content) {
    console.log("hit API.js signUpUser");
    console.log(content.userName+"\n"+content.password);
    
    return axios.post("/api/stock/signup/:"+content.userName+"/:"+content.password,content);
  }
  
};
