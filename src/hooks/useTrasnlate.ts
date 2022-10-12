type I18nProps = { [key: string]: any };

export const useTranslate =
  (i18n?: I18nProps) =>
  (text: string): string => {
    return i18n ? i18n[text] : text;
  };
