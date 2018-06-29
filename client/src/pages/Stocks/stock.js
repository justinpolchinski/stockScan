import React, { Component } from "react";
//import google from "google-finance-data";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/saveBtn";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
 

class Stocks extends Component {
  state = {
    stockRec: [],
    priceHistory:[],
    savedStock:[],

    lastPrice:"",
    refreshPrice: "",
    lastRefreshed:"",
    savedPriceArr:[]
  };
  
  handleInputChange = (event) =>{
    console.log("Input change");
    const {name,value} = event.target;
    this.setState({
      [name]:value
    })
   
  }

 savedStockArr=()=>{
 
  let arrayTicker = this.state.savedStock.join();
  console.log("arrayTicker: "+ arrayTicker);
    API.searchstocks(arrayTicker)
    .then (res =>{
      
      
      console.log(res.data["Meta Data"]);
      console.log(res.data["Stock Quotes"]);
      
      let arrayPrice = res.data["Stock Quotes"];
      console.log("arrayPrice %O",array);
      let array =[];
      for (let i =0; i<arrayPrice.length; i++){
        array.push(array[i]["2. price"]);
        console.log("Array %O",array);
        
      }
      // let lastR = "3. Last Refreshed";
      // let lastRefreshed = (res.data["Meta Data"][lastR]);
      // let lastPrice = res.data["Time Series ("+interval+"min)"][lastRefreshed]["4. close"];
      // console.log("Saved last Price: %s",lastPrice);
      
      //this.setState({savedPriceArr:arrayPrice});
      console.log("arrayPrice %O",arrayPrice)

    })
 
 }

 
  search4Stocks = (search) =>{
    let stockArr = this.state.stockRec;
    let key;
    let priceHist =[];
    console.log("Searching for Stocks:");
    API.searchstocks(search)
      .then(res =>  {

        console.log("Searching for Stocks:");
        console.log(res.data["Meta Data"]);
        console.log(res.data["Stock Quotes"][0]["2. price"]);
        console.log(res.data["Stock Quotes"]);
      //   let lastRefreshed = (res.data["Meta Data"]["3. Last Refreshed"]);
        
      //   console.log(res.data["Time Series ("+interval+"min)"]);
      //   let stockSymbol = res.data["Meta Data"]["2. Symbol"];
      //   let timeSeries = res.data["Time Series ("+interval+"min)"];
      //   let lastPrice = res.data["Time Series ("+interval+"min)"][lastRefreshed]["4. close"];
      //   for (key in timeSeries){ 
      //    // console.log("This is key: "+key);
      //     priceHist.push(timeSeries[key]["4. close"]);
      //  };
        
      //   console.log(lastPrice);
      //   let stockO = {
      //     stockSymbol : stockSymbol,
      //     lastPrice: lastPrice,
      //     priceHistory: priceHist

      //   };
        
      //   stockArr.unshift(stockO);
      //   this.setState({stockRec: stockArr })
      //   console.log("stockArr: %O", stockArr);
      //   console.log("StockRec: %O" , this.state.stockRec);
        
    
        
      })
      .catch(err=> console.log("search4Stocks: " +err));
    
  }

  handleFormSubmit = event =>{
    event.preventDefault();
    console.log("handle form in book.js");
    this.search4Stocks(this.state.search, this.state.interval);
  }
  componentDidMount() {
    this.loadgetallstocks();
    console.log(this.state.savedStock);
  }
  savestock = (event) =>{
    const target = event.target.id;
    const id = sessionStorage.id;
    console.log("target: ");
    console.log(target);
    const contents = {
      Symbol: this.state.stockRec[target].stockSymbol,
    }
    API.savestock(contents,id)
      //.then(res => this.loadBooks())
      .then(res => console.log(res))
      .catch(err => console.log(err));
    this.loadgetallstocks();
  }

  deleteStocks = (event) =>{
    const ticker = event.target.id.toLowerCase();
    console.log("Ticker deleted %s", ticker);
    let arr = this.state.savedStock;
    let array = arr.filter(words => words !== ticker);
    
    this.setState({savedStock: array}, ()=>{
      console.log("Saved %O", this.state.savedStock);
    });
    console.log("Saved %O", this.state.savedStock);
    console.log("Saved Remove %O", array);
    API.deletestock(sessionStorage.id,array)
      .then(res =>  this.loadgetallstocks())
      .catch(err => console.log(err));
   
  }
  loadgetallstocks = () => {
    const id = sessionStorage.id;
    API.getallstocks(id)
      .then(res => {
        console.log("res.data: %O", res.data);
        this.setState({ savedStock: res.data.Symbol })
        
        console.log(this.state.savedStock);
      })
        
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Stock Scan</h1>
            </Jumbotron>
            <form>
              <Input name="search" placeholder="Ticker Search"onChange={this.handleInputChange} />
              <Input name="interval" placeholder="Enter minute interval 1, 5, 15"onChange={this.handleInputChange}/>
              <FormBtn
              onClick={this.handleFormSubmit}
              >Submit</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Tickers Searched</h1>
            </Jumbotron>
            {this.state.stockRec.length ? (
              <List>
                {this.state.stockRec.map((stock, index) => (
                  <ListItem index={index}  key={index}>

                    {/* <a href={stock}> */}
                      <strong>
                        {stock.stockSymbol.toUpperCase()}
                        <br /> 
                        
                        
                        {/* <div name={stock.stockSymbol} data-refresh ={setInterval(this.stockRefresh(stock.stockSymbol),1000)}> Price: {this.state.refreshPrice}</div> */}
                        <div name={stock.stockSymbol} > Price: {stock.lastPrice} </div>
                      </strong>
                    {/* </a> */}
                    <br />
                    <SaveBtn id={index} onClick={this.savestock}>Save</SaveBtn>
                    
                  </ListItem>
                ))}
      
                
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>

          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>My Saved Stocks</h1>
            </Jumbotron>
            {this.savedStockArr()}
            {this.state.savedStock.length ? (
              <List>
                {this.state.savedStock.map((stocks, index) => (
                  <ListItem id={stocks._id}  key={index}>

                    
                      <strong>
                        {stocks.Symbol}
                        {/* {this.savedStockArr(stocks)} */}
                        <br /> <div name={stocks[index]}>Ticker: {stocks.toUpperCase()}<br/>Price: </div>
                        {/* {this.state.savedPriceArr[index]} */}
                      </strong>
                    
                    <br />
                    <DeleteBtn id={stocks} onClick={this.deleteStocks}/>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Stocks;
