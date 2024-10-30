"use client";

import React from "react";
import Image from "next/image";

import { ArticleCardData } from "@/lib/models";

type Props = {
  cardData: ArticleCardData;
};

export const ArticleCard = ({ cardData }: Props) => {
  const href = `/article/${cardData.slug}`;

  return (
    <a href={href}>
      <div
        className="max-w-[376px] h-full bg-[#1B2022] mx-0 sm:mx-medium p-4 my-medium shadow-[0px_8px_16px_0px_rgba(0,0,0,0.15)] rounded-lg flex flex-col items-start justify-between"
      >
        <div>
          <Image
            src={cardData?.cover as string}
            alt={cardData.title}
            className="w-full h-[130px]"
            width={100}
            height={100}
            placeholder="blur"
            blurDataURL={cardData?.cover}
            unoptimized
          />
          <h3 className="mt-4 text-xl sm:text-2xl text-white text-start font-bold leading-normal line-clamp-3">
            {cardData.title}
          </h3>
          <p className="mt-3 text-[15px] text-white/50 text-start font-normal leading-normal line-clamp-4">
            {cardData.summary}
          </p>
        </div>
      </div>
    </a>
  );
};
