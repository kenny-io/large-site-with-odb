import Head from "next/head";
// import client from "../../client";
import { format } from "date-fns";
import { groq } from "next-sanity";
import { usePreviewSubscription, urlFor, PortableText } from "../../lib/sanity";
import { getClient } from "../../lib/sanity.server";
import Link from "next/link";

export default function Post({ data, preview }) {
  const { data: post } = usePreviewSubscription(postQuery, {
    initialData: data.post,
    enabled: preview && data.post?.slug,
  });
  //   const { title, mainImage, body } = post;
  //   console.log(post);
  return (
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
                    href={`/blog/${encodeURIComponent(blogpost.slug.current)}`}
                  >
                    <a className="text-green-500 inline-flex items-center mt-4">
                      {/* <nuxt-link :to="`/blog/${post.slug}`"> Read More </nuxt-link> */}
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
  );
}

const postQuery = groq`
  *[_type == "post"]
`;

export async function getStaticProps({ preview = false }) {
  const post = await getClient(preview).fetch(postQuery);
  //   console.log(post);
  return {
    props: {
      preview,
      data: { post },
    },
  };
}
