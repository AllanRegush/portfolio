import React from 'react';
import { graphql, Link } from 'gatsby';

export default function BlogsPage({ data }) {
    console.log(data)
    return (
        <>
        <h4>{ data.allMarkdownRemark.totalCount } Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
            <div key={node.id}>
            <Link
                to={`/blog${node.fields.slug}`}
            >
            <h3>{node.frontmatter.title} {" "}</h3>
            <span> - {node.frontmatter.date}</span>
            <p>{node.excerpt}</p>
            </Link>
            </div>
        
        ))}
        </>
    );
}

export const query = graphql`
    query {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
            totalCount
            edges {
                node {
                    id
                    frontmatter {
                        title
                        date(formatString: "DD MMMM, YYYY")
                    }
                    fields {
                        slug
                    }
                    excerpt
                }
            }
        }
    }
`
