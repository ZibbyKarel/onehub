import { TranslationParams } from './types';

const PLACEHOLDER_PATTERN = /\{([^{}]+)\}/g;

export const formatMessage = (
  message: string,
  params?: TranslationParams,
): string => {
  if (!params) {
    return message;
  }

  return message.replace(PLACEHOLDER_PATTERN, (placeholder, paramName: string) => {
    if (!(paramName in params)) {
      return placeholder;
    }

    return String(params[paramName]);
  });
};
