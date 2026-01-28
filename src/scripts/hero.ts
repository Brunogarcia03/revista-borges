import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function initHero() {
  let index = 0;
  let animating = false;
  let autoplay = true;
  const AUTOPLAY_DELAY = 5000;
  let autoplayTimeout: number | null = null;

  const containerMorph = document.getElementById(
    "morph-container",
  ) as HTMLAnchorElement;
  const text1 = document.getElementById("text1") as HTMLSpanElement;
  const text2 = document.getElementById("text2") as HTMLSpanElement;
  const counter = document.getElementById("counter") as HTMLSpanElement;
  const btnNext = document.getElementById("next") as HTMLButtonElement;
  const btnPrev = document.getElementById("prev") as HTMLButtonElement;
  const link = document.getElementById("link") as HTMLAnchorElement;
  const loader = document.getElementById("loader") as HTMLDivElement;

  const images = gsap.utils.toArray<HTMLImageElement>(".hero-img");

  // Estado inicial imágenes
  images.forEach((img, i) => {
    gsap.set(img, {
      zIndex: i === 0 ? 2 : 0,
      clipPath:
        i === 0
          ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
          : "polygon(0 0, 0 0, 0 100%, 0 100%)",
    });
  });

  const imagesData = images
    .map((img) => {
      const { title, slug } = img.dataset;
      if (!title || !slug) return null;
      return { title, slug };
    })
    .filter(Boolean);

  const currentData = imagesData[index];
  text1.textContent = currentData?.title || "";
  link.href = `/articulos/${currentData?.slug}`;
  containerMorph.href = `/articulos/${currentData?.slug}`;

  gsap.from(text1, {
    duration: 0.6,
    opacity: 0,
    y: 40,
    ease: "expo.out",
  });

  gsap.from([btnPrev, btnNext, ".p-counter"], {
    y: 20,
    opacity: 0.2,
    duration: 1,
    stagger: 0.035,
    ease: "expo.out",
  });

  gsap.from("#link", {
    opacity: 0.2,
    scale: 0.3,
    duration: 1,
    ease: "expo.out",
  });

  function setCounter(i: number) {
    counter.textContent = String(i + 1).padStart(2, "0");
  }

  function scheduleAutoplay() {
    if (!autoplay) return;
    autoplayTimeout = window.setTimeout(animateLoader, 1000);
  }

  function animateLoader() {
    gsap.fromTo(
      loader,
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: AUTOPLAY_DELAY / 1000,
        ease: "linear",
        onComplete: () => {
          gsap.to(loader, { scaleY: 0, duration: 0.5 });
          goTo((index + 1) % images.length);
        },
      },
    );
  }

  function stopAutoplay() {
    autoplay = false;
    if (autoplayTimeout) clearTimeout(autoplayTimeout);
    gsap.killTweensOf(loader);
    gsap.set(loader, { scaleY: 0 });
  }

  function goTo(nextIndex: number) {
    if (animating || nextIndex === index) return;
    animating = true;

    const currentImg = images[index];
    const nextImg = images[nextIndex];
    const nextData = imagesData[nextIndex];

    text2.textContent = nextData?.title || "";
    link.href = `/articulos/${nextData?.slug}`;
    containerMorph.href = `/articulos/${nextData?.slug}`;

    gsap.set(nextImg, {
      zIndex: 3,
      clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    });

    const tl = gsap.timeline({
      defaults: { duration: 1, ease: "power3.inOut" },
      onComplete: () => {
        gsap.set(currentImg, { zIndex: 0 });
        gsap.set(nextImg, { zIndex: 2 });
        index = nextIndex;
        animating = false;
        if (autoplay) scheduleAutoplay();
      },
    });

    tl.to(nextImg, {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    })
      .to(
        currentImg,
        {
          clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        },
        0,
      )
      .fromTo(
        text2,
        { opacity: 0, filter: "blur(12px)" },
        { opacity: 1, filter: "blur(0px)" },
        0,
      )
      .to(text1, { opacity: 0, filter: "blur(12px)" }, 0)
      .add(() => {
        text1.textContent = nextData?.title || "";
        setCounter(nextIndex);
      }, 0.5)
      .add(() => {
        gsap.set(text1, { opacity: 1, filter: "blur(0px)" });
        gsap.set(text2, { opacity: 0 });
      });
  }

  btnNext.addEventListener("click", () => {
    stopAutoplay();
    autoplay = true;
    goTo((index + 1) % images.length);
  });

  btnPrev.addEventListener("click", () => {
    stopAutoplay();
    autoplay = true;
    goTo((index - 1 + images.length) % images.length);
  });

  setCounter(0);
  scheduleAutoplay();
}
