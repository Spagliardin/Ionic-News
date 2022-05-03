import { NewsService } from './../../services/news.service';
import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public categories: string[] = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology']
  public selectedCategory: string = this.categories[0];
  public articles: Article[] = []

  constructor(private newService: NewsService) {}

  ngOnInit(): void {
    this.newService.getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe( res => {
        this.articles = [ ...res ]
      })
  }

  segmentChanged( event: Event ){


    this.selectedCategory = (event as CustomEvent).detail.value
    this.newService.getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe( res => {
        this.articles = [ ...res ]
      })
  }

  loadData(event: Event){
    this.newService.getTopHeadlinesByCategory( this.selectedCategory, true )
      .subscribe( articles => {
        this.articles = articles;

        if (articles.length === this.articles.length) {
          (event as InfiniteScrollCustomEvent).target.disabled = true
        }

        setTimeout(() => {
          (event as InfiniteScrollCustomEvent).target.complete()
        }, 1000);
      })
  }

}
