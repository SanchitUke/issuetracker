import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { createWithApollo } from "./createWithApollo";
import { IPADDRESS } from "../../../server/src/constants"

const createClient = (ctx?: NextPageContext) => new ApolloClient({
    uri: `http://${IPADDRESS}:4000/graphql`,
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