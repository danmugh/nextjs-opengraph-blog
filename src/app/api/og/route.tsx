/* eslint-disable @next/next/no-img-element */

import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

import { IArticleModel } from "@/lib/models";

// Route segment config
export const runtime = "edge";

export const contentType = "image/png";

// Image generation
export async function GET(req: NextRequest) {
  try {
    const article: IArticleModel = await fetch(
      `https://dev.to/api/articles/danmugh/${req.nextUrl.searchParams.get(
        "title"
      )}`
    ).then((res) => res.json());

    // Font
    const rubik = await fetch(
      new URL("../../../../public/fonts/rubik.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    // Background Image
    const bg = await fetch(
      new URL("../../../../public/OGBackground.png", import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
      (
        <div
          style={{
            fontFamily: "Rubik",
            fontWeight: "bolder",
          }}
          tw="w-full h-full flex items-center justify-center relative"
        >
          <img
            src={bg}
            width={100}
            height={100}
            alt="background"
            tw="w-full h-full"
            style={{ objectFit: "cover" }}
          />
          <div tw="absolute top-0 left-0 p-16 w-full h-full flex items-center justify-start">
            <div
              style={{ background: "#1B2022" }}
              tw="max-w-[420px] h-full mx-0 p-5 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.15)] rounded-xl flex flex-col items-start justify-between"
            >
              <div tw="flex flex-col">
                <div tw="flex justify-center items-center">
                    <img
                        src={article.cover_image}
                        alt={article.title}
                        tw="w-full h-[190px]"
                        width={100}
                        height={100}
                    />
                </div>
                <h2 tw="mt-4 text-2xl text-white text-start font-bold leading-8 line-clamp-3">
                  {article.title}
                </h2>
                <p tw="text-lg text-white/50 text-start font-normal leading-6 line-clamp-5">
                  {article.description}
                </p>
              </div>
              <div tw="w-full flex justify-between items-center">
                <p tw="text-[17px] text-white/75 font-semibold">
                {article.readable_publish_date}
                </p>
                <p tw="text-[17px] text-white/75 font-semibold">
                    {article.reading_time_minutes} Min read
                </p>
              </div>
            </div>
          </div>
          <div tw="absolute top-0 right-0 p-16 w-full h-full flex items-end justify-end">
            <div tw="flex justify-center items-center">
                <p tw="text-[22px] text-white/85 font-semibold leading-[1px]">
                    #LearnMoreToday
                  </p>
                <img
                  src={article.user.profile_image}
                  width={100}
                  height={100}
                  alt={article.title}
                  tw="w-[40px] h-[40px] rounded-[10px] ml-3"
                  style={{ objectFit: "cover" }}
                />
              </div>
          </div>
        </div>
      ),
      {
        fonts: [
          {
            name: "Rubik",
            data: rubik,
            weight: 700,
            style: "normal",
          },
        ],
      }
    );
  } catch (e: any) {
    return new Response("Failed to generate OG Image", { status: 500 });
  }
}