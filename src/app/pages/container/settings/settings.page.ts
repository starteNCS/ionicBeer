import firebase from 'firebase';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public username: string;

  constructor() { }

  ngOnInit() {
    this.username = firebase.auth().currentUser.displayName;
  }

}
