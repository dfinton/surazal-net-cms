import { list } from '@keystone-6/core';
import { text, image, file, relationship, timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

const Fractal = list({
  access: allowAll,
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
    }),

    altText: text(),

    thumbnail: image({
      storage: 'surazalNetImages',
    }),

    small: image({
      storage: 'surazalNetImages',
    }),

    medium: image({
      storage: 'surazalNetImages',
    }),

    large: image({
      storage: 'surazalNetImages',
    }),

    parameterFile: file({
      storage: 'surazalNetFiles',
    }),

    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),

    posts: relationship(
      {
        ref: 'Post.fractals',
        many: true
      }
    ),

    categories: relationship({
      ref: 'FractalCategory.fractals',
      many: true,
      ui: {
        displayMode: 'cards',
        cardFields: ['name'],
        inlineEdit: { fields: ['name'] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ['name'] },
      },
    }),
  },
});

export default Fractal;
