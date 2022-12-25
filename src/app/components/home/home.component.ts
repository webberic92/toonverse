import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import bscContract from "src/app/services/Solidity/contract.service"
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  contractName: string = '';

  constructor(private router: Router) {


  }
  async ngOnInit(): Promise<void> {
    // try {
    //   this.contractName = await bscContract.methods.name().call()
    // } catch (e) {
    //   console.log(e)

    // }
  }

  // mint = () => {
  //   this.router.navigateByUrl('/mint');
  // };
  // manage = () => {
  //   this.router.navigateByUrl('/manage');
  // };
  // nft = () => {
  //   this.router.navigateByUrl('/nft');
  // };
  // team = () => {
  //   this.router.navigateByUrl('/team');
  // };

  // roadmap = () => {
  //   this.router.navigateByUrl('/roadmap');
  // };

}

