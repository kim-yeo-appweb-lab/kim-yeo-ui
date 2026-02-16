---
"@kim-yeo-appweb-lab/ui": patch
---

빌드 시스템을 tsup에서 Rollup으로 마이그레이션하여 Next.js SSR에서 발생하는 `createContext is not a function` 에러를 해결한다.

- `preserveModules`로 소스 1:1 파일 구조를 유지하여 chunk 파일 생성을 방지하고 `"use client"` 지시어를 보존
