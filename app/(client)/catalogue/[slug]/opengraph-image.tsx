import { ImageResponse } from "next/og";
import { sanityClient } from "@/lib/sanity";

export const runtime = "edge";

interface Props {
  params: {
    slug: string;
  };
}

export default async function Image({ params }: Props) {
  const data = await sanityClient.fetch(
    `*[_type == "piece" && slug.current == $slug][0]{ title }`,
    { slug: params.slug }
  );

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: "white",
          color: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {data?.title || "KK Interiors"}
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
