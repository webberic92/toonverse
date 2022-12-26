import { Component, OnInit } from "@angular/core";
import Web3 from "web3";
import NFTContract from "../../services/Solidity/nft.service";
import axios from "axios";
import { clear } from "console";
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
  catObj: any = null;
  tokenJsonArray: any[] = new Array();
  ngOnInit(): void {}

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

  clearCatObj() {
    this.catObj = null;
    this.tokenJsonArray = new Array();
  }

  async searchById() {
    this.tokenJsonArray = new Array;
    this.catObj = null;
    if (this.searchedId != 0) {
      this.tokenUri = await NFTContract.methods
        .tokenURI(this.searchedId)
        .call();
      axios
        .get(this.tokenUri)
        .then((response) => {
          this.catObj = JSON.parse(JSON.stringify(response));

          // console.log(response);
          console.log(this.catObj);
        })
        .catch((err) => console.log(err));
    }

    // console.log(" this.tokenUri for " + this.tokenUri);

    //Need to query Contract for MetData.

    //API call metadatalink.

    //Display data.
  }

  async searchByEthAddress() {
    this.tokenJsonArray = new Array;
    this.catObj = null;
    if (this.searchedAddress != "") {
      //First get balance of.
      let usersBalanceOfNftTokens = await NFTContract.methods
        .balanceOf(this.searchedAddress)
        .call();

      for (let i = 0; i <= usersBalanceOfNftTokens - 1; i++) {
        //Then tokenOfOwnerByIndex
        let tokenOfOwnerByIndex = await NFTContract.methods
          .tokenOfOwnerByIndex(this.searchedAddress, i)
          .call();

        //Then tokenURI
        let tokenURI = await NFTContract.methods
          .tokenURI(tokenOfOwnerByIndex)
          .call();

        //get json
        axios
          .get(tokenURI)
          .then((response) => {
            this.tokenJsonArray.push(JSON.parse(JSON.stringify(response)));
          })
          .catch((err) => console.log(err));
      }
    }
  }
}
