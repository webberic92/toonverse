import { Injectable } from '@angular/core';
const contract = require("./bep20/Abi.json");
const Web3 = require('web3');
//testNet
const provider = new Web3('https://mainnet.infura.io/v3/589e31a14b0c42b78400756b023d7894');
//Binanace test net
//const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor() { }
}

provider.eth.setProvider(Web3.givenProvider);


const erc721aContract = new provider.eth.Contract(
  (contract.abi),
  '0x1c4a28690482b03f6991c8c24295016cba197c12'
);


export default erc721aContract;
