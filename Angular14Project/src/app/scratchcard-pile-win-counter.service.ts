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

        console.log('next card: ', card)
        const v = this.evaluateScratchcard(card);
        return total + v;
      }, 0)

  }

  evaluateScratchcard(card: string): number {

    const [_cardLabel, numbers] = card.split(':');

    const [leftSideNums, rightSideNums] = numbers.split('|');

    return leftSideNums.trim().split(' ').reduce((total, leftNum) => {

      console.log('checking if ' + leftNum + ' is in ' + rightSideNums)
      if (rightSideNums.trim().split(' ') .filter((chars) => chars !== '').includes(leftNum.trim())) {

        console.log('yes')
        if (total === 0)
          total = 1;
        else
          total *= 2;
      }

      return total;
    }, 0)

  }

  solution(lines: string[]) {
    const winningNumbers = lines.map((line) =>
      line
        .trim()
        .split(':')[1]
        .split('|')[0]
        .split(' ')
        .filter((chars) => chars !== '')
    );

    const myNumbers = lines.map((line) =>
      line
        .trim()
        .split(':')[1]
        .split('|')[1]
        .split(' ')
        .filter((chars) => chars !== '')
    );

    const listofpoints = myNumbers.map((cardNumbers, index) => {
      let totalPoints = 0;

      cardNumbers.map((number) => {
        if (winningNumbers[index].includes(number)) {
          if (totalPoints === 0) {
            totalPoints += 1;
          } else {
            totalPoints *= 2;
          }
        }
      });

      return totalPoints
    });

    const sumpoints = listofpoints.reduce((a, b) => a + b);

    return sumpoints

  };
}
