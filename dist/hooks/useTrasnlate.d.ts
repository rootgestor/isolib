declare type I18nProps = {
    [key: string]: string;
};
export declare const useTranslate: (i18n?: I18nProps | undefined) => (text: string) => string;
export {};
