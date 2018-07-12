import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import "./home.css";
import { List, ListItem } from "../../components/List";
import logo from "./stocklogo.PNG";
import Label from 'react-bootstrap/lib/Label';

class Home extends Component{
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
    <Col size="md-3 sm-12">
        {/* <div size="md-3 sm 12"> */}
        <div className={"loginLabel"}>
        <Label>Trump Alert!</Label>
        
        </div>
        <List>
              {this.state.trumpText.map((text,index)=>(
                <ListItem index ={"index"} key={"trump"+index}>
                  <div> {text.text} </div>
                </ListItem>
              ))}
       
        </List>
      </Col>
        <Col size="md-6 sm 12">
        <div className={"loginLabel"}>
          <Label>Login</Label>
        
        </div>
        <div className={"col-md-12 loginForm"}>
          <img src={logo} alt=""className={"centerLogo"}></img>
          <h1>Login:</h1>
        <form>
          <Input name="userName" placeholder="enter Username"onChange={this.handleInputChange} />
          <Input name="password" placeholder="Enter Password"onChange={this.handleInputChange} type="password"/>
          <FormBtn href="/stock"
          onClick={this.handleFormSubmit}
          >Submit</FormBtn>
        </form>
        
        <button  className="btn btn-success text-white">
            <a className= "text-white" href ="/signup">
            Sign Up!
            </a>
      </button>

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
        <div className="border border-primary text-primary investoNews">
          <p className="border border-primary">
            <a href={this.state.investoNews.cl2href}>
            {this.state.investoNews.cl2Title}
            </a><br/>
          </p>
          <p>
            <a href={this.state.investoNews.slot2href}>
            {this.state.investoNews.slot2Title}
            </a><br/>
          </p>
          <p>
            <a href={this.state.investoNews.slot3href}>
            {this.state.investoNews.slot3Title}
            </a><br/>
          </p>
          <p>
            <a href={this.state.investoNews.slot4href}>
            {this.state.investoNews.slot4Title}
            </a><br/>
          </p>
          <p>  
            <a href={this.state.investoNews.slot5href}>
            {this.state.investoNews.slot5Title}</a>    
          </p>
        </div>
        </Col>
        {/* +++++++++++++++++++++++++++++ */}
        </Row>
      </Container>
    )}
        ////////////////////////component end
}

export default Home;