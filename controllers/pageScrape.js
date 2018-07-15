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

        // use something like this to strip style attributes from incoming HTML:
        //$1.find('*[style]').removeAttr('style');
       
        var dayStats = $1("#stock_activity").text().trim();
        var earningsStats = $1("#stock_key_earnings").text().trim();
        var zackRack = $1(".rank_view").html().split(/<span/g)[0].trim();
        //console.log(dayStats);
        var pegRatio = earningsStats.split(/PEG Ratio/g)[1].trim();
        var open = dayStats
        var open = dayStats.toString().trim().split(/Open/g)[1].split(/Day/g)[0].trim();
      //  console.log("peg: " + pegRatio);
       // console.log("Open %s", open);
       let Wk52Low = dayStats.split(/52 Wk Low/g)[1].split(/52 Wk High/g)[0].trim();
       let Wk52High = dayStats.split(/52 Wk High/g)[1].split(/Avg/g)[0].trim();
       let dividend = dayStats.split(/Dividend/g)[1].split(/Beta/g)[0].trim();
       let Beta = dayStats.split(/Beta/g)[1].trim();
        
        console.log("========================================");
        console.log("Open: %s\n52 Week low: %s\n52 week high: %s\nDividend: %s\nBeta: %s", open, Wk52Low, Wk52High, dividend, Beta);
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
},

investopediaScrape: function(req,res){
    investo={};
    console.log("Controller Scraping Investopedia");
    request("https://www.investopedia.com/", function (error, response,html){
        var $2 = cheerio.load(html);
        var TopNewsCL2 = $2(".cl-2").find("li").html().trim();
        var cl2href = "https://www.investopedia.com"+ $2(".cl-2").find("li").html().trim().split(/href="/g)[1].split(/"/g)[0];
        var cl2Title= $2(".cl-2").find(".title").text();
        var slot2href ="https://www.investopedia.com" + $2("#slot-2").find("a").attr("href");
        var slot2Title = $2("#slot-2").find(".title").text();
        var slot3href ="https://www.investopedia.com" + $2("#slot-3").find("a").attr("href");
        var slot3Title = $2("#slot-3").find(".title").text();
        var slot4href ="https://www.investopedia.com" + $2("#slot-4").find("a").attr("href");
        var slot4Title = $2("#slot-4").find(".title").text();
        var slot5href ="https://www.investopedia.com" + $2("#slot-5").find("a").attr("href");
        var slot5Title = $2("#slot-5").find(".title").text();
        var slot6href ="https://www.investopedia.com" + $2("#slot-6").find("a").attr("href");
        var slot6Title = $2("#slot-6").find(".title").text();

        console.log("Largest News Image: " + TopNewsCL2);
        console.log("cl2href: %s", cl2href);
        console.log("cl2Title: %s\n", cl2Title);
        console.log("Slot 2href: %s", slot2href);
        console.log("Slot 2 Title: %s\n", slot2Title);
        console.log("Slot 3href: %s", slot3href);
        console.log("Slot 3 Title: %s\n", slot3Title);
        console.log("Slot 4href: %s", slot4href);
        console.log("Slot 4 Title: %s\n", slot4Title);
        console.log("Slot 5href: %s", slot5href);
        console.log("Slot 5 Title: %s\n", slot5Title);
        console.log("Slot 6href: %s", slot6href);
        console.log("Slot 6 Title: %s\n", slot6Title);
        
        
        investo ={
            cl2href,
            cl2Title,
            slot2href,
            slot2Title,
            slot3href,
            slot3Title,
            slot4href,
            slot4Title,
            slot5href,
            slot5Title,
            slot6href,
            slot6Title
        }
        if (!error) {
            res.send(investo);
         }
         else {
             console.log('ERROR: ' + error);
         }

    })
}

}


