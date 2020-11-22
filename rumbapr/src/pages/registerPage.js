import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'


let message =''
export class RegisterPage extends Component {

    componentDidMount() {
        const apiUrl = "http://localhost:5000/api/v2/user/all"
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => console.log(data))
    }

    onRegister = () => {
        let info = {
            name: this.refs.name.value,
            address: this.refs.address.value,
            email: this.refs.email.value,
            phone: this.refs.phone.value,
            password: this.refs.password.value,
            ishost: false,
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
        return(
            <div className="col-lg-8 offset-lg-2">
                <h2>Register</h2>
                        <label>Name</label>
                        <input type="text" name="firstname" ref="name"/>
                        <label>Address</label>
                        <input type="text" name="address" ref="address" />
                        <label>Email</label>
                        <input type="text" name="email" ref="email" />
                        <label>phone</label>
                        <input type="text" name="phone" ref="phone" />
                        <label>Password</label>
                        <input type="text" name="password" ref="password" />
                <Button variant="secondary" onClick={this.onRegister} href="#home"><NavLink className="nav_link" to="/">Enter</NavLink></Button>
                <p>{message}</p>
            </div>
        )
    }
}

export default RegisterPage;