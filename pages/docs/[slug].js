import { groq } from "next-sanity";
import { usePreviewSubscription, urlFor } from "../../lib/sanity";
import { getClient } from "../../lib/sanity.server";

const postQuery = groq`
  *[_type == "docs" && slug.current == $slug][0] {
    _id,
    title,
    body,
    "slug": slug.current
  }
`;

export default function ReadPost({ data, preview }) {
  const { data: docs } = usePreviewSubscription(postQuery, {
    params: { slug: data.docs?.slug },
    initialData: data.docs,
    enabled: preview && data.docs?.slug,
  });

  const { title, body } = docs;

  return (
    <article>
      <h2>{title}</h2>
      <br />
      <p>{body}</p>
    </article>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const docs = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  });

  return {
    props: {
      preview,
      data: { docs },
    },
  };
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    groq`*[_type == "docs" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}
