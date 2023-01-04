export interface IChildrenMenu {
    text: string;
    value: string;
    is_admin?: boolean;
    is_k8s?: boolean;
    no_show_menu?: boolean;
    no_route?: boolean;
    exact?: boolean;
    external_link?: boolean;
    component: React.LazyExoticComponent<any> | null;
}
export interface IMenuDataItem {
    text: string;
    value: string;
    children: IChildrenMenu[];
}
