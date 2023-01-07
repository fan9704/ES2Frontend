import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import {Article} from "./article";
import {FormBuilder, FormGroup} from '@angular/forms';
@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
// @Injectable({
//   providedIn:'root'
// })
export class BlogComponent implements OnInit {
  title:String ="";
  body:String="";
  tags_input="";

  checkoutForm: FormGroup  =this.formBuilder.group({
     title:this.title,
     body:this.body,
     tags:this.tags_input,
  });
  search_input: String | undefined="";
  searchFrom:FormGroup =this.formBuilder.group({
    search_input:this.search_input
  });


  search_results:Article[]=[];
  result: Article | undefined;
  tag: Object | undefined;

  constructor(private router : Router,private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    this.listArticles();
  };
  getTags():Array<String> {
   // @ts-ignore
    return this.article_form["tags_input"].split(",");
  };
  sanitizeInput() {
    this.checkoutForm.patchValue({tags:"tags".split(",")})
    console.log(this.checkoutForm.value);
    return this.checkoutForm.value;
  };
  addArticle():void {
    let input = this.sanitizeInput();

    axios.post('/api/articles/',
      input,
    {
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then(_ => {
      console.log("Success!")
      this.resetSearch()
    })
    .then(() => this.search_results.push(input));
    this.cleanFields();
  };
  cleanFields():void {
    // @ts-ignore
    this.checkoutForm.reset()
  };
  searchArticle() {
    this.searchArticles(this.searchFrom.value);
  };

  searchArticles(searchInput: String|undefined) {
    console.log(searchInput);
      axios.post('/api/articles/searchV2/',
      searchInput,
    {
      headers: {
        'Content-type': 'application/json'
      }
    }).then(response => {
      this.search_results = response.data;
      console.log(this.search_results);
    }).catch(err => console.log(err))
  };
  listArticles():void {

    this.searchArticles("");
  };
  resetSearch() :void{
   // @ts-ignore
    this.search_form["search_input"]= ""
  }
}
