var StockSymbolLookup = require('stock-symbol-lookup');
module.exports = {
    companyCheck: function(req,res){
        console.log("Company Controller Hit");
        var companyName = req.params.companyName.split(/:/g)[1];
        console.log(companyName);
        StockSymbolLookup.loadData()
            .then((data) => {
       // console.log(data);
        // this can currently only be done server-side.
        // data is now available to be searched inside or outside of this function.
            StockSymbolLookup.search(companyName)
            .then((data) => {

            console.log(data);
            if(data){
                
                res.json(data.securities);
            }
            if (!data){
                res.send("No Information found");
            }
            // data is an object.
            // data.symbols contains the return values of searchBySymbol(input, maxEntries).
            // data.securities contains the return values of searchBySecurity(input, maxEntries).
        });
    });
    
       
        
    }
} 