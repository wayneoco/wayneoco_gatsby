import * as React from "react";
import signature from "../images/wayneoco_sig.png";

export const Greeting = () => {
    return (
        <div className="site-greeting">
            <h2>Hi, friend...</h2>
            <p className="large">I'm <strong>Wayne</strong>&mdash; a software engineer and dad of two.</p>
            <p>I write about about software development, as well as the journey to making a near mid-life career change into software engineering.</p>
            <p>Some of the languages and frameworks I have experience with are JavaScript (ES6), Node.js, React, jQuery, Handlebars.js, Ruby, Sinatra, PostgreSQL, and GraphQL.</p>
            <p>See you on the inside...</p>
            <img
                src={signature}
                alt="Wayne Olson signature"
                width='127'
                height='60'
            />
        </div>
    );
};
