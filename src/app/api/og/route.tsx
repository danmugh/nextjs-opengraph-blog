import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

export const contentType = "image/png";

// Image generation
export async function GET() {
  try {
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
          <div tw="flex flex-col">
            <h1 tw="text-white text-5xl font-bold leading-[4px]">Learn more today!</h1>
            <h1 tw="text-white/70 text-3xl font-bold leading-[8px]">Dive into the future of tech...</h1>
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