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
  mainArr=[];
  constructor(private myService : ServicesService) { }

  ngOnInit() {
    const data = this.myService.getPlayersName();
    data.snapshotChanges().subscribe(item => {
      this.players = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.players.push(y);
      });
    });
    const score = this.myService.getScoreTable();
    score.snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.scoreCard.push(y);
      });
      this.generateArray(this.scoreCard);
    });
  }
  generateArray(arr) {
    for (let i = 0; i < arr.length; i++) {
      let arr1 = [];
      arr1.push(Object.values(arr[i]).slice(0,-1));
      this.mainArr.push(arr1);
      arr1 = [];
    }
    console.log(this.mainArr);
    return this.mainArr;
  }
}
