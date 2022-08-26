"use strict";
exports.id = 277;
exports.ids = [277];
exports.modules = {

/***/ 6277:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$h": () => (/* binding */ useChangePasswordMutation),
/* harmony export */   "BD": () => (/* binding */ useCreateProjectMutation),
/* harmony export */   "He": () => (/* binding */ useUserProjectsQuery),
/* harmony export */   "UE": () => (/* binding */ useMeQuery),
/* harmony export */   "YA": () => (/* binding */ useLoginMutation),
/* harmony export */   "_y": () => (/* binding */ useLogoutMutation),
/* harmony export */   "iO": () => (/* binding */ useIssueQuery),
/* harmony export */   "l4": () => (/* binding */ useRegisterMutation),
/* harmony export */   "n5": () => (/* binding */ useProjectQuery),
/* harmony export */   "pj": () => (/* binding */ useWriteCommentMutation),
/* harmony export */   "ts": () => (/* binding */ useCloseIssueMutation),
/* harmony export */   "xH": () => (/* binding */ useAddMemberMutation),
/* harmony export */   "yq": () => (/* binding */ useCreateIssueMutation),
/* harmony export */   "zN": () => (/* binding */ useForgotPasswordMutation)
/* harmony export */ });
/* unused harmony exports UserFragFragmentDoc, ErrorFragFragmentDoc, UserResFragFragmentDoc, AddMemberDocument, ChangePasswordDocument, CreateIssueDocument, CreateProjectDocument, ForgotPasswordDocument, LoginDocument, LogoutDocument, RegisterDocument, WriteCommentDocument, CloseIssueDocument, IssueDocument, useIssueLazyQuery, MeDocument, useMeLazyQuery, ProjectDocument, useProjectLazyQuery, UserProjectsDocument, useUserProjectsLazyQuery */
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9114);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_0__);


const defaultOptions = {};
const UserFragFragmentDoc = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    fragment UserFrag on Users {
  userId
  username
  email
}
    `;
const ErrorFragFragmentDoc = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    fragment ErrorFrag on FieldError {
  field
  message
}
    `;
const UserResFragFragmentDoc = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    fragment UserResFrag on UserResponse {
  user {
    ...UserFrag
  }
  errors {
    ...ErrorFrag
  }
}
    ${UserFragFragmentDoc}
${ErrorFragFragmentDoc}`;
const AddMemberDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    mutation AddMember($username: String!) {
  addMember(username: $username)
}
    `;
/**
 * __useAddMemberMutation__
 *
 * To run a mutation, you first call `useAddMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMemberMutation, { data, loading, error }] = useAddMemberMutation({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */ function useAddMemberMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(AddMemberDocument, options);
}
const ChangePasswordDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...UserResFrag
  }
}
    ${UserResFragFragmentDoc}`;
/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *   },
 * });
 */ function useChangePasswordMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(ChangePasswordDocument, options);
}
const CreateIssueDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    mutation CreateIssue($id: Int!, $priority: String!, $text: String!, $title: String!) {
  createIssue(id: $id, priority: $priority, text: $text, title: $title) {
    id
    title
    text
    project {
      id
      name
    }
    raisedBy
  }
}
    `;
/**
 * __useCreateIssueMutation__
 *
 * To run a mutation, you first call `useCreateIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIssueMutation, { data, loading, error }] = useCreateIssueMutation({
 *   variables: {
 *      id: // value for 'id'
 *      priority: // value for 'priority'
 *      text: // value for 'text'
 *      title: // value for 'title'
 *   },
 * });
 */ function useCreateIssueMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(CreateIssueDocument, options);
}
const CreateProjectDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    mutation createProject($name: String!) {
  createProject(name: $name) {
    id
    name
    ownerId
    owner {
      ...UserFrag
    }
  }
}
    ${UserFragFragmentDoc}`;
/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */ function useCreateProjectMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(CreateProjectDocument, options);
}
const ForgotPasswordDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */ function useForgotPasswordMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(ForgotPasswordDocument, options);
}
const LoginDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...UserResFrag
  }
}
    ${UserResFragFragmentDoc}`;
/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */ function useLoginMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(LoginDocument, options);
}
const LogoutDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    mutation Logout {
  logout
}
    `;
/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */ function useLogoutMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(LogoutDocument, options);
}
const RegisterDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    mutation Register($options: UserInput!) {
  register(options: $options) {
    ...UserResFrag
  }
}
    ${UserResFragFragmentDoc}`;
/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */ function useRegisterMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(RegisterDocument, options);
}
const WriteCommentDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    mutation WriteComment($text: String!) {
  writeComment(text: $text) {
    id
    text
    commentedBy
    commentedOn
  }
}
    `;
/**
 * __useWriteCommentMutation__
 *
 * To run a mutation, you first call `useWriteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWriteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [writeCommentMutation, { data, loading, error }] = useWriteCommentMutation({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */ function useWriteCommentMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(WriteCommentDocument, options);
}
const CloseIssueDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    mutation CloseIssue {
  closeIssue {
    id
    title
    status
  }
}
    `;
/**
 * __useCloseIssueMutation__
 *
 * To run a mutation, you first call `useCloseIssueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseIssueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeIssueMutation, { data, loading, error }] = useCloseIssueMutation({
 *   variables: {
 *   },
 * });
 */ function useCloseIssueMutation(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useMutation(CloseIssueDocument, options);
}
const IssueDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    query Issue($id: Int!) {
  issue(id: $id) {
    id
    title
    text
    status
    priority
    createdAt
    raisedBy
    comments {
      text
      commentedBy
      commentedOn
    }
    project {
      ownerId
    }
  }
}
    `;
/**
 * __useIssueQuery__
 *
 * To run a query within a React component, call `useIssueQuery` and pass it any options that fit your needs.
 * When your component renders, `useIssueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIssueQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */ function useIssueQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useQuery(IssueDocument, options);
}
function useIssueLazyQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return Apollo.useLazyQuery(IssueDocument, options);
}
const MeDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    query Me {
  me {
    ...UserFrag
  }
}
    ${UserFragFragmentDoc}`;
/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */ function useMeQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useQuery(MeDocument, options);
}
function useMeLazyQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return Apollo.useLazyQuery(MeDocument, options);
}
const ProjectDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    query Project($id: Int!) {
  project(id: $id) {
    id
    name
    createdAt
    lastUpdate
    ownerId
    owner {
      userId
      username
    }
    members {
      username
    }
    issues {
      id
      title
      status
      priority
    }
  }
}
    `;
/**
 * __useProjectQuery__
 *
 * To run a query within a React component, call `useProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */ function useProjectQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useQuery(ProjectDocument, options);
}
function useProjectLazyQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return Apollo.useLazyQuery(ProjectDocument, options);
}
const UserProjectsDocument = _apollo_client__WEBPACK_IMPORTED_MODULE_0__.gql`
    query userProjects {
  userProjects {
    id
    name
    owner {
      userId
    }
  }
}
    `;
/**
 * __useUserProjectsQuery__
 *
 * To run a query within a React component, call `useUserProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserProjectsQuery({
 *   variables: {
 *   },
 * });
 */ function useUserProjectsQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return _apollo_client__WEBPACK_IMPORTED_MODULE_0__.useQuery(UserProjectsDocument, options);
}
function useUserProjectsLazyQuery(baseOptions) {
    const options = {
        ...defaultOptions,
        ...baseOptions
    };
    return Apollo.useLazyQuery(UserProjectsDocument, options);
}


/***/ })

};
;