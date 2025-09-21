import { defineConfig } from "vitepress";

export default defineConfig({
	title: "@bodynarf/utils",
	description: "Documentation for @bodynarf/utils library",
	base: "/bodynarf.utils/",
	themeConfig: {
		nav: [
			{ text: "Home", link: "/" }
		],
		sidebar: [
			{
				text: "API",
				items: [
					{ text: "Common", link: "/api/common" },
					{ text: "Array", link: "/api/array" },
					{ text: "Function", link: "/api/function" },
					{ text: "String", link: "/api/string" },
					{ text: "Object", link: "/api/object" },
					{ text: "Date", link: "/api/date" },
					{ text: "Event", link: "/api/event" },
					{ text: "GUID", link: "/api/guid" },
					{ text: "LocalStorage", link: "/api/localstorage" },
					{ text: "Promise", link: "/api/promise" },
					{ text: "API", link: "/api/api" }
				]
			}
		]
	}
});
