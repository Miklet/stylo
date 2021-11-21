import type { Properties } from "csstype";
import { name as babelPluginName } from "../../babel-plugin/package.json";

type StyleClassDeclarations<
  ClassNames extends string,
  ClassNameProperties extends Extract<keyof Properties, string>
> = Record<ClassNames, { [Keys in ClassNameProperties]?: Properties<number>[Keys] }>;

const UnitlessProperties = new Set("fontWeight");

const stylo = {
  /**
   * ```
   * stylo.create({
   *   class1: {
   *     color: 'red',
   *     fontWeight: 700
   *   },
   *   class2: {
   *     fontSize: 16,
   *     background: '#fff'
   *   }
   * })
   * ```
   * @param classes
   */
  create<ClassNames extends string, ClassNameProperties extends Extract<keyof Properties, string>>(
    declarations: StyleClassDeclarations<ClassNames, ClassNameProperties>
  ) {
    throw new Error(`stylo mustn\'t be used in runtime. It should be compiled away by using ${babelPluginName}.`);
  },
};

stylo.create({
  class1: {
    color: "red",
    fontWeight: 700,
  },
  class2: {
    fontSize: 16,
    background: "#fff",
  },
});
