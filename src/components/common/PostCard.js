import * as React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";
import { Tags } from "@tryghost/helpers-gatsby";
import { ChevronDoubleRight } from "../../images/ChevronDoubleRight.js";

const displayIcon = (e) => {
    const parent = e.target.parentElement;
    const icon = parent.querySelector('.post-card-icon');
    const title = parent.querySelector('.post-card-title');

    icon.style.transform = 'translateX(0)';
    title.style.marginLeft = '20px';
    title.style.fontWeight = '500';
};

const hideIcon = (e) => {
    const parent = e.target.parentElement;
    const icon = parent.querySelector('.post-card-icon');
    const title = parent.querySelector('.post-card-title');

    icon.style.transform = 'translateX(-2rem)';
    title.style.marginLeft = '0';
    title.style.fontWeight = '300';
};

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`;

    return (
        <section className="post-card" data-for={post.slug}>
            <div className="post-card-icon">
                <ChevronDoubleRight />
            </div>
            <div className="post-card-title">
                {post.title}
            </div>
            <div className="post-card-date">
                {post.published_at_short}
            </div>
            <Link to={url} className="post-card-link" id={post.slug} onMouseEnter={displayIcon} onMouseLeave={hideIcon} title={post.title}>
            </Link>
        </section>
    );
};

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        tags: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
            })
        ),
        excerpt: PropTypes.string.isRequired,
        primary_author: PropTypes.shape({
            name: PropTypes.string.isRequired,
            profile_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
};

export default PostCard;
