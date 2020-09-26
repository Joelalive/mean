import { Post } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];

  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

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
      }
    );
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
