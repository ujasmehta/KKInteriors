import { sanityClient, urlFor } from "@/lib/sanity";

interface Piece {
  _id: string;
  title: string;
  description: string;
  image: any;
  price: number;
}

export default async function Catalogue() {
  // Fetch 5 pieces from Sanity
  const query = `*[_type == "piece"][0...5]{
    _id,
    title,
    description,
    image,
    price
  }`;

  const pieces: Piece[] = await sanityClient.fetch(query);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Catalogue</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pieces.map((piece) => (
          <div key={piece._id} className="border p-4 rounded shadow">
            <img
              src={urlFor(piece.image).width(300).height(300).url()}
              alt={piece.title}
              className="mb-4"
            />
            <h2 className="text-xl font-semibold">{piece.title}</h2>
            <p className="mb-2">{piece.description}</p>
            <p className="font-bold">${piece.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
