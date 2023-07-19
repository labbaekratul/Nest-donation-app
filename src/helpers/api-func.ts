/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
export const apiMathods = async (
  model: any,
  query: any,
  isAdmin = true,
  userInfo = null,
) => {
  const {
    include,
    pageNumber = 1,
    pageSize = 20,
    select,
    includeFields,
    ...filter
  } = query;
  const Include = include && { [include]: {} };
  let IncludeFields;
  if (includeFields && include) {
    const includeFieldsArray = includeFields.split(',');
    const includeFieldsObject = {};
    for (const field of includeFieldsArray) {
      includeFieldsObject[field] = true;
    }
    IncludeFields = { [include]: { select: includeFieldsObject } };
  }
  const where: unknown = {};
  const selectArray =
    typeof select === 'string' ? select.split(',') : select || [];
  const selectObject: unknown = {};
  for (const field in filter) {
    if (Object.prototype.hasOwnProperty.call(filter, field)) {
      const value = filter[field];
      where[field] = { contains: value, mode: 'insensitive' };
    }
  }

  for (const field of selectArray) {
    selectObject[field] = true;
  }

  const fields =
    select && Object.keys(selectObject).length > 0 ? selectObject : undefined;

  const [data, totalCount] = await Promise.all([
    model.findMany({
      where: isAdmin
        ? where
        : {
            userId: userInfo.id,
            status: {
              not: 'REMOVED',
            },
          },
      include: IncludeFields || Include,
      select: fields,
      orderBy: { updatedAt: 'desc' },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    }),
    model.count({
      where: isAdmin
        ? where
        : {
            userId: userInfo.id,
            status: {
              not: 'REMOVED',
            },
          },
    }),
  ]);
  const totalPages = Math.ceil(totalCount / pageSize);
  return { data, totalCount, totalPages };
};
