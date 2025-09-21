import { describe, it, expect } from "vitest";

// Import file to activate prototype extension
import "../../../src/string/prototype";

describe("String.prototype.toCamelCase", () => {
	it("should convert string to camelCase", () => {
	  expect("hello world".toCamelCase()).toBe("helloWorld");
	  expect("hello_world".toCamelCase()).toBe("helloWorld");
	  expect("hello-world".toCamelCase()).toBe("helloWorld");
	  expect("hello.world".toCamelCase()).toBe("hello.world");
	});

	it("should handle single word", () => {
		expect("hello".toCamelCase()).toBe("hello");
	});

	it("should handle multiple separators", () => {
	  expect("hello_world-test.case".toCamelCase()).toBe("helloWorldTest.case");
	});

	it("should handle uppercase letters", () => {
	  expect("HelloWorld".toCamelCase()).toBe("helloworld");
	  expect("HELLO_WORLD".toCamelCase()).toBe("helloWorld");
	});

	it("should handle mixed case with separators", () => {
	  expect("Hello_World-Test".toCamelCase()).toBe("helloWorldTest");
	});

	it("should handle consecutive uppercase letters", () => {
	  expect("XMLHttpRequest".toCamelCase()).toBe("xmlhttprequest");
	  expect("HTML_DOM".toCamelCase()).toBe("htmlDom");
	});
});
