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
                            wordpress_parent
                            acf {
                                order_id
                            }
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
                categoryPosts.sort((a, b) => {
                    const orderA = a.node.acf != null ? parseInt(a.node.acf.order_id, 10) : 9999;
                    const orderB = b.node.acf != null ? parseInt(b.node.acf.order_id, 10) : 9999;
                    if (orderA > orderB) return 1;
                    if (orderA < orderB) return -1;
                    if (a.node.name > b.node.name) return 1;
                    if (a.node.name < b.node.name) return -1;
                    return 0;
                });
                const customCategoryPosts = [];
                _.each(categoryPosts, primaryPost => {
                    if (primaryPost.node.wordpress_parent === 0) {
                        const propertyObject = {};
                        const dataArray = [];
                        _.each(categoryPosts, secondaryPost => {
                            if (secondaryPost.node.wordpress_parent > 0) {
                                if (primaryPost.node.wordpress_id == secondaryPost.node.wordpress_parent) {
                                    const object = secondaryPost.node;
                                    dataArray.push(object);
                                }
                            }
                        });
                        propertyObject.node = {};
                        propertyObject.node.name = primaryPost.node.name;
                        propertyObject.node.slug = primaryPost.node.slug;
                        propertyObject.node.subCategoryData = dataArray;
                        customCategoryPosts.push(propertyObject);
                    }
                });
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
                            categoryData: customCategoryPosts,
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
                                    wordpress_parent
                                    acf {
                                        order_id
                                    }
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
                    categoryPosts.sort((a, b) => {
                        const orderA = a.node.acf != null ? parseInt(a.node.acf.order_id, 10) : 9999;
                        const orderB = b.node.acf != null ? parseInt(b.node.acf.order_id, 10) : 9999;
                        if (orderA > orderB) return 1;
                        if (orderA < orderB) return -1;
                        if (a.node.name > b.node.name) return 1;
                        if (a.node.name < b.node.name) return -1;
                        return 0;
                    });
                    const customCategoryPosts = [];
                    _.each(categoryPosts, primaryPost => {
                        if (primaryPost.node.wordpress_parent === 0) {
                            const propertyObject = {};
                            const dataArray = [];
                            _.each(categoryPosts, secondaryPost => {
                                if (secondaryPost.node.wordpress_parent > 0) {
                                    if (primaryPost.node.wordpress_id == secondaryPost.node.wordpress_parent) {
                                        const object = secondaryPost.node;
                                        dataArray.push(object);
                                    }
                                }
                            });
                            propertyObject.node = {};
                            propertyObject.node.name = primaryPost.node.name;
                            propertyObject.node.slug = primaryPost.node.slug;
                            propertyObject.node.subCategoryData = dataArray;
                            customCategoryPosts.push(propertyObject);
                        }
                    });
                    _.each(videoPosts, primaryPost => {
                        const categoryObject = [];
                        _.each(categoryPosts, category => {
                            if (primaryPost.node.video_categories.includes(category.node.wordpress_id)) {
                                const object = {};
                                object.node = category.node;
                                categoryObject.push(object);
                            }
                        });
                        const recObject = [];
                        _.each(primaryPost.node.acf.video_recommend, recPost => {
                            _.each(videoPosts, secondaryPost => {
                                if (secondaryPost.node.slug.includes(recPost.slug)) {
                                    const object = {};
                                    object.node = secondaryPost.node;
                                    recObject.push(object);
                                }
                            });
                        });
                        createPage({
                            path: `/video/${primaryPost.node.slug}`,
                            component: slash(pageTemplate),
                            context: {
                                singlePostData: primaryPost,
                                singleCategoryData: categoryObject,
                                categoryData: customCategoryPosts,
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
                                    wordpress_parent
                                    acf {
                                        order_id
                                    }
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
                    categoryPosts.sort((a, b) => {
                        const orderA = a.node.acf != null ? parseInt(a.node.acf.order_id, 10) : 9999;
                        const orderB = b.node.acf != null ? parseInt(b.node.acf.order_id, 10) : 9999;
                        if (orderA > orderB) return 1;
                        if (orderA < orderB) return -1;
                        if (a.node.name > b.node.name) return 1;
                        if (a.node.name < b.node.name) return -1;
                        return 0;
                    });
                    const customPosts = [];
                    const customCategoryPosts = [];
                    _.each(categoryPosts, categoryPost => {
                        if (categoryPost.node.wordpress_parent === 0) {
                            const propertyObject = {};
                            const dataArray = [];
                            _.each(videoPosts, videoPost => {
                                if (videoPost.node.video_categories.includes(categoryPost.node.wordpress_id)) {
                                    const object = {};
                                    object.node = videoPost.node;
                                    dataArray.push(object);
                                }
                            });
                            propertyObject.name = categoryPost.node.name;
                            propertyObject.slug = categoryPost.node.slug;
                            propertyObject.relatedData = dataArray;
                            customPosts.push(propertyObject);
                        }
                    });
                    _.each(categoryPosts, primaryPost => {
                        if (primaryPost.node.wordpress_parent === 0) {
                            const propertyObject = {};
                            const dataArray = [];
                            _.each(categoryPosts, secondaryPost => {
                                if (secondaryPost.node.wordpress_parent > 0) {
                                    if (primaryPost.node.wordpress_id == secondaryPost.node.wordpress_parent) {
                                        const object = secondaryPost.node;
                                        dataArray.push(object);
                                    }
                                }
                            });
                            propertyObject.node = {};
                            propertyObject.node.name = primaryPost.node.name;
                            propertyObject.node.slug = primaryPost.node.slug;
                            propertyObject.node.subCategoryData = dataArray;
                            customCategoryPosts.push(propertyObject);
                        }
                    });
                    createPage({
                        path: `/`,
                        component: slash(pageTemplate),
                        context: {
                            postData: customPosts,
                            categoryData: customCategoryPosts,
                        },
                    });
                    resolve();
                });
            });
    });
};
