import eslint from "@eslint/js";
import xo from "eslint-config-xo";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
	xo,
	eslint.configs.recommended,
	tseslint.configs.recommended,
	{
		ignores: ["dist/*", "**/*.d.ts"],
		languageOptions: {
			globals: {
				...globals.commonjs,
				...globals.node,
			},
			ecmaVersion: "latest",
			sourceType: "module",
		},

	},

	{
		rules: {
			"@stylistic/quotes": ["warn", "double", {
				avoidEscape: true,
				allowTemplateLiterals: true,
			}],
		},
	},
);
