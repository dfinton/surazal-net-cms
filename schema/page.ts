import { list } from '@keystone-6/core';
import { allowAll } from '@keystone-6/core/access';

import {
  text,
  timestamp,
  relationship,
} from '@keystone-6/core/fields';

import { document } from '@keystone-6/fields-document';

import documentConfig from '../config/document';

const Page = list({
  // WARNING
  //   for this starter project, anyone can create, query, update and delete anything
  //   if you want to prevent random people on the internet from accessing your data,
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  access: allowAll,

  // this is the fields for our Page list
  fields: {
    // the document field can be used for making rich editable content
    //   you can find out more at https://keystonejs.com/docs/guides/document-fields
    content: document(documentConfig),

    // with this field, you can set a User as the author for a Page
    author: relationship({
      // we could have used 'User', but then the relationship would only be 1-way
      ref: 'User.pages',

      // this is some customisations for changing how this will look in the AdminUI
      ui: {
        displayMode: 'cards',
        cardFields: ['name', 'email'],
        inlineEdit: { fields: ['name', 'email'] },
        linkToItem: true,
        inlineConnect: true,
      },

      // a Page can only have one author
      many: false,
    }),

    // with this field, you can add some Sections to Pages
    sections: relationship({
      // we could have used 'Section', but then the relationship would only be 1-way
      ref: 'Section.pages',

      // a Page can only have many Section
      many: false,

      // this is some customisations for changing how this will look in the AdminUI
      ui: {
        displayMode: 'select',
        labelField: 'label',
      },
    }),

    createdAt: timestamp({
      defaultValue: { kind: 'now' },
    }),
  },
});

export default Page;
