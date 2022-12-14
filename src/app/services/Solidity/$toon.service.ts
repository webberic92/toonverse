import { Injectable } from '@angular/core';
const contract = require("../../../../solidity/coin/$toon.json");
const Web3 = require('web3');
//testNet
const provider = new Web3('https://mainnet.infura.io/v3/589e31a14b0c42b78400756b023d7894');
// const provider = new Web3('https://goerli.infura.io/v3/589e31a14b0c42b78400756b023d7894');
//Binanace test net

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  constructor() { }
}

provider.eth.setProvider(Web3.givenProvider);


const $toonCoinContract = new provider.eth.Contract(
  (contract),
  '0x61DED8A72cDc7762D159ab46bE880BE7127A2DeF' // Live $TOON contract MAIN NET
);


export default $toonCoinContract;
