import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import {
  text,
  timestamp,
  relationship,
} from '@keystone-6/core/fields';

import { document } from '@keystone-6/fields-document';

import { convertToSlug } from '../util/convert-to-slug';
import documentConfig from '../config/document';

const Post = list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,

  // this is the fields for our Post list
  fields: {
    title: text({ validation: { isRequired: true } }),

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

    // the document field can be used for making rich editable content
    //   you can find out more at https://keystonejs.com/docs/guides/document-fields
    content: document(documentConfig),

    // with this field, you can set a User as the author for a Post
    author: relationship({
      // we could have used 'User', but then the relationship would only be 1-way
      ref: 'User.posts',

      // this is some customisations for changing how this will look in the AdminUI
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        inlineEdit: { fields: ['name', 'email'] },
        linkToItem: true,
        inlineConnect: true,
      },

      // a Post can only have one author
      //   this is the default, but we show it here for verbosity
      many: false,
    }),

    // with this field, you can add some Tags to Posts
    tags: relationship({
      // we could have used 'Tag', but then the relationship would only be 1-way
      ref: 'Tag.posts',

      // a Post can have many Tags, not just one
      many: true,

      // this is some customisations for changing how this will look in the AdminUI
      ui: {
        displayMode: 'cards',
        cardFields: ['name'],
        inlineEdit: { fields: ['name'] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ['name'] },
      },
    }),

    fractals: relationship({
      ref: 'Fractal.posts',
      many: true,
    }),

    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),

    modifiedAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
  },

  hooks: {
    resolveInput: ({ resolvedData }) => {
      const { title } = resolvedData;
      const slug = convertToSlug(title);

      if (!slug) {
        return resolvedData;
      }

      return {
        ...resolvedData,
        title,
        slug,
      }
    },
  },
});

export default Post;
