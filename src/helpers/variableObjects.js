export const serializeFields = (item, fields, fixedfields) => {
  let newItem = {};
  newItem.values = {};

  fields.forEach(field => {
    if(fixedfields.includes(field))
      newItem[field.field] = item[field.field];
    else
      newItem.values[field.field] = item[field.field];
  });
  return newItem;
};


export const deserializeFields = (item, field) => {
  let newObject = {...item, ...item[field]};
  delete newObject[field];
  return newObject;
};
