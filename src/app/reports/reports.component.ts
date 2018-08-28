import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../shared/services.service';
import { Players } from "./../shared/players";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  scoreCard = [];
  players =[];
  name;
  constructor(private myService : ServicesService) { }

  ngOnInit() {
    const data = this.myService.getPlayersName();
    data.snapshotChanges().subscribe(item => {
      this.players = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.players.push(y as Players);
      });
    });
    this.name =["Ravi","Ritesh","Sheetal"];
    const score = this.myService.getScoreTable();
    score.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.scoreCard.push(y);
      });
    });
  }
  generateArray(arr){
    const obj =Object.assign({}, arr);
    return Object.keys(obj).map((key)=>{
      return {
        key:key, value:obj[key][key]
      }
    });
  }
}
