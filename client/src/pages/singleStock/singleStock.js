import React, { Component } from "react";
import Chart from 'chart.js';
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
 

class Stocks extends Component {
  state = {
   ticker:sessionStorage.individual,

  };
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
    console.log(timeArr);
    sessionStorage.timeStamp = timeStamp;
    sessionStorage.timeArr= timeArr;
    sessionStorage.array = [1,2,3];
  })
} 
// chartBuild = () =>{
//  var ctx = document.getElementById('myChart').getContext('2d');
//   //var ctx = document.getElementById('myChart');
//   console.log(ctx);
//   var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'line',

//     // The data for our dataset
//     data: {
//         labels: ["January", "February", "March", "April", "May", "June", "July"],
//         datasets: [{
//             label: "My First dataset",
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: [0, 10, 5, 2, 20, 30, 45],
//         }]
//     },

//     // Configuration options go here
//     options: {}
// });
// }
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
          <Jumbotron>
            <h1>{sessionStorage.individual.toUpperCase()}</h1>
          </Jumbotron>
           {this.getData()}
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
          {/* {this.chartBuild()} */}
            <canvas id="myChart"></canvas>
          </Col>
        </Row>
      </Container>
      
    );
  }
}

export default Stocks;
