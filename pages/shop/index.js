import { groq } from "next-sanity";
import { getClient } from "../../lib/sanity.server";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function Shop({ data }) {
  const { products } = data;
  return (
    <div>
      <Head>
        <title>Shop </title>
        <meta name="description" content="Shop your favorite products here" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {products.map((product) => (
              <div
                key={product.slug.current}
                className="w-3/5 h-auto lg:w-1/4 md:w-1/2 p-4 w-full	"
              >
                <div className="max-w-lg max-h-50 rounded overflow-hidden shadow-lg">
                  <Image
                    className="max-w-24 max-h-32"
                    src={product.imageUrl}
                    alt="Sunset in the mountains"
                    height="100px"
                    width="100"
                  />
                  <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">
                      {product.title}
                    </div>
                    <p className="text-gray-700 text-base">{product.blurb}</p>
                    <p className="text-gray-700 text-base font-bold">
                      $ {product.price}
                    </p>
                  </div>
                  <div className="px-6 pt-4 pb-2">
                    <Link
                      href={`/shop/${encodeURIComponent(product.slug.current)}`}
                    >
                      <a>
                        <span className="inline-block bg-green-900 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
                          View Product
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const query = groq`
  *[_type == "product"]{
        title,
        slug,
        _id,
        "price": defaultProductVariant.price,
        "imageUrl": defaultProductVariant.images[0].asset->url,
        "blurb": blurb.en
      }`;

export async function getStaticProps() {
  const products = await getClient().fetch(query);

  return {
    props: {
      data: { products },
    },
  };
}
