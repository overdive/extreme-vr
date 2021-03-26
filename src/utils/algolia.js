const fetchAllPosts = `
{
    allWordpressWpVideo {
        edges {
            node {
                id
                title
                slug
                video_categories
                acf {
                    video_id
                }
            }
        }
    }
}
`

const unnest = node => {
  const { acf, ...rest } = node

  return {
    ...acf,
    ...rest
  }
}

const queries = [
  {
    query: fetchAllPosts,
    transformer: ({ data }) =>
      data.allWordpressWpVideo.edges.map(edge => edge.node).map(unnest)
  }
]

module.exports = queries