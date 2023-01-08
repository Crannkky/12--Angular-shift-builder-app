import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { faPersonThroughWindow } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faPersonThroughWindow = faPersonThroughWindow;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
