import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
//import Image from "../components/image"
import SEO from "../components/seo"
import Image from 'gatsby-image'
export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        <h1>Words</h1>
        <Image
        className="avatar"
        fixed={data.avatar.childImageSharp.fixed}
        alt="Mr. Chenzo"
        style={{
          marginBottom: 0,
          minWidth: 150,
          borderRadius: '100%',
          border: '8px solid lavender',
        }}
        imgStyle={{
          borderRadius: '50%',
        }}
      />

        {data.avatar.childImageSharp.fixed.src}

        <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={node.fields.slug}>
              <h3>
                {node.frontmatter.title}{" "}
                <span>
                  — {node.frontmatter.date}
                </span>
              </h3>
              <p>{node.excerpt}</p>
              </Link>
          </div>
        ))}
      </div>
    </Layout>
  )
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
    avatar: file(absolutePath: { regex: "/avatar.png/" }) {
      childImageSharp {
        fixed(width: 150, height: 150, quality: 90) {
          base64
          width
          height
          src
          srcSet
        }
      }
    }
  }
`