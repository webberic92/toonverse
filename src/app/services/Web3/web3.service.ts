import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
// import  { detectEthereumProvider } from "@metamask/detect-provider";

var Eth = require('web3-eth');
var Web3 = require('web3');


declare global {
  interface Window {
    ethereum: any
  }
}

@Injectable({
  providedIn: "root",
})
export class Web3Service {
  window = Window;
  currentRoute: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    // try {
    //   window.ethereum.on('accountsChanged', (accounts: string | any[]) => {
    //     // If user has locked/logout from MetaMask, this resets the accounts array to empty
    //     this.router.navigate(['/']); // navigate to other page
    //   });
    // } catch {
    //   this.router.navigate(['/']); // navigate to other page
    // }
  }



  
  public getAccounts = async () => {
    
  try {
    new Web3(window.ethereum);
    window.ethereum.enable().catch((error: any) => {
      return null;
    });
    const test =  await window.ethereum.request({ method: 'eth_accounts' });
    console.log(test)
    return test;
  } catch (e) {
    console.log('error' + e);
    return [];
  }
}


  // try {
  //   new Web3(window.ethereum);
  //   window.ethereum.enable().catch((error: any) => {
  //     return null;
  //   });
  //   const test = window.ethereum.request({ method: 'eth_accounts' });

  //   return test;
  // } catch (e) {
  //   console.log('error' + e);
  //   return [];
  // }
  // public openMetamask = async () => {
  //   window.web3 = new Web3(window.ethereum);
  //   let addresses = await this.getAccounts();
  //   if (!addresses.length) {
  //     try {
  //       addresses = await window.ethereum.enable();
  //     } catch (e) {
  //       console.log(e);

  //       throw e;
  //     }
  //   }
  //   return addresses.length ? addresses[0] : null;
  // };
}
function detectEthereumProvider() {
  throw new Error("Function not implemented.");
}

