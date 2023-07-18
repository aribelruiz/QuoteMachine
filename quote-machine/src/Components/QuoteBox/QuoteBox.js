import React from "react";
import { Button } from "react-bootstrap";

import './QuoteBox.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const QuoteBox = () => {
    return(
        <>
        <div id='quote-box'>
            <div className='quote-header'>
                <h1 id='text'>
                    <FontAwesomeIcon className="quote-icons" icon={['fas', 'quote-left']}/>
                    Hello World!
                    <FontAwesomeIcon className="quote-icons" icon={['fas', 'quote-right']}/>
                </h1>
                <h4 id='author'> - Author</h4>
            </div>
            <div className="quote-footer">
                <a id='tweet-quote' href='twitter.com/intent/tweet'>
                    <FontAwesomeIcon id='twitter-icon' icon={['fab', 'twitter']}/>
                </a>
                <Button size='md' id='new-quote'>New Quote</Button>
            </div>
        </div>
        </>
    );
}

export default QuoteBox;