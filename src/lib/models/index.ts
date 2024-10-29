export interface IArticleModel {
  type_of: string;
  id: number;
  title: string;
  description: string;
  readable_publish_date: string;
  slug: string;
  path: string;
  url: string;
  comments_count: number;
  public_reactions_count: number;
  collection_id: number | null;
  published_timestamp: string;
  positive_reactions_count: number;
  cover_image: string | null;
  social_image: string;
  canonical_url: string;
  created_at: string;
  edited_at: string | null;
  crossposted_at: string | null;
  published_at: string;
  last_comment_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  tags: string;
  body_html?: string;
  body_markdown?: string;
  user: any;
}

export interface ArticleCardData {
    id: number;
    title: string;
    slug: string;
    cover: any;
    publishedOn: string;
    summary: string;
};


export function ArticleModelToCardData(
    data: IArticleModel,
  ): ArticleCardData {
    const postCardData: ArticleCardData = {
        id: data.id,
        title: data.title,
        slug: data.slug,
        cover: data.cover_image,
        summary: data.description,
        publishedOn: data.published_timestamp,
    };
    return postCardData;
};