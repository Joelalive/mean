import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];

  private postsUpdated = new Subject<Post[]>();

  constructor() { }

  getPosts() {
    return this.posts.slice();
  }

  getPostsUpdated() {
    return this.postsUpdated;
  }

  addPost(post: Post) {
    this.posts.push(post);
    this.postsUpdated.next(this.posts.slice());
  }
}
