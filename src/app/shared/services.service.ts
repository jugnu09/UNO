import { Injectable } from '@angular/core';
import { Players } from './players';
import { Teams } from './teams';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  playerList: AngularFireList<any>;
  teamList: AngularFireList<any>;
  scoreList: AngularFireList<any>;
  selectedPlayers: Players = new Players();
  selectedTeam: Teams = new Teams();

  constructor(private firebase: AngularFireDatabase) {
    this.teamList = this.firebase.list('team');
    this.scoreList = this.firebase.list('scoreCard');
  }

  /*
  @function getPlayersName
  @description this will fetch the list of players from firebase
   */
  getPlayersName() {
    this.playerList = this.firebase.list('players');
    return this.playerList;
  }

  /*
  @function: getTeamName
  @description : this will fetch the name of team from DB
   */
  getTeamName() {
    this.teamList = this.firebase.list('team');
    return this.teamList;
  }

  /*
  @function :getScoreTable
  @description : this will fect score Object from firebase
   */
  getScoreTable() {
    this.scoreList = this.firebase.list('scoreCard');
    return this.scoreList;
  }

  /*
  @function insertPlayerName
  @description this will insert name of new players from settings page to firebase
   */
  insertPlayerName(players: Players) {
    this.playerList.push({
      name:players.name,
      team:players.team
    })
  }
  /*
  @function:removePlayers
  @description: this method is responsible for removing the player name from database
   */
  removePlayers($key :string) {
    this.playerList.remove($key);
  }

  /*
  @function: addNewTeam
  @description:add team name to DB
   */
  addNewTeam(team : Teams) {
    this.teamList.push({
      name: team
    })
  }

  /*
  @function:pushScoreFb
  @description: this will push score table to firebase
   */
  pushScoreFb(obj) {
    this.scoreList.push(obj);
  }
}
