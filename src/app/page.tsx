import React from "react";

import { ArticleCard } from "@/components/ArticleCard";
import { serverServices } from "@/lib/services/serverOnly";
import { ArticleModelToCardData, IArticleModel } from "@/lib/models";

export default async function Home() {
  const articles = await serverServices.getArticles();

  return (
    <div className="w-full min-h-screen pt-24 ">
      <div className="flex flex-col justify-center items-center mb-6">
        <h1 className="text-white text-3xl sm:text-5xl text-center font-semibold">
          Blog Page
        </h1>

        <p className="w-[70%] mt-8 mb-3 text-lg text-white/50 text-center font-medium leading-normal">
          Welcome to my blog! Dive into a wealth of insightful articles,
          practical guides, and project breakdowns, empowering you to level up
          your Rust and Blockchain development skills.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center md:items-stretch md:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 sm:gap-y-6">
        {articles
          .sort((a: IArticleModel, b: IArticleModel) => b.id - a.id)
          .map((post, index) => (
            <div key={index.toFixed(2)}>
              <ArticleCard cardData={ArticleModelToCardData(post)} />
            </div>
          ))}
      </div>
    </div>
  );
};