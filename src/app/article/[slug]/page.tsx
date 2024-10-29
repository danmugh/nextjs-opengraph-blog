import React from "react";
import Image from "next/image";
import MarkdownIt from "markdown-it";
import { Metadata } from "next/types";

import { notFound } from "next/navigation";
import { IArticleModel } from "@/lib/models";
import { serverServices } from "@/lib/services/serverOnly";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = "https://www.danmugh.com/";

  const title = "Article title";
  const description = "Article description";

  return {
    title,
    description,
    metadataBase: new URL(baseUrl)
  };
};

const BlogPage = async ({ params: { slug } }: Props) => {
  const article = (await serverServices.getArticle(slug)) as IArticleModel;

  if (!article) {
    return notFound();
  }

  const md = new MarkdownIt({
    html: true,
  });

  md.renderer.rules.image = function (tokens, idx, _options, _env, _self) {
    const token = tokens[idx];
    const imgSrc = token.attrGet("src");
    const imgAlt = token.content || "";
    const imgTitle = token.attrGet("title") || "";

    const imgWidth = "1000";
    const imgHeight = "400";

    return `<img src="${imgSrc}" alt="${imgAlt}" title="${imgTitle}" width="${imgWidth}" height="${imgHeight}" style="object-fit: contain;" />`;
  };

  return (
    <div className="w-full py-4 mb-5 min-h-screen">
      <div className="mt-8 md:px-[20px] lg:px-[50px] xl:px-[100px]">
        <h1 className="text-3xl sm:text-5xl text-white text-start font-bold sm:leading-[1.1]">
          {article.title}
        </h1>

        <div className="mt-0 mb-3 sm:mb-7">
          <Image
            src={article?.cover_image as string}
            alt={article.title}
            className="w-full h-full object-contain rounded-xl mt-12 mb-6"
            width={100}
            height={100}
            placeholder="blur"
            blurDataURL={article.cover_image || ""}
            unoptimized
          />
          <section
            className="markdown-body mt-4 sm:mt-8 mb-3 sm:mb-7 text-sm sm:text-lg text-white/50 text-start font-normal leading-normal"
            dangerouslySetInnerHTML={{
              __html: md.render(article.body_markdown as string),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
