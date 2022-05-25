export interface BreadcrumbItem {
    label: string;
    href?: string;
}
export interface BreadcrumbProps {
    breadcrumbNameMap: BreadcrumbItem[];
    onClick: (url: string) => void;
}
