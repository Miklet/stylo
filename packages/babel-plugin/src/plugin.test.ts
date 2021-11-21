import { transformSync } from "@babel/core";
import plugin from "./plugin";

function transformSource(source: string): string {
  const fileResult = transformSync(source, {
    filename: "source-mock.ts",
    plugins: [plugin],
    configFile: false,
  });

  return fileResult?.code ?? "";
}

test("should skip file", () => {
  const source = `
    import {foo} from 'bar';

    foo();
  `;

  expect(transformSource(source)).toMatchInlineSnapshot(`
"import { foo } from 'bar';
foo();"
`);
});

test("should transform each rule by replacing its value with generated class name", () => {
  const source = `
    import {stylo} from 'stylo';

    const styles = stylo.create({
      button: {
        position: 'relative',
        fontSize: 16,
        color: 'red',
      }
    })
  `;

  expect(transformSource(source)).toMatchInlineSnapshot(`
"import { stylo } from 'stylo';
const styles = {
  button: {
    position: \\"position-relative\\",
    fontSize: \\"font-size-16\\",
    color: \\"color-red\\"
  }
};"
`);
});
