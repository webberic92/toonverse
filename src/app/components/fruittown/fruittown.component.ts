import { Component, OnInit } from '@angular/core';
import fruitTown, {ProviderLessFTGContract} from "../../services/Solidity/fruitTown.service";
import $toonCoinContract from 'src/app/services/Solidity/$toon.service';
import { Web3Service } from "src/app/services/Web3/web3.service";
const Web3 = require('web3');

@Component({
  selector: 'app-fruittown',
  templateUrl: './fruittown.component.html',
  styleUrls: ['./fruittown.component.scss']
})
export class FruittownComponent implements OnInit {

  constructor(private web3: Web3Service) { }


  fruitTownAddress: string = "";
  userAddress: string = "";
  hasStakedAddressClaimed: boolean = true;
  dcFreeMintArray: number[] = [];
  cdStakedArray: any[] = new Array();
  dcFreeMintSelected: number =0;
  $toonInWallet:number = 0;
  // isPublicMintOpen: boolean = false;
  publicMintPrice: number = 0;
  publicMintAmountSelected: number = 0;
  publicMintPriceTotal: number = 0;
  priceOfContractToon: number =0;
  priceOfContractEth: number =0;
  isLoading: boolean = false;
  error: string = "";
  isMetaMaskConnected = false;
  doesUserHaveStakedNfts: boolean = false;
  ftgOwned: number = 0;
  async ngOnInit(): Promise<void> {
    // console.log(await this.web3.isConnected())
    //this.hasStakedAddressClaimed = await ProviderLessFTGContract.methods.hasStakerAddressFreeMinted(this.userAddress).call();

  }

  async getContent(){
    this.isLoading=true;
    this.fruitTownAddress = fruitTown._address;
    this.ftgOwned = await ProviderLessFTGContract.methods.balanceOf(this.userAddress).call();
    this.cdStakedArray =  await  $toonCoinContract.methods.getUsersStakedNfts(this.userAddress).call();
    this.$toonInWallet = await $toonCoinContract.methods.balanceOf(this.userAddress).call();
    this.publicMintPrice = Web3.utils.fromWei(await fruitTown.methods.mintCost().call());
    // console.log(this.cdStakedArray)
    // console.log(this.cdStakedArray)
    if(this.cdStakedArray.length > 0){
      this.doesUserHaveStakedNfts = true;
    }
    this.hasStakedAddressClaimed = await ProviderLessFTGContract.methods.hasStakerAddressFreeMinted(this.userAddress).call();
    this.priceOfContractEth = Web3.utils.fromWei(await ProviderLessFTGContract.methods.sellOwnerShipCostInEth().call(),"ether");
    this.priceOfContractToon = await ProviderLessFTGContract.methods.sellOwnerShipCostInToon().call();
    this.isLoading=false;

  }

async stakedAddressFreeMintClaim(){
this.error = "";
this.isLoading = true;
try{
  await fruitTown.methods.stakedAddressesFreeMint().send({
    from: this.userAddress
  });
  this.isLoading = false;
  this.error = "";
  this.getContent();
}
catch(e){
  console.log(e.message)
  this.error = e.message;
  this.isLoading = false;
}
  }


  clearError() {
    this.isLoading = false;
    this.error = "";
  }



  async connectMetaMask() {
    this.error = "";
    this.isLoading = true;
    this.error = "Login To MetaMask To Continue...";
 
    try {
      let array = await this.web3.getAccounts();
      this.userAddress =array[0];
      this.isLoading = false;
      this.isMetaMaskConnected = true;
      this.error = "";
      this.getContent();
    } catch (e) {
      console.log(e.message)
      this.error = e.message;
      this.isLoading = false;
    }
  }

  async mintWithEth(){
    this.error = "";
    this.isLoading = true;

    try{
      await  fruitTown.methods.mintForEth(this.publicMintAmountSelected ).send({
        from: this.userAddress,
        value: Web3.utils.toWei(this.publicMintPriceTotal.toString(), 'ether')
        });
      this.isLoading = false;
      this.error = "";
      this.getContent();
    }catch(e){
      console.log(e.message)
      this.error = e.message;
      this.isLoading = false;
    }


  }



  async becomeOwnerWithEth(){
    this.error = "";
    this.isLoading = true;

    try{
      await  fruitTown.methods.buyContractWithEth().send({
        from: this.userAddress,
        value: this.priceOfContractEth
      });
      this.isLoading = false;
      this.error = "";
      this.getContent();
    }catch(e){
      console.log(e.message)
      this.error = e.message;
      this.isLoading = false;
    }


  }

  async becomeOwnerWithToon(){
    this.error = "";
    this.isLoading = true;

    try{
      await $toonCoinContract.methods.approve(this.fruitTownAddress, this.priceOfContractToon).send({
        from: this.userAddress,
      })
      await  fruitTown.methods.buyContractWithTOON().send({
        from: this.userAddress,
      });
      this.isLoading = false;
      this.error = "";
      this.getContent();
    }catch(e){
      console.log(e.message)
      this.error = e.message;
      this.isLoading = false;
    }


  }

  updatePublicMintPrice(e: Event) {
    console.log(e)
    this.publicMintAmountSelected = Number(e);
    this.publicMintPriceTotal = parseFloat((this.publicMintPrice * this.publicMintAmountSelected).toFixed(2));
  }


}
