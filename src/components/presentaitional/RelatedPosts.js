import React from 'react';
import { Link } from 'gatsby';
import { getPathOfPost } from '../../lib/path';

export default ({ relatedPostList }) => {
    return (
        <div>
            <div>
                RelatedPost
            </div>
            {
                relatedPostList.map((post) => {
                    return (
                        <Link to={getPathOfPost(post.id)}>{post.title}</Link>
                    );
                }) 
            }
        </div>
    );
};
