import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
// import { createWithApollo } from "./createWithApollo";

const createClient = (ctx?: NextPageContext) => new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_SCHEMA_URL,
    // ssrMode:true,
    credentials: "include",
    headers: {
      cookie: (typeof window === "undefined"
      ? ctx?.req?.headers.cookie
      : undefined) || "",
    },
    cache: new InMemoryCache(),
    
  });
  
export default /*const withApollo = createWithApollo(*/createClient//);