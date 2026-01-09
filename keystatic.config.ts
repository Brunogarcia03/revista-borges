import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "Brunogarcia03",
      name: "revista-borges",
    },
  },

  collections: {
    categorias: collection({
      label: "Categorías",
      slugField: "slug",
      path: "src/content/categorias/*",
      schema: {
        slug: fields.slug({
          name: { label: "Categoría" },
        }),

        descripcion: fields.text({
          label: "Descripción",
          multiline: true,
          validation: { isRequired: false },
        }),
      },
    }),

    autores: collection({
      label: "Autores",
      slugField: "name",
      path: "src/content/autores/*",
      schema: {
        name: fields.slug({
          name: { label: "Nombre" },
        }),

        role: fields.text({
          label: "Rol / Descripción",
          validation: { isRequired: false },
        }),

        bio: fields.text({
          label: "Biografía",
          multiline: true,
          validation: { isRequired: false },
        }),

        avatar: fields.image({
          label: "Avatar",
          directory: "public/uploads/autores",
          publicPath: "/uploads/autores",
          validation: { isRequired: false },
        }),

        socials: fields.object(
          {
            instagram: fields.url({ label: "Instagram" }),
            facebook: fields.url({ label: "Facebook" }),
            github: fields.url({ label: "GitHub" }),
            linkedin: fields.url({ label: "LinkedIn" }),
            x: fields.url({ label: "X / Twitter" }),
            website: fields.url({ label: "Sitio web" }),
          },
          {
            label: "Redes sociales",
          }
        ),
      },
    }),

    articulos: collection({
      label: "Artículos",
      slugField: "title",
      path: "src/content/articulos/*",
      format: {
        contentField: "body",
      },

      schema: {
        title: fields.slug({
          name: {
            label: "Título",
          },
        }),

        subtitulo: fields.text({
          label: "Subtítulo",
        }),

        date: fields.date({
          label: "Fecha",
        }),

        categorias: fields.array(
          fields.relationship({
            label: "Categoría",
            collection: "categorias",
          }),
          {
            label: "Categorías",
            itemLabel: (item) => item.value ?? "Categoría",
          }
        ),

        imagen: fields.image({
          label: "Imagen",
          directory: "public/uploads",
          publicPath: "/uploads",
        }),
        responsive: fields.image({
          label: "Imagen (responsive)",
          directory: "public/uploads",
          publicPath: "/uploads",
          validation: { isRequired: false },
        }),
        autores: fields.array(
          fields.relationship({
            label: "autor",
            collection: "autores",
          }),
          {
            label: "Autores",
            itemLabel: (item) => item.value ?? "Autor sin asignar",
          }
        ),

        body: fields.markdoc({
          label: "Contenido",
        }),
      },
    }),
  },
});
