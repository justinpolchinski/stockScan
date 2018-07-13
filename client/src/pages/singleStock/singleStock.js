import React, { Component } from "react";
// import {Line} from 'react-chartjs-2';
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import SingleBtn from "../../components/singleBtn";
import LineExample from "../../components/chart/chart.js";
import {data} from "../../components/chart/chart.js";
import ReactTooltip from 'react-tooltip';
import peg from "./pegRatio";
import theBeta from "./beta";
import "./singlestock.css";
 

class Stocks extends Component {
  state = {
   ticker:sessionStorage.individual,
   yahooData: {},
  zackData:{},
  chartData:data,
  lastPrice: 0
  };


chartSet = () =>{
 // this.setState({chartData: data});
  console.log("Chart Data: %O",data);
} 
getData = () =>{
  const ticker = this.state.ticker;
  API.individualstock(ticker)
  .then(res =>{
    console.log(res.data);
    const LastRefreshed = res.data["Meta Data"]["3. Last Refreshed"];
    console.log(LastRefreshed);
    const timeSeries = res.data["Time Series (5min)"];
    console.log("TimeSeries %O", timeSeries);
    let timeStamp =[];
    let timeArr = []
    for (let key in timeSeries){
     // console.log(key);
      timeStamp.push(key);
      timeArr.push(parseFloat(timeSeries[key]["4. close"]));
    }
    this.state.lastPrice = timeArr[0];
    this.state.chartData.labels = timeStamp.reverse();
    this.state.chartData.datasets[0].data=timeArr.reverse();
    this.state.chartData.datasets[0].label=sessionStorage.individual.toUpperCase();
    console.log(timeArr);
    sessionStorage.timeStamp = timeStamp;
    sessionStorage.timeArr= timeArr;
    sessionStorage.array = [1,2,3];
    
  });
  this.chartSet();
  
} 
betaPegColor = (n) =>{
   
   let x =n
  if(x<1&&x>0){return "text-success text-left"}
  if (x>=1 && x<=2){ return "text-warning text-left"}
  else{return "text-danger text-left";}
}

scrapeData = () =>{
  API.getScrape().then(result =>{
    this.setState({yahooData:result.data})
    console.log("Yahoo Data %O",this.state.yahooData);
    
  });
}
zackScrape = () =>{
  API.scrapeZacks().then(result =>{
    this.setState({zackData:result.data});
    console.log("Zack Data %O",this.state.zackData);
    
  })
}

myStocksPage=(event)=>{
  
  console.log("My Stocks List Page");
  window.location.href = "/stocks/"+sessionStorage.id;
}

componentDidMount(){
  this.scrapeData();
  this.zackScrape();
  this.getData();
}

  render() {
    return (
      
      <Container fluid>
     
        <Row>
          <Col size="md-12">
          <Jumbotron>
            <h1>{sessionStorage.individual.toUpperCase()}</h1>
          </Jumbotron>
           {/* {this.getData()} */}
           
          </Col>
        </Row>
        <SingleBtn onClick={this.myStocksPage}>Go Back</SingleBtn>
        
        <Row>
          <Col size="md-4">
          <div className="topBox">
          <h1>Current Price: ${this.state.lastPrice}</h1>
              <h3 className="text-left text-primary">Open: ${this.state.zackData.open}</h3>
              <h3 className="text-left">52 Week High: ${this.state.zackData.Wk52High}</h3>
              <h3 className="text-left">52 Week Low: ${this.state.zackData.Wk52Low}</h3>
              <h3 className="text-left">Dividend: ${this.state.zackData.dividend}</h3>
              <h3 className="text-left">Estimated Next Earnings: {this.state.yahooData.yahooEarnings}</h3>
           </div>
           <ReactTooltip/> 
           <div className="border border-success">
              <h3  data-tip={peg} className={this.betaPegColor(this.state.zackData.pegRatio)}>PEG Ratio: {this.state.zackData.pegRatio}</h3>
              <h3 data-tip={theBeta} className={this.betaPegColor(this.state.zackData.Beta)}>Beta: {this.state.zackData.Beta}</h3>
              
              <h3 className="text-left text-white">Zacks Recommendation is a {this.state.zackData.zackRack}</h3>
              <h3 className="text-left text-white">The Yahoo 52 Week Target Price: ${this.state.yahooData.yahoo52WeekTarget}</h3>
           </div>
          
          </Col>

          <Col size="md-8">
          <h1>{sessionStorage.individual.toUpperCase()} Current Price: ${this.state.lastPrice}</h1>
          <LineExample data={this.state.chartData}/>
          </Col>
        </Row>
      </Container>
      
    );
  }
}

export default Stocks;
