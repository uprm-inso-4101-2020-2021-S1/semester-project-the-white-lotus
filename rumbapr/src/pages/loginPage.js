import React, {Component, UseState} from 'react';
import { Button } from 'react-bootstrap';
//import './loginPage.css'
import { NavLink } from 'react-router-dom';
import Header from "../components/header/Header";


let message = ""
class loginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            islogged: false,
            users: [],
            input: {},
            errors: {},
            data: []

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const apiUrl = "http://localhost:5000/api/v2/user/all"
        fetch(apiUrl)
            .then(res => {
                if(res >= 400){
                    throw new Error("Server responds with error!")
                }
                return res.json();
            })
            .then(users => {
                this.setState({
                    users,
                })
            });
    }

    handleChange(event) {
        let input = this.state.input;
        
        input[event.target.name] = event.target.value;

        this.setState({
            input
        });
        console.log(input[event.target.name])
    };

    handleSubmit (event) {
        event.preventDefault();

        if(this.validate()){
            let input={};
            input["email"]="";
            input["password"]="";
            this.setState({ input: input });
            this.login();
            alert("Loggin successfull");
        }
    }

    validate() {
        let users = this.state.users
        let input = this.state.input
        let errors = {}
        let isValid = true

        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email address"
        }

        // if (!this.checkUsers(users, input["email"])) {
        //     isValid = false
        //     errors["email"] = "Your email of password is not valid"
        // }

        if (!input["password"]) {
            isValid = false
            errors["password"] = "Please enter your password"
        }

        return isValid;

    }

    login = () => {
        
        let info = {
            username: this.state.input.email,
            password: this.state.input.password
        };

        console.log(info);

        fetch('http://localhost:5000/api/v2/user/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(info)
        }).then(r => r.json().then(res => {
            if (res) {
                console.log(res);
                message = 'Logged In!';
                console.log("Logged In");
            }
        }))
        this.setState({
            islogged: true
        });
    };

    // checkUsers(users, email){
    //     let found = false
    //     for(let i=0; i<users.length(); i++){
    //         if(users[i].email === email){
    //             found = true;
    //         }
    //     }
    //     return found;
    // }

    render() {
        return(
            <div className="register_page">
                <Header />
                <div className="register_container">

                    <h2 className="white-text">Log-In</h2>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="user_id">Email</label><br />
                            <input
                                type="text"
                                name="email"
                                value={this.state.input.email}
                                onChange={this.handleChange}
                                placeholder="Enter your email"
                            />
                            <div className="text-danger">{this.state.errors.email}</div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label><br />
                            <input
                                type="password"
                                name="password"
                                value={this.state.input.password}
                                onChange={this.handleChange}
                                placeholder="Enter a password"
                            />
                            <div className="text-danger">{this.state.errors.password}</div>
                        </div>

                        {/* THE SUBMIT BTN SHOULD TAKE YOU TO HOME PAGE IF POSSIBLE */}
                        {/* <NavLink to="/" className="nav_link"><input type="submit" value="Submit" className="btn btn-success" /></NavLink> */}
                        <div className="buttons_register">
                            <input type="submit" value="Login" className="btn btn-success" />
                            <NavLink to="/" className="nav_link"><Button>Back</Button></NavLink>
                        </div>
                    </form>

                    {/* PLACEHOLDER 'BACK' BUTTON */}


                </div>
            </div>
        )

    }

}

export default loginPage;

{/* <div className="container">
    <form onSubmit={this.login} className="form-signin">
        <h1 style={{ color: "black" }} className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <div className="row">
            <div className="col">
                <input
                    type="text"
                    name="user_id"
                    onChange={this.handleChange}
                    placeholder="Enter Email"
                />
                <div className="text-danger">{this.state.errors.user_id}</div>

                <input
                    type="password"
                    name="user_password"
                    onChange={this.handleChange}
                    placeholder="Enter Password"
                />
                <div className="text-danger">{this.state.errors.password}</div>

                <input type="submit" value="Login" />
            </div>
            <NavLink to="/" className="nav_link"><Button>Back</Button></NavLink>
        </div>
    </form>
</div> */}