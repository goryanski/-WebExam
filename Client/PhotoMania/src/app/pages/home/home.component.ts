import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {PostInterface} from "../../api/interfaces/post.interface";
import {Router} from "@angular/router";
import {HomeService} from "../../api/services/home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts$: Observable<PostInterface[]>;

  constructor(
    private readonly router: Router,
    private readonly homeService: HomeService
  ) {
    this.posts$ = homeService.getPosts();
  }

  ngOnInit(): void {
  }

}
