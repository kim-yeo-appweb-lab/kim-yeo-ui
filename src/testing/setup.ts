import "@testing-library/jest-dom/vitest";

// Node.js 환경(SSR 테스트)에서는 브라우저 API 모킹 생략
if (typeof window !== "undefined") {
	// HTMLDialogElement의 showModal/close 메서드 모킹 (jsdom 미지원)
	HTMLDialogElement.prototype.showModal = vi.fn(function (this: HTMLDialogElement) {
		this.setAttribute("open", "");
	});

	HTMLDialogElement.prototype.close = vi.fn(function (this: HTMLDialogElement) {
		this.removeAttribute("open");
	});

	// matchMedia 모킹
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: vi.fn().mockImplementation((query: string) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: vi.fn(),
			removeListener: vi.fn(),
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn()
		}))
	});
}
