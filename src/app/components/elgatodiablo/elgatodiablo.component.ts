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

  isLoading: boolean = false;
  error: string = "";
  elGatoDiabloAddress: string = "";
  userAddress: string = "";
  $toonInWallet: number = 0;
  gatoDiabloOwned: number = 0;
  isPaused: boolean = true;


  //Costs
  publicMintPrice: number = 0;
  discountMintPrice: number = 0;
  toonMintCost: number = 0; //TOON

  //Selected
  toonMintAmountSelected: number = 2;
  ownersMintAmountSelected: number = 2;
  stakersMintAmountSelected: number = 1;
  publicMintAmountSelected: number = 1;
  //Totals
  publicMintTotalPrice: number = 0;
  ownersMintTotalPrice: number = 0;
  stakersMintTotalPrice: number = 0;
  toonMintTotalPrice: number = 0;

  isMetaMaskConnected = false;

  updateStakerMintPrice(e: Event) {
    this.stakersMintAmountSelected = Number(e);
    this.stakersMintTotalPrice = parseFloat(
      (this.discountMintPrice * this.stakersMintAmountSelected).toFixed(2)
    );
  }

  updatePublicMintPrice(e: Event) {
    this.publicMintAmountSelected = Number(e);
    this.publicMintTotalPrice = parseFloat(
      (this.publicMintPrice * this.publicMintAmountSelected).toFixed(2)
    );
  }

  updateStakersMintPrice(e: Event) {
    this.stakersMintAmountSelected = Number(e);
    this.stakersMintTotalPrice = parseFloat(
      (this.discountMintPrice * this.stakersMintAmountSelected).toFixed(2)
    );
  }

  updateOwnersMintPrice(e: Event) {
    this.ownersMintAmountSelected = Number(e);

    this.ownersMintTotalPrice = parseFloat(
      (this.discountMintPrice * this.ownersMintAmountSelected).toFixed(2)
    );
  }

  updateToonPrice(e: Event) {
    this.toonMintAmountSelected = Number(e);
    this.toonMintTotalPrice =
      this.toonMintCost * this.toonMintAmountSelected;
  }

  updatePublicToonPrice(e: Event) {
    this.toonMintAmountSelected = Number(e);
    this.stakersMintTotalPrice =
      this.toonMintCost * this.toonMintAmountSelected;
  }

  async getContent() {
    this.isLoading = true;
    this.elGatoDiabloAddress = elGatoDiablo._address;
    try {
      this.gatoDiabloOwned = await elGatoDiabloProviderLessContract.methods
        .balanceOf(this.userAddress)
        .call();

        this.isPaused = await elGatoDiabloProviderLessContract.methods.PAUSED().call()

      this.$toonInWallet = await $toonCoinContract.methods
        .balanceOf(this.userAddress)
        .call();

      this.publicMintPrice = Web3.utils.fromWei(
        await elGatoDiablo.methods.publicMintCost().call()
      );
      this.publicMintTotalPrice =
        this.publicMintPrice * this.publicMintAmountSelected;

      this.discountMintPrice = Web3.utils.fromWei(
        await elGatoDiablo.methods.discountedCost().call()
      );
      this.ownersMintTotalPrice =
        this.discountMintPrice * this.ownersMintAmountSelected;
      this.stakersMintTotalPrice =
        this.discountMintPrice * this.stakersMintAmountSelected;

      this.toonMintCost = await elGatoDiablo.methods.toonMintCost().call();
      this.toonMintTotalPrice = this.toonMintAmountSelected * this.toonMintCost;

      this.isLoading = false;
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
        .publicMint(this.publicMintAmountSelected)
        .send({
          from: this.userAddress,
          value: Web3.utils.toWei(
            this.publicMintTotalPrice.toString(),
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
