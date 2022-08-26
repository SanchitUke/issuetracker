import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { createWithApollo } from "./createWithApollo";

const createClient = (ctx?: NextPageContext) => new ApolloClient({
    uri: 'http://localhost:4000/graphql',
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