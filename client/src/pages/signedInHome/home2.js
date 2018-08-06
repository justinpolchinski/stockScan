import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import "./home2.css";
import { List, ListItem } from "../../components/List";
import logo from "../home/stocklogo.PNG";
import Label from 'react-bootstrap/lib/Label';

class Home2 extends Component{
    state = {
        userName: "",
        password: "",
        trumpText: [],
        x:0, 
        investoNews:{}

    }
   componentDidMount(){
     this.trumpInput();
     this.investoScrape();
   }
   investoScrape = () =>{
     console.log("investoScrape");
     API.getInvesto()
     .then (res =>{
      console.log("Returning Investopedia");
      console.log(res.data);
      this.setState({investoNews:res.data})
      console.log("InvestoNews: %O",this.state.investoNews);
     })
   }
  
    handleInputChange = (event) =>{
        console.log("Input change");
        const {name,value} = event.target;
        this.setState({
          [name]:value
        })
        console.log(this.state);
    } 
    xIncr=()=>{
      if(this.state.x<=6){
      this.setState({x:this.state.x+1});
      console.log(this.state.x);
      }
    }
    trumpInput = ()=>{
      
    
      API.getTrump()
      .then (res =>{
        console.log("Trump");
        console.log(res.data);
        
        this.setState({trumpText:res.data}, function(){
          return;
        });
        console.log("Trump Tweets: %O",this.state.trumpText);
       
      })
    } 
    handleFormSubmit = event =>{
        event.preventDefault();
        const content ={
            userName: this.state.userName,
            password: this.state.password
        }
        console.log(content);
        API.signInUser(content)
        .then(res => {
            console.log("User Info %O", res.data);
            sessionStorage.id=res.data._id;
            if(sessionStorage.id.length>5){
                console.log("Next page please");
                window.location.href = "/stocks/"+sessionStorage.id;
              
            }
        })
        .catch(err => console.log(err));
    
      };  
    render() {
        return (
    <Container fluid>
    <br/>
    {/* +++++++++++++++++++++++++++++++++++++++++++ */}
    <Row>
        <Col size="md-3 sm-1"></Col>
        <Col size="md-6 sm-10">
            <div className={"loginLabel"}>
            <img src={logo} height="10%" alt=""className={"centerLogo"}></img>
            
            </div>
            
            </Col> 
        <Col size="md-3 sm-1"></Col>
    </Row>
    <Row>
    <Col size="md-3 sm-12">
        {/* <div size="md-3 sm 12"> */}
        <div className={"loginLabel"}>
        <Label>Presidential Tweets</Label>
        </div>
        <div>
        <List>
              {this.state.trumpText.map((text,index)=>(
                <div  className={"trumpList"}>
                <ListItem index ={"index"} key={"trump"+index}>
                  <div> {text.text} </div>
                </ListItem>
                </div>
              ))}
        </List>
        </div>
        
      </Col>
       
      <div className={"loginLabel"} size="md-6 sm 12">

      </div>  
     < br/>
    {/* ++++++++++++++++++++++++++++++++++++++++++++++++++++ */}
    <br/>
        {/* ++++++++++++++++++++++++++ */}
        <Col size="md-3 sm-12">
        <div className={"loginLabel"}>
        <Label>Latest News</Label>
        </div>
        <div className={"newsList"}>
          <ListItem>
          <p>
            <a href={this.state.investoNews.cl2href}>
            {this.state.investoNews.cl2Title}
            </a><br/>
          </p>
          </ListItem>
          </div>
          <div className={"newsList"}>
          <ListItem>
          <p>
            <a href={this.state.investoNews.slot2href}>
            {this.state.investoNews.slot2Title}
            </a><br/>
          </p>
          </ListItem>
          </div>
          <div className={"newsList"}>
          <ListItem>
          <p>
            <a href={this.state.investoNews.slot3href}>
            {this.state.investoNews.slot3Title}
            </a><br/>
          </p>
          </ListItem>
          </div>
          <div className={"newsList"}>
          <ListItem>
          <p>
            <a href={this.state.investoNews.slot4href}>
            {this.state.investoNews.slot4Title}
            </a><br/>
          </p>
          </ListItem>
          </div>
          <div className={"newsList"}>
          <ListItem>
          <p>  
            <a href={this.state.investoNews.slot5href}>
            {this.state.investoNews.slot5Title}</a>    
          </p>
          </ListItem>
          </div>
          <div className={"newsList"}>
          <ListItem>
          <p>  
            <a href={this.state.investoNews.slot5href}>
            {this.state.investoNews.slot6Title}</a>    
          </p>
          </ListItem>
          </div>
        
        </Col>
        {/* +++++++++++++++++++++++++++++ */}
        </Row>
      </Container>
    )}
        ////////////////////////component end
}

export default Home2;