import { defineCollection, z } from "astro:content";

export const collections = {
  articulos: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      subtitulo: z.string(),
      date: z.date(),
      categoria: z.string(),
      imagen: z.string(),
    }),
  }),
};
