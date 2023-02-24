import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buytoon',
  templateUrl: './buytoon.component.html',
  styleUrls: ['./buytoon.component.scss']
})
export class BuytoonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  priceInEth: number = 0.00065;
  purchaseAmount: number = 0;
  purchasePriceTotal: number = 0;


  async purchaseToonForEth() {
   

  }



  updatePublicEthPrice(e: Event) {
    this.purchaseAmount = Number(e);
    this.purchasePriceTotal = parseFloat(
      (this.priceInEth * this.purchaseAmount).toFixed(10)
    );
  }




}
