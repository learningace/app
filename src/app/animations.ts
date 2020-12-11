import { animate, animation, style } from '@angular/animations';

export let fadeInAnimation = animation([
  style({ opacity: 0 }),
  animate('{{ duration }} {{ easing }}')
], {
  params: {
    duration: '1s',
    easing: 'ease-out'
  }
});
