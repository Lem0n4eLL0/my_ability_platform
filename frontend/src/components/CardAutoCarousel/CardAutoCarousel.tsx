import clsx from 'clsx';
import useEmblaCarousel from 'embla-carousel-react';
import { ReactNode, useEffect } from 'react';
import style from './CardAutoCarousel.module.scss';
import Autoscroll from 'embla-carousel-auto-scroll';

type ICardAutoCarousel = {
  items: ReactNode[];
};

const autoscrollOptions = {
  speed: 2,
  startDelay: 100,
  direction: 'forward',
  playOnInit: true,
  stopOnInteraction: false,
  stopOnMouseEnter: true,
} as const;

const carouselOptions = {
  loop: true,
  align: 'start',
  dragFree: false,
} as const;

export const CardAutoCarousel = (props: ICardAutoCarousel) => {
  const { items } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(carouselOptions, [Autoscroll(autoscrollOptions)]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.plugins().autoScroll?.play(0);
  }, [emblaApi]);

  return (
    <div>
      <div className={clsx(style['embla__viewport'], 'embla__viewport')} ref={emblaRef}>
        <div className={clsx(style['embla__container'], 'embla__container')}>
          {items.map((el, ind) => (
            <div key={ind} className={clsx(style['embla__slide'], 'embla__slide')}>
              {el}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
