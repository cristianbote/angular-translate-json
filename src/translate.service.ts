import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

@Injectable()
export class TranslateService {

    private config = {
        path: '',
        locale: ''
    };

    private httpObservable;
    private cache;

    /**
     * Translation service
     * @param {Http} http
     */
    constructor( private http: Http ) {}

    /**
     * Returns the url for translation files
     * @returns {string}
     */
    private getTranslationFileUrl() {
        return `${this.config.path}/${this.config.locale}.json`
    }

    /**
     * Returns the property from a flat key
     * @param {string} key
     * @param {object} json
     * @returns {string|null}
     */
    private static getJsonValueFromFlatKey(key, json) {
        let levels = key.split('.');
        let latest;
        let i = 0;

        latest = json[levels[i]];

        while(latest) {
            i += 1;

            if (latest[levels[i]]) {
                latest = latest[levels[i]];
            } else {
                break;
            }
        }

        return latest;
    }

    /**
     * Compile the value with a given static model
     * @param {string} val
     * @param {object} model
     * @returns {string}
     */
    private static compile(val, model) {

        // If there's a model for translations
        if (model) {
            for (let p in model) {
                val = val.replace(new RegExp(['{{', p, '}}'].join(''), 'gm'), model[p]);
            }
        }

        return val;
    }

    /**
     * Sets the configuration for service
     * @param {object} configuration
     */
    public setConfig(configuration) {
        this.config = {
            locale: configuration.locale,
            path: configuration.path
        };
    }

    /**
     * Returns the translation
     * @param {String} key
     * @param {object} [model]
     * @returns {Observable}
     */
    public getTranslation(key: String, model: Object = {}): Observable<any> {
        return Observable.create((observer) => {

            // Let there be cache!
            if (this.cache) {
                let cachedValue = TranslateService.getJsonValueFromFlatKey(key, this.cache);
                observer.next(TranslateService.compile(cachedValue, model));
                observer.complete();
                return;
            }

            // Get the url
            let url = this.getTranslationFileUrl();

            // Cache the observable
            this.httpObservable = this.httpObservable || this.http.get(url).share();

            // Subscribe to it
            this.httpObservable.subscribe((res) => {
                let json = this.cache = res.json();
                let value = TranslateService.getJsonValueFromFlatKey(key, json);

                observer.next(TranslateService.compile(value, model));
                observer.complete();
            });
        });
    }
}