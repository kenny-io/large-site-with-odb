import { groq } from "next-sanity";
import { getClient } from "../../lib/sanity.server";
import { useRouter } from "next/router";

export default function ReadPost({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { post } = data;
  return (
    <article>
      <h2>{post.title}</h2>
      <br />
      <p>{post.body}</p>
    </article>
  );
}

const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    body,
    mainImage,
    categories[]->{
      _id,
      title
    },
    "slug": slug.current
  }
`;

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  const firstPost = paths[0];

  /* 
  console.log(paths); 
  -----------------------------
  [
  'large-sites-with-odb',
  'jamstack-for-enterprise-applications',
  'next-on-netlify',
  'dynamic-jamstack-sites-in-2021',
  'modern-faster-netlify-functions',
  'deep-dive-into-the-vue-composition-api-s-watch-method',
  'how-to-rollback-a-deploy-in-2-seconds-on-netlify'
]
  */

  return {
    // paths: paths.map((slug) => ({ params: { slug } })),
    paths: [{ params: { slug: firstPost } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const post = await getClient().fetch(postQuery, {
    slug: params.slug,
  });

  return {
    props: {
      data: { post },
    },
  };
}
