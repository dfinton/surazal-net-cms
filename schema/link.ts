import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import {
  text,
  json,
} from '@keystone-6/core/fields';

const Link = list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,

  // this is the fields for our Section list
  fields: {
    slug: text({
      validation: {
        isRequired: true,
      },
      isIndexed: 'unique',
    }),
    label: text(),
    linkList: json(),
  },
});

export default Link;
