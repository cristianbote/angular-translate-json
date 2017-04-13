import { Directive, ElementRef, Input, OnInit, OnChanges } from '@angular/core';
import { TranslateService } from './translate.service';

@Directive({ selector: '[translate]' })
export class TranslateDirective implements OnInit, OnChanges {

    @Input('translate') key;
    @Input('translateValues') model;

    constructor(
        private el: ElementRef,
        private translateService: TranslateService
    ) {}

    /**
     * on-init handler
     */
    ngOnInit() {
        this.translateService
            .getTranslation(this.key, this.model)
            .subscribe(this.renderTranslation.bind(this));
    }

    /**
     * Handler for model changes
     * @param {object} changes
     */
    ngOnChanges(changes) {
        if (changes.model && changes.model.currentValue) {
            this.ngOnInit();
        }
    }

    /**
     * Renders the translation inside the element
     * @param {string} value
     */
    renderTranslation(value) {
        this.el.nativeElement.innerText = value;
    }

}