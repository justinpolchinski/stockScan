import React, { Component } from "react";
//import google from "google-finance-data";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import DeleteBtn from "../../components/DeleteBtn";
import SaveBtn from "../../components/saveBtn";
import SingleStockBtn from "../../components/singleBtn";
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
    savedPriceArr:[],
   
  };
  componentDidMount() {
    console.log("componentsDidMount");
    this.loadgetallstocks();
   
    
    
  }
  handleInputChange = (event) =>{
    console.log("Input change");
    const {name,value} = event.target;
    this.setState({
      [name]:value
    })
   
  }
singleStockPage=(event)=>{
  const target = event.target.id;
  sessionStorage.individual=target;
  console.log("Individual Page");
  window.location.href = "/individual/"+target;
}

 savedStockArr=()=>{
  console.log("state savedStock: %O", this.state.savedStock);
 
  
  let arrayTicker = this.state.savedStock.join();
  
    API.searchstocks(arrayTicker)
    .then (res =>{
      if (res.data!==undefined && !res.data["Information"]){
        console.log(res.data["Stock Quotes"]);
      //let arrayPrice = res.data["Stock Quotes"];
      this.setState({savedPriceArr: res.data["Stock Quotes"]})
     // this.state.savedPriceArr= res.data["Stock Quotes"];
      console.log("savedPriceArr %O",this.state.savedPriceArr);

      }
  
    })
    
 }

 
  search4Stocks = (search) =>{
    console.log("Searching for Stocks:");
    API.searchstocks(search)
      .then(res =>  {
        if(res.data["Information"]){
          alert("Please Try again server is busy!");
          // {Information: "Please consider optimizing your API call frequency."}
        }
        
        console.log("Searching for Stocks:");
        console.log(res.data);
       
        console.log(res.data["Stock Quotes"].length);
        this.setState({stockRec:res.data["Stock Quotes"]})
        //this.state.stockRec = res.data["Stock Quotes"];
        console.log("stockRec %O", this.state.stockRec);
        
        
      })
      .catch(err=> console.log("search4Stocks: " +err));
    
  }

  handleFormSubmit = event =>{
    event.preventDefault();
    console.log("handle form in book.js");
    this.search4Stocks(this.state.search);
  }
  
  savestock = (event) =>{
    const target = event.target.id;
    const id = sessionStorage.id;
    
    console.log("above if in savestock: %O",this.state.savedPriceArr);
    if(this.state.savedPriceArr!==[] && this.state.savedPriceArr !==undefined){
      for(let i = 0; i<this.state.savedPriceArr.length;i++){
      if(this.state.savedPriceArr[i]["1. symbol"]===this.state.stockRec[target]["1. symbol"]){
        
       // alert(this.state.savedPriceArr[i]["1. symbol"]+" "+this.state.stockRec[target]["1. symbol"])
       
      alert("Already Saved to your database");
      return;
     
      
      }
      else{
       console.log(this.state.savedPriceArr[i]["1. symbol"]+" "+this.state.stockRec[target]["1. symbol"])
      }  
    }
    
   }
    console.log(target);
    const contents = {
      Symbol: this.state.stockRec[target]["1. symbol"],
    }
    API.savestock(contents,id)
      //.then(res => this.loadBooks())
      .then(res => console.log("savedstock: %O",res))
      .catch(err => console.log(err));
      this.loadgetallstocks();
    
  }

  deleteStocks = (event) =>{
    const ticker = event.target.id;
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
        this.savedStockArr();
        console.log("db: %O",this.state.savedStock);
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
                        {stock["1. symbol"].toUpperCase()}
                        <br /> 
                        
                        
                        {/* <div name={stock.stockSymbol} data-refresh ={setInterval(this.stockRefresh(stock.stockSymbol),1000)}> Price: {this.state.refreshPrice}</div> */}
                        <div name={stock["1. symbol"]} > Price: {stock["2. price"]} </div>
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
          {/* {this.savedStockArr()} */}
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>My Saved Stocks</h1>
            </Jumbotron>
            {/* {this.state.savedStock.length>2 ? ( */}
            {this.state.savedPriceArr!==undefined && !this.state.savedPriceArr["Information"] && this.state.savedPriceArr!==[]?(
            
              <List>
                {this.state.savedPriceArr.map((stocks, index) => (
                  <ListItem  key={index}>

                    
                      <strong>
                        {stocks.Symbol}
                        {/* {this.savedStockArr(stocks)} */}
                        <br /> <div name={stocks["1. symbol"]}>Ticker: {stocks["1. symbol"].toUpperCase()}<br/>Price: {stocks["2. price"]}</div>
                        {/* {this.state.savedPriceArr[index]} */}
                      </strong>
                    
                    <br />
                    <SingleStockBtn id={stocks["1. symbol"].toLowerCase()} onClick={this.singleStockPage}>More Statistics</SingleStockBtn>
                    <DeleteBtn id={stocks["1. symbol"]} onClick={this.deleteStocks}/>
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
