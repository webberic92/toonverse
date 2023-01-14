import { Component, OnInit } from '@angular/core';
import fruitTown from "../../services/Solidity/fruitTown.service";
import {ProviderLessNftContract} from "../../services/Solidity/devilCatz.service";

@Component({
  selector: 'app-fruittown',
  templateUrl: './fruittown.component.html',
  styleUrls: ['./fruittown.component.scss']
})
export class FruittownComponent implements OnInit {

  constructor() { }

  fruitTownAddress: string = "";

  ngOnInit(): void {
    this.fruitTownAddress = fruitTown._address;
  }

}
