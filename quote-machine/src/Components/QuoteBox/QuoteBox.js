import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

import './QuoteBox.scss';

const QuoteBox = () => {

    const tweetIntent = "https://twitter.com/intent/tweet?text=";

    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [tweet, setTweet] = useState(tweetIntent);
    const [errorMessage, setErrorMessage] = useState("");

    // Fetching quote
    async function fetchRandomQuote() {
        try {
            const quoteObj = await axios.get("https://api.quotable.io/random");
            
            // Setting quote and author
            setQuote(quoteObj.data.content);
            setAuthor(quoteObj.data.author);

            // Setting tweet href
            let newTweet = tweetIntent + encodeURI('"' + quoteObj.data.content + '" - ' + quoteObj.data.author);
            setTweet(newTweet);
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
                <a id='tweet-quote' href={tweet} target="_blank">
                    <FontAwesomeIcon id='twitter-icon' icon={['fab', 'twitter']}/>
                </a>
                <Button size='md' id='new-quote' onClick={fetchRandomQuote}>New Quote</Button>
            </div>
            <h6>{errorMessage}</h6>
        </div>
        </>
    );
}

export default QuoteBox;