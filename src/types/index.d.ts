/* types */

type BooleanText = 'true' | 'false';

export interface IPostData {
    id: string;
    title: string;
    slug: string;
    video_categories: number[];
    acf: {
        video_id: string;
        video_recommend?: {
            post_name: string;
        };
        video_slide_flg?: BooleanText;
        video_recommend_flg?: BooleanText;
    };
}

export interface ICategoryData {
    id: string;
    name: string;
    slug: string;
    wordpress_id: number;
    subCategoryData?: {
        id: string;
        name: string;
        slug: string;
        wordpress_id: number;
    }[];
}
