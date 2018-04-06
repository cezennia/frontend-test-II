import React, { Component } from 'react';
// import * as Moment from 'moment';
import Loader from './assets/img/ball-triangle.svg';

class SpotifyArtists extends Component {

    apiURL = "https://api.spotify.com/v1/";

    constructor(props) {
        super(props);

        this.state = {
            searchedArtists: [],
            loading: false,
            error: "",
            inputValue:""
        }
    }    

    handleClick() {
        if (!this.state.inputValue) {
            alert("you have not typed anythng");
            return;
        }

        let queryString = this.state.inputValue.split(" ").join("%20");
        this.getAccessToken();
        
    }

    handlePress (id) {
        console.log(id);
        this.getArtists(this.apiURL + "artists/" + id + "/related-artists");
    }

    getAccessToken() {
        let url = "https://accounts.spotify.com/api/token";
        fetch(url, 
            {headers: 
                {
                    "Authorization": "Basic ZTBmNTQ0N2NiMDEwNDU4NTk0NjZkNDhhYWJkM2UwZWM6NDI2ZWE5YWZmNDJjNDVlNjg2NTVjNGIxOTAyZTA0Y2I=", 
                    'Content-Type':'application/x-www-form-urlencoded'
                },
            body: 
                {
                    "grant_type":"client_credentials"
                }
        })
        .then(response => {
            if (response.ok){
                // console.log("Hey");
                return response.json();
            } else {
                throw Error(response.statusText);
            }
            
        })
        .then((data) => {
            console.log(data);
            this.setState({loading: false});
            this.setState({
                access_token: data.access_token
            });

            // this.getArtists(this.apiURL + "search?type=artist&q=" + queryString);
            
           
        })
        .catch(error => {
            this.setState({loading: false});
            console.log(error.message);
        });        
    }


    getArtists(url) {
        this.setState({loading: true});

        fetch(url, 
            {headers: {"Authorization": "Bearer BQB8SOtV5yUe5XStOu8hHME5Gj6YZMGkJBc7W9oCR8bHJR3V_eoRKnNIxLju-xJNDSmSVEw_etGA_Dsa2jHN5Dli2WotmNKUWtO0UB5GfZdjP-tg3eTGFkIdXMO_xSbU5Ho7ixg989Mlyy89Vym8XWF8DluzqNg"}
        })
        .then(response => {
            if (response.ok){
                // console.log("Hey");
                return response.json();
            } else {
                throw Error(response.statusText);
            }
            
        })
        .then((data) => {
            console.log(data);
            this.setState({loading: false});
            this.setState({
                searchedArtists: data.artists.items,
                inputValue: ""
            });
            
           
        })
        .catch(error => {
            this.setState({loading: false});
            console.log(error.message);
        });
    }

    render() {

        let searchedArtists = this.state.searchedArtists.map((element, index) => {
            return (
                <li key={index}>
                    <a href="#" onClick={()=> {this.handlePress(element.id)}} >{element.name}</a>
                </li>
            )
        });
        

        return (
            <div class="container">
                <h1>Spotify API Consumption</h1>
                <div class="content">
                    <ul class="Artists">
                        { searchedArtists }
                    </ul>
                    <div class="textBox">
                        <input 
                            id="text-box" 
                            type="text" 
                            placeholder="Enter an artist's name" 
                            value={ this.state.inputValue } 
                            onChange={ evt => this.setState({inputValue: evt.target.value}) }
                            />
                        <input type="button" value="send" onClick={ ()=>{this.handleClick()} } />
                    </div>
                </div>
                    { this.state.loading ? <img src={Loader} /> : ""}      
            </div>
        );
    }
}

export default SpotifyArtists;
