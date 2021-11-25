export const getSingleValueFromQuery = (
  query: Record<string, string | string[] | undefined>,
  key: string
) => {
  const queryParam = query[key];
  return Array.isArray(queryParam) ? queryParam[0] : queryParam;
};
