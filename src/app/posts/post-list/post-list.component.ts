import { PostsService } from './../posts.service';
import { Post } from './../post.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsService.getPostsUpdated().subscribe(
      (posts) => {
        this.posts = posts;
      }
    );
  }

}
