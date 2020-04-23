const _ = require(`lodash`);
const Promise = require(`bluebird`);
const path = require(`path`);
const slash = require(`slash`);

exports.createPages = async ({ graphql, actions }) => {
    const { createPage, createRedirect } = actions;
    return new Promise((resolve, reject) => {
        graphql(`
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
                allWordpressWpVideoCategories(filter: { count: { gt: 0 } }) {
                    edges {
                        node {
                            id
                            name
                            slug
                            wordpress_id
                            count
                        }
                    }
                }
            }
        `)
            .then(result => {
                if (result.errors) {
                    console.log(result.errors);
                    reject(result.errors);
                }
                // Create Category pages.
                const pageTemplate = path.resolve('./src/templates/archive.tsx');
                const videoPosts = result.data.allWordpressWpVideo.edges;
                const categoryPosts = result.data.allWordpressWpVideoCategories.edges;
                _.each(categoryPosts, category => {
                    const postObject = [];
                    _.each(videoPosts, post => {
                        if (post.node.video_categories.includes(category.node.wordpress_id)) {
                            const object = {};
                            object.node = post.node;
                            postObject.push(object);
                        }
                    });
                    createPage({
                        path: `/video/category/${category.node.slug}/`,
                        component: slash(pageTemplate),
                        context: {
                            postData: postObject,
                            categoryData: categoryPosts,
                            singleCategoryData: [
                                {
                                    node: {
                                        id: category.node.id,
                                        name: category.node.name,
                                        slug: category.node.slug,
                                        wordpress_id: category.node.wordpress_id,
                                    },
                                },
                            ],
                        },
                    });
                });
            })
            .then(() => {
                graphql(`
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
                                        video_recommend {
                                            slug: post_name
                                        }
                                        video_recommend_flg
                                    }
                                }
                            }
                        }
                        allWordpressWpVideoCategories(filter: { count: { gt: 0 } }) {
                            edges {
                                node {
                                    id
                                    name
                                    slug
                                    wordpress_id
                                }
                            }
                        }
                    }
                `).then(result => {
                    if (result.errors) {
                        console.log(result.errors);
                        reject(result.errors);
                    }
                    // Create Single pages.
                    const pageTemplate = path.resolve('./src/templates/single.tsx');
                    const videoPosts = result.data.allWordpressWpVideo.edges;
                    const categoryPosts = result.data.allWordpressWpVideoCategories.edges;
                    _.each(videoPosts, post => {
                        const categoryObject = [];
                        _.each(categoryPosts, category => {
                            if (post.node.video_categories.includes(category.node.wordpress_id)) {
                                const object = {};
                                object.node = category.node;
                                categoryObject.push(object);
                            }
                        });
                        const recObject = [];
                        _.each(post.node.acf.video_recommend, recPost => {
                            _.each(videoPosts, videoPost => {
                                if (videoPost.node.slug.includes(recPost.slug)) {
                                    const object = {};
                                    object.node = videoPost.node;
                                    recObject.push(object);
                                }
                            });
                        });
                        createPage({
                            path: `/video/${post.node.slug}`,
                            component: slash(pageTemplate),
                            context: {
                                singlePostData: post,
                                singleCategoryData: categoryObject,
                                categoryData: categoryPosts,
                                recommendData: recObject,
                            },
                        });
                    });
                });
            })
            .then(() => {
                graphql(`
                    {
                        allWordpressWpVideo(filter: { acf: { video_slide_flg: { eq: "true" } } }) {
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
                        allWordpressWpVideoCategories(filter: { count: { gt: 0 } }) {
                            edges {
                                node {
                                    id
                                    name
                                    slug
                                    wordpress_id
                                    count
                                }
                            }
                        }
                    }
                `).then(result => {
                    if (result.errors) {
                        console.log(result.errors);
                        reject(result.errors);
                    }
                    // Create Front pages.
                    const pageTemplate = path.resolve('./src/templates/front.tsx');
                    const videoPosts = result.data.allWordpressWpVideo.edges;
                    const categoryPosts = result.data.allWordpressWpVideoCategories.edges;
                    const allPosts = [];
                    _.each(categoryPosts, category => {
                        const postObject = {};
                        const postArray = [];
                        _.each(videoPosts, post => {
                            if (post.node.video_categories.includes(category.node.wordpress_id)) {
                                const object = {};
                                object.node = post.node;
                                postArray.push(object);
                            }
                        });
                        postObject.name = category.node.name;
                        postObject.slug = category.node.slug;
                        postObject.postData = postArray;
                        allPosts.push(postObject);
                    });
                    createPage({
                        path: `/`,
                        component: slash(pageTemplate),
                        context: {
                            customPostData: allPosts,
                            categoryData: categoryPosts,
                        },
                    });
                    resolve();
                });
            });
    });
};
