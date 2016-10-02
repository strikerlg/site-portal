import { Injectable } from '@angular/core';

@Injectable()
export class ActiveLinkService {
    
setActiveLink(id: string): void {
        var navbar = document.querySelectorAll(".navbar-nav li");
        for (var i = 0; i < navbar.length; i++) {
            if(navbar[i].classList.contains("active")) {
                navbar[i].classList.remove("active");
            } 
        }
        var activeLink = document.getElementById(id);
        activeLink.classList.add("active");
    }

}