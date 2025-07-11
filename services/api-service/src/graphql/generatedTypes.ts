import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  EmailAddress: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
  NonEmptyString: { input: any; output: any; }
  NonNegativeInt: { input: any; output: any; }
  NonPositiveInt: { input: any; output: any; }
  PositiveInt: { input: any; output: any; }
  SafeInt: { input: any; output: any; }
};

export type GraphQLArticle = {
  __typename?: 'Article';
  articleId: Scalars['ID']['output'];
  category: GraphQLArticleCategory;
  content: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: GraphQLArticleType;
};

export enum GraphQLArticleCategory {
  Business = 'business',
  Entertainment = 'entertainment',
  Health = 'health',
  Science = 'science',
  Sports = 'sports',
  Technology = 'technology'
}

export enum GraphQLArticleType {
  Free = 'free',
  Premium = 'premium'
}

export type GraphQLArticlesInput = {
  category?: InputMaybe<GraphQLArticleCategory>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  type?: InputMaybe<GraphQLArticleType>;
};

export type GraphQLAuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: GraphQLUser;
};

export type GraphQLAuthenticateUserInput = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['String']['input'];
};

export type GraphQLCreateArticleInput = {
  category: GraphQLArticleCategory;
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: GraphQLArticleType;
};

export type GraphQLCreateUserInput = {
  email: Scalars['EmailAddress']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type GraphQLMutation = {
  __typename?: 'Mutation';
  authenticateUser?: Maybe<GraphQLAuthPayload>;
  createArticle: GraphQLArticle;
  createUser?: Maybe<GraphQLAuthPayload>;
  deleteArticle: Scalars['Boolean']['output'];
  updateArticle: GraphQLArticle;
};


export type GraphQLMutationAuthenticateUserArgs = {
  input: GraphQLAuthenticateUserInput;
};


export type GraphQLMutationCreateArticleArgs = {
  input: GraphQLCreateArticleInput;
};


export type GraphQLMutationCreateUserArgs = {
  input: GraphQLCreateUserInput;
};


export type GraphQLMutationDeleteArticleArgs = {
  articleId: Scalars['ID']['input'];
};


export type GraphQLMutationUpdateArticleArgs = {
  input: GraphQLUpdateArticleInput;
};

export type GraphQLMutationResponse = {
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type GraphQLQuery = {
  __typename?: 'Query';
  article: GraphQLArticle;
  articles: Array<Maybe<GraphQLArticle>>;
  me?: Maybe<GraphQLUser>;
};


export type GraphQLQueryArticleArgs = {
  articleId: Scalars['ID']['input'];
};


export type GraphQLQueryArticlesArgs = {
  input?: InputMaybe<GraphQLArticlesInput>;
};

export type GraphQLUpdateArticleInput = {
  articleId: Scalars['ID']['input'];
  category?: InputMaybe<GraphQLArticleCategory>;
  content?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<GraphQLArticleType>;
};

export type GraphQLUser = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  userId: Scalars['ID']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type GraphQLResolversInterfaceTypes<_RefType extends Record<string, unknown>> = {
  MutationResponse: never;
};

/** Mapping between all available schema types and the resolvers types */
export type GraphQLResolversTypes = {
  Article: ResolverTypeWrapper<GraphQLArticle>;
  ArticleCategory: GraphQLArticleCategory;
  ArticleType: GraphQLArticleType;
  ArticlesInput: GraphQLArticlesInput;
  AuthPayload: ResolverTypeWrapper<GraphQLAuthPayload>;
  AuthenticateUserInput: GraphQLAuthenticateUserInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateArticleInput: GraphQLCreateArticleInput;
  CreateUserInput: GraphQLCreateUserInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  MutationResponse: ResolverTypeWrapper<GraphQLResolversInterfaceTypes<GraphQLResolversTypes>['MutationResponse']>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']['output']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']['output']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']['output']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']['output']>;
  Query: ResolverTypeWrapper<{}>;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateArticleInput: GraphQLUpdateArticleInput;
  User: ResolverTypeWrapper<GraphQLUser>;
};

/** Mapping between all available schema types and the resolvers parents */
export type GraphQLResolversParentTypes = {
  Article: GraphQLArticle;
  ArticlesInput: GraphQLArticlesInput;
  AuthPayload: GraphQLAuthPayload;
  AuthenticateUserInput: GraphQLAuthenticateUserInput;
  Boolean: Scalars['Boolean']['output'];
  CreateArticleInput: GraphQLCreateArticleInput;
  CreateUserInput: GraphQLCreateUserInput;
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  JSONObject: Scalars['JSONObject']['output'];
  Mutation: {};
  MutationResponse: GraphQLResolversInterfaceTypes<GraphQLResolversParentTypes>['MutationResponse'];
  NonEmptyString: Scalars['NonEmptyString']['output'];
  NonNegativeInt: Scalars['NonNegativeInt']['output'];
  NonPositiveInt: Scalars['NonPositiveInt']['output'];
  PositiveInt: Scalars['PositiveInt']['output'];
  Query: {};
  SafeInt: Scalars['SafeInt']['output'];
  String: Scalars['String']['output'];
  UpdateArticleInput: GraphQLUpdateArticleInput;
  User: GraphQLUser;
};

export type GraphQLArticleResolvers<ContextType = any, ParentType extends GraphQLResolversParentTypes['Article'] = GraphQLResolversParentTypes['Article']> = {
  articleId?: Resolver<GraphQLResolversTypes['ID'], ParentType, ContextType>;
  category?: Resolver<GraphQLResolversTypes['ArticleCategory'], ParentType, ContextType>;
  content?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<GraphQLResolversTypes['ArticleType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLAuthPayloadResolvers<ContextType = any, ParentType extends GraphQLResolversParentTypes['AuthPayload'] = GraphQLResolversParentTypes['AuthPayload']> = {
  token?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<GraphQLResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface GraphQLDateScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['Date'], any> {
  name: 'Date';
}

export interface GraphQLDateTimeScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface GraphQLEmailAddressScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface GraphQLJsonObjectScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type GraphQLMutationResolvers<ContextType = any, ParentType extends GraphQLResolversParentTypes['Mutation'] = GraphQLResolversParentTypes['Mutation']> = {
  authenticateUser?: Resolver<Maybe<GraphQLResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<GraphQLMutationAuthenticateUserArgs, 'input'>>;
  createArticle?: Resolver<GraphQLResolversTypes['Article'], ParentType, ContextType, RequireFields<GraphQLMutationCreateArticleArgs, 'input'>>;
  createUser?: Resolver<Maybe<GraphQLResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<GraphQLMutationCreateUserArgs, 'input'>>;
  deleteArticle?: Resolver<GraphQLResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GraphQLMutationDeleteArticleArgs, 'articleId'>>;
  updateArticle?: Resolver<GraphQLResolversTypes['Article'], ParentType, ContextType, RequireFields<GraphQLMutationUpdateArticleArgs, 'input'>>;
};

export type GraphQLMutationResponseResolvers<ContextType = any, ParentType extends GraphQLResolversParentTypes['MutationResponse'] = GraphQLResolversParentTypes['MutationResponse']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>;
  code?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<GraphQLResolversTypes['String'], ParentType, ContextType>;
  success?: Resolver<GraphQLResolversTypes['Boolean'], ParentType, ContextType>;
};

export interface GraphQLNonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export interface GraphQLNonNegativeIntScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['NonNegativeInt'], any> {
  name: 'NonNegativeInt';
}

export interface GraphQLNonPositiveIntScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['NonPositiveInt'], any> {
  name: 'NonPositiveInt';
}

export interface GraphQLPositiveIntScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['PositiveInt'], any> {
  name: 'PositiveInt';
}

export type GraphQLQueryResolvers<ContextType = any, ParentType extends GraphQLResolversParentTypes['Query'] = GraphQLResolversParentTypes['Query']> = {
  article?: Resolver<GraphQLResolversTypes['Article'], ParentType, ContextType, RequireFields<GraphQLQueryArticleArgs, 'articleId'>>;
  articles?: Resolver<Array<Maybe<GraphQLResolversTypes['Article']>>, ParentType, ContextType, Partial<GraphQLQueryArticlesArgs>>;
  me?: Resolver<Maybe<GraphQLResolversTypes['User']>, ParentType, ContextType>;
};

export interface GraphQLSafeIntScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export type GraphQLUserResolvers<ContextType = any, ParentType extends GraphQLResolversParentTypes['User'] = GraphQLResolversParentTypes['User']> = {
  email?: Resolver<Maybe<GraphQLResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<GraphQLResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<GraphQLResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<GraphQLResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLResolvers<ContextType = any> = {
  Article?: GraphQLArticleResolvers<ContextType>;
  AuthPayload?: GraphQLAuthPayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Mutation?: GraphQLMutationResolvers<ContextType>;
  MutationResponse?: GraphQLMutationResponseResolvers<ContextType>;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  Query?: GraphQLQueryResolvers<ContextType>;
  SafeInt?: GraphQLScalarType;
  User?: GraphQLUserResolvers<ContextType>;
};

