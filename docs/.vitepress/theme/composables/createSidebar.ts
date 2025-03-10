export enum MY_TAB {
	BLOG = "/categories/",
	NOTE = "/courses/",
}

export interface IItems {
	text: string;
	link?: string;
	collapsed?: boolean;
	items?: IItems[];
}

export interface ISideBar {
	[MY_TAB.BLOG]: IItems[];
	[MY_TAB.NOTE]: IItems[];
}

export function createSidebar() {
	const res: ISideBar = {
		"/categories/": [
			{
				text: "2024年",
				collapsed: false,
				items: [
					{
						text: "4月",
						items: [
							{ text: "新年快乐", link: "/categories/annals/2024/02/11/新年快乐" },
							{ text: "新年快乐", link: "/categories/annals/2024/02/11/新年快乐" },
							{ text: "新年快乐", link: "/categories/annals/2024/02/11/新年快乐" },
							{ text: "新年快乐", link: "/categories/annals/2024/02/11/新年快乐" },
							{ text: "新年快乐", link: "/categories/annals/2024/02/11/新年快乐" },
							{ text: "新年快乐", link: "/categories/annals/2024/02/11/新年快乐" },
							{ text: "新年快乐", link: "/categories/annals/2024/02/11/新年快乐" },
							{ text: "新年快乐", link: "/categories/annals/2024/02/11/新年快乐" },
						
						],
					},
				],
			},
		].map((item, i) => (!i ? item : { ...item, collapsed: true })),
	};
	return res;
}