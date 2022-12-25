import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-viewcatz",
  templateUrl: "./viewcatz.component.html",
  styleUrls: ["./viewcatz.component.scss"],
})
export class ViewcatzComponent implements OnInit {
  constructor() {}

  searchedAddress: string = '';

  ngOnInit(): void {}

  updateSearchedAddress(e: Event) {
    this.searchedAddress = String(e);
    console.log(e);
    // without type info
    // this.purchaseString = '';
    // this.numToBuy = String(e);
    // if (Number(this.numToBuy) > 2) {
    //   this.multiplier = 2 * Number(this.numToBuy);
    // } else {
    //   this.multiplier = Number(this.numToBuy);
    // }
    // this.totalPrice = (
    //   Number(this.numToBuy) * Number(this.contractPrice)
    // ).toFixed(6);
    // if (Number(this.numToBuy) >= 51) {
    //   this.numToBuy = '0';
    //   this.totalPrice = '0';
    //   this.multiplier = 0;
    // }
    // if (isNaN(Number(this.totalPrice))) {
    //   this.numToBuy = '0';
    //   this.totalPrice = '0';
    //   this.multiplier = 0;
    // }
  }
}
