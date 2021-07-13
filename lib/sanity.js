// lib/sanity.js
import {
  createImageUrlBuilder,
  createPortableTextComponent,
  createPreviewSubscriptionHook,
  createCurrentUserHook,
} from "next-sanity";
import { config } from "./config";
import BasePortableText from "@sanity/block-content-to-react";
/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

// Set up the live preview subscription hook
export const usePreviewSubscription = createPreviewSubscriptionHook(config);
const serializers = {
  types: {
    code: (props) => (
      <pre data-language={props.node.language}>
        <code>{props.node.code}</code>
      </pre>
    ),
  },
};
// Set up Portable Text serialization
export const PortableText = ({ blocks }) => (
  <BasePortableText blocks={blocks} serializers={serializers} {...config} />
);
// export const PortableText = createPortableTextComponent({
//   ...config,
//   // Serializers passed to @sanity/block-content-to-react
//   // (https://github.com/sanity-io/block-content-to-react)
//   serializers: {
//     types: {
//       code: (props) => (
//         <pre data-language={props.node.language}>
//           <code>{props.node.code}</code>
//         </pre>
//       ),
//     },
//   },
// });

// Helper function for using the current logged in user account
export const useCurrentUser = createCurrentUserHook(config);
