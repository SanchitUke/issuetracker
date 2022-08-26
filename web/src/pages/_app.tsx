import React from 'react';
// import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import { ChakraProvider } from '@chakra-ui/react';
// import { cacheExchange } from '@urql/exchange-graphcache';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import createClient from '../utils/withApollo';
// import apolloClient from '../../utils/withApollo';


// const client = createClient({ url: "http://localhost:4000/graphql", 
//   fetchOptions: {
//     credentials:"include"
//   },
//   exchanges: [dedupExchange, cacheExchange({}), fetchExchange]
// });


function MyApp({ Component, pageProps }: any) {
  // const client = apolloClient();
  return (
    // <Provider value={client}>
    <ApolloProvider client={createClient()}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
      </ApolloProvider>
    //</Provider>
  )
}

export default MyApp
