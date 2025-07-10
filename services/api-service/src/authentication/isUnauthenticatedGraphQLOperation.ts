import gql from "graphql-tag";

type Selection = { name: { value: string } };
type Definition = {
  operation: string;
  selectionSet: { selections: Selection[] };
  kind: string;
};

const unauthenticatedGraphQLOperations = ["authenticateUser", "createUser"];

function isUnauthenticatedDefinition(definition: Definition) {
  const { selections = [] } = definition.selectionSet;

  return selections.every((selection) =>
    unauthenticatedGraphQLOperations.includes(selection.name.value)
  );
}

export function isUnauthenticatedGraphQLOperation(rawQuery: string) {
  const queryObject = gql(rawQuery);
  const definitions = queryObject.definitions as Definition[] | undefined;

  if (!definitions) {
    return false;
  }

  return definitions
    .filter((definition) => definition.kind !== "FragmentDefinition")
    .every(isUnauthenticatedDefinition);
}
