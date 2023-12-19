import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScratchcardPileWinCounterService {

  constructor() { }

  evaluatesScratchcardPile(cards: string): number {

    return cards
      .split('\n')
      .reduce((total, card) => {
        const v = this.evaluateScratchcard(card);
        return total + v;
      }, 0)

  }

  evaluateScratchcard(card: string): number {

    const [_cardLabel, numbers] = card.split(':');

    const [leftSideNums, rightSideNums] = numbers.split('|');

    return leftSideNums.trim().split(' ').reduce((total, leftNum) => {

      if (rightSideNums.trim().split(' ').includes(leftNum.trim()))
        if (total === 0)
          total = 1;
        else
          total *= 2;

      return total;
    }, 0)

  }

}
