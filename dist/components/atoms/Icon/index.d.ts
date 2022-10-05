/// <reference types="react" />
export interface IconProps {
    src: string;
    width?: string | number;
    height?: string | number;
    style?: {};
}
declare function Icon({ src, ...args }: IconProps): JSX.Element;
export default Icon;
