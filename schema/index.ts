import type { Lists } from '.keystone/types';

import User from './user';
import Post from './post';
import Tag from './tag';
import Fractal from './fractal';
import FractalCategory from './fractal-category';

export const lists: Lists = {
  User,
  Post,
  Tag,
  Fractal,
  FractalCategory,
};
