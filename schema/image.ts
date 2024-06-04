import { list } from '@keystone-6/core';
import { text, image, file, relationship, timestamp } from '@keystone-6/core/fields';
import { allowAll } from '@keystone-6/core/access';

const Image = list({
  access: allowAll,
  fields: {
    name: text({
      validation: {
        isRequired: true,
      },
    }),

    altText: text(),

    fullsize: image({
      storage: 'surazalNetImages',
    }),

    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),

    categories: relationship({
      ref: 'Category.images',
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

export default Image;
