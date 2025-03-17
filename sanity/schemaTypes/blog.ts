export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'object',
      title: 'Title of blog article',
      fields: [
        {
          name: 'en',
          type: 'string',
          title: 'Title in English',
        },
        {
          name: 'pl',
          type: 'string',
          title: 'Title in Polish',
        },
      ],
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug of your blog article',
      options: {
        source: 'title.en', // Używamy tytułu w języku angielskim do generowania sluga
      },
    },
    {
      name: 'titleImage',
      type: 'image',
      title: 'Title Image',
    },
    {
      name: 'smallDescription',
      type: 'object',
      title: 'Small Description',
      fields: [
        {
          name: 'en',
          type: 'text',
          title: 'Small Description in English',
        },
        {
          name: 'pl',
          type: 'text',
          title: 'Small Description in Polish',
        },
      ],
    },
    {
      name: 'content',
      type: 'object',
      title: 'Content',
      fields: [
        {
          name: 'en',
          type: 'array',
          title: 'Content in English',
          of: [
            {
              type: 'block',
            },
          ],
        },
        {
          name: 'pl',
          type: 'array',
          title: 'Content in Polish',
          of: [
            {
              type: 'block',
            },
          ],
        },
      ],
    },
  ],
};