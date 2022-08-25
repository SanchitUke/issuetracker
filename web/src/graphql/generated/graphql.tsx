import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Comments = {
  __typename?: 'Comments';
  commentedBy: Scalars['String'];
  commentedOn: Scalars['DateTime'];
  id: Scalars['Float'];
  issue: Issue;
  text: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Issue = {
  __typename?: 'Issue';
  comments: Array<Comments>;
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  priority?: Maybe<Scalars['String']>;
  project: Project;
  raisedBy: Scalars['String'];
  status: Scalars['String'];
  text: Scalars['String'];
  title: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addMember: Scalars['String'];
  changePassword: UserResponse;
  closeIssue: Issue;
  createIssue: Issue;
  createProject: Project;
  deleteIssue: Scalars['Boolean'];
  deleteProject: Scalars['Boolean'];
  editText: Issue;
  editTitle: Issue;
  forgotPassword: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
  register: UserResponse;
  writeComment: Comments;
};


export type MutationAddMemberArgs = {
  username: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationCreateIssueArgs = {
  id: Scalars['Int'];
  priority: Scalars['String'];
  text: Scalars['String'];
  title: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  name: Scalars['String'];
};


export type MutationEditTextArgs = {
  text: Scalars['String'];
};


export type MutationEditTitleArgs = {
  title: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: UserInput;
};


export type MutationWriteCommentArgs = {
  text: Scalars['String'];
};

export type Project = {
  __typename?: 'Project';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  issues: Array<Issue>;
  lastUpdate: Scalars['String'];
  members: Array<Users>;
  name: Scalars['String'];
  owner: Users;
  ownerId: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  comments: Array<Comments>;
  issue: Issue;
  issues: Array<Issue>;
  me?: Maybe<Users>;
  oneUser: Users;
  project: Project;
  projects: Array<Project>;
  userProjects: Array<Project>;
  users: Array<Users>;
};


export type QueryIssueArgs = {
  id: Scalars['Int'];
};


export type QueryOneUserArgs = {
  userId: Scalars['Int'];
};


export type QueryProjectArgs = {
  id: Scalars['Int'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<Users>;
};

export type Users = {
  __typename?: 'Users';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  ownedProjects?: Maybe<Array<Project>>;
  projects: Array<Project>;
  userId: Scalars['Float'];
  username: Scalars['String'];
};

export type ErrorFragFragment = { __typename?: 'FieldError', field: string, message: string };

export type UserFragFragment = { __typename?: 'Users', userId: number, username: string, email: string };

export type UserResFragFragment = { __typename?: 'UserResponse', user?: { __typename?: 'Users', userId: number, username: string, email: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null };

export type AddMemberMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type AddMemberMutation = { __typename?: 'Mutation', addMember: string };

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'UserResponse', user?: { __typename?: 'Users', userId: number, username: string, email: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type CreateIssueMutationVariables = Exact<{
  id: Scalars['Int'];
  priority: Scalars['String'];
  text: Scalars['String'];
  title: Scalars['String'];
}>;


export type CreateIssueMutation = { __typename?: 'Mutation', createIssue: { __typename?: 'Issue', id: number, title: string, text: string, raisedBy: string, project: { __typename?: 'Project', id: number, name: string } } };

export type CreateProjectMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: { __typename?: 'Project', id: number, name: string, ownerId: number, owner: { __typename?: 'Users', userId: number, username: string, email: string } } };

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: boolean };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', user?: { __typename?: 'Users', userId: number, username: string, email: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UserInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', user?: { __typename?: 'Users', userId: number, username: string, email: string } | null, errors?: Array<{ __typename?: 'FieldError', field: string, message: string }> | null } };

export type WriteCommentMutationVariables = Exact<{
  text: Scalars['String'];
}>;


export type WriteCommentMutation = { __typename?: 'Mutation', writeComment: { __typename?: 'Comments', id: number, text: string, commentedBy: string, commentedOn: any } };

export type CloseIssueMutationVariables = Exact<{ [key: string]: never; }>;


export type CloseIssueMutation = { __typename?: 'Mutation', closeIssue: { __typename?: 'Issue', id: number, title: string, status: string } };

export type IssueQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type IssueQuery = { __typename?: 'Query', issue: { __typename?: 'Issue', id: number, title: string, text: string, status: string, priority?: string | null, createdAt: string, raisedBy: string, comments: Array<{ __typename?: 'Comments', text: string, commentedBy: string, commentedOn: any }>, project: { __typename?: 'Project', ownerId: number } } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Users', userId: number, username: string, email: string } | null };

export type ProjectQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ProjectQuery = { __typename?: 'Query', project: { __typename?: 'Project', id: number, name: string, createdAt: string, lastUpdate: string, ownerId: number, owner: { __typename?: 'Users', userId: number, username: string }, members: Array<{ __typename?: 'Users', username: string }>, issues: Array<{ __typename?: 'Issue', id: number, title: string, status: string, priority?: string | null }> } };

export type UserProjectsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserProjectsQuery = { __typename?: 'Query', userProjects: Array<{ __typename?: 'Project', id: number, name: string, owner: { __typename?: 'Users', userId: number } }> };

export const UserFragFragmentDoc = gql`
    fragment UserFrag on Users {
  userId
  username
  email
}
    `;
export const ErrorFragFragmentDoc = gql`
    fragment ErrorFrag on FieldError {
  field
  message
}
    `;
export const UserResFragFragmentDoc = gql`
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
export const AddMemberDocument = gql`
    mutation AddMember($username: String!) {
  addMember(username: $username)
}
    `;
export type AddMemberMutationFn = Apollo.MutationFunction<AddMemberMutation, AddMemberMutationVariables>;

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
 */
export function useAddMemberMutation(baseOptions?: Apollo.MutationHookOptions<AddMemberMutation, AddMemberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddMemberMutation, AddMemberMutationVariables>(AddMemberDocument, options);
      }
export type AddMemberMutationHookResult = ReturnType<typeof useAddMemberMutation>;
export type AddMemberMutationResult = Apollo.MutationResult<AddMemberMutation>;
export type AddMemberMutationOptions = Apollo.BaseMutationOptions<AddMemberMutation, AddMemberMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...UserResFrag
  }
}
    ${UserResFragFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

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
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateIssueDocument = gql`
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
export type CreateIssueMutationFn = Apollo.MutationFunction<CreateIssueMutation, CreateIssueMutationVariables>;

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
 */
export function useCreateIssueMutation(baseOptions?: Apollo.MutationHookOptions<CreateIssueMutation, CreateIssueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIssueMutation, CreateIssueMutationVariables>(CreateIssueDocument, options);
      }
export type CreateIssueMutationHookResult = ReturnType<typeof useCreateIssueMutation>;
export type CreateIssueMutationResult = Apollo.MutationResult<CreateIssueMutation>;
export type CreateIssueMutationOptions = Apollo.BaseMutationOptions<CreateIssueMutation, CreateIssueMutationVariables>;
export const CreateProjectDocument = gql`
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
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

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
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation forgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

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
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...UserResFrag
  }
}
    ${UserResFragFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

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
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

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
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: UserInput!) {
  register(options: $options) {
    ...UserResFrag
  }
}
    ${UserResFragFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

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
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const WriteCommentDocument = gql`
    mutation WriteComment($text: String!) {
  writeComment(text: $text) {
    id
    text
    commentedBy
    commentedOn
  }
}
    `;
export type WriteCommentMutationFn = Apollo.MutationFunction<WriteCommentMutation, WriteCommentMutationVariables>;

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
 */
export function useWriteCommentMutation(baseOptions?: Apollo.MutationHookOptions<WriteCommentMutation, WriteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<WriteCommentMutation, WriteCommentMutationVariables>(WriteCommentDocument, options);
      }
export type WriteCommentMutationHookResult = ReturnType<typeof useWriteCommentMutation>;
export type WriteCommentMutationResult = Apollo.MutationResult<WriteCommentMutation>;
export type WriteCommentMutationOptions = Apollo.BaseMutationOptions<WriteCommentMutation, WriteCommentMutationVariables>;
export const CloseIssueDocument = gql`
    mutation CloseIssue {
  closeIssue {
    id
    title
    status
  }
}
    `;
export type CloseIssueMutationFn = Apollo.MutationFunction<CloseIssueMutation, CloseIssueMutationVariables>;

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
 */
export function useCloseIssueMutation(baseOptions?: Apollo.MutationHookOptions<CloseIssueMutation, CloseIssueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CloseIssueMutation, CloseIssueMutationVariables>(CloseIssueDocument, options);
      }
export type CloseIssueMutationHookResult = ReturnType<typeof useCloseIssueMutation>;
export type CloseIssueMutationResult = Apollo.MutationResult<CloseIssueMutation>;
export type CloseIssueMutationOptions = Apollo.BaseMutationOptions<CloseIssueMutation, CloseIssueMutationVariables>;
export const IssueDocument = gql`
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
 */
export function useIssueQuery(baseOptions: Apollo.QueryHookOptions<IssueQuery, IssueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IssueQuery, IssueQueryVariables>(IssueDocument, options);
      }
export function useIssueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IssueQuery, IssueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IssueQuery, IssueQueryVariables>(IssueDocument, options);
        }
export type IssueQueryHookResult = ReturnType<typeof useIssueQuery>;
export type IssueLazyQueryHookResult = ReturnType<typeof useIssueLazyQuery>;
export type IssueQueryResult = Apollo.QueryResult<IssueQuery, IssueQueryVariables>;
export const MeDocument = gql`
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
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ProjectDocument = gql`
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
 */
export function useProjectQuery(baseOptions: Apollo.QueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
      }
export function useProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProjectQuery, ProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProjectQuery, ProjectQueryVariables>(ProjectDocument, options);
        }
export type ProjectQueryHookResult = ReturnType<typeof useProjectQuery>;
export type ProjectLazyQueryHookResult = ReturnType<typeof useProjectLazyQuery>;
export type ProjectQueryResult = Apollo.QueryResult<ProjectQuery, ProjectQueryVariables>;
export const UserProjectsDocument = gql`
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
 */
export function useUserProjectsQuery(baseOptions?: Apollo.QueryHookOptions<UserProjectsQuery, UserProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserProjectsQuery, UserProjectsQueryVariables>(UserProjectsDocument, options);
      }
export function useUserProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserProjectsQuery, UserProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserProjectsQuery, UserProjectsQueryVariables>(UserProjectsDocument, options);
        }
export type UserProjectsQueryHookResult = ReturnType<typeof useUserProjectsQuery>;
export type UserProjectsLazyQueryHookResult = ReturnType<typeof useUserProjectsLazyQuery>;
export type UserProjectsQueryResult = Apollo.QueryResult<UserProjectsQuery, UserProjectsQueryVariables>;