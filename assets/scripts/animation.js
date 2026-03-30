document.addEventListener('DOMContentLoaded', () => {

  // ===== FUNCIÓN BASE =====
  function createLottie({ id, path, loop = false, autoplay = false, speed = 1 }) {
    const el = document.getElementById(id);

    const anim = lottie.loadAnimation({
      container: el,
      renderer: 'svg',
      loop,
      autoplay,
      path
    });

    anim.setSpeed(speed);
    anim.setSubframe(false); // 🔥 mejora rendimiento

    el.__anim = anim;

    return { el, anim };
  }

  // ===== LAZY LOAD (para animaciones pesadas) =====
  function createLazyLottie({ id, path, loop = false, autoplay = false, speed = 1 }) {
    const el = document.getElementById(id);
    let anim = null;

    const lazyObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !anim) {
          anim = lottie.loadAnimation({
            container: el,
            renderer: 'svg',
            loop,
            autoplay,
            path
          });

          anim.setSpeed(speed);
          anim.setSubframe(false);

          el.__anim = anim;

          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    lazyObserver.observe(el);

    return el;
  }

  // ===== OBSERVER GENERAL (play/pause) =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const anim = entry.target.__anim;
      if (!anim) return;

      if (entry.isIntersecting) {
        anim.play();
      } else {
        anim.pause();
      }
    });
  }, { threshold: 0.3 });

  function observe(el) {
    observer.observe(el);
  }

  // ===== 1. CHARACTER (loop con delay) =====
  const { anim: character } = createLottie({
    id: 'chrctr',
    path: 'assets/illustration/data.json',
    autoplay: true
  });

  function loopConDelay() {
    const delay = Math.random() * (4000 - 2500) + 2500;

    setTimeout(() => {
      character.goToAndPlay(0, true);
    }, delay);
  }

  character.addEventListener('complete', loopConDelay);

  // ===== 2. PATO (click + sonido) =====
  const { el: patoEl, anim: pato } = createLottie({
    id: 'cuadro2',
    path: 'assets/illustration/pato.json'
  });

  const sound = document.getElementById('hover-sound');

  patoEl.addEventListener('click', () => {
    pato.goToAndPlay(0, true);

    sound.volume = 0.2;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  });

  // ===== 3. COMPUTER =====
  const { el: computerEl, anim: computer } = createLottie({
    id: 'computer',
    path: 'assets/illustration/computer.json'
  });

  let isPlaying = false;

  computerEl.addEventListener('click', () => {
    if (isPlaying) return;

    isPlaying = true;
    computer.goToAndPlay(0, true);
  });

  computer.addEventListener('complete', () => {
    isPlaying = false;
  });

  // ===== 4. COFFEE (lazy + observer) =====
  const coffeeEl = createLazyLottie({
    id: 'coffee',
    path: 'assets/illustration/cafe.json',
    loop: true,
    autoplay: true,
    speed: 0.8
  });

  observe(coffeeEl);

  // ===== 5. BEAR (igual que lo tenías) =====
  const { el: bearEl, anim: bear } = createLottie({
    id: 'bear',
    path: 'assets/illustration/oso.json'
  });

  let hasClicked = false;

  bearEl.addEventListener('click', () => {
    hasClicked = true;
    bear.playSegments([1, 30], true);
  });

  bearEl.addEventListener('mouseleave', () => {
    if (!hasClicked) return;

    bear.playSegments([31, 64], true);
    hasClicked = false;
  });

  // ===== 6. SWITCH (lazy) =====
  const switchEl = createLazyLottie({
    id: 'switch',
    path: 'assets/illustration/switch.json',
    loop: true,
    autoplay: true,
    speed: 0.47
  });

  observe(switchEl);

  // ===== 7. CAT (lazy) =====
  const catEl = createLazyLottie({
    id: 'cat-i',
    path: 'assets/illustration/gato.json',
    loop: true,
    autoplay: true
  });

  observe(catEl);

});