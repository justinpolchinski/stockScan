import React, { Component } from "react";
import Label from 'react-bootstrap/lib/Label';
import API from "../../utils/API";
import "../home/home.css";
import logo from "../home/stocklogo.PNG";
import { Col, Row, Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import "./signup.css";


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
    <Col size="md-6 sm 12">
    <div className={"col-md-12 signupForm border"}>
        <img src={logo} alt="" className={"centerLogo"}></img>
        <Label className={"loginLabel"}>Sign-Up:</Label>
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
      </div>
        </Col>
     < br/>
     </Row>
     <Col size="md-8 sm 12">
     <ul className={"pwordList"}>
                <li>Password must be 6 characters long</li>
                <li>Must contain ONE lower-case and ONE upper-case letter</li>
                <li>Must contain at least ONE number 0-9</li>
                <li>Must contain at least ONE special character (!, @, #, $, %, &, ^)</li>
            </ul>
    </Col>        
    </Container>
    )}
        ////////////////////////component end
}

export default Home;