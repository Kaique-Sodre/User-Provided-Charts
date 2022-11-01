import { Component } from '@angular/core';
import { scaleUp } from 'src/constants/animations/scale-animation';
import { BodyPart } from './models/bodypart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [scaleUp],
})
export class AppComponent {
  title = 'User Provided Charts';
  selectedPartName: string = ``;

  redInput: number | null = null;
  greenInput: number | null = null;
  blueInput: number | null = null;

  bodyParts: { [key: string]: BodyPart } = {
    head: {
      id: `head`,
      name: `cabeça`,
      state: `rest`,
      color: `000000`,
    },
    torso: {
      id: `torso`,
      name: `Torso`,
      state: `rest`,
      color: `000000`,
    },
    leftArm: {
      id: `leftArm`,
      name: `Braço Esquerdo`,
      state: `rest`,
      color: `000000`,
    },
    rightArm: {
      id: `rightArm`,
      name: `Braço Direito`,
      state: `rest`,
      color: `000000`,
    },
    leftLeg: {
      id: `leftLeg`,
      name: `Perna Direita`,
      state: `rest`,
      color: `000000`,
    },
    rightLeg: {
      id: `rightLeg`,
      name: `Perna Esquerda`,
      state: `rest`,
      color: `000000`,
    },
  };

  mouseIn(limbName: string) {
    this.bodyParts[limbName].state = `scaleUp`;
  }

  mouseLeave(limbName: string) {
    if (this.selectedPartName != this.bodyParts[limbName].name) {
      this.bodyParts[limbName].state = `rest`;
      return;
    }
    this.clearNotSelectedParts(limbName);
  }

  clearNotSelectedParts(limbName: string) {
    const keys = Object.keys(this.bodyParts);
    keys.forEach((key) => {
      if (key != limbName) this.bodyParts[key].state = `rest`;
    });
  }

  selectPart(limbName: string) {
    this.clearNotSelectedParts(limbName);
    this.selectedPartName = this.bodyParts[limbName].name;

    const keys = Object.keys(this.bodyParts);
    keys.forEach((key) => {
      if (this.bodyParts[key].name == this.selectedPartName) {
        this.setInputRGBValues(key);
      }
    });
  }

  changeColor() {
    const keys = Object.keys(this.bodyParts);
    keys.forEach((key) => {
      if (this.bodyParts[key].name == this.selectedPartName)
        this.bodyParts[key].color = this.getRGBString();
    });
  }

  private setInputRGBValues(key: string) {
    this.redInput = parseInt(this.bodyParts[key].color.substring(1, 3), 16);
    this.greenInput = parseInt(this.bodyParts[key].color.substring(3, 5), 16);
    this.blueInput = parseInt(this.bodyParts[key].color.substring(5, 7), 16);
  }

  private getRGBString(): string {
    let R = this.redInput?.toString(16);
    let G = this.greenInput?.toString(16);
    let B = this.blueInput?.toString(16);

    if (R?.length == 1) R = '0' + R;
    if (G?.length == 1) G = '0' + G;
    if (B?.length == 1) B = '0' + B;

    return `#${R}${G}${B}`;
  }
}
