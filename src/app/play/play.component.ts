import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../shared/services.service';
import { Players } from '../shared/players';
import { ToastrService } from 'ngx-toastr';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  providers: [ServicesService]
})
export class PlayComponent implements OnInit {
  players: Players[];
  public show:boolean = false;
  rounds;
  selectedVal;
  myArray = [];
  totalScore=[];
  scoreObjFb={};
  sum : Number = 0;
  constructor(private myService : ServicesService, private toaster: ToastrService) {}
  /*
  @function: ngOnInit
  @description: This will be called on component initializationa and will fetch player list from firebase.
   */
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
  }
  /*
  @function: generateTable
  @description: this method is responsible for genrating html table based on number of rounds and number of players
   */
  generateTable(args){
    if(args && this.players.length) {
      this.show = true;
      this.rounds = Array(parseInt(args)).fill(args);
    }
    else {
      this.toaster.warning("No Player found in database.Please add player on Settings page","Players");
    }
    this.createArrayofArray(args);
  }

  /*
  @function: addScore
  @description: this will add the score of each player
  @params: {array}
  @return: this will return an array of score of each player playing the game.
   */
  addScore(myArray) {
    for(var i=0;i<myArray[0].length;i++){
      for(var j=0;j<myArray.length;j++){
        this.sum  = Number(this.sum) + Number(myArray[j][i]);
      }
      this.totalScore.push(this.sum);
      this.sum = 0;
    }
    this.pushToFirebase(this.totalScore);
  }

  /*
  @function: pushToFirebase
  @description: this method will push score to firebase
   */
  pushToFirebase(score) {
    console.log(score);
    var ele= this.players;
    for(var i =0;i<ele.length;i++){
      this.scoreObjFb[ele[i].name]=score[i];
    }
    this.myService.pushScoreFb(this.scoreObjFb);
    this.toaster.success("Score card saved successfully in firebase","ScoreCard");

  }
  /*
  @function: createJsonArrayObject
  @description : this will create a array of array which will be used to create the data model of the score table.
  @params : {args: number}
   */
  createArrayofArray(args) {
    var obj = [];
    for(var i=0;i<parseInt(args);i++) {
      for (var j=0; j< this.players.length; j++){
        obj.push(this.players[j].name);
      }
      this.myArray.push(obj);
      obj = [];
    }
    return this.myArray;
  }
}
