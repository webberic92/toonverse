import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
// import  { detectEthereumProvider } from "@metamask/detect-provider";

var Eth = require("web3-eth");
const Web3 = require("web3");
declare global {
  interface Window {
    ethereum: any;
    web3: any;
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
    //   window.ethereum.on("accountsChanged", (accounts: string | any[]) => {
    //     // If user has locked/logout from MetaMask, this resets the accounts array to empty
    //     window.location.reload();      });
    // } catch {
    //   window.location.reload();    }
  }

  public isConnected = async () => {
    if (window.ethereum.isConnected()) {
      return true;
    } else {
      // start web3 filters, calls, etc
      return false;
    }
  };

  public getAccounts = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      window.web3 = new Web3(window.ethereum);
      if (accounts.length == 0) {
        throw Error("Check MetaMask");
      }
      return accounts;
    } catch (e) {
      console.log("error" + e);

      throw Error(e.message);
    }
  };

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
