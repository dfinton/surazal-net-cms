import { list } from '@keystone-6/core';
import { text, image, file, relationship, timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

import { convertToSlug } from '../util/convert-to-slug';

const Image = list({
  access: allowAll,
  fields: {
    name: text({
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

    file: image({
      validation: {
        isRequired: true,
      },
      storage: 'surazalNetImages',
    }),

    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
  },
  hooks: {
    resolveInput: ({ resolvedData }) => {
      const { file: imageFile } = resolvedData;
      const { id: name, extension } = imageFile;
      const slug = convertToSlug(name);

      if (!slug) {
        return resolvedData;
      }

      return {
        ...resolvedData,
        name: `${name}.${extension}`,
        slug,
      }
    },
  },
});

export default Image;
