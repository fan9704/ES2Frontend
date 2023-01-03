import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
// @Injectable({
//   providedIn:'root'
// })
export class BlogComponent implements OnInit {
  article_form:any ={
    title:"",
    body:"",
    tags_input:"",
  };
  search_form:any={
    search_input: ""
  };
  search_results:String[]=[];
  private result: Object | undefined;
  private tag: Object | undefined;

  constructor(private router : Router) {

  }

  ngOnInit(): void {
    axios.defaults.xsrfHeaderName = "X-CSRFToken";
    axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
    this.listArticles();
  };
  getTags():Array<String> {
   // @ts-ignore
    return this.article_form["tags_input"].split(",");
  };
  sanitizeInput() {
    let input = JSON.parse(JSON.stringify(this.article_form));
    input.tags = this.getTags();

    delete input.tags_input;

    return input;
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
    // .then(console.log("Success!"))
    .then(_ => this.resetSearch())
    .then(() => this.search_results.push(input));
    this.cleanFields();
  };
  cleanFields():void {
    // @ts-ignore
    this.article_form.title="";
    // @ts-ignore
    this.article_form.body="";
    // @ts-ignore
    this.article_form.tags_input="";
  };
  searchArticle() {
    this.searchArticles(this.search_form);
  };

  searchArticles(searchInput: Object) {
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
    let input = {};
    this.searchArticles(input);
  };
  resetSearch() :void{
   // @ts-ignore
    this.search_form["search_input"]= ""
  }
}
