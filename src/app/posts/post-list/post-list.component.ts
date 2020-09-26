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
  isLoading = false;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.isLoading =true;
    this.postsService.getPosts();
    this.postsService.getPostsUpdated().subscribe(
      (posts) => {
        this.posts = posts;
        this.isLoading = false;
      }
    );
  }

  onPostDelete(id: string) {
    this.postsService.deletePost(id);
  }

}
