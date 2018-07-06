var cheerio = require("cheerio");
var request = require("request");
//var ticker = req.params.ticker;
//var ticker = "aapl";
console.log("Searching for Scrapes");
module.exports = {
scrapingYahoo: function(req,res){
        console.log("Searching yahoo");
   // console.log(req.params.ticker);
    let ticker = req.params.ticker;
    result ={};
   
    //var resultYahoo = {};
        request("https://finance.yahoo.com/quote/"+ticker+"?p="+ticker, function (error, response,html){
        var $ = cheerio.load(html);
        var resultYahoo = {};
        yahooInfo = $("td").attr(['data-test=ONE_YEAR_TARGET_PRICE-value']).text();
        yahoo52WeekTarget = yahooInfo.split(/Target Est/g)[1];
       console.log("52 Week: %s",yahoo52WeekTarget);
        yahooEarnings = yahooInfo.split(/Earnings Date/g)[1].split(/Forward/g)[0];
        console.log("Earnings Date: %s",yahooEarnings);
        //console.log(yahooInfo);
        console.log("Done scraping yahoo");
        resultYahoo = {
            yahoo52WeekTarget,
            yahooEarnings
        };
        console.log(resultYahoo);
        if (!error) {
            
           res.send(resultYahoo);
          
        }
        else {
            console.log('ERROR: ' + error);
           
        }
})
},   

scrapingZacks: function(req,res){


    let ticker = req.params.ticker;
    results = {};
    request("https://www.zacks.com/stock/quote/"+ticker, function (error, response,html){
        var $1 = cheerio.load(html);
        //var dayStats = $1("#stock_activity").html();
        var dayStats = $1("#stock_activity").text().trim();
        //var earningsStats = $1("#stock_key_earnings").html();
        var earningsStats = $1("#stock_key_earnings").text().trim();
        var zackRack = $1(".rank_view").html().split(/<span/g)[0].trim();
    //    $1(".abut_bottom").each((i,element)=>{
    //       test1 = $1(this).find("a").html();
    //     console.log(test1);
    //    });
    
       // console.log(earningsStats);
       console.log(dayStats);
        var pegRatio = earningsStats.split(/PEG Ratio/g)[1].trim();
        var open = dayStats
        var open = dayStats.toString().trim().split(/Open/g)[1].split(/Day/g)[0].trim();
        console.log("peg: " + pegRatio);
        console.log("Open %s", open);
       let Wk52Low = dayStats.split(/52 Wk Low/g)[1].split(/52/g)[0].trim();
       let Wk52High = dayStats.split(/52 Wk High/g)[1].split(/Avg/g)[0].trim();
       let dividend = dayStats.split(/Dividend/g)[1].split(/Beta/g)[0].trim();
       let Beta = dayStats.split(/Beta/g)[1].trim();
       
        console.log("Open: %s\n52 Week low: %s\n52 week high: %s\nDividend: %s\nBeta: %s", open, Wk52Low, Wk52High, dividend, Beta);
        console.log("========================================");
       
        console.log("========================================");
        console.log(zackRack); 

        console.log("Done scraping zacks");
        results={
            open,
            pegRatio,
            Wk52Low,
            Wk52High,
            dividend,
            Beta,
            zackRack
        } 
    if (!error) {
       
        
         
        res.send(results);
       
     }
     else {
         console.log('ERROR: ' + error);
        
     }
        
    
})




}
}


