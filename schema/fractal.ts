import { list } from '@keystone-6/core';
import { text, image, file, relationship, timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

import { convertToSlug } from '../util/convert-to-slug';

const Fractal = list({
  access: allowAll,

  fields: {
    name: text(),
    altText: text(),

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

    thumbnail: relationship({
      ref: 'Image',
      many: false,
    }),

    small: relationship({
      ref: 'Image',
      many: false,
    }),

    medium: relationship({
      ref: 'Image',
      many: false,
    }),

    large: relationship({
      ref: 'Image',
      many: false,
    }),

    posts: relationship(
      {
        ref: 'Post.fractals',
        many: true
      }
    ),
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

export default Fractal;
