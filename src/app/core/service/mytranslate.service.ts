import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID, Renderer2, RendererFactory2 } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslateService {
 private readonly _TranslateService=inject(TranslateService)
 private readonly _PLATFORM_ID=inject(PLATFORM_ID)
 private readonly _Renderer2=inject(RendererFactory2).createRenderer(null,null)

  constructor() { 
    if(isPlatformBrowser(this._PLATFORM_ID)){
      let language =localStorage.getItem('lang')
      this._TranslateService.setDefaultLang('en')
      if(language!==null){
        this._TranslateService.use(language!)
      }
      this.changeDirection()
    }
  }

  changeDirection():void{
    let language =localStorage.getItem('lang')
    if(language==='en'){
       this._Renderer2.setAttribute(document.documentElement ,'dir' ,'ltr')
       this._Renderer2.setAttribute(document.documentElement ,'lang' ,'en')
      }else if(language==='ar'){
        this._Renderer2.setAttribute(document.documentElement ,'dir' ,'rtl')
        this._Renderer2.setAttribute(document.documentElement ,'lang' ,'en')

      }
  }

  changelang(lang:string):void{
    localStorage.setItem('lang',lang)
    this._TranslateService.use(lang)
    this.changeDirection()
  }
}
