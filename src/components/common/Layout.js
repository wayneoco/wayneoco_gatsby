import * as React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { Link, StaticQuery, graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { Navigation } from ".";
import { Greeting } from "../Greeting";
import config from "../../utils/siteConfig";
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
                                                className="site-nav-item social"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <img alt="svgImg" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4Igp3aWR0aD0iMjAiIGhlaWdodD0iMjAiCnZpZXdCb3g9IjAgMCAzMCAzMCIKc3R5bGU9IiBmaWxsOiMwMDAwMDA7Ij4gICAgPHBhdGggZD0iTTI4LDYuOTM3Yy0wLjk1NywwLjQyNS0xLjk4NSwwLjcxMS0zLjA2NCwwLjg0YzEuMTAyLTAuNjYsMS45NDctMS43MDUsMi4zNDUtMi45NTFjLTEuMDMsMC42MTEtMi4xNzIsMS4wNTUtMy4zODgsMS4yOTUgYy0wLjk3My0xLjAzNy0yLjM1OS0xLjY4NS0zLjg5My0xLjY4NWMtMi45NDYsMC01LjMzNCwyLjM4OS01LjMzNCw1LjMzNGMwLDAuNDE4LDAuMDQ4LDAuODI2LDAuMTM4LDEuMjE1IGMtNC40MzMtMC4yMjItOC4zNjMtMi4zNDYtMTAuOTk1LTUuNTc0QzMuMzUxLDYuMTk5LDMuMDg4LDcuMTE1LDMuMDg4LDguMDk0YzAsMS44NSwwLjk0MSwzLjQ4MywyLjM3Miw0LjQzOSBjLTAuODc0LTAuMDI4LTEuNjk3LTAuMjY4LTIuNDE2LTAuNjY3YzAsMC4wMjMsMCwwLjA0NCwwLDAuMDY3YzAsMi41ODUsMS44MzgsNC43NDEsNC4yNzksNS4yMyBjLTAuNDQ3LDAuMTIyLTAuOTE5LDAuMTg3LTEuNDA2LDAuMTg3Yy0wLjM0MywwLTAuNjc4LTAuMDM0LTEuMDAzLTAuMDk1YzAuNjc5LDIuMTE5LDIuNjQ5LDMuNjYyLDQuOTgzLDMuNzA1IGMtMS44MjUsMS40MzEtNC4xMjUsMi4yODQtNi42MjUsMi4yODRjLTAuNDMsMC0wLjg1NS0wLjAyNS0xLjI3My0wLjA3NWMyLjM2MSwxLjUxMyw1LjE2NCwyLjM5Niw4LjE3NywyLjM5NiBjOS44MTIsMCwxNS4xNzYtOC4xMjgsMTUuMTc2LTE1LjE3N2MwLTAuMjMxLTAuMDA1LTAuNDYxLTAuMDE1LTAuNjlDMjYuMzgsOC45NDUsMjcuMjg1LDguMDA2LDI4LDYuOTM3eiI+PC9wYXRoPjwvc3ZnPg=="/>
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
                                            width='128'
                                            height='128'
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
                            <Greeting />
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
                            Published with&nbsp;
                            <a
                                className="site-foot-nav-item"
                                href="https://ghost.org"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Ghost
                            </a>,&nbsp;
                            <a
                                className="site-foot-nav-item"
                                href="https://www.gatsbyjs.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Gatsby
                            </a>
                            &nbsp;&&nbsp;
                            <a
                                className="site-foot-nav-item"
                                href="https://vercel.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Vercel
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
