"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 8053:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "@chakra-ui/react"
var react_ = __webpack_require__(8930);
// EXTERNAL MODULE: external "@apollo/client"
var client_ = __webpack_require__(9114);
;// CONCATENATED MODULE: ./src/utils/withApollo.ts

const createClient = (ctx)=>new client_.ApolloClient({
        uri: "http://localhost:4000/graphql",
        // ssrMode:true,
        credentials: "include",
        headers: {
            cookie: ( true ? ctx?.req?.headers.cookie : 0) || ""
        },
        cache: new client_.InMemoryCache()
    });
/* harmony default export */ const withApollo = (/*const withApollo = createWithApollo(*/createClient);

;// CONCATENATED MODULE: ./src/pages/_app.tsx


// import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';

// import { cacheExchange } from '@urql/exchange-graphcache';


// import apolloClient from '../../utils/withApollo';
// const client = createClient({ url: "http://localhost:4000/graphql", 
//   fetchOptions: {
//     credentials:"include"
//   },
//   exchanges: [dedupExchange, cacheExchange({}), fetchExchange]
// });
function MyApp({ Component , pageProps  }) {
    // const client = apolloClient();
    return(// <Provider value={client}>
    /*#__PURE__*/ jsx_runtime_.jsx(client_.ApolloProvider, {
        client: withApollo(),
        children: /*#__PURE__*/ jsx_runtime_.jsx(react_.ChakraProvider, {
            children: /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                ...pageProps
            })
        })
    }));
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 9114:
/***/ ((module) => {

module.exports = require("@apollo/client");

/***/ }),

/***/ 8930:
/***/ ((module) => {

module.exports = require("@chakra-ui/react");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(8053));
module.exports = __webpack_exports__;

})();