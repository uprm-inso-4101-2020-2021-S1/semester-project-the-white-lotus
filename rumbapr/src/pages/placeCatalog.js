import React, { Component } from 'react'
import axios from 'axios'
import ReactTable from "react-table";
import 'react-table/react-table.css';
import './placeCatalog.css';
import Header from "../components/header/Header";

export default class PlaceTable extends Component {
    constructor(props){
        super(props)
        this.state = {
            places: [],
            loading:true
        }
    }
    async getPlacesData(){
        const res = await axios.get('http://localhost:5000/api/v2/place/all/')
        this.setState({loading:false, places: res.data})
    }
    componentDidMount(){
        this.getPlacesData()
    }
    render() {
        const columns = [
            {
                Header: 'Name',
                id : 'name',
                headerStyle: {color: '#00b7ea',  fontWeight: 'bold'},
                accessor: 'name',
            }
            ,{
                Header: 'Phone',
                headerStyle: {color: '#00b7ea',  fontWeight: 'bold'},
                accessor: 'phone',
                sortable: false,
            },
            {
                Header: 'Email',
                headerStyle: {color: '#00b7ea',  fontWeight: 'bold'},
                accessor: 'email',
                sortable: false,
            },
            {
                Header: 'City',
                headerStyle: {color: '#00b7ea',  fontWeight: 'bold'},
                accessor: 'city',
                sortable: false,
            },
            {
                Header: 'Country',
                headerStyle: {color: '#00b7ea',  fontWeight: 'bold'},
                accessor: 'country',
                sortable: false,
            },
        ]
        return (
            <div style={{backgroundColor: '#303639'}}>
                <Header />
                <div className={"header"}>Places</div>
                    <ReactTable
                        style= {
                            {
                                color: 'white',
                                marginLeft: '14px',
                                marginRight: '29px',
                                border: 'none',
                            }}
                        sorted={[
                            {
                                id: 'name',
                                desc: false
                            }]}
                        minRows={0}
                        defaultPageSize={10}
                        data={this.state.places}
                        columns={columns}
                    />
            </div>
        )
    }
}