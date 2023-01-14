import { Component, OnInit } from '@angular/core';
import fruitTown from "../../services/Solidity/fruitTown.service";
import {ProviderLessNftContract} from "../../services/Solidity/devilCatz.service";
import { Web3Service } from "src/app/services/Web3/web3.service";

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


  async ngOnInit(): Promise<void> {
    this.fruitTownAddress = fruitTown._address;
    let addressArray = await this.web3.getAccounts();
    this.userAddress = addressArray[0];
    console.log(this.userAddress)
    console.log( fruitTown.methods)

    this.hasStakedAddressClaimed = await fruitTown.methods.hasStakerAddressFreeMinted(this.userAddress).call();


    console.log(this.hasStakedAddressClaimed)

  }

  async stakedAddressFreeMintClaim(){

  await fruitTown.methods.stakedAddressesFreeMint().send({
    from: this.userAddress
  });

  }
}
