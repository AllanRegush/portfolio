import path from 'path';
import { createFilePath } from 'gatsby-source-filesystem';

export function onCreateNode({ node, getNode, actions }) {
    const { createNodeField } = actions;
    if (node.internal.type === 'MarkdownRemark') {
        const slug = createFilePath({ node, getNode, basePath: 'content'});
        createNodeField({
            node,
            name: 'slug',
            value: slug,
        });
    }
}

export async function createPages({ graphql, actions }) {
    const { createPage } = actions;
    const result = await graphql(`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    `)

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: `/blog${node.fields.slug}`,
            component: path.resolve('./src/templates/blog-post.js'),
            context: {
                slug: node.fields.slug,
            },
        })
    });
}