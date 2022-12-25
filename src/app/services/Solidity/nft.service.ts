import { Injectable } from '@angular/core';
const contract = require("./bep721/Abi.json");
const Web3 = require('web3');
//testNet
const provider = new Web3('https://mainnet.infura.io/v3/acec92755ab44329bf4ffd95280afa27');
@Injectable({
  providedIn: 'root'
})
export class NftService {

  constructor() { }
}

provider.eth.setProvider(Web3.givenProvider);


const NFTContract = new provider.eth.Contract(
  (contract.abi),
  '0xF989A42c03dB7a5EE0c6a6b0d0dD6329B096aDe6'
);


export default NFTContract;