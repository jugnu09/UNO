import { Component, OnInit } from '@angular/core';
import { ServicesService } from './../shared/services.service'
import { NgForm} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Players } from './../shared/players';
import { Teams } from './../shared/teams'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers:[ ServicesService ]
})
export class SettingsComponent implements OnInit {
  players: Players[];
  teams: Teams[];
  constructor(private service: ServicesService, private toaster : ToastrService) {
  }

  ngOnInit() {
    const data = this.service.getPlayersName();
    data.snapshotChanges().subscribe(item => {
      this.players = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.players.push(y as Players);
      });
    });

    const t = this.service.getTeamName();
    t.snapshotChanges().subscribe(item => {
      this.teams = [];
      item.forEach(element => {
        const y = element.payload.toJSON();
        y['$key'] = element.key;
        this.teams.push(y as Teams);
      });
    });

  }
  /*
   @function: addPlayers
   @description: this method is reposnible for inserting player in database
   */
  addPlayers(playerForm: NgForm) {
      this.service.insertPlayerName(playerForm.value);
      this.toaster.success('Player name added Successfully', 'Player Registration') ;
  }
  /*
    @function: removePlayers
    @description: this method is responsible for removing player from the database
  */
  removePlayers(key :string) {
    if (confirm('Are you sure you want to delete this record') === true) {
      this.service.removePlayers(key);
      this.toaster.success("This player has been removed","Player");
    }
  }
  /*
  @function addNewTeam
  @description : This method will create team name and push the same in database
   */
  addNewTeam(ev) {
    this.service.addNewTeam(ev.model);
    this.toaster.success("Team added Successfully", "New Team");
  }

}
