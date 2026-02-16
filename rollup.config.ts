import nodeResolve from "@rollup/plugin-node-resolve";
import { defineConfig, type Plugin } from "rollup";
import esbuild from "rollup-plugin-esbuild";
import preserveDirectives from "rollup-plugin-preserve-directives";

// ESM은 기본적으로 strict mode이므로 불필요한 "use strict"를 제거
// Rollup이 renderChunk 이후에 "use strict"를 추가하므로 generateBundle 단계에서 처리
function removeUseStrict(): Plugin {
	return {
		name: "remove-use-strict",
		generateBundle(_, bundle) {
			for (const chunk of Object.values(bundle)) {
				if (chunk.type === "chunk") {
					chunk.code = chunk.code.replace(/^"use strict";\n/, "");
				}
			}
		}
	};
}

export default defineConfig({
	input: "src/index.ts",
	output: {
		dir: "dist",
		format: "esm",
		preserveModules: true,
		preserveModulesRoot: "src",
		entryFileNames: "[name].js"
	},
	external: (id) => /^react(\/|$)|^react-dom(\/|$)/.test(id) || ["tailwindcss", "clsx", "tailwind-merge"].includes(id),
	plugins: [
		nodeResolve({ extensions: [".ts", ".tsx", ".js", ".jsx"] }),
		esbuild({
			target: "es2022",
			jsx: "automatic",
			tsconfig: "./tsconfig.json"
		}),
		preserveDirectives(),
		removeUseStrict()
	],
	onwarn(warning, warn) {
		if (warning.code === "MODULE_LEVEL_DIRECTIVE") return;
		warn(warning);
	}
});
