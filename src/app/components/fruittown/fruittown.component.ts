import { Component, OnInit } from "@angular/core";
import fruitTown, {
  ProviderLessFTGContract,
} from "../../services/Solidity/fruitTown.service";
import $toonCoinContract from "src/app/services/Solidity/$toon.service";
import NFTContract, {
  ProviderLessNftContract,
} from "src/app/services/Solidity/devilCatz.service";
import { Web3Service } from "src/app/services/Web3/web3.service";
const Web3 = require("web3");

@Component({
  selector: "app-fruittown",
  templateUrl: "./fruittown.component.html",
  styleUrls: ["./fruittown.component.scss"],
})
export class FruittownComponent implements OnInit {
  constructor(private web3: Web3Service) {}

  fruitTownAddress: string = "";
  userAddress: string = "";
  hasStakedAddressClaimed: boolean = true;
  dcFreeMintArray: number[] = new Array();
  dcStakedArray: any[] = new Array();
  dcHaveNotClaimedArray = new Array();

  // dcArrayToMintFTGSelected: number[] = new Array
  dcUnstakedNumboerOf: number = 0;
  availabelDCMintsForFTG: number = 0;
  dcThatCanClaimFtgArray: any[] = new Array();
  dcThatCanClaimFtgSet = new Set<number>();
  stakedAddressFreeMintAmount: number = 10;
  dcFreeMintSelected: number = 0;
  publicFreeMintSelected: number = 0;
  $toonInWallet: number = 0;
  toonMintMultiplier: number = 0;
  toonMintAmountSelected: number = 0;
  toonMintPriceTotal: number = 0;
  publicMintPrice: number = 0;
  publicMintAmountSelected: number = 0;
  publicMintPriceTotal: number = 0;
  priceOfContractToon: number = 0;
  priceOfContractEth: number = 0;
  isLoading: boolean = false;
  error: string = "";
  isMetaMaskConnected = false;
  isContractForSaleEth = false;
  isContractForSaleToon = false;
  isFreeMintOpen = false;
  hasPublicAddressFreeMinted = false;
  freeMintAmount = 0;
  doesUserHaveStakedNfts: boolean = false;
  ftgOwned: number = 0;
  async ngOnInit(): Promise<void> {}

  async getContent() {
    this.isLoading = true;
    this.dcHaveNotClaimedArray = new Array();
    this.fruitTownAddress = fruitTown._address;
    try {
      this.ftgOwned = await ProviderLessFTGContract.methods
        .balanceOf(this.userAddress)
        .call();

      this.$toonInWallet = await $toonCoinContract.methods
        .balanceOf(this.userAddress)
        .call();
      this.publicMintPrice = Web3.utils.fromWei(
        await fruitTown.methods.mintCost().call()
      );
      this.toonMintMultiplier = await ProviderLessFTGContract.methods
        .toonMintMultiplier()
        .call();


      this.hasStakedAddressClaimed = await ProviderLessFTGContract.methods
        .hasStakerAddressFreeMinted(this.userAddress)
        .call();
      this.priceOfContractEth = Web3.utils.fromWei(
        await ProviderLessFTGContract.methods.sellOwnerShipCostInEth().call(),
        "ether"
      );
      this.priceOfContractToon = await ProviderLessFTGContract.methods
        .sellOwnerShipCostInToon()
        .call();


        this.isContractForSaleEth = await ProviderLessFTGContract.methods.isContractForEthSale().call();
        this.isContractForSaleToon =await ProviderLessFTGContract.methods.isContractForToonSale().call();


      this.isFreeMintOpen = await ProviderLessFTGContract.methods.isFreeMintOpen().call();
       this.hasPublicAddressFreeMinted = await ProviderLessFTGContract.methods.hasPublicAddressMinted(this.userAddress).call();
       this.freeMintAmount = await ProviderLessFTGContract.methods.freeMintAmount().call();




      this.dcStakedArray = await $toonCoinContract.methods
        .getUsersStakedNfts(this.userAddress)
        .call();

      this.dcStakedArray.forEach(async (value) => {
        let b = await fruitTown.methods.hasCatFreeMinted(value).call();
        if (!b) {
          this.dcHaveNotClaimedArray.push(value);
        }
      });

      this.dcUnstakedNumboerOf = await ProviderLessNftContract.methods
        .balanceOf(this.userAddress)
        .call();

      for (let i = 0; i < this.dcUnstakedNumboerOf; i++) {
        let tokenID = await ProviderLessNftContract.methods
          .tokenOfOwnerByIndex(this.userAddress, i)
          .call();

        let b = await fruitTown.methods.hasCatFreeMinted(tokenID).call();
        if (!b) {
          this.dcHaveNotClaimedArray.push(tokenID);
        }
      }


      if (this.dcStakedArray.length > 0) {
        this.doesUserHaveStakedNfts = true;
      }
      this.isLoading = false;
    } catch (e) {
      console.log(e.message);
      this.error = e.message;
      this.isLoading = false;
    }
  }

  async setdcThatCanClaimFtgSet(n: number) {
    this.dcThatCanClaimFtgSet.add(n);
  }

  async stakedAddressFreeMintClaim() {
    this.error = "";
    this.isLoading = true;
    try {
      await fruitTown.methods.stakedAddressesFreeMint().send({
        from: this.userAddress,
      });
      this.isLoading = false;
      this.error = "";
      this.getContent();
    } catch (e) {
      console.log(e.message);
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
      this.userAddress = array[0];
      this.isLoading = false;
      this.isMetaMaskConnected = true;
      this.error = "";
      this.getContent();
    } catch (e) {
      console.log(e.message);
      this.error = e.message;
      this.isLoading = false;
    }
  }

  async mintWithEth() {
    this.error = "";
    this.isLoading = true;

    try {
      await fruitTown.methods.mintForEth(this.publicMintAmountSelected).send({
        from: this.userAddress,
        value: Web3.utils.toWei(this.publicMintPriceTotal.toString(), "ether"),
      });
      this.isLoading = false;
      this.error = "";
      this.getContent();
    } catch (e) {
      console.log(e.message);
      this.error = e.message;
      this.isLoading = false;
    }
  }

  async mintWithToon() {
    this.error = "";
    this.isLoading = true;

    try {
      await $toonCoinContract.methods
        .approve(this.fruitTownAddress, this.toonMintAmountSelected)
        .send({
          from: this.userAddress,
        });
      await fruitTown.methods.mintWithToon(this.toonMintAmountSelected).send({
        from: this.userAddress,
        value: this.toonMintAmountSelected,
      });
      this.isLoading = false;
      this.error = "";
      this.getContent();
    } catch (e) {
      console.log(e.message);
      this.error = e.message;
      this.isLoading = false;
    }
  }

  async mintWithDevilCat() {
    this.isLoading = true;

    let tempArray = this.dcHaveNotClaimedArray.slice(
      0,
      this.dcFreeMintSelected
    );
    console.log(tempArray);
    try {
      await fruitTown.methods.catFreeMint(tempArray).send({
        from: this.userAddress,
      });
      this.isLoading = false;
      this.error = "";
      this.getContent();
    } catch (e) {
      console.log(e.message);
      this.error = e.message;
      this.isLoading = false;
    }
  }

  async freeMint() {
    this.isLoading = true;


    try {
      await fruitTown.methods.freeMint(this.publicFreeMintSelected).send({
        from: this.userAddress,
        value: 0
      });
      this.isLoading = false;
      this.error = "";
      this.getContent();
    } catch (e) {
      console.log(e.message);
      this.error = e.message;
      this.isLoading = false;
    }
  }

  async becomeOwnerWithEth() {
    this.error = "";
    this.isLoading = true;

    try {
      await fruitTown.methods.buyContractWithEth().send({
        from: this.userAddress,
        value: Web3.utils.toWei(this.priceOfContractEth),
      });
      this.isLoading = false;
      this.error = "";
      this.getContent();
    } catch (e) {
      console.log(e.message);
      this.error = e.message;
      this.isLoading = false;
    }
  }

  // Web3.utils.fromWei(
  //   await fruitTown.methods.mintCost().call()
  // );

  async becomeOwnerWithToon() {
    this.error = "";
    this.isLoading = true;

    try {
      await $toonCoinContract.methods
        .approve(this.fruitTownAddress, this.priceOfContractToon)
        .send({
          from: this.userAddress,
        });
      await fruitTown.methods.buyContractWithTOON().send({
        from: this.userAddress,
      });
      this.isLoading = false;
      this.error = "";
      this.getContent();
    } catch (e) {
      console.log(e.message);
      this.error = e.message;
      this.isLoading = false;
    }
  }

  updatePublicMintPrice(e: Event) {
    this.publicMintAmountSelected = Number(e);
    this.publicMintPriceTotal = parseFloat(
      (this.publicMintPrice * this.publicMintAmountSelected).toFixed(2)
    );
  }

  updatePublicToonPrice(e: Event) {
    this.toonMintAmountSelected = Number(e);
    this.toonMintPriceTotal =
      this.toonMintMultiplier * this.toonMintAmountSelected;
  }

  updateDcMintFtgAmount(e: Event) {
    this.dcFreeMintSelected = Number(e);
  } 
   updatepublicMintFtgAmount(e: Event) {
    this.publicFreeMintSelected = Number(e);
  }
  // updateCatClaimArraySelect(e: Event) {
  //   this.toonMintAmountSelected = Number(e);
  //   this.toonMintPriceTotal = this.toonMintMultiplier * this.toonMintAmountSelected;
  // }
}
