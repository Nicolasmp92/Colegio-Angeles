import { Injectable, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class SEOService {
    constructor(private title: Title, @Inject(DOCUMENT) private doc: any) {
    }

    createLinkForCanonicalURL() {
        const head = this.doc.getElementsByTagName('head')[0];
        var element: HTMLLinkElement = this.doc.querySelector(`link[rel='canonical']`) || null
        if (element == null) {
            element = this.doc.createElement('link') as HTMLLinkElement;
            head.appendChild(element);
        }
        element.setAttribute('rel', 'canonical')
        element.setAttribute('href', this.doc.URL)
    }
} 