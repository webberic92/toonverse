import { Component, OnInit } from "@angular/core";
import { Web3Service } from "src/app/services/Web3/web3.service";
// import Web3 from 'web3';
import $toonCoinContract from "src/app/services/Solidity/$toon.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  userAddress: string = "";
  isConnected: boolean = false;
  totalStakedNfts: number = 0;

  constructor(private web3: Web3Service) {}

  async ngOnInit() {
    this.totalStakedNfts = await updatedTotalStakedNfts();

    {
      setInterval(() => {
        updatedTotalStakedNfts();
      }, 100000);
    }
  }
}

async function updatedTotalStakedNfts() {
  try {
    let retVal = await $toonCoinContract.methods.stakedNfts().call();
    return retVal;
  } catch (e) {
    console.log(e);
  }
}
