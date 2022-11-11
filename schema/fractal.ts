import { list } from '@keystone-6/core';
import { text, image, relationship, timestamp } from '@keystone-6/core/fields';
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

    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),

    posts: relationship(
      {
        ref: 'Post.fractals',
        many: true
      }
    ),
  },
});

export default Fractal;
