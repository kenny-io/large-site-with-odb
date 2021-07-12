const sanityClient = require("@sanity/client");

export const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true, // `false` if you want to ensure fresh data
});

// Set up the client for fetching data in the getProps page functions
// export const sanityClient = createClient(config);
