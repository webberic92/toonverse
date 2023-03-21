import { Injectable } from '@angular/core';
const contract = require("../../../../solidity/nft/devilcatznft/devilcatz.json");
const Web3 = require('web3');
//testNet
// const provider = new Web3('https://goerli.infura.io/v3/589e31a14b0c42b78400756b023d7894');
// const provider2 = new Web3('https://goerli.infura.io/v3/589e31a14b0c42b78400756b023d7894');

// const provider = new Web3('https://mainnet.infura.io/v3/589e31a14b0c42b78400756b023d7894');
// const provider2 = new Web3('https://mainnet.infura.io/v3/589e31a14b0c42b78400756b023d7894');
const provider = new Web3('https://eth-mainnet.g.alchemy.com/v2/ywlZhEbWT0TwK8e53YBtJBXf3xONC2qt');
const provider2 = new Web3('https://eth-mainnet.g.alchemy.com/v2/ywlZhEbWT0TwK8e53YBtJBXf3xONC2qt');
@Injectable({
  providedIn: 'root'
})
export class NftService {

  constructor() {

   }
}


const contractAddress = "0x1c4a28690482b03F6991C8c24295016cba197C12"; // Live Devil Catz NFT  Contract
// const contractAddress = "0x9a59A4615B8fD0463d5fc403fE10a2a6bb582f97" // goeril cat test nft
export const ProviderLessNftContract = new provider2.eth.Contract(contract, contractAddress);


provider.eth.setProvider(Web3.givenProvider);
const NFTContract = new provider.eth.Contract(
  (contract),
  contractAddress
);


export default NFTContract;