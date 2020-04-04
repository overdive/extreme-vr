/* types */

export interface IPostData {
    id: string;
    title: string;
    slug: string;
    video_categories: number[];
    acf: {
        video_id: string;
    };
}

export interface ICategoryData {
    id: string;
    name: string;
    slug: string;
    wordpress_id: number;
}
