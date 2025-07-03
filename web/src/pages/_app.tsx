import React from 'react';
// import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
// import { cacheExchange } from '@urql/exchange-graphcache';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import createClient from '../utils/withApollo';
// import apolloClient from '../../utils/withApollo';
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"
import { AppProps } from "next/app"


// const client = createClient({ url: "http://localhost:4000/graphql", 
//   fetchOptions: {
//     credentials:"include"
//   },
//   exchanges: [dedupExchange, cacheExchange({}), fetchExchange]
// });



export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={createClient()}>
      <ChakraProvider value={defaultSystem}>
        <ThemeProvider attribute="class" disableTransitionOnChange>
          <Component {...pageProps} />
        </ThemeProvider>
      </ChakraProvider>
    </ApolloProvider>

  )
}

