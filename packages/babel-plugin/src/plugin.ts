import type { PluginObj } from "@babel/core";
import { types } from "@babel/core";
import { name as libName } from "../../lib/package.json";

function plugin(): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        /**
         * Start by looking if the library is imported within currently processed file.
         * If not, we can skip it.
         */
        if (!(path.node.source.value === libName)) {
          return;
        }

        const localName = path.node.specifiers[0].local.name;

        path.scope.bindings[localName].referencePaths.forEach((referencePath) => {
          if (referencePath.parentPath && types.isCallExpression(referencePath.parentPath.container)) {
            if (
              types.isMemberExpression(referencePath.parentPath.container.callee) &&
              types.isIdentifier(referencePath.parentPath.container.callee.property) &&
              referencePath.parentPath.container.callee.property.name === "create"
            )
              referencePath.parentPath.container.arguments.forEach((argument) => {
                if (types.isObjectExpression(argument)) {
                  argument.properties.forEach((property) => {
                    if (types.isObjectProperty(property) && types.isObjectExpression(property.value)) {
                      property.value.properties.forEach((ruleProperty) => {
                        if (
                          types.isObjectProperty(ruleProperty) &&
                          types.isIdentifier(ruleProperty.key) &&
                          types.isLiteral(ruleProperty.value)
                        ) {
                          ruleProperty.value = types.stringLiteral(
                            `${ruleProperty.key.name.replace(/[A-Z]/g, "-$&").toLowerCase()}-${
                              ruleProperty.value.value
                            }`
                          );
                        }
                      });
                    }
                  });
                }
              });

            if (
              referencePath.parentPath.parentPath &&
              types.isVariableDeclarator(referencePath.parentPath.parentPath.container)
            ) {
              referencePath.parentPath.parentPath.container.init = referencePath.parentPath.container.arguments[0];
            }
          }
        });
      },
    },
  };
}

export default plugin;
