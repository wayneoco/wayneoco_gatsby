import * as React from "react";
import signature from "../images/wayneoco_sig.png";

export const Greeting = () => {
    return (
        <div className="site-greeting">
            <h2>Hi...</h2>
          <p className="large">I'm <strong>Wayne</strong>&mdash; a software engineer based in Portland, Oregon.</p>
          <p>I have multiple years of experience with JavaScript (ES6), TypeScript, Node.js, Go, Ruby, React, PostgreSQL, and MongoDB, as well as cloud platforms like AWS, Digital Ocean and Heroku.</p>
          <p>&#128073; Most recently I built <a href="https://herald-app.github.io" alt="Herald" target="_blank"><strong>Herald</strong></a>, an open source application that simplifies deployment of a full observability pipeline, condensing a complex multi-application deployment (Elasticsearch, Logstash, Kibana, Fleet Server) into just a few simple steps.</p>
          <p><center><a href="https://herald-app.github.io" alt="Herald Case Study" target="_blank"><strong>Read Herald's Technical Case Study</strong></a></center></p>
        {/*   <div className="all-posts"> */}
        {/*     <button */}
        {/*       type="button" */}
        {/*       value="Herald Case Study" */}
        {/*     > */}
        {/* <a href="https://herald-app.github.io" alt="Herald Case Study">Herald Case Study</a> */}
        {/*     </button> */}
        {/*   </div> */}
            <img
                src={signature}
                alt="Wayne Olson signature"
                width='127'
                height='60'
            />
        </div>
    );
};
