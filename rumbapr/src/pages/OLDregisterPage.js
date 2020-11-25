import React, {Component, UseState} from 'react';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom'
import './registerPage.css'



let message ='';

export class RegisterPage extends Component {
    constructor() {
        super();
        this.state = {
            input: {},
            errors: {}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let input = this.state.input;

        input[event.target.name] = event.target.value;
        
        this.setState({
            input
        });
        console.log(input[event.target.name])
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.validate()) {
            console.log(this.state);

            let input = {};
            input["name"] = "";
            input["address"] = "";
            input["email"] = "";
            input["phone"] = "";
            input["password"] = "";
            input["confirm_password"] = "";
            input["isHost"] = "";
            this.setState({ input: input });
            this.onRegister();
            alert('Demo Form is submited');
        }
    }

    validate() {
        let input = this.state.input;
        let errors = {};
        let isValid = true;

        if (!input["name"]) {
            isValid = false;
            errors["name"] = "Please enter your name.";
        }

        if (!input["email"]) {
            isValid = false;
            errors["email"] = "Please enter your email Address.";
        }

        if (typeof input["email"] !== "undefined") {

            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(input["email"])) {
                isValid = false;
                errors["email"] = "Please enter valid email address.";
            }
        }

        if (!input["phone"]) {
            isValid = false;
            errors["phone"] = "Please enter your phone number.";
        }

        if (typeof input["phone"] !== "undefined") {

            var pattern = new RegExp(/\d{3}-\d{3}-\d{4}/);
            if (!pattern.test(input["phone"])) {
                isValid = false;
                errors["phone"] = "Please enter only number.";
            } else if (input["phone"].length !== 12) {
                isValid = false;
                errors["phone"] = "Please enter valid phone number.";
            }
        }

        if (!input["address"]) {
            isValid = false;
            errors["address"] = "Please the address.";
        }

        if (!input["password"]) {
            isValid = false;
            errors["password"] = "Please enter your password.";
        }

        if (!input["confirm_password"]) {
            isValid = false;
            errors["confirm_password"] = "Please enter your confirm password.";
        }

        if (typeof input["password"] !== "undefined") {
            if (input["password"].length < 6) {
                isValid = false;
                errors["password"] = "Please add at least 6 charachter.";
            }
        }

        if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {

            if (input["password"] !== input["confirm_password"]) {
                isValid = false;
                errors["password"] = "Passwords don't match.";
            }
        }

        //#THIS VALIDATION NEEDS FIXING
        // if (typeof input["isHost"] !== "undefined"){
        //     isValid = false;
        //     errors["isHost"] = "Please write 'y' for yes or 'n' for no."
        // }

        if (input["isHost"] !== 'y' && input["isHost"] !== 'n'){
            isValid = false;
            errors["isHost"] = "Please only write 'y' for yes or 'n' for no."
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }

    componentDidMount() {
        const apiUrl = "http://localhost:5000/api/v2/user/all"
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => console.log(data))
    }

    onRegister = () => {
        var host = this.state.input.isHost == 'y' ? true : false;
        let info = {
            name: this.state.input.name,
            address: this.state.input.address,
            email: this.state.input.email,
            phone: this.state.input.phone,
            password: this.state.input.password,
            ishost: host,
            commentHistory: [
                {
                    place: '',
                    date: '',
                    comment: '',
                }
            ],
            hashtags: [
                '',
                ''
            ]
        };

        console.log(info);

        fetch('http://localhost:5000/api/v2/user/register/' ,{
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(info)
        }).then(r => r.json().then(res => {
            if (res) {
                message = 'Registered!';
                console.log("Addition")
            }
        }))
    }

    render() {
        return (
            <div className="register_page">
                <div className="register_container">

                <h2 className="white-text">Register</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={this.state.input.name}
                            onChange={this.handleChange}
                            placeholder="Enter your name"
                        />
                        <div className="text-danger">{this.state.errors.name}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
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
                        <label htmlFor="address">Address<label/>
                            <input
                                type="text"
                                name="address"
                                value={this.state.input.address}
                                onChange={this.handleChange}
                                placeholder="Enter your address"
                            />
                        </label>
                        <div className="text-danger">{this.state.errors.address}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="text"
                            name="phone"
                            value={this.state.input.phone}
                            onChange={this.handleChange}
                            placeholder="(___)-___-____"
                        />
                        <div className="text-danger">{this.state.errors.phone}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={this.state.input.value}
                            onChange={this.handleChange}
                            placeholder="Enter a password"
                        />
                        <div className="text-danger">{this.state.errors.password}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            name="confirm_password"
                            value={this.state.input.confirm_password}
                            onChange={this.handleChange}
                            placeholder="Confirm password"
                        />
                        <div className="text-danger">{this.state.errors.confirm_password}</div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="isHost">Is this a host account?</label>
                        <input
                            type="text"
                            name="isHost"
                            value={this.state.input.isHost}
                            onChange={this.handleChange}
                            placeholder="y/n"
                        />
                        <div className="text-danger">{this.state.errors.isHost}</div>
                    </div>

                    {/* THE SUBMIT BTN SHOULD TAKE YOU TO HOME PAGE IF POSSIBLE */}
                    {/* <NavLink to="/" className="nav_link"><input type="submit" value="Submit" className="btn btn-success" /></NavLink> */}
                    <div className="buttons_register">
                    <input type="submit" value="Submit" className="btn btn-success" />
                    <NavLink to="/" className="nav_link"><Button>Back</Button></NavLink>
                    </div>
                </form>

                {/* PLACEHOLDER 'BACK' BUTTON */}


            </div>
            </div>
        )
    }
}

export default RegisterPage;