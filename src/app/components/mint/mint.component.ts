import { Component, OnInit } from '@angular/core';
import ethContract from 'src/app/services/Solidity/contract.service';
import Web3 from 'web3';
import { Web3Service } from 'src/app/services/Web3/web3.service';

import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mint',
  templateUrl: './mint.component.html',
  styleUrls: ['./mint.component.scss'],
})
export class MintComponent implements OnInit {
  constructor(private web3: Web3Service, private router: Router) {}
  tokensOwned: string = '';
  tokensStaked: string = '';

  isLoading: boolean = false;
  userAddress: string = '';
  contractAddress: string = '';
  contractOwner: string = '';
  contractName: string = '';
  contractSymbol: string = '';
  contractMinted: string = '';
  contractTotalSupply: string = '';
  contractPrice: string = '';
  numToBuy: string = '1';
  totalPrice: string = '1';
  purchaseString: string = '';
  error: string = '';
  multiplier: number = 1;

  async ngOnInit(): Promise<any> {
    this.getContent();
  }
  async getContent() {
    try {
      this.error = '';

      this.isLoading = true;

      this.contractAddress = ethContract._address;

      this.contractName = await ethContract.methods.name().call();

      this.contractSymbol = await ethContract.methods.symbol().call();

      this.contractMinted = await ethContract.methods.totalSupply().call();

      this.contractTotalSupply = await ethContract.methods.MAX_SUPPLY().call();

      this.contractPrice = Web3.utils.fromWei(
        await ethContract.methods.COST().call(),
        'ether'
      );
      this.totalPrice = this.contractPrice;

      //this.isLoading = false;
      // this.userAddress = await this.web3.getAccounts();

      // this.tokensOwned = await ethContract.methods
      //   .balanceOf(this.userAddress[0])
      //   .call();

      this.contractOwner = await ethContract.methods.owner().call();

      // this.router.navigate(['/']); // navigate to other page

      this.isLoading = false;

      // let whlstedwallet = this.userAddress[0];
      // const response = await fetch(
      //   `https://1mwe9uiok1.execute-api.us-east-1.amazonaws.com/proof/${this.userAddress[0]}`,
      //   {
      //     mode: 'cors',
      //   }
      // );
    } catch (e) {
      this.error = e.message;
      console.log(this.error)
      this.isLoading = false;
    }
  }
  async connect() {
    try {

        //this.isLoading = false;
        this.userAddress = await this.web3.getAccounts();
      this.totalPrice = (
        Number(this.numToBuy) * Number(this.contractPrice)
      ).toFixed(6);      this.isLoading = false;
      this.error = '';

    } catch (e) {
      this.error = e.message;
      this.isLoading = false;
    }
  }

  plus() {
    if (Number(this.numToBuy) != 50) {
      this.numToBuy = String(Number(this.numToBuy) + 1);
      if (Number(this.numToBuy) > 2) {
        this.multiplier = 2 * Number(this.numToBuy);
      } else {
        this.multiplier = Number(this.numToBuy);
      }
      this.totalPrice = (
        Number(this.numToBuy) * Number(this.contractPrice)
      ).toFixed(6);
    }
  }

  minus() {
    if (Number(this.numToBuy) != 1) {
      this.numToBuy = String(Number(this.numToBuy) - 1);
      if (Number(this.numToBuy) > 2) {
        this.multiplier = 2 * Number(this.numToBuy);
      } else {
        this.multiplier = Number(this.numToBuy);
      }
      this.totalPrice = (
        Number(this.numToBuy) * Number(this.contractPrice)
      ).toFixed(6);
    }
  }

  updatePrice(e: Event) {
    // without type info
    this.purchaseString = '';
    this.numToBuy = String(e);
    if (Number(this.numToBuy) > 2) {
      this.multiplier = 2 * Number(this.numToBuy);
    } else {
      this.multiplier = Number(this.numToBuy);
    }
    this.totalPrice = (
      Number(this.numToBuy) * Number(this.contractPrice)
    ).toFixed(6);
    if (Number(this.numToBuy) >= 51) {
      this.numToBuy = '0';
      this.totalPrice = '0';
      this.multiplier = 0;
    }
    if (isNaN(Number(this.totalPrice))) {
      this.numToBuy = '0';
      this.totalPrice = '0';
      this.multiplier = 0;
    }
  }

  async buy() {
    this.isLoading = true;
    try {
      const response = await fetch(
        `https://1mwe9uiok1.execute-api.us-east-1.amazonaws.com/proof/${this.userAddress[0]}`,
        {
          mode: 'cors',
        }
      );
      const body = await response.json();
      if(body.length==0){
        //You are not on whitelist.
        throw Error("Not on whitelist Bud.")
      }else{
        await ethContract.methods.mint(this.numToBuy).send({
          from: this.userAddress[0],
          value: Web3.utils.toWei(this.totalPrice, 'ether'),
        });
        this.getContent();
      }


      this.isLoading = false;
    } catch (e) {
      this.error = e.message;
      this.isLoading = false;
    }
  }
}
