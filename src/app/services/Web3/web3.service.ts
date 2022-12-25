import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Web3 from 'web3';

declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class Web3Service {
  window: any;
  currentRoute: any;

  constructor(private route: ActivatedRoute, private router: Router) {
    try {
      window.ethereum.on('accountsChanged', (accounts: string | any[]) => {
        // If user has locked/logout from MetaMask, this resets the accounts array to empty

        this.router.navigate(['/']); // navigate to other page
      });
    } catch {
      this.router.navigate(['/']); // navigate to other page
    }
  }
  public getAccounts = async () => {
    try {
      new Web3(window.ethereum);
      window.ethereum.enable().catch((error: any) => {
        return null;
      });
      const test = window.ethereum.request({ method: 'eth_accounts' });
      
      return test;
    } catch (e) {
      console.log('error' + e);
      return [];
    }
  };

  public openMetamask = async () => {
    window.web3 = new Web3(window.ethereum);
    let addresses = await this.getAccounts();
    if (!addresses.length) {
      try {
        addresses = await window.ethereum.enable();
      } catch (e) {
        console.log(e);

        throw e;
      }
    }
    return addresses.length ? addresses[0] : null;
  };
}
