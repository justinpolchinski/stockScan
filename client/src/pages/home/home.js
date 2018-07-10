import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";


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
    <Row>
        
            
        <Col size="md-8 sm-12">
        <h3 className="col-md-8 col-sm-12">Investment Information for all! </h3>
        </Col>
        
        <Col size="md-4 sm 12">
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
            Sign UP!
            </a>
      </button>
        </Col>
     < br/>
     </Row>
     <Row>
      <Col size="md-6 sm-12">
        <Jumbotron>
          <h1>Trump Alert!!</h1>
        
            <ul>
              {this.state.trumpText.map((text,index)=>(
                
              <li key={"trump"+index}> {text.text} </li>
              
             )
             )}
            <br />
            </ul>
          
          
        </Jumbotron>
        </Col>
        {/* ++++++++++++++++++++++++++ */}
        <Col size="md-6 sm-12">
        <Jumbotron>
          {this.state.investoNews.TopNewsCL2}
          
          
        </Jumbotron>
        </Col>
        {/* +++++++++++++++++++++++++++++ */}
        </Row>
      
      
      
      </Container>
    )}
        ////////////////////////component end
}

export default Home;