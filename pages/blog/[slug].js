// import ErrorPage from "next/error";
// import { useRouter } from "next/router";
import { groq } from "next-sanity";
import { usePreviewSubscription, urlFor } from "../../lib/sanity";
import { getClient } from "../../lib/sanity.server";
// const BlockContent = require("@sanity/block-content-to-react");
// import PortableText from "react-portable-text";
// import { serializers } from "@sanity/block-content-to-react/lib/targets/dom";

// const serializers = {
//   types: {
//     body: (props) => (
//       <pre data-language={props.node.language}>
//         <code>{props.node.code}</code>
//       </pre>
//     ),
//   },
// };

export default function ReadPost({ data, preview }) {
  // const router = useRouter();

  const { data: post } = usePreviewSubscription(postQuery, {
    params: { slug: data.post?.slug },
    initialData: data.post,
    enabled: preview && data.post?.slug,
  });

  // if (!router.isFallback && !data.post?.slug) {
  //   return <ErrorPage statusCode={404} />;
  // }

  const { title, body } = post;

  return (
    <article>
      <h2>{title}</h2>
      <br />
      <p>{body}</p>
      {/* <BlockContent
        projectId={process.env.SANITY_PROJECT_ID}
        dataset={process.env.SANITY_DATASET}
        blocks={body}
        serializers={serializers}
      /> */}
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

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}
