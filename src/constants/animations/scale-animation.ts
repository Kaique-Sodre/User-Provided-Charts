import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const scaleUp = trigger('scaleUp', [
  state('scaleUp', style({ transform: 'scale(1.05)' })),
  state('rest', style({ transform: 'scale(1)', opacity: 0.8 })),
  transition('* => scaleUp', animate('250ms ease-in')),
  transition('* => rest', animate('250ms ease-in')),
]);
