import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const autores = defineCollection({
  loader: glob({ pattern: "**/*.{yaml,yml}", base: "./src/content/autores" }),
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
});

const categorias = defineCollection({
  loader: glob({
    pattern: "**/*.{yaml,yml}",
    base: "./src/content/categorias",
  }),
  schema: z.object({
    slug: z.string(),
    descripcion: z.string(),
  }),
});

const articulos = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc}", base: "./src/content/articulos" }),
  schema: z.object({
    title: z.string(),
    subtitulo: z.string(),
    slug: z.string().optional(),

    autores: z.array(z.string()),
    categorias: z.array(z.string()),

    // 🔥 fecha corregida
    date: z.coerce.date(),

    imagen: z.string(),
    responsive: z.string().optional(),
  }),
});

export const collections = {
  autores,
  categorias,
  articulos,
};
