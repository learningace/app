import { animate, animation, style } from '@angular/animations';

export let fadeInAnimation = animation([
  style({ opacity: 0,transform: 'translate3d(0, 10%, 0' }),
  animate('{{ duration }} {{ easing }}')
], {
  params: {
    duration: '1000ms',
    easing: 'ease-out'
  }
});

export let slideIcon = animation([
  style({  opacity: 0 }),
  animate('{{ duration }} {{ easing }}')
], {
  params: {
    duration: '2000ms',
    easing: 'ease-out'
  }
});
