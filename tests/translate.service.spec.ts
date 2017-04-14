import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { AngularTranslateJsonModule, TranslateService } from '../index';

@Component({
    selector: 'basic-test',
    template: `
    <p>{{translatedContent}}</p>
    `
})
class ServiceTestComponent {

    translatedContent = '';

    constructor( private translateService: TranslateService ) {}

    testSimpleTranslation(key) {
        this.translateService.getTranslation(
            key
        ).subscribe(res => {
            this.translatedContent = res;
        });
    }

    testTranslationWithData(key, data) {
        this.translateService.getTranslation(
            key, data
        ).subscribe(res => {
            this.translatedContent = res;
        });
    }
}

describe('Translate Service', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AngularTranslateJsonModule.forRoot(
                    null,
                    {
                        COMMON: {
                            HELLO: 'Hello',
                            HELLO_USER: 'Hello {{userName}}'
                        }
                    }
                )
            ],
            declarations: [
                ServiceTestComponent
            ]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents();
    }));

    it('Basic functionality', async(() => {
        const fixture = TestBed.createComponent(ServiceTestComponent);
        const el = fixture.debugElement.nativeElement as HTMLElement;

        fixture.componentInstance.testSimpleTranslation('COMMON.HELLO');
        fixture.detectChanges();

        expect(el.querySelector('p').textContent).toBe('Hello');
    }));

    it('Advanced functionality', async(() => {
        const fixture = TestBed.createComponent(ServiceTestComponent);
        const el = fixture.debugElement.nativeElement as HTMLElement;

        fixture.componentInstance.testTranslationWithData('COMMON.HELLO_USER', { userName: 'Dude' });
        fixture.detectChanges();

        expect(el.querySelector('p').textContent).toBe('Hello Dude');
    }));
});