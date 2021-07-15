import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { getClient } from "../../lib/sanity.server";

export default function ReadPost({ data, preview }) {
  const router = useRouter();
  const { post } = data;

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

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

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const post = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  });

  return {
    props: {
      preview,
      data: { post },
    },
  };
}
