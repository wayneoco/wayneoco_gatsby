import * as React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";

import { Layout, PostCardArchive } from "../components/common";
import { MetaData } from "../components/common/meta";

const Archive = ({ data, location }) => {
    const posts = data.allGhostPost.edges;
    const tags = data.allGhostTag.edges;

    return (
        <>
            <MetaData location={location} />
            <Layout isHome={false}>
                <div className="container">
                    <h1 className="content-title">Archive</h1>
                    {posts.map(({ node }) => (
                        // The tag below includes the markup for each post - components/common/PostCard.js
                        <PostCardArchive key={node.id} post={node} />
                    ))}
                    <h2 className={["content-title", "tags"].join(" ")}>
                        Tags
                    </h2>
                    <ul className="archive-tags-list">
                        {tags.map(({ node }) => (
                            <li key={node.id}>
                                <Link to={`../tag/${node.slug}`}>
                                    {node.name}
                                </Link>
                                <span className="tag-count">
                                    ({node.count.posts})
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Layout>
        </>
    );
};

Archive.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
            tags: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                })
            ),
            excerpt: PropTypes.string,
            primary_author: PropTypes.shape({
                name: PropTypes.string,
                profile_image: PropTypes.string,
                bio: PropTypes.string,
            }),
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
};

export default Archive;

export const archiveQuery = graphql`
    query ArchiveGhostPostQuery {
        allGhostPost(sort: { order: DESC, fields: published_at }) {
            edges {
                node {
                    ...GhostPostFields
                }
            }
        }
        allGhostTag {
            edges {
                node {
                    name
                    count {
                        posts
                    }
                    slug
                    url
                }
            }
        }
    }
`;
