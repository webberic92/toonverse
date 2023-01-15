import { Component, OnInit } from "@angular/core";
import {ProviderLessNftContract} from "../../services/Solidity/devilCatz.service";
import {ProviderLessFTGContract} from "../../services/Solidity/fruitTown.service";
import axios from "axios";
@Component({
  selector: "app-viewcatz",
  templateUrl: "./viewcatz.component.html",
  styleUrls: ["./viewcatz.component.scss"],
})
export class ViewcatzComponent implements OnInit {
  viewDevilCatz: boolean = false
  viewFruitTown: boolean = false;
  contractOwner: any;
  constructor() {}
  tokenUri: string = "";
  searchedAddress: string = "";
  searchedId: number = 0;
  nftObj: any = null;
  tokenJsonArray: any[] = new Array();
  ngOnInit(): void {}

  updateSearchedAddress(e: Event) {
    this.searchedAddress = String(e);
  }

  updateSearchedID(e: Event) {
    if (Number(e)! >= 0 || Number(e) > 2222) {
      this.searchedId = Number(e);
    } else {
      this.searchedId = 0;
    }
  }

  clearnftObj() {
    this.nftObj = null;
    this.tokenJsonArray = new Array();
  }

  async searchById() {
    this.tokenJsonArray = new Array;
    this.nftObj = null;
    if (this.searchedId != 0) {
      this.tokenUri = await ProviderLessNftContract.methods
        .tokenURI(this.searchedId)
        .call();
      axios
        .get(this.tokenUri)
        .then((response) => {
          this.nftObj = JSON.parse(JSON.stringify(response));

          // console.log(response);

        })
        .catch((err) => console.log(err));
    }

  }

  async searchByIdFTG () {
    this.tokenJsonArray = new Array;
    this.nftObj = null;
    if (this.searchedId != 0) {
      this.tokenUri = await ProviderLessFTGContract.methods
        .tokenURI(this.searchedId)
        .call();
      axios
        .get(this.tokenUri)
        .then((response) => {
          this.nftObj = JSON.parse(JSON.stringify(response));

          // console.log(response);

        })
        .catch((err) => console.log(err));
    }

  }


  toggleViewDevilCatz() {
    this.viewDevilCatz = true;
  }

  toggleViewFtg() {
    this.viewFruitTown = true;
  }

  clear(){
    this.viewFruitTown = false;
    this.viewDevilCatz = false;

  }
  


  async searchByEthAddress() {
    this.tokenJsonArray = new Array;
    this.nftObj = null;
    if (this.searchedAddress != "") {
      //First get balance of.
      let usersBalanceOfNftTokens = await ProviderLessNftContract.methods
        .balanceOf(this.searchedAddress)
        .call();

      for (let i = 0; i <= usersBalanceOfNftTokens - 1; i++) {
        //Then tokenOfOwnerByIndex
        let tokenOfOwnerByIndex = await ProviderLessNftContract.methods
          .tokenOfOwnerByIndex(this.searchedAddress, i)
          .call();

        //Then tokenURI
        let tokenURI = await ProviderLessNftContract.methods
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

  async searchByEthAddressFTG() {
    this.tokenJsonArray = new Array;
    this.nftObj = null;
    if (this.searchedAddress != "") {
      //First get balance of.
      let usersBalanceOfNftTokens = await ProviderLessFTGContract.methods
        .balanceOf(this.searchedAddress)
        .call();

      for (let i = 0; i <= usersBalanceOfNftTokens - 1; i++) {
        //Then tokenOfOwnerByIndex
        let tokenOfOwnerByIndex = await ProviderLessFTGContract.methods
          .tokenOfOwnerByIndex(this.searchedAddress, i)
          .call();

        //Then tokenURI
        let tokenURI = await ProviderLessFTGContract.methods
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


