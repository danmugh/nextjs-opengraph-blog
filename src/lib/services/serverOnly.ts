import "server-only";

import { IArticleModel } from "../models";

const devToUrl = 'https://dev.to/api';
const devToUsername = 'danmugh';

class ServerServices {
  public async getArticles() {
    const data = await fetch(`${devToUrl}/articles?username=${devToUsername}`,
      {
        next: {
          revalidate: 60,
        },
      }).then((res) => res.json());

    return data as IArticleModel[];
  };

  public async getArticle(articleSlug: string) {
    const data = await fetch(`${devToUrl}/articles/${devToUsername}/${articleSlug}`,
      {
        next: {
          revalidate: 60,
        },
      }).then((res) => res.json());

  return data as IArticleModel;
  };
};

export const serverServices = new ServerServices();