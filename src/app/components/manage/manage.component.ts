import { Component, OnInit } from '@angular/core';
import bscContract from "src/app/services/Solidity/contract.service"
import Web3 from 'web3';
import { Web3Service } from 'src/app/services/Web3/web3.service';
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {
  tokensOwned: string = ''
  tokensStaked: string = ''

  isLoading: boolean = false;
  userAddress: string = ''
  contractAddress: string = ''
  contractOwner: string = ''
  contractName: string = ''
  contractSymbol: string = ''
  contractMinted: string = ''
  contractTotalSupply: string = ''
  contractPrice: string = ''
  contractERC721Token: string = ''
  contractBnbBalance: string | void = ''
  contractUsersRewardFromStaking: number = 0
  numToBuy: string = '0';
  totalPrice: string = '0';
  purchaseString: string = ''
  error: string = ''

  setERC721Token: string = ''
  setCostvalue: string = ''
  setNewOwnerAddress: string = ''
  setBurnAmount: string = ''
  setStakeAmount: string = ''
  setUnstakeAmount: string = ''
  setAllowanceAdd: string = ''
  setAllowanceAddNum: string = ''

  setAllowanceCheck: string = ''
  setAllowanceCheck2: string = ''
  setAllowanceIncrease: string = ''
  setAllowanceIncreaseNum: string = ''
  setAllowanceDecrease: string = ''
  setAllowanceDecreaseNum: string = ''
  allowanceCheckFinal: string = ''
  allowanceIncreaseFinal: string = ''
  allowanceDecreaseFinal: string = ''
  intervalId!: number;
  setAmountToWithdrawal: string = ''
  setAllowanceFrom: string = ''
  setAllowanceTo: string = ''
  setAllowanceSendAmount: string = ''
  contractUtilityBalance: string = '';
  setUtilityAmountToWithdrawal: string = '0';


  constructor(private web3: Web3Service) {
    setInterval(() => { this.updateRewards() }, 30000);
  }

  async ngOnInit() {
    this.getContent()
  }




  ngOnDestroy() {
    clearInterval(this.intervalId);
  }


  async updateRewards() {

    let stakingRewardA = BigInt(await bscContract.methods.rewardsInWei(this.userAddress).call())
    let stakingRewardB = BigInt(await bscContract.methods.calculateDividendsinWei().call({
      from: this.userAddress
    }))
    this.contractUsersRewardFromStaking = Number(Web3.utils.fromWei(String(BigInt((stakingRewardB) + (stakingRewardA))), "ether"))

  }



  async getContent() {
    try {
      this.isLoading = true;
      this.error = ''
      this.contractAddress = bscContract._address
      this.contractName = await bscContract.methods.name().call()
      this.contractSymbol = await bscContract.methods.symbol().call()
      this.contractMinted = await bscContract.methods.totalSupply().call()
      this.contractTotalSupply = await bscContract.methods.maxSupply().call()
      this.contractPrice = Web3.utils.fromWei(await bscContract.methods.cost().call(), 'ether')
      this.contractOwner = await bscContract.methods.owner().call()
      this.contractERC721Token = await bscContract.methods.erc721Token().call()
      this.contractUtilityBalance = await bscContract.methods.balanceOf(this.contractAddress).call()
      this.isLoading = false;
      this.userAddress = await this.web3.getAccounts()
      this.userAddress = Web3.utils.toChecksumAddress(this.userAddress[0])
      this.tokensOwned = await bscContract.methods.balanceOf(this.userAddress).call()
      this.tokensStaked = await bscContract.methods.stakeOf(this.userAddress).call()
      this.contractBnbBalance = Web3.utils.fromWei(await web3.eth.getBalance(this.contractAddress), 'ether')

      let stakingRewardA = BigInt(await bscContract.methods.rewardsInWei(this.userAddress).call())
      let stakingRewardB = BigInt(await bscContract.methods.calculateDividendsinWei().call({
        from: this.userAddress
      }))
      this.contractUsersRewardFromStaking = Number(Web3.utils.fromWei(String(BigInt((stakingRewardB) + (stakingRewardA))), "ether"))


    } catch (e) {
      this.error = e.message
      this.isLoading = false;

    }
  }

  // add(A: string, B: string) {
  //   const AL = A.length
  //   const BL = B.length
  //   const ML = Math.max(AL, BL)

  //   let carry = 0, sum = ''

  //   for (let i = 1; i <= ML; i++) {
  //     let a = +A.charAt(AL - i)
  //     let b = +B.charAt(BL - i)

  //     let t = carry + a + b
  //     carry = t / 10 | 0
  //     t %= 10

  //     sum = (i === ML && carry)
  //       ? carry * 10 + t + sum
  //       : t + sum
  //   }

  //   return sum
  // }

  async withdrawBNB() {
    try {
      this.isLoading = true;
      await bscContract.methods.withdrawFromContractToOwner(web3.utils.toWei(this.setAmountToWithdrawal, "ether")).send({
        from: this.userAddress
      })
      this.getContent()
      this.isLoading = false;
    } catch (e) {
      this.error = e.message
      this.isLoading = false;
    }
  }


  async setErc721address() {
    try {
      this.isLoading = true;
      await bscContract.methods.setErc721address(this.setERC721Token).send({
        from: this.userAddress
      })
      this.getContent()
      this.isLoading = false;
    } catch (e) {
      this.error = e.message
      this.isLoading = false;
    }
  }

  async collectStakingReward() {
    try {
      this.isLoading = true;
      await bscContract.methods.collectStakingReward().send({
        from: this.userAddress
      })
      this.getContent()
      this.isLoading = false;
    } catch (e) {
      this.error = e.message
      this.isLoading = false;
    }
  }



  async setCost() {
    try {
      this.isLoading = true;
      await bscContract.methods.setCost(Web3.utils.toWei(this.setCostvalue, 'ether')).send({
        from: this.userAddress
      })
      this.getContent()
      this.isLoading = false;
    } catch (e) {
      this.error = e.message
      this.isLoading = false;
    }
  }

  updatePrice(e: Event) {
    if (e == null || String(e) == '0') {
      this.setCostvalue = ''
    } else {
      this.setCostvalue = String(e)
    }
  }


  setNewOwner(e: Event) {
    this.setNewOwnerAddress = ''

    if (e == null || String(e) == '') {
      this.setNewOwnerAddress = ''
    } else {
      this.setNewOwnerAddress = String(e)
    }
  }
  async newOwner() {
    try {
      this.isLoading = true;
      await bscContract.methods.transferOwnership(this.setNewOwnerAddress).send({
        from: this.userAddress
      })
      this.getContent()
      this.isLoading = false;
    } catch (e) {
      this.error = e.message
      this.isLoading = false;
    }
  }

  setBurn(e: Event) {
    this.setBurnAmount = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setBurnAmount = ''
    } else {
      this.setBurnAmount = String(e)
    }
  }
  async burn() {
    try {
      this.isLoading = true;
      await bscContract.methods.burn(this.setBurnAmount).send({
        from: this.userAddress,
      })
      this.getContent()
      this.isLoading = false;
    } catch (e) {
      this.error = e.message
      this.isLoading = false;
    }
  }

  setStake(e: Event) {
    this.setStakeAmount = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setStakeAmount = ''
    } else {
      this.setStakeAmount = String(e)
    }
  }
  async stake() {
    try {
      this.isLoading = true;
      await bscContract.methods.createStake(this.setStakeAmount).send({
        from: this.userAddress,
      })
      this.getContent()
      this.isLoading = false;
    } catch (e) {
      this.error = e.message
      this.isLoading = false;
    }
  }



  setUnstake(e: Event) {
    this.setUnstakeAmount = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setUnstakeAmount = ''
    } else {
      this.setUnstakeAmount = String(e)
    }
  }
  async unstake() {
    try {
      this.isLoading = true;
      await bscContract.methods.removeStake(this.setUnstakeAmount).send({
        from: this.userAddress,
      })
      this.getContent()
      this.isLoading = false;
    } catch (e) {
      this.error = e.message
      this.isLoading = false;
    }
  }


  allowanceAdd(e: Event) {
    this.setAllowanceAdd = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setAllowanceAdd = ''
    } else {
      this.setAllowanceAdd = String(e)
    }
  }

  allowanceAddNum(e: Event) {
    this.setAllowanceAddNum = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setAllowanceAddNum = ''
    } else {
      this.setAllowanceAddNum = String(e)
    }
  }




  async setAllowance() {
    try {
      this.isLoading = true;
      await bscContract.methods.approve(this.setAllowanceAdd, this.setAllowanceAddNum).send({
        from: this.userAddress
      })
      this.getContent()
      this.isLoading = false;
    } catch (e) {
      this.error = e.message
      this.isLoading = false;
    }
  }

  async getAllowance() {
    try {
      this.isLoading = true;
      this.allowanceCheckFinal = await bscContract.methods.allowance(this.setAllowanceCheck, this.setAllowanceCheck2).call()
      // this.getContent()
      this.isLoading = false;
    } catch (e) {
      this.error = e.message
      this.isLoading = false;
    }
  }

  async IncreaseAllowance() {
    try {
      this.isLoading = true;
      await bscContract.methods.increaseAllowance(this.setAllowanceIncrease, this.setAllowanceIncreaseNum).send({
        from: this.userAddress
      })
      this.allowanceIncreaseFinal = await bscContract.methods.allowance(this.userAddress, this.setAllowanceIncrease).call()
      // this.getContent()
      this.isLoading = false;
    } catch (e) {
      this.error = e.message
      this.isLoading = false;
    }
  }

  async DecreaseAllowance() {
    try {
      this.isLoading = true;
      await bscContract.methods.decreaseAllowance(this.setAllowanceDecrease, this.setAllowanceDecreaseNum).send({
        from: this.userAddress
      })
      this.allowanceDecreaseFinal = await bscContract.methods.allowance(this.userAddress, this.setAllowanceDecrease).call()
      // this.getContent()
      this.isLoading = false;
    } catch (e) {
      this.error = e.message
      this.isLoading = false;
    }
  }

  async transferFrom() {
    try {
      this.isLoading = true;
      await bscContract.methods.transferFrom(this.setAllowanceFrom, this.setAllowanceTo, this.setAllowanceSendAmount).send({
        from: this.userAddress
      })
      this.getContent()
      this.isLoading = false;
    } catch (e) {
      this.error = e.message
      this.isLoading = false;
    }
  }




  allowanceCheck(e: Event) {
    this.setAllowanceCheck = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setAllowanceCheck = ''
    } else {
      this.setAllowanceCheck = String(e)
    }
  } allowanceCheck2(e: Event) {
    this.setAllowanceCheck2 = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setAllowanceCheck2 = ''
    } else {
      this.setAllowanceCheck2 = String(e)
    }

  }
  allowanceIncrease(e: Event) {
    this.setAllowanceIncrease = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setAllowanceIncrease = ''
    } else {
      this.setAllowanceIncrease = String(e)
    }
  }



  allowanceIncreaseNum(e: Event) {
    this.setAllowanceIncreaseNum = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setAllowanceIncreaseNum = ''
    } else {
      this.setAllowanceIncreaseNum = String(e)
    }
  }

  erc721Token(e: Event) {
    this.setERC721Token = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setERC721Token = ''
    } else {
      this.setERC721Token = String(e)
    }
  }


  allowanceDecrease(e: Event) {
    this.setAllowanceDecrease = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setAllowanceDecrease = ''
    } else {
      this.setAllowanceDecrease = String(e)
    }
  }

  allowanceDecreaseNum(e: Event) {
    this.setAllowanceDecreaseNum = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setAllowanceDecreaseNum = ''
    } else {
      this.setAllowanceDecreaseNum = String(e)
    }
  }



  allowanceFrom(e: Event) {
    this.setAllowanceFrom = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setAllowanceFrom = ''
    } else {
      this.setAllowanceFrom = String(e)
    }
  }

  allowanceTo(e: Event) {
    this.setAllowanceTo = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setAllowanceTo = ''
    } else {
      this.setAllowanceTo = String(e)
    }
  }

  allowanceSendAmount(e: Event) {
    this.setAllowanceSendAmount = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setAllowanceSendAmount = ''
    } else {
      this.setAllowanceSendAmount = String(e)
    }
  }







  updateAmountToWithDrawal(e: Event) {
    this.setAmountToWithdrawal = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setAmountToWithdrawal = ''
    } else {
      this.setAmountToWithdrawal = String(e)
    }
  }

  utilityAmountToWithdrawal(e: Event) {
    this.setUtilityAmountToWithdrawal = ''

    if (e == null || String(e) == '' || String(e) == '0') {
      this.setUtilityAmountToWithdrawal = ''
    } else {
      this.setUtilityAmountToWithdrawal = String(e)
    }
  }

  async withdrawUtility() {
    try {
      this.isLoading = true;
      await bscContract.methods.withdrawUtilityToken(this.setUtilityAmountToWithdrawal).send({
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


