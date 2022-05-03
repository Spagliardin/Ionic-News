import { StorageSevice } from './../../services/storage.service';
import { Article } from './../../interfaces/index';
import { Component, Input } from '@angular/core';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent{

  @Input() article: Article
  @Input() index: number
  

  constructor(
      private iab: InAppBrowser,
      private platform: Platform,
      private actionSheetController: ActionSheetController,
      private socialSharing: SocialSharing,
      private storageService: StorageSevice
      ) { }

  openArticle(){

    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create(this.article.url)
      browser.show()
      return
    }

    window.open( this.article.url, '_blank' )
    
  }

  async onClick(){

    const articleInFavorite = this.storageService.articleInFavorite(this.article)

    const share: ActionSheetButton = {
      text: 'Share',
      icon: 'share-outline',
      handler: () => {
        this.onShareArticle()
      }
    }

    const normalBtns: ActionSheetButton[] = [
      {
      text: articleInFavorite ? 'Remover fav' : 'fav',
      icon: 'heart-outline',
      handler: () => {
        this.onToggleFavorite()
      }
    }
  ]

    if (this.platform.is('capacitor')) {
      normalBtns.unshift(share)
    }

    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons: normalBtns
    })

    await actionSheet.present()
  }

  onShareArticle(){

    const { title, source, url } = this.article
    this.socialSharing.share(
      title,
      source.name,
      null,
      url      
    )
  }

  onToggleFavorite(){
    this.storageService.saveRemoveArticle(this.article)
  }

}
