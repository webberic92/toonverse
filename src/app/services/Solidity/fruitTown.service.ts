import { Injectable } from '@angular/core';
const contract = require("../../../../solidity/nft/fruittowngremlinzwtfruit/fruittown.json");
const Web3 = require('web3');
//testNet
const provider = new Web3('https://goerli.infura.io/v3/589e31a14b0c42b78400756b023d7894');
const provider2 = new Web3('https://goerli.infura.io/v3/589e31a14b0c42b78400756b023d7894');

// const provider = new Web3('https://mainnet.infura.io/v3/589e31a14b0c42b78400756b023d7894');
// const provider2 = new Web3('https://mainnet.infura.io/v3/589e31a14b0c42b78400756b023d7894');

@Injectable({
  providedIn: 'root'
})
export class NftService {

  constructor() {

   }
}


// const contractAddress = "0x1c4a28690482b03F6991C8c24295016cba197C12"; // Live fruit town NFT  Contract
const contractAddress = "0x51C2612b7518E6359019E9f9Dd8361E61973c920"; // goerli fruit town NFT  Contract
export const ProviderLessFTGContract = new provider2.eth.Contract(contract, contractAddress);


provider.eth.setProvider(Web3.givenProvider);
const fruitTown = new provider.eth.Contract(
  (contract),
  contractAddress
);


export default fruitTown;