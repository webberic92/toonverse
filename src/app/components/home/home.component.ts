import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ethContract from 'src/app/services/Solidity/contract.service';
import Web3 from 'web3';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  contractName: string = '';
  totalSupply: number = 0;
  isLoading: boolean =false;
  userAddress: any;
  error: any;
  totalPrice: string = '';
  
  constructor() {
 


  }
  async ngOnInit(): Promise<void> {
   this.totalSupply= (await ethContract.methods.totalSupply().call() - 1)
console.log(this.totalSupply)
  }



}

