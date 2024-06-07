import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import {
  text,
  relationship,
  password,
  timestamp,
} from '@keystone-6/core/fields';

import { convertToSlug } from '../util/convert-to-slug';

const User = list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,

  // this is the fields for our User list
  fields: {
    // by adding isRequired, we enforce that every User should have a name
    //   if no name is provided, an error will be displayed
    name: text({ validation: { isRequired: true } }),

    slug: text({
      isIndexed: 'unique',
      ui: {
        createView: {
          fieldMode: ({ session, context }) => 'hidden',
        },
        itemView: {
          fieldMode: ({ session, context, item }) => 'read',
        },
        listView: {
          fieldMode: ({ session, context }) => 'read',
        },
      },
    }),

    email: text({
      validation: { isRequired: true },
      // by adding isIndexed: 'unique', we're saying that no user can have the same
      // email as another user - this may or may not be a good idea for your project
      isIndexed: 'unique',
    }),

    password: password({ validation: { isRequired: true } }),

    // we can use this field to see what Posts and Pages this User has authored
    //   more on that in the Post list below
    posts: relationship({ ref: 'Post.author', many: true }),
    pages: relationship({ ref: 'Page.author', many: true }),

    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
  },

  hooks: {
    resolveInput: ({ resolvedData }) => {
      const { name } = resolvedData;

      const slug = convertToSlug(name);

      if (!slug) {
        return resolvedData;
      }

      return {
        ...resolvedData,
        name,
        slug,
      }
    },
  },
});

export default User;
