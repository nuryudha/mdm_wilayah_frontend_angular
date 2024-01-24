import { Component, OnInit } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { WilayahService } from 'src/app/services/wilayah.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent implements OnInit {
  constructor(private title: Title, private services: WilayahService) {
    this.authentikasi();
  }

  ngOnInit(): void {
    this.title.setTitle('Page Not Found');
  }

  authentikasi() {
    console.log('authentikasi');
    window.parent.postMessage('authExpired', this.services.urlSkeleton);
  }
}
