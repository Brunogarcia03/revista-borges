import { defineCollection, z } from "astro:content";

export const collections = {
  autores: defineCollection({
    type: "data",
    schema: z.object({
      name: z.string(),
      role: z.string().optional(),
      bio: z.string().optional(),
      avatar: z.string().optional(),
      socials: z
        .object({
          instagram: z.string().url().optional(),
          facebook: z.string().url().optional(),
          github: z.string().url().optional(),
          linkedin: z.string().url().optional(),
          x: z.string().url().optional(),
          website: z.string().url().optional(),
        })
        .optional(),
    }),
  }),

  articulos: defineCollection({
    type: "content",
    schema: z.object({
      title: z.string(),
      subtitulo: z.string(),
      autores: z.array(z.string()),
      date: z.date(),
      categoria: z.enum([
        "Literatura",
        "Historia",
        "Política",
        "Nosotros",
        "Arte",
      ]),

      imagen: z.string(),
    }),
  }),
};
