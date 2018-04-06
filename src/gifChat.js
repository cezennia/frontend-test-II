import React, { Component } from 'react';
// import * as Moment from 'moment';
import Loader from './assets/img/ball-triangle.svg';

class GifChat extends Component {

    apiURL = "https://api.giphy.com/v1/gifs/translate?api_key=zveNFOUvMunyys0uoUMJJ9BCvc8hyM6z&s=";

    constructor(props) {
        super(props);

        this.state = {
            gifs: [],
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

        if (this.state.inputValue.split(" ")[0] !== "/gliph") {
            alert("you have to initiate the command with /gliph")
            return;
        }

        if (!this.state.inputValue.split(" ")[1]) {
            alert("The string to search has to be after /gliph");
            return;
        }

        let queryString = this.state.inputValue.split(" ");
        queryString.shift();
        queryString = queryString.join("%20");

        this.getGif(this.apiURL + queryString);
    }

    getGif(url) {
        this.setState({loading: true});

        fetch(url)
        .then(response => {
            if (response.ok){
                // console.log("Hey");
                return response.json();
            } else {
                throw Error(response.statusText);
            }
            
        })
        .then((data) => {
            // console.log(data);
            this.setState({loading: false});
            if (data.data) {
                let tempData = this.state.gifs;
                tempData.push(data.data.images.original.url);
                this.setState({
                    gifs: tempData,
                    inputValue: ""
                });
            }
           
        })
        .catch(error => {
            this.setState({loading: false});
            console.log(error.message);
        });
    }

    render() {

        let giffys = this.state.gifs.map((element, index) => {
            return (
                <div key={index} >
                    <img src={element} />
                </div>
            )
        });
        

        return (
            <div class="container">
                <h1>Gliph API Consumption</h1>
                <div class="content">
                    <div class="messages">
                        {giffys}
                    </div>
                    <div class="chatbox">
                        <input 
                            id="text-box" 
                            type="text" 
                            placeholder="type /giph and then your gif name" 
                            value={this.state.inputValue} 
                            onChange={evt => this.setState({inputValue: evt.target.value})}
                            />
                        <input type="button" value="send" onClick={()=>{this.handleClick()}} />
                    </div>
                </div>
                    { this.state.loading ? <img src={Loader} /> : ""}      
            </div>
        );
    }
}

export default GifChat;
