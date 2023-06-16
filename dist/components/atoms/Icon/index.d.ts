/// <reference types="react" />
export interface IconProps {
    src: string;
    alt?: string;
    width?: string | number;
    height?: string | number;
    style?: {};
}
declare function Icon({ src, alt, ...args }: IconProps): JSX.Element;
export default Icon;
