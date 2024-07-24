/**
 * Преобразование цифр из строки в число
 * @param {string} stringWithNumber - строка с цифрами
 * @returns {number} - числовое значение
 */
export const parseNumber = (stringWithNumber) => {
  const cleanedString = stringWithNumber.replace(/[^0-9,.-]*\-/g, '').replace(',', '.');
  const parsedNumber = parseFloat(cleanedString);
  if (isNaN(parsedNumber)) {
    throw new Error(`Failed to convert string "${stringWithNumber}" to number`);
  }
  return parsedNumber;
};
