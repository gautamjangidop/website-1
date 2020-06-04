import React from 'react'
import { graphql } from 'gatsby'
import ContentfulContent from '~components/common/contentful-content'
import Layout from '~components/layout'
import VolunteersList from '~components/common/volunteers-list'

export default ({ data }) => (
  <Layout
    title="About us"
    path="/about-project"
    narrow
    textHeavy
    navigation={data.contentfulNavigationGroup.pages}
  >
    <ContentfulContent
      content={
        data.preamble.childContentfulSnippetContentTextNode.childMarkdownRemark
          .html
      }
      id={data.preamble.contentful_id}
    />
    <VolunteersList items={data.allCovidVolunteers.edges} />
    <ContentfulContent
      content={
        data.pastContributors.childContentfulSnippetContentTextNode
          .childMarkdownRemark.html
      }
      id={data.pastContributors.contentful_id}
    />
  </Layout>
)

export const query = graphql`
  query {
    preamble: contentfulSnippet(slug: { eq: "about-us-preamble" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    pastContributors: contentfulSnippet(slug: { eq: "past-contributors" }) {
      contentful_id
      childContentfulSnippetContentTextNode {
        childMarkdownRemark {
          html
        }
      }
    }
    allCovidVolunteers(sort: { fields: _sort }) {
      edges {
        node {
          name
          website
        }
      }
    }
    contentfulNavigationGroup(slug: { eq: "about-project" }) {
      pages {
        ... on ContentfulPage {
          title
          link: slug
        }
        ... on ContentfulNavigationLink {
          title
          link: url
        }
      }
    }
  }
`
