import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from "react-table";
import 'react-table/react-table.css';
import './placeCatalog.css';
import Header from "../components/header/Header";

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            places: [],
            loading:true
        }
    }
    async getPlacesData(){
        const res = await axios.get('http://localhost:5000/api/v2/place/all/')
        console.log(res.data)
        this.setState({loading:false, places: res.data})
    }
    componentDidMount(){
        this.getPlacesData()
    }
    render() {
        const columns = [
            {
                Header: 'Name',
                accessor: 'name'
            }
            ,{
                Header: 'Phone',
                accessor: 'phone',
            },
            {
                Header: 'Email',
                accessor: 'email',
            },
            {
                Header: 'City',
                accessor: 'city',
            },
            {
                Header: 'Country',
                accessor: 'country',
            },
        ]
        return (
            <div style={{backgroundColor: '#303639'}}>
                <Header />
                <div className={"header"}>Places</div>
                <ReactTable
                        style= {
                            {   color: 'white',
                                marginLeft: '14px',
                                marginRight: '29px',
                                border: 'none'
                            }}
                        className={'hoverable'}
                        data={this.state.places}
                        columns={columns}
                    />
            </div>
        )
    }
}