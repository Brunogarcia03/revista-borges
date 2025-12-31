import hero_1 from "../assets/photos/hero (1).webp";
import hero_2 from "../assets/photos/hero (2).webp";
import hero_3 from "../assets/photos/hero (3).webp";
import hero_4 from "../assets/photos/hero (4).webp";
import nuestro_nombre from "../assets/photos/nuestro_nombre.jpg";

export const news = [
  {
    title: "Nuestro nombre",
    slug: "nuestro-nombre",
    autor: "Bruno García",
    subtitulo:
      "Sobre la distancia entre el dolor vivido y el lenguaje que intenta explicarlo",
    categoria: "literatura",
    imagen: nuestro_nombre.src,
    body: `
Hay una violencia sutil en explicar lo evidente a quien ya está herido.
No es crueldad, sino una forma de defensa: describir el agua en lugar de
extender la mano.

Este texto nace de esa incomodidad. De la palabra que llega tarde, del
concepto que intenta ordenar lo que ya es caos. No es una denuncia,
tampoco un lamento: es apenas el registro de una escena repetida,
cotidiana, casi invisible.

Tal vez escribir sea eso: aprender a callar a tiempo.
    `,
  },
  {
    title: "Sabés que no aprendí a vivir",
    slug: "sabes-que-no-aprendi-a-vivir",
    autor: "Lucía Ferreyra",
    subtitulo:
      "Apuntes íntimos sobre crecer sin manual y equivocarse con método",
    categoria: "ensayo",
    imagen: hero_2.src,
    body: `
Nadie aprende a vivir, se improvisa.
Y en esa improvisación algunos parecen más hábiles que otros.

Este ensayo no busca conclusiones. Es un cuaderno abierto, escrito
a los márgenes de decisiones mal tomadas y certezas que duraron poco.
Vivir, al final, no era encontrar un camino, sino aceptar la intemperie.
    `,
  },
  {
    title: "Los tecno-oligarcas colonizan Washington",
    slug: "los-tecno-oligarcas-colonizan-washington",
    autor: "Martín Ledesma",
    subtitulo:
      "Cómo el poder tecnológico redefine la política sin pasar por las urnas",
    categoria: "política",
    imagen: hero_3.src,
    body: `
No llegaron en tanques ni con discursos grandilocuentes.
Llegaron con startups, financiamiento y promesas de eficiencia.

Este artículo analiza el nuevo mapa del poder en Estados Unidos, donde
los gigantes tecnológicos ya no influyen desde afuera, sino que escriben
las reglas desde adentro. Washington ya no se conquista: se optimiza.
    `,
  },
  {
    title: "No sos vos, es el peso",
    slug: "no-sos-vos-es-el-peso",
    autor: "Ana Beltrán",
    subtitulo:
      "Economía emocional de vivir en un país que siempre empuja hacia abajo",
    categoria: "crónica",
    imagen: hero_4.src,
    body: `
El peso no es solo una moneda: es un estado de ánimo.
Una sensación constante de esfuerzo sin recompensa.

Esta crónica recorre escenas mínimas —el supermercado, el alquiler,
el sueldo que se evapora— para contar una historia mayor: la de un país
que aprende a resistir incluso cuando no sabe bien a qué.
    `,
  },
];
