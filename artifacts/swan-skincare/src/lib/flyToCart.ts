import gsap from 'gsap';

/**
 * Clone a product image and animate it into the header cart icon.
 * `originRect` is the on-screen box of the source image (or slot).
 */
export function flyToCart(imageSrc: string, originRect: DOMRect): Promise<void> {
  return new Promise((resolve) => {
    const target = document.getElementById('cart-fly-target');
    if (!target || !imageSrc) {
      resolve();
      return;
    }

    const targetRect = target.getBoundingClientRect();
    const size = Math.max(64, Math.min(originRect.width, 180));

    const clone = document.createElement('img');
    clone.src = imageSrc;
    clone.className = 'fly-clone';
    clone.style.width = `${size}px`;
    document.body.appendChild(clone);

    const startX = originRect.left + originRect.width / 2 - size / 2;
    const startY = originRect.top + originRect.height / 2 - size / 2;
    const endX = targetRect.left + targetRect.width / 2 - size / 2;
    const endY = targetRect.top + targetRect.height / 2 - size / 2;

    gsap.set(clone, { x: startX, y: startY, opacity: 1, scale: 1, rotate: 0 });

    const tl = gsap.timeline({
      onComplete: () => {
        clone.remove();
        resolve();
      },
    });

    tl.to(clone, {
      x: endX,
      y: endY,
      scale: 0.14,
      rotate: 18,
      duration: 0.9,
      ease: 'power2.inOut',
    })
      .to(clone, { opacity: 0, duration: 0.18 }, '-=0.18')
      .fromTo(
        target,
        { scale: 1 },
        { scale: 1.35, duration: 0.16, yoyo: true, repeat: 1, ease: 'power2.out' },
        '-=0.24',
      );
  });
}
