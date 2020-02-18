import React from 'react';

import { useStaticQuery, graphql } from "gatsby"

import TopFixedHeader from '../presentaitional/TopFixedHeader';
import PageWrapper from '../presentaitional/PageWrapper';

export default ({ children }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `);

    return (
        <>
            <TopFixedHeader title={data.site.siteMetadata.title} />
            <PageWrapper>
                {children}
            </PageWrapper>
        </>
    );
};
