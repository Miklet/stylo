"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    create(declarations) {
        const result = Object.fromEntries(Object.entries(declarations).map(([selector, rules]) => {
            const transformedRules = Object.fromEntries(Object.entries(rules).map(([property, value]) => {
                return [property, `${property.replace(/[A-Z]/g, "-$&").toLowerCase()}-${value}`];
            }));
            return [selector, transformedRules];
        }));
        console.log(result);
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
