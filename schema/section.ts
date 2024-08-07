import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import {
  text,
  relationship,
} from '@keystone-6/core/fields';

import { convertToSlug } from '../util/convert-to-slug';

const Section = list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,

  // this is the fields for our Section list
  fields: {
    label: text(),

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

    pages: relationship({ ref: 'Page.section', many: true }),
  },

  hooks: {
    resolveInput: ({ resolvedData }) => {
      const { label } = resolvedData;
      const slug = convertToSlug(label);

      if (!slug) {
        return resolvedData;
      }

      return {
        ...resolvedData,
        label,
        slug,
      }
    },
  },
});

export default Section;
