import { Component, OnInit, ViewChild } from '@angular/core';

import { Website } from './website';
import { GridService } from './grid.service';
import { ActiveLinkService } from '../shared/active.link.service';

interface FileReaderEventTarget extends EventTarget {
    result:string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;
    getMessage():string;
}

@Component({
  selector: 'grid',
  templateUrl: 'grid/grid.component.html',
  styleUrls: ['grid/grid.component.css'],
  providers: [GridService, ActiveLinkService]
})

export class GridComponent implements OnInit {
    websites: Website[][];
    imageBase64: string;
    
    constructor(private gridService: GridService, private activeLinkService: ActiveLinkService) { }
    
    ngOnInit(): void {
        this.activeLinkService.setActiveLink("grid-link");
        this.getWebsites();
        this.initializeHandler();
    }
    
    saveWebsite(): void {
        let name: string = (<HTMLInputElement> document.getElementById("website-name-new")).value;
        let description: string = (<HTMLInputElement> document.getElementById("website-description-new")).value;
        let url: string = (<HTMLInputElement> document.getElementById("website-url-new")).value;
        
        // validate params
        if(!this.isValidInputByElement("file-input-new")
            || !this.isValidInputByElement("website-name-new")
            || !this.isValidInputByElement("website-description-new")
            || !this.isValidInputByElement("website-url-new")) {
            alert("Please specify all elements for the website before proceding.");
            return;
        }
        
        let site: Website = new Website();
        site.name = name;
        site.description = description;
        site.url = url;
        site.image = this.imageBase64;
        site.rank = this.rankLast(this.websites);

        this.gridService.create(site)
        .then((w: Website) => this.displayResultMessage(".save-result", "bg-success", site.name + " has been saved successfully."))
        .then(() => this.getWebsites());
    }
    
    updateWebsite(website: Website): void {
        let site = website[0];

        if(!this.isValidInputByObject(site)) {
            alert("Please specify all elements for the website before proceding.");
            return;
        }
        
        // if a new image has been selected, update the object with the new image data 
        if( (<HTMLInputElement> document.getElementById("file-input-"+site.id)).value != "") {
            site.image = this.imageBase64;
        }
        

        this.gridService.update(site).then((w: Website) => {
            this.displayResultMessage(".update-result-" + site.id, "bg-success", site.name + " has been updated successfully.")
        });
    }
    
    deleteWebsite(id: number): void {
        this.gridService
          .delete(id)
          .then(() => this.displayResultMessage(".delete-result-" + id, "bg-success", "Entity has been deleted successfully."))
          .then(() => {
                for(let i: number = 0; i < this.websites.length; i++) {
                    this.websites[i] = this.websites[i].filter(w=> w.id != id);
                }
          }); 
    }
    
    saveClosed(): void {
        // cleanup on close
        document.querySelectorAll(".save-result")[0].innerHTML = "";
        document.querySelectorAll(".save-result")[0].classList.remove("bg-success");
        (<HTMLInputElement> document.getElementById("file-input-new")).value = "";
        (<HTMLInputElement> document.getElementById("website-name-new")).value = "";
        (<HTMLInputElement> document.getElementById("website-description-new")).value = "";
        (<HTMLInputElement> document.getElementById("website-url-new")).value = "";
        (<HTMLImageElement> document.getElementById("image-new")).src = "images/covers/new-logo.png";
    }
    
    updateClosed(website: Website): void {
        let site = website[0];
        // cleanup on update
        document.querySelectorAll(".update-result-"+site.id)[0].innerHTML = "";
        document.querySelectorAll(".update-result-"+site.id)[0].classList.remove("bg-success");
        (<HTMLInputElement> document.getElementById("file-input-"+site.id)).value = "";
        (<HTMLImageElement> document.getElementById("image-"+site.id)).src = "data:image/png;base64," + site.image;
    }
    
    deleteClosed(id: number): void {
        // cleanup on delete
        document.querySelectorAll(".delete-result-"+id)[0].innerHTML = "";
        document.querySelectorAll(".delete-result-"+id)[0].classList.remove("bg-success");
    }

    readURL(id: string): void {
        let self: GridComponent = this;
        let input: HTMLInputElement = <HTMLInputElement> document.getElementById("file-input-"+id);
        if (input.files && input.files[0]) {
        let reader: FileReader = new FileReader();
            reader.onload = function (fre:FileReaderEvent) {
                let base64Img: string = fre.target.result;
                self.imageBase64 = base64Img.substring(base64Img.indexOf(",")+1);
                let elem: HTMLImageElement = <HTMLImageElement> document.getElementById('image-'+id);
                elem.src = base64Img;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    private getWebsites(): void {
        this.gridService.getWebsites()
            .then((websites: Website[]) => websites.sort(function(a: Website, b: Website): number { return a.rank - b.rank }))
            .then((websites: Website[]) => {
                let i: number;
                let j: number;
                let subArray:Website[]
                let chunk: number = 6;
                this.websites = [];
                for (i = 0, j = websites.length; i < j; i+=chunk) {
                    subArray = websites.slice(i,i+chunk);
                    this.websites.push(subArray);
                }
            });
    }
    
    private initializeHandler(): void {
        document.getElementById("edit-mode-button").addEventListener("click", function(){
            let captions: NodeListOf<Element> = document.querySelectorAll(".hideable");
            for (let i: number = 0; i < captions.length; i++) {
                let elem: HTMLElement = <HTMLElement> captions[i];
                elem.style.display = elem.style.display === 'none' ? '' : 'none';
            }
            let websitedata: NodeListOf<Element> = document.querySelectorAll(".websitedata-container");
            for (let i: number = 0; i < websitedata.length; i++) {
                let elem: HTMLElement = <HTMLElement> websitedata[i];
                if(elem.classList.contains("col-lg-2")) {
                    elem.classList.remove("col-lg-2");
                } else {
                    elem.classList.add("col-lg-2");
                }
            }
        });
    }

    private rankLast(websites: Website[][]): number {
        let cnt: number = 0;
        for (let i: number = 0; i < websites.length; i++) {
            for(let j:number = 0; j < websites[i].length; j++){
                cnt++;
            }
        }
        return cnt;
    }

    private displayResultMessage(id: string, cssClass: string, message: string): void {
        let elems: NodeListOf<Element> = document.querySelectorAll(id);
        for (let i: number = 0; i < elems.length; i++) {
            let elem: HTMLElement = <HTMLElement> elems[i];
            elem.classList.add(cssClass);
            elem.style.display = "block";
            elem.innerHTML = message;
        }
    }
    
    private isValidInputByElement(id: string): boolean {
        if( (<HTMLInputElement> document.getElementById(id)).value == "") {
            return false;
        }
        return true;
    }

    private isValidInputByObject(website: Website): boolean {
        if( website.name == "" || website.description == "" || website.url == "" ) {
            return false;
        }
        return true;
    }
    
}