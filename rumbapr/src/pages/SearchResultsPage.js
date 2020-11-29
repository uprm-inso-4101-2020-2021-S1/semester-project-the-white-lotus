import React from "react";
import axios from "axios";
import Header from "../components/header/Header";

export default class SearchResultsPage extends React.Component {
    state = {
        isLoading: true,
        placeName: "",
        searchResults: []
    };
    async getPlacesData(placeName){
        const URL = 'http://localhost:5000/api/v2/place/name/' + placeName;
        try{
            const res = await axios.get(URL);
            return res.data;
        }
        catch(err){
            return "NOT FOUND ERROR";
        }
    }
    handleSearch = async () => {
        let placeName = this.props.location.state.searchText;
        const data = await this.getPlacesData(placeName);
        this.setState({
            isLoading: false,
            placeName: placeName,
            searchResults: data
        });
    };

    componentDidMount() {
        this.handleSearch();
    }

    componentDidUpdate(prevProps) {
        let prevSearch = prevProps.location.state.searchText;
        let newSearch = this.props.location.state.searchText;
        if (prevSearch !== newSearch) {
            this.handleSearch();
        }
    }
    render() {
        let toRender = this.state.isLoading ? (
            <h1>Loading...</h1>
        ) : (
            <>
                <br />
                <h1 className={"header"} style={{marginTop:'74px',  marginLeft:'28px'}}>Your Search Results</h1>
                <br />
                <body style={{backgroundColor: '#303639', color: 'white'}}>
                    <ul>
                        <div style={{marginLeft:'28px', fontSize: '20px', color: '#33b5e5'}}>Search: "{this.state.placeName}"</div>
                    </ul>
                    {this.state.searchResults !== "NOT FOUND ERROR" ? (
                        <div>
                            <pre>
                                <small style={{color: 'white'}}>{JSON.stringify(this.state.searchResults, null, 2)}</small>
                            </pre>
                        </div>
                    ) : (
                        <p style={{color: 'white', marginLeft:'28px'}}> NO RESULTS FOUND</p>
                    )}
                </body>
            </>
        );
        return (<div style={{backgroundColor: '#303639', color: 'white'}}>
                    <Header />
                    <div style={{ margin:'20px 0px 0px 20px'}}>{toRender}</div>
                </div>
            );
    }
}
