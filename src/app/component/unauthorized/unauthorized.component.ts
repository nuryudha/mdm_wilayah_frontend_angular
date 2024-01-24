import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { WilayahService } from 'src/app/services/wilayah.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css'],
})
export class UnauthorizedComponent implements OnInit {
  image = './assets/images/unauthorized-image.gif';
  constructor(private title: Title, public services: WilayahService) {
    this.authentikasi();
  }

  ngOnInit(): void {
    this.title.setTitle('Unauthorized');
  }

  authentikasi() {
    console.log('authentikasi');
    window.parent.postMessage('authExpired', this.services.urlSkeleton);
  }
}
