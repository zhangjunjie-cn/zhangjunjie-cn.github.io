
export interface IItems {
	text: string;
	link?: string;
	collapsed?: boolean;
	items?: IItems[];
}

export function createSidebar() {
	const res = {
		items: [
			{ text: "新年快乐", link: "/categories/annals/2024/02/11/新年快乐" },
			{ text: "新年快乐", link: "/categories/annals/2024/02/11/新年快乐" },
			{ text: "新年快乐", link: "/categories/annals/2024/02/11/新年快乐" },
			{ text: "新年快乐", link: "/categories/annals/2024/02/11/新年快乐" },
			{ text: "新年快乐", link: "/categories/annals/2024/02/11/新年快乐" },
			{ text: "新年快乐", link: "/categories/annals/2024/02/11/新年快乐" },
			{ text: "新年快乐", link: "/categories/annals/2024/02/11/新年快乐" },
			{ text: "新年快乐", link: "/categories/annals/2024/02/11/新年快乐" },
			
		].map((item, i) => (!i ? item : { ...item, collapsed: true })),
	};
	return res;
}