/**
 * Check id is uuid
 * @param id - id string
 * @returns boolen is id of uuid
 */
export const isUuid = (id: string) => {
  const uuidRegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegExp.test(id);
};
