import { Component, OnInit } from "@angular/core";
import elGatoDiablo, {
  elGatoDiabloProviderLessContract,
} from "../../services/Solidity/elGatoDiablo.service";
import $toonCoinContract from "src/app/services/Solidity/$toon.service";
import NFTContract, {
  ProviderLessNftContract,
} from "src/app/services/Solidity/devilCatz.service";
import { Web3Service } from "src/app/services/Web3/web3.service";
const Web3 = require("web3");

@Component({
  selector: "app-elgatodiablo",
  templateUrl: "./elgatodiablo.component.html",
  styleUrls: ["./elgatodiablo.component.scss"],
})
export class ElGatoDiabloComponent implements OnInit {
  constructor(private web3: Web3Service) {}
  async ngOnInit(): Promise<void> {}

  elGatoDiabloAddress: string = "";
  userAddress: string = "";
  // hasStakedAddressClaimed: boolean = true;
  // dcFreeMintArray: number[] = new Array();
  // dcStakedArray: any[] = new Array();
  // dcHaveNotClaimedArray = new Array();

  toonMintAmountSelected: number = 0;
  publicFreeMintSelected: number = 0;
  publicMintAmountSelected: number = 0;

  dcUnstakedNumboerOf: number = 0;
  availabelDCMintsForFTG: number = 0;
  dcThatCanClaimFtgArray: any[] = new Array();
  dcThatCanClaimFtgSet = new Set<number>();
  stakedAddressFreeMintAmount: number = 10;
  dcFreeMintSelected: number = 0;
  $toonInWallet: number = 0;
  toonMintMultiplier: number = 0;
  toonMintPriceTotal: number = 0;
  publicMintPrice: number = 0;
  publicMintPriceTotal: number = 0;
  publicOwnersPriceTotal: number = 0;

  isLoading: boolean = false;
  error: string = "";
  isMetaMaskConnected = false;
  isContractForSaleEth = false;
  isContractForSaleToon = false;
  isFreeMintOpen = false;
  hasPublicAddressFreeMinted = false;
  freeMintAmount = 0;
  doesUserHaveStakedNfts: boolean = false;
  gatoDiabloOwned: number = 0;


  updatePublicMintPrice(e: Event) {
    this.publicMintAmountSelected = Number(e);
    this.publicMintPriceTotal = parseFloat(
      (this.publicMintPrice * this.publicMintAmountSelected).toFixed(2)
    );
  }

  updateOwnersMintPrice(e: Event) {
    this.publicMintAmountSelected = Number(e);
    this.publicMintPriceTotal = parseFloat(
      (this.publicOwnersPriceTotal * this.publicMintAmountSelected).toFixed(2)
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


  async getContent() {
    this.isLoading = true;
    this.elGatoDiabloAddress = elGatoDiablo._address;
    try {
      this.gatoDiabloOwned = await elGatoDiabloProviderLessContract.methods
        .balanceOf(this.userAddress)
        .call();

      this.$toonInWallet = await $toonCoinContract.methods
        .balanceOf(this.userAddress)
        .call();
      this.publicMintPrice = Web3.utils.fromWei(
        await elGatoDiablo.methods.publicMintCost().call()
      );
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
      await elGatoDiablo.methods.stakedAddressesFreeMint().send({
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
      await elGatoDiablo.methods
        .mintForEth(this.publicMintAmountSelected)
        .send({
          from: this.userAddress,
          value: Web3.utils.toWei(
            this.publicMintPriceTotal.toString(),
            "ether"
          ),
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
        .approve(this.elGatoDiabloAddress, this.toonMintAmountSelected)
        .send({
          from: this.userAddress,
        });
      await elGatoDiablo.methods
        .mintWithToon(this.toonMintAmountSelected)
        .send({
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

  // async mintWithDevilCat() {
  //   this.isLoading = true;

  //   let tempArray = this.dcHaveNotClaimedArray.slice(
  //     0,
  //     this.dcFreeMintSelected
  //   );
  //   console.log(tempArray);
  //   try {
  //     await elGatoDiablo.methods.catFreeMint(tempArray).send({
  //       from: this.userAddress,
  //     });
  //     this.isLoading = false;
  //     this.error = "";
  //     this.getContent();
  //   } catch (e) {
  //     console.log(e.message);
  //     this.error = e.message;
  //     this.isLoading = false;
  //   }
  // }

}
