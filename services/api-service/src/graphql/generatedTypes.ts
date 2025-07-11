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

export type GraphQLAuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String']['output'];
  user: GraphQLUser;
};

export type GraphQLAuthenticateUserInput = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['String']['input'];
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
  createUser?: Maybe<GraphQLAuthPayload>;
};


export type GraphQLMutationAuthenticateUserArgs = {
  input: GraphQLAuthenticateUserInput;
};


export type GraphQLMutationCreateUserArgs = {
  input: GraphQLCreateUserInput;
};

export type GraphQLQuery = {
  __typename?: 'Query';
  me?: Maybe<GraphQLUser>;
};

export type GraphQLUser = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  userId?: Maybe<Scalars['String']['output']>;
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



/** Mapping between all available schema types and the resolvers types */
export type GraphQLResolversTypes = {
  AuthPayload: ResolverTypeWrapper<GraphQLAuthPayload>;
  AuthenticateUserInput: GraphQLAuthenticateUserInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateUserInput: GraphQLCreateUserInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']['output']>;
  NonNegativeInt: ResolverTypeWrapper<Scalars['NonNegativeInt']['output']>;
  NonPositiveInt: ResolverTypeWrapper<Scalars['NonPositiveInt']['output']>;
  PositiveInt: ResolverTypeWrapper<Scalars['PositiveInt']['output']>;
  Query: ResolverTypeWrapper<{}>;
  SafeInt: ResolverTypeWrapper<Scalars['SafeInt']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<GraphQLUser>;
};

/** Mapping between all available schema types and the resolvers parents */
export type GraphQLResolversParentTypes = {
  AuthPayload: GraphQLAuthPayload;
  AuthenticateUserInput: GraphQLAuthenticateUserInput;
  Boolean: Scalars['Boolean']['output'];
  CreateUserInput: GraphQLCreateUserInput;
  Date: Scalars['Date']['output'];
  DateTime: Scalars['DateTime']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  JSONObject: Scalars['JSONObject']['output'];
  Mutation: {};
  NonEmptyString: Scalars['NonEmptyString']['output'];
  NonNegativeInt: Scalars['NonNegativeInt']['output'];
  NonPositiveInt: Scalars['NonPositiveInt']['output'];
  PositiveInt: Scalars['PositiveInt']['output'];
  Query: {};
  SafeInt: Scalars['SafeInt']['output'];
  String: Scalars['String']['output'];
  User: GraphQLUser;
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
  createUser?: Resolver<Maybe<GraphQLResolversTypes['AuthPayload']>, ParentType, ContextType, RequireFields<GraphQLMutationCreateUserArgs, 'input'>>;
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
  me?: Resolver<Maybe<GraphQLResolversTypes['User']>, ParentType, ContextType>;
};

export interface GraphQLSafeIntScalarConfig extends GraphQLScalarTypeConfig<GraphQLResolversTypes['SafeInt'], any> {
  name: 'SafeInt';
}

export type GraphQLUserResolvers<ContextType = any, ParentType extends GraphQLResolversParentTypes['User'] = GraphQLResolversParentTypes['User']> = {
  email?: Resolver<Maybe<GraphQLResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<Maybe<GraphQLResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<GraphQLResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<Maybe<GraphQLResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GraphQLResolvers<ContextType = any> = {
  AuthPayload?: GraphQLAuthPayloadResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Mutation?: GraphQLMutationResolvers<ContextType>;
  NonEmptyString?: GraphQLScalarType;
  NonNegativeInt?: GraphQLScalarType;
  NonPositiveInt?: GraphQLScalarType;
  PositiveInt?: GraphQLScalarType;
  Query?: GraphQLQueryResolvers<ContextType>;
  SafeInt?: GraphQLScalarType;
  User?: GraphQLUserResolvers<ContextType>;
};

