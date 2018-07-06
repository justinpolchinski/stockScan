import React, { Component } from "react";

import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";


class Home extends Component{
    state = {
        userName: "",
        password: ""

    }
   
    handleInputChange = (event) =>{
        console.log("Input change");
        const {name,value} = event.target;
        this.setState({
          [name]:value
        })
        console.log(this.state);
    }  
    handleFormSubmit = event =>{
        event.preventDefault();
        const content ={
            userName: this.state.userName,
            password: this.state.password
        }
        API.signUpUser(content)
        .then(res => {if(res.data==="User Exists"){alert(res.data)}})
        .catch(err => console.log(err));
        
      };  
   

    render() {
        return (
    <Container fluid>
    <br/>
    <Row>
        
            
        
        
        <Col size="md-12 sm 12">
          <h1>Sign Up:</h1>
        <form>
          <Input name="userName" placeholder="enter Username"onChange={this.handleInputChange} />
          <Input name="password" placeholder="Enter Password"onChange={this.handleInputChange}type="password"/>
          <FormBtn
          onClick={this.handleFormSubmit}
          >Submit</FormBtn>
        </form>
        <button  className="btn btn-success text-white">
            <a className= "text-white" href ="/">
            Login
            </a>
      </button>
        </Col>
     < br/>
     </Row>
      </Container>
    )}
        ////////////////////////component end
}

export default Home;