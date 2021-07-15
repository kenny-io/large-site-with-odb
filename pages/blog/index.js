import Head from "next/head";
import { groq } from "next-sanity";
import { getClient } from "../../lib/sanity.server";
import Link from "next/link";

export default function Post({ data }) {
  const { post } = data;
  return (
    <div>
      <Head>
        <title>Blog</title>
        <meta name="description" content="Read our blog posts" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            {post.map((blogpost) => (
              <div key={blogpost.slug.current}>
                <div className="py-8 flex flex-wrap md:flex-nowrap">
                  <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
                    <span className="font-semibold title-font text-gray-700">
                      {blogpost.category || "tutorial"}
                    </span>
                    <span className="mt-1 text-gray-500 text-sm">
                      {blogpost._createdAt}
                    </span>
                  </div>
                  <div className="md:flex-grow">
                    <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">
                      {blogpost.title}
                    </h2>
                    <p className="leading-relaxed">{blogpost.excerpt}</p>
                    <Link
                      href={`/blog/${encodeURIComponent(
                        blogpost.slug.current
                      )}`}
                    >
                      <a className="text-green-500 inline-flex items-center mt-4">
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
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

const postQuery = groq`
  *[_type == "post"]
`;

export async function getStaticProps() {
  const post = await getClient().fetch(postQuery);
  return {
    props: {
      data: { post },
    },
  };
}
