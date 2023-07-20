import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

import './QuoteBox.scss';

const QuoteBox = () => {

    // Variables defining random colors to be chosen for background
    const backColors = [
        'rgb(162, 50, 50)', // red
        'rgb(227, 127, 13)', // orange
        'rgb(199, 174, 32)', // yellow
        'rgb(51, 142, 31)', //green
        'rgb(41, 139, 191)', //blue
        'rgb(163, 113, 193)', //purple
    ];
    const [backColor, setBackColor] = useState(backColors[0]);

    // Variables for displaying quote
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // Variables for sending tweets
    const tweetIntent = "https://twitter.com/intent/tweet?text=";
    const [tweet, setTweet] = useState(tweetIntent);

    // Fetching quote
    async function fetchRandomQuote() {
        try {
            const quoteObj = await axios.get("https://api.quotable.io/random");
            
            // Setting background color
            let newColorIndex = Math.floor(Math.random() * backColors.length); 
            setBackColor(backColors[newColorIndex]);

            // Setting quote and author
            setQuote(quoteObj.data.content);
            setAuthor(quoteObj.data.author);

            // Setting tweet href
            let newTweet = tweetIntent + encodeURI('"' + quoteObj.data.content + '" - ' + quoteObj.data.author);
            setTweet(newTweet);

            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    // Fetches quote when page first launches
    useEffect(() => {
        fetchRandomQuote();
    }, []);

    return(
        <>
        <div style={{backgroundColor:backColor}} id='quote-background'>
            <div id='quote-box'>
                <div className='quote-header'>
                    <h1 id='text'>
                        <FontAwesomeIcon className="quote-icons" icon={['fas', 'quote-left']}/>
                        {quote}
                        <FontAwesomeIcon className="quote-icons" icon={['fas', 'quote-right']}/>
                    </h1>
                    <h4 id='author'> - {author}</h4>
                </div>
                <div className="quote-footer">
                    <a style={{backgroundColor:backColor}} id='tweet-quote' href={tweet} target="_blank" title="Tweet Quote!">
                        <FontAwesomeIcon id='twitter-icon' icon={['fab', 'twitter']}/>
                    </a>
                    <Button style={{backgroundColor:backColor}} size='md' id='new-quote' onClick={fetchRandomQuote}>
                        New Quote
                    </Button>
                </div>
                <h6>{errorMessage}</h6>
            </div>
        </div>
        </>
    );
}

export default QuoteBox;