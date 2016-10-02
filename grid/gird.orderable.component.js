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
const grid_service_1 = require('./grid.service');
const active_link_service_1 = require('../shared/active.link.service');
let GridOrderableComponent = class GridOrderableComponent {
    constructor(gridService, activeLinkService) {
        this.gridService = gridService;
        this.activeLinkService = activeLinkService;
        this.backToTopFunc = function () {
            let MAX_SCROLLABLE = 300;
            function getScrollTop() {
                if (typeof pageYOffset != 'undefined') {
                    //most browsers except IE before #9
                    return pageYOffset;
                }
                else {
                    let bodyElem = document.body; //IE 'quirks'
                    let docElem = document.documentElement; //IE with doctype
                    docElem = (docElem.clientHeight) ? docElem : bodyElem;
                    return docElem.scrollTop;
                }
            }
            var item = document.querySelector('a.back-to-top');
            if (typeof item == 'undefined')
                return;
            if (getScrollTop() > MAX_SCROLLABLE) {
                item.style.display = 'block';
            }
            else {
                item.style.display = 'none';
            }
        };
        this.scrollToFunc = function () {
            window.scrollTo(0, 0);
        };
    }
    ngOnInit() {
        this.activeLinkService.setActiveLink("grid-order-link");
        this.getWebsites();
        this.initializeHandlers();
    }
    ngOnDestroy() {
        window.removeEventListener('scroll', this.backToTopFunc);
    }
    saveOrder() {
        let saveMessageElem = document.querySelectorAll(".save-message")[0];
        saveMessageElem.style.display = "none";
        let siteElements = document.querySelectorAll('.site-name');
        for (var i = 0; i < siteElements.length; i++) {
            let site = siteElements[i];
            this.setWebsiteRank(site.innerHTML, i);
        }
        saveMessageElem.style.display = "inline";
    }
    setWebsiteRank(name, rank) {
        for (var i = 0; i < this.websites.length; i++) {
            if (this.websites[i].name == name) {
                this.websites[i].rank = rank;
                this.gridService.update(this.websites[i]);
                return;
            }
        }
    }
    getWebsites() {
        this.gridService.getWebsites()
            .then((websites) => websites.sort(function (a, b) { return a.rank - b.rank; }))
            .then((websites) => this.websites = websites);
    }
    initializeHandlers() {
        window.addEventListener('scroll', this.backToTopFunc);
        document.querySelector('a.back-to-top').addEventListener("click", this.scrollToFunc);
    }
};
GridOrderableComponent = __decorate([
    core_1.Component({
        selector: 'grid-orderable',
        templateUrl: 'grid/grid.orderable.component.html',
        styleUrls: ['grid/grid.orderable.component.css', 'grid/grid.dragula.min.css'],
        providers: [grid_service_1.GridService, active_link_service_1.ActiveLinkService]
    }), 
    __metadata('design:paramtypes', [grid_service_1.GridService, active_link_service_1.ActiveLinkService])
], GridOrderableComponent);
exports.GridOrderableComponent = GridOrderableComponent;
//# sourceMappingURL=gird.orderable.component.js.map