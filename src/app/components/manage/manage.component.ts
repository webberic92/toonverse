import { Component, OnInit } from "@angular/core";
import Web3 from "web3";
import { Web3Service } from "src/app/services/Web3/web3.service";
import devilcatNFTContract from "src/app/services/Solidity/devilCatz.service";
import $toonCoinContract from "src/app/services/Solidity/$toon.service";
import axios from "axios";

@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.scss"],
})
export class ManageComponent implements OnInit {
  // tokensOwned: string = ''
  // tokensStaked: string = ''
  erc721Owned: number = 0;
  erc721OwnedSelectedToStake = new Set();

  erc721Staked: number = 0;
  erc721StakedSelectToUnStake = new Map();
  erc721CurrentlyStaked = new Map();

  erc20Owned: number = 0;
  erc20Unclaimed: number = 0;
  erc20UnclaimedSelected: number = 0;

  isLoading: boolean = false;
  intervalId!: number;
  tempNftReward: number = 0;

  userAddress: string = "0x75939FA0D2F41542F5e8634ce88E2aE9bFD48767";
  tokenUri: string = "";
  searchedAddress: string = "0x75939FA0D2F41542F5e8634ce88E2aE9bFD48767";
  searchedId: number = 0;
  catObj: any = null;
  unstakedJsonArray: any[] = new Array();
  stakedJsonMap = new Map();

  constructor(private web3: Web3Service) {
    // setInterval(() => { this.updateRewards() }, 30000);
  }

  async ngOnInit() {
    // this.getContent()
    this.getUnstakedNfts();
    this.getStakedNfts();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  updateCatsToStakeMap(id: number) {
    if (!this.erc721OwnedSelectedToStake.has(id)) {
      this.erc721OwnedSelectedToStake.add(id);
    } else {
      this.erc721OwnedSelectedToStake.delete(id);
    }
  }

  updateCatsToUnstakeMap(id: number) {
    if (!this.erc721StakedSelectToUnStake.has(id)) {
      this.erc721StakedSelectToUnStake.set(
        id,
        this.stakedJsonMap.get(id).data.rewards
      );
    } else {
      this.erc721StakedSelectToUnStake.delete(id);
    }

    var amount = 0;
    this.erc721StakedSelectToUnStake.forEach((value: number, key: string) => {
      amount += value;
    });
    this.erc20UnclaimedSelected = amount;
  }

  updateStakedMap(id: number) {
    if (!this.erc721CurrentlyStaked.has(id)) {
      this.erc721CurrentlyStaked.set(id, Math.floor(Math.random() * 10));
    } else {
      this.erc721CurrentlyStaked.delete(id);
    }
  }

  //  getStakedNftReward(){
  //   this.tempNftReward = Math.floor(Math.random() * 10);
  //   //update totals
  //   this.tempNftReward
  // }

  // async updateErc20Unclaimed(nftReward: number){
  //   this.erc20Unclaimed =+ nftReward;
  //   return this.erc20Unclaimed;
  // }

  async getUnstakedNfts() {
    this.catObj = null;

    let usersBalanceOfNftTokens = await devilcatNFTContract.methods
      .balanceOf(this.searchedAddress)
      .call();

    for (let i = 0; i <= usersBalanceOfNftTokens - 1; i++) {
      let tokenOfOwnerByIndex = await devilcatNFTContract.methods
        .tokenOfOwnerByIndex(this.searchedAddress, i)
        .call();

      let tokenURI = await devilcatNFTContract.methods
        .tokenURI(tokenOfOwnerByIndex)
        .call();
      //get json
      await axios
        .get(tokenURI)
        .then((response) => {
          this.unstakedJsonArray.push(JSON.parse(JSON.stringify(response)));
        })
        .catch((err) => console.log(err));
    }
  }

  async getStakedNfts() {
    this.catObj = null;

    let userStakedNftIDsArray = await $toonCoinContract.methods
      .getUsersStakedNfts(this.searchedAddress)
      .call();

    for (let i = 0; i <= userStakedNftIDsArray.length - 1; i++) {
      // let tokenOfOwnerByIndex = await devilcatNFTContract.methods
      //   .tokenOfOwnerByIndex(this.searchedAddress, i)
      //   .call();

      let tokenURI = await devilcatNFTContract.methods
        .tokenURI(userStakedNftIDsArray[i])
        .call();
      //get json
      await axios
        .get(tokenURI)
        .then(async (response) => {
          console.log(response);
          let rewards = await $toonCoinContract.methods
            .potentialStakedNftReward(
              this.userAddress,
              userStakedNftIDsArray[i]
            )
            .call();
          response.data.rewards = Number(rewards);
          this.stakedJsonMap.set(
            response.data.edition,
            JSON.parse(JSON.stringify(response))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  async stakeSelectedNfts() {
    await $toonCoinContract.methods
      .stakeMultipleNfts(Array.from(this.erc721OwnedSelectedToStake))
      .send({
        from: this.userAddress,
      });
  }

  async stakeAllNfts() {
    let tempArray = new Array();
    for (let nft of this.unstakedJsonArray) {
      
      tempArray.push(nft.data.edition);
    }
    await $toonCoinContract.methods
      .stakeMultipleNfts(Array.from(tempArray))
      .send({
        from: this.userAddress,
      });
  }
}
