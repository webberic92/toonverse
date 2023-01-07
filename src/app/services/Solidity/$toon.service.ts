import { Injectable } from '@angular/core';
const contract = require("../../../../solidity/coin/$toon.json");
const Web3 = require('web3');
//testNet
// const provider = new Web3('https://mainnet.infura.io/v3/589e31a14b0c42b78400756b023d7894');
const provider = new Web3('https://goerli.infura.io/v3/589e31a14b0c42b78400756b023d7894');
//Binanace test net

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor() { }
}

provider.eth.setProvider(Web3.givenProvider);


const erc721aContract = new provider.eth.Contract(
  (contract),
  '0x128e72Ab8F91F6cdf7535BbCF0C4cD0A5c6495c7'
);


export default erc721aContract;
