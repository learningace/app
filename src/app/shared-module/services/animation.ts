import { animate, animation, style } from '@angular/animations';

export let slideInRight = animation(
  [
    style({ transform: 'translate3d(100%, 0, 0)',opacity:0 }),
    animate('{{ duration }} {{ easing }}'),
  ],
  {
    params: {
      duration: '1000ms',
      easing: 'ease-out',
    },
  }
);

