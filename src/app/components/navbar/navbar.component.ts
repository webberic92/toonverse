import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/services/Web3/web3.service';
import Web3 from 'web3';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  userAddress: string = ''
  isConnected: boolean = false

  constructor(private web3: Web3Service) {
  }

  async ngOnInit() {
  }

  // async tryAndConnect(b: boolean) {
  //   if(b == true){
  //   try {
  //     this.userAddress = await this.web3.getAccounts()
  //     if(this.userAddress!= ''){
  //       this.userAddress = Web3.utils.toChecksumAddress(this.userAddress[0])
  //       this.isConnected= true
  //     }

  //   } catch (e) {
  //     console.log(e)

  //   }

  //   }else{
  //     this.userAddress = ''
  //     this.isConnected= false
  //   }

  // }
}


