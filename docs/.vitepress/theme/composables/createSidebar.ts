
export interface IItems {
	text: string;
	link?: string;
	collapsed?: boolean;
	items?: IItems[];
}

export function createSidebar() {
	const res = {
		items: [
			{ text: "交换机的 VLANIF 接口详解", link: "/categories/annals/2025/04/13/交换机的 VLANIF 接口详解" },
			{ text: "企业级网络架构分析", link: "/categories/annals/2025/04/13/企业级网络架构分析" },
			{ text: "三层交换机防病毒", link: "/categories/annals/2025/04/13/三层交换机防病毒" },
			{ text: "傻瓜交换机架构最佳实践", link: "/categories/annals/2025/04/13/傻瓜交换机架构最佳实践" },
			{ text: "防火墙路由之策略路由（二）", link: "/categories/annals/2025/03/26/防火墙路由之策略路由（二）" },
			{ text: "防火墙路由之防火墙策略（三）", link: "/categories/annals/2025/03/26/防火墙路由之防火墙策略（三）" },
			{ text: "华为交换机系列", link: "/categories/annals/2025/03/25/华为交换机系列" },
			{ text: "防火墙路由之静态路由（一）", link: "/categories/annals/2025/03/24/防火墙路由之静态路由（一）" },
			
		].map((item, i) => (!i ? item : { ...item, collapsed: true })),
	};
	return res;
}