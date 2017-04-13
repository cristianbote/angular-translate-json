import { Pipe } from '@angular/core';
import { TranslateService } from './translate.service';

@Pipe({ name: 'translate' })
export class TranslatePipe {

    constructor( private translationService: TranslateService ) {}

    /**
     * Handle the pipe transform for translations. Always use `async` pipe afterwards!
     * @param {string} input
     * @param {object} model
     * @returns {Observable}
     */
    transform(input: string, model) {
        return this.translationService
            .getTranslation(input, model);
    }
}