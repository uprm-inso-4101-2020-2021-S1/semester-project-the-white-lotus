import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'


let message =''
export class RegisterPage extends Component {


    onRegister = () => {
        let info = {
            name: this.refs.name.value,
            address: this.refs.address.value,
            emial: this.refs.email.value,
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

        fetch('http://localhost:5000/api/v2/user/register/' ,{
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(info)
        }).then(r => r.json().then(res => {
            if (res) {
                message = 'Registered!';
            }
        }))
    }

    render() {
        return(
            <div className="col-lg-8 offset-lg-2">
                <h2>Register</h2>
                <form name="form">
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="firstname" ref="name"/>
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" name="address" ref="address" />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" name="email" ref="email" />
                    </div>
                    <div className="form-group">
                        <label>phone</label>
                        <input type="text" name="phone" ref="phone" />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" name="password" ref="password" />
                    </div>
                </form>
                <Button variant="secondary" onClick={this.onRegister} href="#home"><NavLink className="nav_link" to="/">Enter</NavLink></Button>
                <p>{message}</p>
            </div>
        )
    }
}

export default RegisterPage;