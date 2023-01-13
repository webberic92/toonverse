import { Injectable } from '@angular/core';
const contract = require("./bep20/Abi.json");
const Web3 = require('web3');
//testNet
// const provider = new Web3('https://mainnet.infura.io/v3/589e31a14b0c42b78400756b023d7894');
const provider = new Web3('https://goerli.infura.io/v3/589e31a14b0c42b78400756b023d7894');
//Binanace test net
//const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor() { }
}

provider.eth.setProvider(Web3.givenProvider);

  // '0x61DED8A72cDc7762D159ab46bE880BE7127A2DeF' // Live $TOON contract MAIN NET

const $toonCoinContract = new provider.eth.Contract(
  (contract),
  "0x435dd9C7ADAcd74c666Cc00CD5Ca57452d1642B3"
);


export default $toonCoinContract;
