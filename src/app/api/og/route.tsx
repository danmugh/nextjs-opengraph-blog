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

    return new ImageResponse(
      (
        <div
          style={{
            fontFamily: "Rubik",
            fontWeight: "bolder",
            background: "linear-gradient(to right, #6a11cb 0%, #2575fc 100%)",
          }}
          tw="w-full h-full p-8 flex items-center justify-center relative"
        >
          <div tw="w-full flex flex-col">
            <h1 tw="text-[36px] text-white font-bold">{article.title}</h1>
            <div tw="h-[50px] mt-3 flex justify-between items-center">
              <div tw="flex justify-center items-center">
                <img
                  src={article.user.profile_image}
                  width={100}
                  height={100}
                  alt={article.title}
                  tw="w-[60px] h-[60px] rounded-[10px] mr-2"
                  style={{ objectFit: "cover" }}
                />
                <div tw="flex flex-col">
                  <p tw="text-[20px] text-white font-semibold leading-[1px]">
                    {article.user.name}
                  </p>
                  <p tw="text-[20px] text-white/60 font-semibold leading-[1px]">
                    Author
                  </p>
                </div>
              </div>
              <p tw="text-[20px] text-white font-semibold">
                {article.reading_time_minutes} Min read
              </p>
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