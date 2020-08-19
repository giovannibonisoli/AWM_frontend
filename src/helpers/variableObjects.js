export const serializeFields = (item, fields) => {
  let newItem = {}
  let values = {};
  fields.map(field => {
    if(field.fixed){
      newItem[field.field] = item[field.field];
    }
    else{
      values[field.field] = item[field.field];
    }
    return null;
  });
  newItem.values = JSON.stringify(values);
  return newItem;
};


export const deserializeFields = (item, field) => {
  let newObject = {...item, ...JSON.parse(item[field])};
  delete newObject[field];
  return newObject;
};
