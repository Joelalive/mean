import { PostsService } from './../posts.service';
import { Post } from './../post.model';
import { Component, OnInit, NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  private mode = 'create';
  private postId: string;
  post: Post;
  isLoading = false;

  constructor(private postsService: PostsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')){
        this.mode = 'edit';
        this.postId = paramMap.get('id');
        this.isLoading = true;
        this.postsService.getPost(this.postId)
        .subscribe((postData) => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
          this.isLoading = false;
        });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
    console.log(this.mode);
  }

  onSavePost(form: NgForm) {
    if(form.invalid){
      return;
    }
    this.isLoading = true;
    const post: Post = {
      id: null,
      title: form.value.title,
      content: form.value.content
    };

    if(this.mode === 'create') {
      this.postsService.addPost(post);
    } else {
      post.id = this.postId;
      this.postsService.updatePost(post);
    }
    form.resetForm();
  }

}
