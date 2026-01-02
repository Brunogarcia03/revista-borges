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

        categoria: fields.select({
          label: "Categoría",
          defaultValue: "Literatura",
          options: [
            { label: "Literatura", value: "Literatura" },
            { label: "Historia", value: "Historia" },
            { label: "Política", value: "Política" },
            { label: "Nosotros", value: "Nosotros" },
            { label: "Arte", value: "Arte" },
          ],
        }),

        imagen: fields.image({
          label: "Imagen",
          directory: "public/uploads",
          publicPath: "/uploads",
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
