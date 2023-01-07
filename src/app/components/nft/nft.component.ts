import { Component, OnInit } from '@angular/core';
import nftContract from "src/app/services/Solidity/devilCatz.service"
import Web3 from 'web3';
import { Web3Service } from 'src/app/services/Web3/web3.service';
const provider = new Web3('https://mainnet.infura.io/v3/acec92755ab44329bf4ffd95280afa27');
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import bscContract from "src/app/services/Solidity/$toon.service"
@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss']
})
export class NFTComponent implements OnInit {

  tokensOwned: string = '0'
  tokensStaked: string = ''

  isLoading: boolean = false;
  userAddress: string = ''
  contractAddress: string = '**TBD**'
  contractOwner: string = ''
  contractName: string = ''
  contractSymbol: string = 'SIMON'
  userNFTs: number[] = []
  userStakedNFTs: number[] = []

  contractTotalSupply: string = ''
  contractPrice: string = '1'

  contractERC721Token: string = ''
  contractBnbBalance: string = '0'
  contractUtilityBalance: string = '0'
  nftsOwned: string = '0'

  numToBuy: string = '0';
  numToBuyWithToken: string = '0';

  totalPrice: string = '0';
  totalPriceWithToken: string = '0';

  purchaseString: string = ''
  error: string = ''
  jsonString$!: Observable<Object>;
  unstakedResponse: any;
  stakedResponse: any;

  unstakedNfts = new Map<number, any>();
  stakedNfts = new Map<number, any>();
  contractPriceInUtilityToken: string = '10000'
  erc20ContractSymbol: string = ''
  isRevealed: boolean = false
  isPaused: boolean = false
  setERC20Token: string = ''
  setERC20TokenBool: boolean = false;
  isERC20ApprovedForAll: boolean = false
  erc20ContractAddress: string = ''
  updateBnbPrice: string = '0'
  updateUtilityPrice: string = '0'
  withdrawalBNB: string = '0'
  withdrawalUtilityToken: string = '0'




  
  constructor(private web3: Web3Service, private http: HttpClient,) { }

  async ngOnInit(): Promise<any> {
    this.getContent()

  }

  async getContent() {
    this.error = ''

    // try {
    //   this.isLoading = true;   
    //   this.contractAddress = nftContract._address
    //   this.userAddress = await this.web3.getAccounts()
    //   this.userAddress = Web3.utils.toChecksumAddress(this.userAddress[0])
    //   this.tokensOwned = await bscContract.methods.balanceOf(this.userAddress).call()

    //   this.contractName = await nftContract.methods.name().call()
    //   this.contractSymbol = await nftContract.methods.symbol().call()
    //   this.erc20ContractSymbol = await bscContract.methods.symbol().call()
    //   this.erc20ContractAddress = await nftContract.methods.erc20Token().call()
    //   this.isPaused = await nftContract.methods.paused().call()
    //   this.contractOwner = await nftContract.methods.owner().call()
    //   this.contractUtilityBalance = await bscContract.methods.balanceOf(this.contractAddress).call()
    //   this.contractBnbBalance = Web3.utils.fromWei(await provider.eth.getBalance(this.contractAddress), 'ether')

    //   if (!this.isPaused) {
    //     this.isRevealed = await nftContract.methods.revealed().call()

    //     this.contractPrice = provider.utils.fromWei(await nftContract.methods.cost().call(), "ether")

    //     this.contractPriceInUtilityToken = await nftContract.methods.costInUtilityToken().call()


    //     this.nftsOwned = await nftContract.methods.balanceOf(this.userAddress).call()
    //     for (var i = 0; i < Number(this.nftsOwned); i++) {

    //       this.userNFTs.push(await nftContract.methods.tokenOfOwnerByIndex(this.userAddress, i).call())
    //     }
    //     let tokenURI = '';
    //     this.userNFTs.forEach(async (value) => {
    //       if (!this.isRevealed) {
    //         tokenURI = await nftContract.methods.notRevealedUri().call()
    //       } else {
    //         tokenURI = await nftContract.methods.tokenURI(value).call()


    //       }
    
    //       this.http.get<string>(tokenURI).subscribe((data: any) => {
    //         this.unstakedResponse = JSON.parse(JSON.stringify(data));
    //          this.unstakedResponse.id = value

       
    //         this.unstakedNfts.set(value, this.unstakedResponse)

    //       });

    //     });
    //     this.userStakedNFTs = await bscContract.methods.getUsersStakedNfts(this.userAddress).call()


    //     this.userStakedNFTs.forEach(async (id) => {
    //       if (!this.isRevealed) {
    //         tokenURI = await nftContract.methods.notRevealedUri().call()
    //       } else {
    //         tokenURI = await nftContract.methods.tokenURI(id).call()

    //       }

    //       this.http.get<string>(tokenURI).subscribe(async (data: any) => {
    //         let stakedNftReward = await bscContract.methods.potentialStakedNftReward(this.userAddress, id).call()

    //         this.stakedResponse = JSON.parse(JSON.stringify(data));
    //         this.stakedResponse.potentialReward = stakedNftReward
    //         this.stakedResponse.id = id

       

            

    //         this.stakedNfts.set(id, this.stakedResponse)
    //       });

    //     });
    //   }
    //   this.isLoading = false;



    // } catch (e) {
    //   this.error = e.message
    //   this.isLoading = false;

    // }




    //Fake data
        try {
      this.isLoading = true;   
      // 
      this.contractAddress = "**TBD**"
      // this.userAddress = await this.web3.getAccounts()
      // this.userAddress = Web3.utils.toChecksumAddress(this.userAddress[0])
      // this.tokensOwned = await bscContract.methods.balanceOf(this.userAddress).call()

      // this.contractName = await nftContract.methods.name().call()
      // this.contractSymbol = await nftContract.methods.symbol().call()
      // this.erc20ContractSymbol = await bscContract.methods.symbol().call()
      // this.erc20ContractAddress = await nftContract.methods.erc20Token().call()
      // this.isPaused = await nftContract.methods.paused().call()
      // this.contractOwner = await nftContract.methods.owner().call()
      // this.contractUtilityBalance = await bscContract.methods.balanceOf(this.contractAddress).call()
      // this.contractBnbBalance = Web3.utils.fromWei(await provider.eth.getBalance(this.contractAddress), 'ether')

      if (!this.isPaused) {
        console.log("TEST1")
        //  this.isRevealed = await nftContract.methods.revealed().call()

        // this.contractPrice = provider.utils.fromWei(await nftContract.methods.cost().call(), "ether")

        // this.contractPriceInUtilityToken = await nftContract.methods.costInUtilityToken().call()


        // this.nftsOwned = await nftContract.methods.balanceOf(this.userAddress).call()
        // for (var i = 0; i < Number(this.nftsOwned); i++) {

        //   this.userNFTs.push(await nftContract.methods.tokenOfOwnerByIndex(this.userAddress, i).call())
        // }
        // let tokenURI = '';
        // this.userNFTs.forEach(async (value) => {
        //   if (!this.isRevealed) {
        //     tokenURI = await nftContract.methods.notRevealedUri().call()
        //   } else {
        //     tokenURI = await nftContract.methods.tokenURI(value).call()


        //   }
    
        //   this.http.get<string>(tokenURI).subscribe((data: any) => {
let data = {
  "name": "Acoustic #7",
  "description": "A Sample collection of NFT's.",
  "image": "https://thebuddhainu.s3.amazonaws.com/simon_guitar.jpeg",
  "dna": "f8fd1aa0edb3e91b97ae74f0b53bc066c2aba172",
  "edition": 7,
  "date": 1650861425400,
  "attributes": [
    {
      "trait_type": "Background",
      "value": "Smoke Stage 4"
    },
    {
      "trait_type": "Gender",
      "value": "Male"
    },
    {
      "trait_type": "Robe",
      "value": "Brown"
    },
    {
      "trait_type": "Necklace",
      "value": " Brown Beads"
    },
    {
      "trait_type": "Midsection",
      "value": "Rope belt"
    },
    {
      "trait_type": "Floor",
      "value": "Wood"
    },
    {
      "trait_type": "Instrument",
      "value": "Guitar"
    }
  ],
  "compiler": "HashLips Art Engine"
}

            this.unstakedResponse = JSON.parse(JSON.stringify(data));
             this.unstakedResponse.id = 17

       
            this.unstakedNfts.set(17, this.unstakedResponse)

        //   });

        // });
        // this.userStakedNFTs = await bscContract.methods.getUsersStakedNfts(this.userAddress).call()


        // this.userStakedNFTs.forEach(async (id) => {
        //   if (!this.isRevealed) {
        //     tokenURI = await nftContract.methods.notRevealedUri().call()
        //   } else {
        //     tokenURI = await nftContract.methods.tokenURI(id).call()

        //   }

        //   this.http.get<string>(tokenURI).subscribe(async (data: any) => {
        //     let stakedNftReward = await bscContract.methods.potentialStakedNftReward(this.userAddress, id).call()
           data ={
            "name": "Rythm Section #12",
            "description": "A Sample collection of NFT's.",
            "image": "https://thebuddhainu.s3.amazonaws.com/tbi_Drum.jpeg",
            "dna": "f8fd1aa0edb3e91b97ae74f0b53bc066c2aba172",
            "edition": 12,
            "date": 1650861425400,
            "attributes": [
              {
                "trait_type": "Background",
                "value": "Smoke Stage 4"
              },
              {
                "trait_type": "Gender",
                "value": "Male"
              },
              {
                "trait_type": "Robe",
                "value": "Gold"
              },
              {
                "trait_type": "Necklace",
                "value": " Brown Beads"
              },
              {
                "trait_type": "Midsection",
                "value": "Belly"
              },
              {
                "trait_type": "Floor",
                "value": "Wood"
              },
              {
                "trait_type": "Instrument",
                "value": "Drums"
              }
            ],
            "compiler": "HashLips Art Engine"
          }
          
            this.stakedResponse = JSON.parse(JSON.stringify(data));
            console.log("TEST2 BEGIN")

            console.log(this.stakedResponse)
            console.log("TEST2 END")

            this.stakedResponse.potentialReward = 32
            this.stakedResponse.id = 1;

       

            

             this.stakedNfts.set(1, this.stakedResponse)
          // });

        // });
      }
      this.isLoading = false;



    } catch (e) {
      this.error = e.message
      this.isLoading = false;

    }
  }


  async mint() {
    this.error = ''

    try {
      this.isLoading = true;
      this.contractAddress = nftContract._address



      if (this.contractOwner == this.userAddress) {
        this.contractName = await nftContract.methods.mint(this.numToBuy).send({
          from: this.userAddress
        })
      } else {
        this.contractName = await nftContract.methods.mint(this.numToBuy).send({
          from: this.userAddress,
          value: provider.utils.toWei(this.totalPrice, "ether")
        })
      }

      this.isLoading = false
      this.getContent()
    } catch (e) {
      this.error = e.message
      this.isLoading = false;

    }
  }

  async setUpdateUtilPrice() {
    this.error = ''

    try {
      this.isLoading = true;

      await nftContract.methods.setCostInUtilityToken(this.updateUtilityPrice).send({
        from: this.userAddress

      })
      this.isLoading = false
      this.getContent()
    } catch (e) {
      this.error = e.message
      this.isLoading = false;

    }
  }

  async setUpdateBnbPrice() {
    this.error = ''

    try {
      this.isLoading = true;

      await nftContract.methods.setCost(provider.utils.toWei(this.updateBnbPrice, 'ether')).send({
        from: this.userAddress

      })
      this.isLoading = false
      this.getContent()
    } catch (e) {
      this.error = e.message
      this.isLoading = false;

    }
  }



  async mintWithUtilityToken() {
    this.error = ''

    try {
      this.isLoading = true;



      if (this.contractOwner == this.userAddress) {
        await nftContract.methods.mintWithUtilityToken(this.numToBuyWithToken).send({
          from: this.userAddress
        })
      } else {
        await bscContract.methods.approve(nftContract._address, this.totalPriceWithToken).send({
          from: this.userAddress
        })
        await nftContract.methods.mintWithUtilityToken(this.numToBuyWithToken).send({
          from: this.userAddress
        })
      }

      this.isLoading = false
      this.getContent()
    } catch (e) {
      this.error = e.message
      this.isLoading = false;

    }
  }




  async stake(id: any) {
    this.error = ''

    try {
      this.isLoading = true;
      let isApprovedForAll = await nftContract.methods.isApprovedForAll(this.userAddress, this.erc20ContractAddress).call()
      if (!isApprovedForAll) {
        await nftContract.methods.setApprovalForAll(this.erc20ContractAddress, true).send({
          from: this.userAddress
        })
      }
      await bscContract.methods.stakeNft(id).send({
        from: this.userAddress
      })
      this.unstakedNfts = new Map<number, any>();
      this.stakedNfts = new Map<number, any>();
      
      this.isLoading = false
      this.getContent()
    } catch (e) {
      this.error = e.message
      this.isLoading = false;

    }
  }

  async unstake(id: any) {
    this.error = ''

    try {
      this.isLoading = true;
      await bscContract.methods.removeStakedNft(id).send({
        from: this.userAddress
      })
      let userStakedNFTs = await bscContract.methods.getUsersStakedNfts(this.userAddress).call()
      if (userStakedNFTs.length! > 0) {
        await nftContract.methods.setApprovalForAll(this.erc20ContractAddress, false).send({
          from: this.userAddress
        })
      }
      this.unstakedNfts = new Map<number, any>();
      this.stakedNfts = new Map<number, any>();
      this.isLoading = false
      this.getContent()
    } catch (e) {
      this.error = e.message
      this.isLoading = false;

    }
  }


  async collectStakedNftReward(id: any) {
    this.error = ''

    try {
      this.isLoading = true;
      await bscContract.methods.collectStakedNftReward(this.userAddress, id).send({
        from: this.userAddress
      })
      this.isLoading = false
      this.getContent()
    } catch (e) {
      this.error = e.message
      this.isLoading = false;

    }
  }
  async collectAllStakedNftReward() {
    this.error = ''

    try {
      this.isLoading = true;
      await bscContract.methods.collectAllStakedNftReward(this.userAddress).send({
        from: this.userAddress
      })
      this.isLoading = false
      this.getContent()
    } catch (e) {
      this.error = e.message
      this.isLoading = false;

    }
  }


  setMintAmount(e: Event) { // without type info
    this.numToBuy = String(e);
    this.totalPrice = (Number(this.numToBuy) * Number(this.contractPrice)).toFixed(6)
    if (Number(this.numToBuy) >= 100000000000) {
      this.numToBuy = '0'
      this.totalPrice = '0'
    }
    if (isNaN(Number(this.totalPrice))) {
      this.numToBuy = '0';
      this.totalPrice = '0'
    }


  }

  setupdateBnbPrice(e: Event) { // without type info
    this.updateBnbPrice = String(e);

    if (isNaN(Number(this.updateBnbPrice))) {
      this.updateBnbPrice = '0';
    }


  }

  setupdateUtilityPrice(e: Event) { // without type info
    this.updateUtilityPrice = String(e);

    if (isNaN(Number(this.updateUtilityPrice))) {
      this.updateUtilityPrice = '0';
    }


  }


  setMintAmountWithToken(e: Event) {
    this.numToBuyWithToken = String(e);
    this.totalPriceWithToken = (Number(this.numToBuyWithToken) * Number(this.contractPriceInUtilityToken)).toFixed(0)
    if (Number(this.numToBuyWithToken) >= 100000000000) {
      this.numToBuyWithToken = '0'
      this.totalPriceWithToken = '0'
    }
    if (isNaN(Number(this.totalPriceWithToken))) {
      this.numToBuyWithToken = '0';
      this.totalPriceWithToken = '0'
    }


  }

  async setPaused(b: boolean) {
    this.error = ''

    try {
      this.isLoading = true;
      await nftContract.methods.setPaused(b).send({
        from: this.userAddress
      })
      this.unstakedNfts = new Map<number, any>();
      this.stakedNfts = new Map<number, any>();
      this.isLoading = false
      this.getContent()
    } catch (e) {
      this.error = e.message
      this.isLoading = false;

    }
  }

  async setRevealed(b: boolean) {
    this.error = ''

    try {
      this.isLoading = true;
      await nftContract.methods.setRevealed(b).send({
        from: this.userAddress
      })
      this.unstakedNfts = new Map<number, any>();
      this.stakedNfts = new Map<number, any>();
      this.isLoading = false
      this.getContent()
    } catch (e) {
      this.error = e.message
      this.isLoading = false;

    }
  }
  async setErc20address() {
    try {
      this.isLoading = true;
      await nftContract.methods.setErc20address(this.setERC20Token).send({
        from: this.userAddress
      })
      this.getContent()
      this.isLoading = false;
    } catch (e) {
      this.error = e.message
      this.isLoading = false;
    }
  }
  erc20Token(e: Event) {
    this.setERC20Token = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setERC20Token = ''
    } else {
      this.setERC20Token = String(e)
    }
  }

  setWithdrawalUtilityToken(e: Event) { // without type info
    this.withdrawalUtilityToken = String(e);

    if (isNaN(Number(this.withdrawalUtilityToken))) {
      this.withdrawalUtilityToken = '0';
    }


  }
  setWithdrawalBNB(e: Event) { // without type info
    this.withdrawalBNB = String(e);

    if (isNaN(Number(this.withdrawalBNB))) {
      this.withdrawalBNB = '0';
    }


  }



  async getWithdrawalBNB() {
    try {
      this.isLoading = true;
      await nftContract.methods.withdraw(Web3.utils.toWei(this.withdrawalBNB, "ether")
      ).send({
        from: this.userAddress
      })
      this.getContent()
      this.isLoading = false;
    } catch (e) {
      this.error = e.message
      this.isLoading = false;
    }
  }

  async getWithdrawalUtilityToken() {
    try {
      this.isLoading = true;
      await nftContract.methods.withdrawUtility(this.withdrawalUtilityToken).send({
        from: this.userAddress
      })
      this.getContent()
      this.isLoading = false;
    } catch (e) {
      this.error = e.message
      this.isLoading = false;
    }
  }




}
