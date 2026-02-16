// @vitest-environment node
import { getResolvedTheme, getStoredTheme, getSystemTheme, setStoredTheme } from "./theme";

describe("theme 유틸리티 (SSR 환경)", () => {
	it("getStoredTheme()은 null 반환", () => {
		expect(getStoredTheme()).toBeNull();
	});

	it("setStoredTheme()은 에러 없이 무시", () => {
		expect(() => setStoredTheme("dark")).not.toThrow();
	});

	it("getSystemTheme()은 light 반환", () => {
		expect(getSystemTheme()).toBe("light");
	});

	it("getResolvedTheme()은 인자 없이 호출 시 light 반환", () => {
		expect(getResolvedTheme()).toBe("light");
	});

	it("getResolvedTheme('dark')은 dark 반환", () => {
		expect(getResolvedTheme("dark")).toBe("dark");
	});

	it("getResolvedTheme('system')은 light 반환", () => {
		expect(getResolvedTheme("system")).toBe("light");
	});
});
