import { Component, OnInit, OnDestroy } from '@angular/core';

import { Website } from './website';
import { GridService } from './grid.service';
import { ActiveLinkService } from '../shared/active.link.service';

@Component({
  selector: 'grid-orderable',
  templateUrl: 'grid/grid.orderable.component.html',
  styleUrls: ['grid/grid.orderable.component.css','grid/grid.dragula.min.css'],
  providers: [GridService, ActiveLinkService]
})

export class GridOrderableComponent implements OnInit {
    websites: Website[];
    
    constructor(private gridService: GridService, 
            private activeLinkService: ActiveLinkService) {}

    ngOnInit(): void {
        this.activeLinkService.setActiveLink("grid-order-link");
        this.getWebsites();
        this.initializeHandlers();
    }

    ngOnDestroy(): void {
        window.removeEventListener('scroll', this.backToTopFunc);
    }
    
    saveOrder(): void {
        let saveMessageElem: HTMLElement = <HTMLElement> document.querySelectorAll(".save-message")[0]
        saveMessageElem.style.display= "none";
        let siteElements: NodeListOf<Element> = document.querySelectorAll('.site-name');
          for(var i=0; i<siteElements.length; i++) {
                let site: HTMLElement = <HTMLElement> siteElements[i];
                this.setWebsiteRank(site.innerHTML, i);
           } 
        saveMessageElem.style.display= "inline";
    }

    private setWebsiteRank(name: string, rank: number): void {
        for(var i=0; i<this.websites.length; i++) {
            if(this.websites[i].name == name) {
                this.websites[i].rank = rank;
                this.gridService.update(this.websites[i]);
                return;
            }
        }
    }

    private backToTopFunc = function() {
        let MAX_SCROLLABLE: number = 300;
        function getScrollTop(): number {
            if(typeof pageYOffset!= 'undefined'){
                //most browsers except IE before #9
                return pageYOffset;
            }
            else{
                let bodyElem = document.body; //IE 'quirks'
                let docElem = document.documentElement; //IE with doctype
                docElem = (docElem.clientHeight) ? docElem : bodyElem;
                return docElem.scrollTop;
            }
        }
        
        var item: Element = document.querySelector('a.back-to-top');
        if (typeof item == 'undefined') return;
        if ( getScrollTop() > MAX_SCROLLABLE ) {
            (<HTMLElement> item).style.display = 'block';
        } else {
            (<HTMLElement> item).style.display = 'none';
        }
    };
    
    private scrollToFunc = function(): void {
        window.scrollTo(0, 0);
    };

    private getWebsites(): void {
        this.gridService.getWebsites()
            .then((websites: Website[]) => websites.sort(function(a: Website, b: Website): number { return a.rank - b.rank }))
            .then((websites: Website[]) => this.websites = websites);
        }
    
    private initializeHandlers(): void {
        window.addEventListener('scroll', this.backToTopFunc);
        document.querySelector('a.back-to-top').addEventListener("click", this.scrollToFunc);
    }
 
}