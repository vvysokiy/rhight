import { SafeGetType } from '@rhight/safe-get';

/**
 * Безопасное получение свойства объекта, возвращает fallback при ошибке
 *
 * @param getPropFn - Функция возращающая свойство объекта
 * @param fallback - Вернется если произошла ошибка при получении свойства
 */
export const safeGet: SafeGetType = (getPropFn, fallback = null) => {
  try {
    const result = getPropFn();
    return result || fallback;
  } catch (e) {
    return fallback;
  }
};
