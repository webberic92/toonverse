import { Component, OnInit } from '@angular/core';
import bscContract from 'src/app/services/Solidity/$toon.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  contractName: string = '';

  constructor() { }

  async ngOnInit(): Promise<void> {
    // try {
    //   this.contractName = await bscContract.methods.name().call()
    // } catch (e) {
    //   console.log(e)

    // }

  }
}
