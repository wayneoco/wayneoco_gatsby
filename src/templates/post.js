import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import { Link } from "gatsby";
import { Tags } from "@tryghost/helpers-gatsby";
import { readingTime as readingTimeHelper } from "@tryghost/helpers";

import { Layout } from "../components/common";
import { MetaData } from "../components/common/meta";

/**
 * Single post view (/:slug)
 *
 * This file renders a single post and loads all the content.
 *
 */
const Post = ({ data, location }) => {
    const post = data.ghostPost;
    const url = `/${post.slug}/`;
    const readingTime = readingTimeHelper(post);

    return (
        <>
            <MetaData data={data} location={location} type="article" />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        {post.feature_image ? (
                            <figure className="post-feature-image">
                                <img
                                    src={post.feature_image}
                                    alt={post.title}
                                />
                            </figure>
                        ) : null}
                        <section className="post-full-content">
                            <h1 className="content-title" id={post.slug}>
                                {post.title}
                            </h1>
                            <section className="post-meta">
                                <div className="post-meta-upper">
                                    <div className="post-published-date">
                                        {post.published_at_pretty} &mdash; {readingTime}
                                    </div>
                                </div>
                                <div className="post-meta-lower">
                                    {post.tags && (
                                        <div className="post-tags">
                                            {" "}
                                            <Tags
                                                post={post}
                                                visibility="public"
                                                autolink={true}
                                            />
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* The main post content */}
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.childHtmlRehype.html }}
                            />
                        </section>
                        <section className="post-author">
                            <div className="post-author-media">
                                <img src={post.primary_author.profile_image} alt={post.primary_author.name} />
                            </div>
                            <div className="post-author-content">
                                <h4 className="post-author-name">{post.primary_author.name}</h4>
                                <p className="post-author-bio">{post.primary_author.bio}</p>
                            </div>
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    );
};

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            childHtmlRehype: PropTypes.shape({
                html: PropTypes.string.isRequired,
            }),
            feature_image: PropTypes.string,
            tags: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                })
            ),
            excerpt: PropTypes.string.isRequired,
            primary_author: PropTypes.shape({
                name: PropTypes.string.isRequired,
                profile_image: PropTypes.string,
                bio: PropTypes.string,
            }).isRequired,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default Post;

export const postQuery = graphql`
    query ($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`;
