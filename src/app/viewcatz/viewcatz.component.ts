import { Component, OnInit } from "@angular/core";
import Web3 from 'web3';
import NFTContract from "../services/Solidity/nft.service";
import axios from 'axios';
@Component({
  selector: "app-viewcatz",
  templateUrl: "./viewcatz.component.html",
  styleUrls: ["./viewcatz.component.scss"],
})
export class ViewcatzComponent implements OnInit {
  contractOwner: any;
  constructor() {}
  tokenUri: string = "";
  searchedAddress: string = "";
  searchedId: number = 0;



  ngOnInit(): void {}

  searchByEthAddress() {
    console.log("Searching for " + this.searchedAddress);
  }

  updateSearchedAddress(e: Event) {
    this.searchedAddress = String(e);
    console.log(e);
  }

  updateSearchedID(e: Event) {
    if (Number(e)! >= 0 || Number(e) > 2222) {
      this.searchedId = Number(e);
      console.log("Good Number");
    } else {
      this.searchedId = 0;
    }
  }

  async searchById() {
    console.log("Searching for " + this.searchedId);
    if(this.searchedId != 0){
          this.tokenUri = await NFTContract.methods.tokenURI(this.searchedId).call();
          axios.get(this.tokenUri)
          .then((response) => {
            console.log(response)
          })
          .catch((err) => console.log(err))
    }


    console.log(" this.tokenUri for " +  this.tokenUri);

    //Need to query Contract for MetData.

    //API call metadatalink.

    //Display data.
  }



}
