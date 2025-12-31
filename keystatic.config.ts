import { config, fields, collection } from "@keystatic/core";

export default config({
  storage: {
    kind: "local",
  },

  collections: {
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

        categoria: fields.text({
          label: "Categoría",
        }),

        imagen: fields.image({
          label: "Imagen",
          directory: "public/uploads",
          publicPath: "/uploads",
        }),

        body: fields.markdoc({
          label: "Contenido",
        }),
      },
    }),
  },
});
