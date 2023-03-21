import { Injectable } from '@angular/core';
const contract = require("../../../../solidity/nft/fruittowngremlinzwtfruit/fruittown.json");
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


const contractAddress = "0xD2EBB721397c9278A5921741f9f53cEF74BeAdF0"; // Live fruit town NFT  Contract
// const contractAddress = "0x85c25e452B12848E892F591785E6a877D0167Fb3"; // goerli fruit town NFT  Contract
export const ProviderLessFTGContract = new provider2.eth.Contract(contract, contractAddress);


provider.eth.setProvider(Web3.givenProvider);
const fruitTown = new provider.eth.Contract(
  (contract),
  contractAddress
);


export default fruitTown;