import { Component, OnInit } from '@angular/core';
import $toonCoinContract from "../../services/Solidity/$toon.service";
import Web3 from 'web3'; 
import { Web3Service } from "src/app/services/Web3/web3.service";

@Component({
  selector: 'app-buytoon',
  templateUrl: './buytoon.component.html',
  styleUrls: ['./buytoon.component.scss']
})
export class BuytoonComponent implements OnInit {

  constructor(private web3: Web3Service) { }

  userAddress: string = "";

  priceInEth: number = 0;
  purchaseAmount: number = 1;
  purchasePriceTotal: number = 0;
  isLoading: boolean = false;
  error: string = "";

  async ngOnInit(): Promise<void> {

    await this.getContent();



  }

  async getContent() {
		this.priceInEth = Number(Web3.utils.fromWei(await $toonCoinContract.methods.cost().call(), 'ether'))
    this.purchasePriceTotal = this.priceInEth * this.purchaseAmount

  }




  async purchaseToonForEth() {
    this.isLoading = true;
    this.error = "";
    try{
    let array = await this.web3.getAccounts();
    this.userAddress = array[0];
    await $toonCoinContract.methods.buy(this.purchaseAmount).send({
      from: this.userAddress,
      value: Web3.utils.toWei(this.purchasePriceTotal.toString(), "ether")

    })
    this.isLoading = false;
    this.getContent();
    }catch(e){
      this.isLoading = false;
      this.error = e;
    }
  }



  updatePublicEthPrice(e: Event) {
    this.purchaseAmount = Number(e);
    this.purchasePriceTotal = parseFloat(
      (this.priceInEth * this.purchaseAmount).toFixed(10)
    );
  }




}
