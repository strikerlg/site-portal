"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const core_1 = require('@angular/core');
const website_1 = require('./website');
const grid_service_1 = require('./grid.service');
const active_link_service_1 = require('../shared/active.link.service');
let GridComponent = class GridComponent {
    constructor(gridService, activeLinkService) {
        this.gridService = gridService;
        this.activeLinkService = activeLinkService;
    }
    ngOnInit() {
        this.activeLinkService.setActiveLink("grid-link");
        this.getWebsites();
        this.initializeHandler();
    }
    saveWebsite() {
        let name = document.getElementById("website-name-new").value;
        let description = document.getElementById("website-description-new").value;
        let url = document.getElementById("website-url-new").value;
        // validate params
        if (!this.isValidInputByElement("file-input-new")
            || !this.isValidInputByElement("website-name-new")
            || !this.isValidInputByElement("website-description-new")
            || !this.isValidInputByElement("website-url-new")) {
            alert("Please specify all elements for the website before proceding.");
            return;
        }
        let site = new website_1.Website();
        site.name = name;
        site.description = description;
        site.url = url;
        site.image = this.imageBase64;
        site.rank = this.rankLast(this.websites);
        this.gridService.create(site)
            .then((w) => this.displayResultMessage(".save-result", "bg-success", site.name + " has been saved successfully."))
            .then(() => this.getWebsites());
    }
    updateWebsite(website) {
        let site = website[0];
        if (!this.isValidInputByObject(site)) {
            alert("Please specify all elements for the website before proceding.");
            return;
        }
        // if a new image has been selected, update the object with the new image data 
        if (document.getElementById("file-input-" + site.id).value != "") {
            site.image = this.imageBase64;
        }
        this.gridService.update(site).then((w) => {
            this.displayResultMessage(".update-result-" + site.id, "bg-success", site.name + " has been updated successfully.");
        });
    }
    deleteWebsite(id) {
        this.gridService
            .delete(id)
            .then(() => this.displayResultMessage(".delete-result-" + id, "bg-success", "Entity has been deleted successfully."))
            .then(() => {
            for (let i = 0; i < this.websites.length; i++) {
                this.websites[i] = this.websites[i].filter(w => w.id != id);
            }
        });
    }
    saveClosed() {
        // cleanup on close
        document.querySelectorAll(".save-result")[0].innerHTML = "";
        document.querySelectorAll(".save-result")[0].classList.remove("bg-success");
        document.getElementById("file-input-new").value = "";
        document.getElementById("website-name-new").value = "";
        document.getElementById("website-description-new").value = "";
        document.getElementById("website-url-new").value = "";
        document.getElementById("image-new").src = "images/covers/new-logo.png";
    }
    updateClosed(website) {
        let site = website[0];
        // cleanup on update
        document.querySelectorAll(".update-result-" + site.id)[0].innerHTML = "";
        document.querySelectorAll(".update-result-" + site.id)[0].classList.remove("bg-success");
        document.getElementById("file-input-" + site.id).value = "";
        document.getElementById("image-" + site.id).src = "data:image/png;base64," + site.image;
    }
    deleteClosed(id) {
        // cleanup on delete
        document.querySelectorAll(".delete-result-" + id)[0].innerHTML = "";
        document.querySelectorAll(".delete-result-" + id)[0].classList.remove("bg-success");
    }
    readURL(id) {
        let self = this;
        let input = document.getElementById("file-input-" + id);
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function (fre) {
                let base64Img = fre.target.result;
                self.imageBase64 = base64Img.substring(base64Img.indexOf(",") + 1);
                let elem = document.getElementById('image-' + id);
                elem.src = base64Img;
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    getWebsites() {
        this.gridService.getWebsites()
            .then((websites) => websites.sort(function (a, b) { return a.rank - b.rank; }))
            .then((websites) => {
            let i;
            let j;
            let subArray;
            let chunk = 6;
            this.websites = [];
            for (i = 0, j = websites.length; i < j; i += chunk) {
                subArray = websites.slice(i, i + chunk);
                this.websites.push(subArray);
            }
        });
    }
    initializeHandler() {
        document.getElementById("edit-mode-button").addEventListener("click", function () {
            let captions = document.querySelectorAll(".hideable");
            for (let i = 0; i < captions.length; i++) {
                let elem = captions[i];
                elem.style.display = elem.style.display === 'none' ? '' : 'none';
            }
            let websitedata = document.querySelectorAll(".websitedata-container");
            for (let i = 0; i < websitedata.length; i++) {
                let elem = websitedata[i];
                if (elem.classList.contains("col-lg-2")) {
                    elem.classList.remove("col-lg-2");
                }
                else {
                    elem.classList.add("col-lg-2");
                }
            }
        });
    }
    rankLast(websites) {
        let cnt = 0;
        for (let i = 0; i < websites.length; i++) {
            for (let j = 0; j < websites[i].length; j++) {
                cnt++;
            }
        }
        return cnt;
    }
    displayResultMessage(id, cssClass, message) {
        let elems = document.querySelectorAll(id);
        for (let i = 0; i < elems.length; i++) {
            let elem = elems[i];
            elem.classList.add(cssClass);
            elem.style.display = "block";
            elem.innerHTML = message;
        }
    }
    isValidInputByElement(id) {
        if (document.getElementById(id).value == "") {
            return false;
        }
        return true;
    }
    isValidInputByObject(website) {
        if (website.name == "" || website.description == "" || website.url == "") {
            return false;
        }
        return true;
    }
};
GridComponent = __decorate([
    core_1.Component({
        selector: 'grid',
        templateUrl: 'grid/grid.component.html',
        styleUrls: ['grid/grid.component.css'],
        providers: [grid_service_1.GridService, active_link_service_1.ActiveLinkService]
    }), 
    __metadata('design:paramtypes', [grid_service_1.GridService, active_link_service_1.ActiveLinkService])
], GridComponent);
exports.GridComponent = GridComponent;
//# sourceMappingURL=grid.component.js.map