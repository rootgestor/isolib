export interface BreadcrumbProps {
  breadcrumbNameMap: { [key: string]: string };
  onClick: (url: string) => void;
}
