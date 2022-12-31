import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function ogHandle(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hasTitle = searchParams.has("title");
    const title = hasTitle ? searchParams.get("title")?.slice(0, 100) : "";
    console.log(hasTitle);

    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 72,
            color: "#08090A",
            background: "#F4F7F5",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "center",
            border: "32px solid #467599",
          }}
        >
          {title}
          <div style={{ fontSize: 24 }}>AI Dating Consultant🤖</div>
        </div>
      ),
      {
        width: 1200,
        height: 600,
      },
    );
  } catch (e: any) {
    console.error(e.message);
    return new Response("OGP画像の生成に失敗", { status: 500 });
  }
}
