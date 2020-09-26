import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];

  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts() {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map((postData) => {
      return postData.posts.map((post) => {
        return {
          id: post._id,
          title: post.title,
          content: post.content
        }
      });
    }))
    .subscribe((transPosts) => {
        this.posts = transPosts; 
        this.postsUpdated.next(this.posts.slice());
      }
    );
  }

  getPost(id: string) {
    return this.http.get<{_id:string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
  }

  getPostsUpdated() {
    return this.postsUpdated;
  }

  addPost(post: Post) {
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
    .subscribe((resData) => {
        const id = resData.postId;
        post.id = id;
        console.log(resData.message);
        this.posts.push(post);
        this.postsUpdated.next(this.posts.slice());
        this.router.navigate(['/']);
      }
    );
  }

  updatePost(post: Post) {
    this.http.put<{message: string}>('http://localhost:3000/api/posts/' + post.id, post)
    .subscribe((resp) => {
      console.log(resp.message);
      const updatedposts = this.posts.slice();
      const oldPostIndex = updatedposts.findIndex((p) => p.id === post.id);
      updatedposts[oldPostIndex] = post;
      this.posts = updatedposts;
      this.postsUpdated.next(this.posts.slice());
      this.router.navigate(['/']);
    });
  }

  deletePost(id: string) {
    this.http.delete<{message: string}>('http://localhost:3000/api/posts/' + id)
    .subscribe((resp) => {
      console.log(resp.message);
      const updatedPosts = this.posts.filter((post) => post.id !== id);
      this.posts = updatedPosts;
      this.postsUpdated.next(this.posts.slice());
    });
  }

}
