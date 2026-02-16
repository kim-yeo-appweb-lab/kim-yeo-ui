import { preserveDirectivesPlugin } from "esbuild-plugin-preserve-directives";
import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		// 메인 엔트리포인트 (타입 정의 포함)
		index: "src/index.ts",
		// 개별 컴포넌트 (Tree-shaking용)
		"components/Avatar/Avatar": "src/components/Avatar/Avatar.tsx",
		"components/Badge/Badge": "src/components/Badge/Badge.tsx",
		"components/Breadcrumb/Breadcrumb": "src/components/Breadcrumb/Breadcrumb.tsx",
		"components/Button/Button": "src/components/Button/Button.tsx",
		"components/Card/Card": "src/components/Card/Card.tsx",
		"components/EmptyState/EmptyState": "src/components/EmptyState/EmptyState.tsx",
		"components/Filter/Filter": "src/components/Filter/Filter.tsx",
		"components/Input/Input": "src/components/Input/Input.tsx",
		"components/Modal/Modal": "src/components/Modal/Modal.tsx",
		"components/Pagination/Pagination": "src/components/Pagination/Pagination.tsx",
		"components/SectionHeader/SectionHeader": "src/components/SectionHeader/SectionHeader.tsx",
		"components/Select/Select": "src/components/Select/Select.tsx",
		"components/Skeleton/Skeleton": "src/components/Skeleton/Skeleton.tsx",
		"components/Tab/Tab": "src/components/Tab/Tab.tsx",
		"components/TagInput/TagInput": "src/components/TagInput/TagInput.tsx",
		"components/Textarea/Textarea": "src/components/Textarea/Textarea.tsx",
		"components/ThemeToggle/ThemeToggle": "src/components/ThemeToggle/ThemeToggle.tsx",
		// 유틸리티
		"utils/cn": "src/utils/cn/cn.ts",
		"utils/slot": "src/utils/slot/slot.tsx",
		"utils/theme": "src/utils/theme/theme.ts",
		// 훅
		"hooks/useTheme": "src/hooks/useTheme/useTheme.ts",
		// Context
		"contexts/ThemeContext": "src/contexts/ThemeContext.tsx"
	},
	format: ["esm"],
	dts: {
		entry: "src/index.ts"
	},
	splitting: true,
	treeshake: false,
	clean: true,
	outDir: "dist",
	metafile: true,
	external: ["react", "react-dom", "tailwindcss"],
	esbuildOptions(options) {
		options.jsx = "automatic";
	},
	esbuildPlugins: [
		preserveDirectivesPlugin({
			directives: ["use client"],
			include: /\.(ts|tsx)$/,
			exclude: /node_modules/
		})
	]
});
