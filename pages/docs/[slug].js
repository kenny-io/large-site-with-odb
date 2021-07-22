import { groq } from "next-sanity";
import { getClient } from "../../lib/sanity.server";
import { useRouter } from "next/router";

export default function ReadDoc({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const { docs } = data;
  return (
    <article>
      <h2>{docs.title}</h2>
      <br />
      <p>{docs.body}</p>
    </article>
  );
}

const postQuery = groq`
  *[_type == "docs" && slug.current == $slug][0] {
    _id,
    title,
    body,
    "slug": slug.current
  }
`;

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    groq`*[_type == "docs" && defined(slug.current)][].slug.current`
  );

  const firstDoc = paths[0];

  return {
    // paths: paths.map((slug) => ({ params: { slug } })),
    paths: [{ params: { slug: firstDoc } }],
    fallback: true,
  };
}
export async function getStaticProps({ params }) {
  const docs = await getClient().fetch(postQuery, {
    slug: params.slug,
  });

  return {
    props: {
      data: { docs },
    },
  };
}
