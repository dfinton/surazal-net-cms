import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import {
  text,
  relationship,
} from '@keystone-6/core/fields';

const Category = list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,

  // setting this to isHidden for the user interface prevents this list being visible in the Admin UI
  ui: {
    isHidden: true,
  },

  // this is the fields for our Category list
  fields: {
    name: text(),
    // this can be helpful to find out all the Images associated with a Category
    images: relationship({ ref: 'Image.categories', many: true }),
  },
});

export default Category;
