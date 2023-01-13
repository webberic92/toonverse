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

  approvedForAll: boolean = false;
  userAddress: string = "";
  tokenUri: string = "";
  searchedId: number = 0;
  catObj: any = null;
  unstakedJsonArray: any[] = new Array();
  stakedJsonMap = new Map();
  isConnected: boolean = false;

  constructor(private web3: Web3Service) {
    // setInterval(() => { this.updateRewards() }, 30000);
  }

  async ngOnInit() {
    // this.getContent();
  }

  async getContent() {
    this.erc721StakedSelectToUnStake = new Map();
    this.erc721OwnedSelectedToStake = new Set();
    this.isLoading = true;
    this.unstakedJsonArray = [];
    this.stakedJsonMap.clear;
    this.erc20Unclaimed = 0;
    this.erc20Owned = 0;
    let addressArray = await this.web3.getAccounts();
    this.userAddress = addressArray[0];
    this.getUnstakedNfts();
    this.getStakedNfts();
    this.erc20Unclaimed = await $toonCoinContract.methods
      .potentialAllStakedNftReward(addressArray[0])
      .call();
    this.erc20Owned = await $toonCoinContract.methods
      .balanceOf(addressArray[0])
      .call();
    this.isLoading = false;
    this.approvedForAll = await this.isApprovedForAll();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  async connectAndGetStats() {
    this.isLoading = true;
    try {
      let addressArray = await this.web3.getAccounts();
      console.log(addressArray);
      this.getContent();

      this.isLoading = false;
    } catch (e) {
      this.isLoading = false;
    }
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

  async updateErc20Unclaimed(nftReward: number) {
    this.erc20Unclaimed = +nftReward;
    return this.erc20Unclaimed;
  }

  async getUnstakedNfts() {
    this.catObj = null;

    let usersBalanceOfNftTokens = await devilcatNFTContract.methods
      .balanceOf(this.userAddress)
      .call();

    for (let i = 0; i <= usersBalanceOfNftTokens - 1; i++) {
      let tokenOfOwnerByIndex = await devilcatNFTContract.methods
        .tokenOfOwnerByIndex(this.userAddress, i)
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
      .getUsersStakedNfts(this.userAddress)
      .call();

    for (let i = 0; i <= userStakedNftIDsArray.length - 1; i++) {
      let tokenURI = await devilcatNFTContract.methods
        .tokenURI(userStakedNftIDsArray[i])
        .call();
      //get json
      await axios
        .get(tokenURI)
        .then(async (response) => {
          //get Reward for individual cat
          let rewards = await $toonCoinContract.methods
            .potentialStakedNftReward(
              this.userAddress,
              userStakedNftIDsArray[i]
            )
            .call();
          response.data.rewards = Number(rewards);
          // this.erc20Unclaimed += response.data.rewards;
          this.stakedJsonMap.set(
            response.data.edition,
            JSON.parse(JSON.stringify(response))
          );
        })
        .catch((err) => console.log(err));
    }
  }

  async isApprovedForAll() {
    console.log($toonCoinContract._address)
    let b = await devilcatNFTContract.methods
      .isApprovedForAll(
        this.userAddress,
        $toonCoinContract._address
      )
      .call();
    return b;
  }

  // async setapprovedForAll(){
  //   this.approvedForAll = await devilcatNFTContract.methods.isApprovedForAll("")

  // }

  async setApprovedForAll(b: boolean) {
    console.log($toonCoinContract._address)
    try {
      await devilcatNFTContract.methods
        .setApprovalForAll($toonCoinContract._address, b)
        .send({
          from: this.userAddress,
        });
    } catch (e) {
      console.log(e);
    }
  }

  async setApprovedForAllWithRefresh(b: boolean) {
    this.isLoading = true;
    try {
      await devilcatNFTContract.methods
        .setApprovalForAll($toonCoinContract._contractAddress, b)
        .send({
          from: this.userAddress,
        });
    } catch (e) {
      console.log(e);
    }
    this.isLoading = false;
    this.getContent();
  }

  async stakeSingleNft(id: number) {
    this.isLoading = true;

    try {
      if (!this.approvedForAll) {
        await this.setApprovedForAll(true);
      }
      await $toonCoinContract.methods.stakeNft(id).send({
        from: this.userAddress,
      });
      this.isLoading = false;
      this.getContent();
    } catch (e) {
      this.isLoading = false;
      this.getContent();
    }
  }

  async stakeSelectedNfts() {
    this.isLoading = true;

    try {
      if (!this.approvedForAll) {
        await this.setApprovedForAll(true);
      }

      await $toonCoinContract.methods
        .stakeMultipleNfts(Array.from(this.erc721OwnedSelectedToStake))
        .send({
          from: this.userAddress,
        });
      this.isLoading = false;
      this.getContent();
    } catch (e) {
      console.log(e);
      this.isLoading = false;
      this.getContent();
    }
  }

  async stakeAllNfts() {
    this.isLoading = true;

    try {
      let tempArray = new Array();
      for (let nft of this.unstakedJsonArray) {
        tempArray.push(nft.data.edition);
      }

      if (!this.approvedForAll) {
        await this.setApprovedForAll(true);
      }

      await $toonCoinContract.methods
        .stakeMultipleNfts(Array.from(tempArray))
        .send({
          from: this.userAddress,
        });
      this.isLoading = false;
      this.getContent();
    } catch (e) {
      this.isLoading = false;
      this.getContent();
    }
  }

  async collectAllRewards() {
    this.isLoading = true;
    let nftIdArray = await $toonCoinContract.methods
      .getUsersStakedNfts(this.userAddress)
      .call();
    console.log(nftIdArray);
    try {
      await $toonCoinContract.methods
        .collectMultipleStakedNftReward(nftIdArray)
        .send({
          from: this.userAddress,
        });
      this.isLoading = false;
      this.getContent();
    } catch (e) {
      this.isLoading = false;
      this.getContent();
    }
  }

  async collectNftReward(id: Number) {
    this.isLoading = true;
    try {
      await $toonCoinContract.methods
        .collectStakedNftReward(this.userAddress, id)
        .send({
          from: this.userAddress,
        });
      this.isLoading = false;
      this.getContent();
    } catch (e) {
      this.isLoading = false;
      this.getContent();
    }
  }

  async collectSelectedRewards() {
    this.isLoading = true;

    try {
      let ids = [];

      for (let key of this.erc721StakedSelectToUnStake.keys()) {
        ids.push(key);
      }

      console.log(ids);
      await $toonCoinContract.methods.collectMultipleStakedNftReward(ids).send({
        from: this.userAddress,
      });
      this.isLoading = false;
      this.getContent();
    } catch (e) {
      this.isLoading = false;
      this.getContent();
    }
  }

  async unstakeAllNfts() {
    this.isLoading = true;

    try {
      let nftIdArray = await $toonCoinContract.methods
        .getUsersStakedNfts(this.userAddress)
        .call();
      await $toonCoinContract.methods.removeMultipleStakedNft(nftIdArray).send({
        from: this.userAddress,
      });
      this.isLoading = false;
      this.getContent();
    } catch (e) {
      this.isLoading = false;
      this.getContent();
    }
  }

  async unstakeNft(id: Number) {
    this.isLoading = true;

    try {
      await $toonCoinContract.methods.removeStakedNft(id).send({
        from: this.userAddress,
      });
      this.isLoading = false;
      this.getContent();
    } catch (e) {
      this.isLoading = false;
      this.getContent();
    }
  }

  async unstakeMultipleNfts() {
    this.isLoading = true;

    try {
      let ids = [];

      for (let key of this.erc721StakedSelectToUnStake.keys()) {
        ids.push(key);
      }

      await $toonCoinContract.methods.removeMultipleStakedNft(ids).send({
        from: this.userAddress,
      });
      this.isLoading = false;
      this.getContent();
    } catch (e) {
      this.isLoading = false;
      this.getContent();
    }
  }
}
