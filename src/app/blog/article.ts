export class Article {
  body: string | undefined;
  title: string | undefined;
  is_published :boolean|undefined;
  lines:number|undefined;
  published_from: Date|undefined;
  tags:Array<String>|undefined;
}
