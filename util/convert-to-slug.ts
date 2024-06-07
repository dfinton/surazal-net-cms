const convertToSlug = (value: string) => {
  if (typeof value !== "string") {
    return undefined;
  }

  let slug = value.toLowerCase();

  if (!/[a-z0-9]/.test(slug)) {
    return undefined;
  }

  slug = slug.replace(/[^a-z0-9]+/g, '-');
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
};

export { convertToSlug };
