import { SchemaDirectiveVisitor } from "graphql-tools";

/*
 * This class is used to simply wrap the existing resolver,
 * and populate the UUID field with the existing ID field.
 * This is purely to support the Houston v1 API.
 */
export default class AliasDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { field: aliasedField } = this.args;
    field.resolve = async function(...args) {
      const parent = args[0];
      return parent[aliasedField];
    };
  }
}
