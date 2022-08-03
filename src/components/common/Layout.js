import * as React from "react";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { brands } from '@fortawesome/fontawesome-svg-core/import.macro';


import { NavButton } from ".";
import { Navigation } from ".";
import config from "../../utils/siteConfig";

import signature from "../../images/wayneoco_sig.png";

import Prism from "prismjs";

// Styles
import "../../styles/app.css";

/**
 * Main layout component
 *
 * The Layout component wraps around each page and template.
 * It also provides the header, footer as well as the main
 * styles, and meta data for each page.
 *
 */

 const toggleMenu = (e) => {
    e.preventDefault();

    const navItemsContainer = document.querySelector('.site-nav-items');
    const navButton = document.querySelector('.site-nav-container button');

    if (!navItemsContainer.classList.contains('mobile')) {
    navItemsContainer.classList.add('mobile');
    navButton.classList.replace('site-nav-button', 'site-nav-button-open');
    document.body.classList.add('no-scroll');
    document.body.parentElement.classList.replace('scroll', 'no-scroll');
    } else {
    navItemsContainer.classList.remove('mobile');
    navButton.classList.replace('site-nav-button-open', 'site-nav-button');
    document.body.classList.remove('no-scroll');
    document.body.parentElement.classList.replace('no-scroll', 'scroll');
    }
 };

const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    useEffect(() => {
        Prism.highlightAll();
     }, []);
    const site = data.allGhostSettings.edges[0].node;
    const twitterUrl = site.twitter
        ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}`
        : null;

    return <>
        <Helmet>
            <html lang={site.lang} className="scroll" />
            <style type="text/css">{`${site.codeinjection_styles}`}</style>
            <body className={bodyClass} />
        </Helmet>

        <div className="viewport">
            <div className="viewport-top">
                {/* The main header section on top of the screen */}
                <header
                    className="site-head"
                >
                    <div className="container">
                        <div className="site-mast">
                            <div className="site-mast-left">
                            </div>
                            <div className="site-mast-right">
                                <div className="site-nav-container">
                                    <button className="site-nav-button" onClick={toggleMenu} />
                                    <div className="site-nav-items">
                                        <Navigation
                                            data={site.navigation}
                                            navClass="site-nav-item"
                                        />
                                        {site.twitter && (
                                            <a
                                                href={twitterUrl}
                                                className="site-nav-item"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <FontAwesomeIcon icon={brands('twitter')} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="site-banner">
                            {isHome ? (
                                <Link to="/">
                                    {site.logo ? (
                                        <img
                                            className="site-logo"
                                            src={site.logo}
                                            alt={site.title}
                                        />
                                    ) : (
                                        <GatsbyImage image={data.file.childImageSharp.gatsbyImageData} alt={site.title} />
                                    )}
                                </Link>
                            ) : null}
                            <h1 className="site-banner-title">
                                <Link to="/">
                                    {site.title}
                                </Link>
                            </h1>
                        </div>
                        {isHome ? (
                            <div className="site-greeting">
                                <h2>Hi, friend...</h2>
                                <p className="large">I'm <strong>Wayne</strong>. I'm a software engineering student and a dad of two.</p>
                                <p>I write about what I'm learning on the path to mastery of programming fundamentals, as well as the journey to making a near mid-life career change into software engineering.</p>
                                <p>I'd love it if you came along for the ride...</p>
                                <img src={signature} alt="Wayne Olson signature" />
                            </div>
                        ) : null}
                    </div>
                </header>

                <main className="site-main">
                    {/* All the main content gets inserted here, index.js, post.js */}
                    {children}
                </main>
            </div>

            <div className="viewport-bottom">
                {/* The footer at the very bottom of the screen */}
                <footer className="site-foot">
                    <div className="site-foot-nav container">
                            <Link to="/">{site.title} </Link> © 2022.
                            Published with {" "}
                            <a
                                className="site-foot-nav-item"
                                href="https://ghost.org"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ghost
                            </a>
                            &
                            <a
                                className="site-foot-nav-item"
                                href="https://www.gatsbyjs.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Gatsby
                            </a>.
                    </div>
                    <div className="site-foot-nav container">
                        Designed in Portland, OR.
                    </div>
                </footer>
            </div>
        </div>
    </>;
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
};

const DefaultLayoutSettingsQuery = (props) => (
    <StaticQuery
        query={graphql`query GhostSettings {
  allGhostSettings {
    edges {
      node {
        ...GhostSettingsFields
      }
    }
  }
  file(relativePath: {eq: "ghost-icon.png"}) {
    childImageSharp {
      gatsbyImageData(width: 30, height: 30, layout: FIXED)
    }
  }
}
`}
        render={(data) => <DefaultLayout data={data} {...props} />}
    />
);

export default DefaultLayoutSettingsQuery;
