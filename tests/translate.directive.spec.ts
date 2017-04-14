import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { AngularTranslateJsonModule } from '../index';

@Component({
    selector: 'basic-test',
    template: `
    <p translate="COMMON.HELLO"></p>
    `
})
class BasicTestComponent {}

@Component({
    selector: 'advanced-test',
    template: `
    <p translate="COMMON.HELLO_USER" [translateValues]="translationData"></p>
    `
})
class AdvancedTestComponent {
    translationData;
}

describe('Translate Directive', () => {

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
                BasicTestComponent,
                AdvancedTestComponent
            ]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents();
    }));

    it('Basic functionality', async(() => {
        const fixture = TestBed.createComponent(BasicTestComponent);
        const el = fixture.debugElement.nativeElement as HTMLElement;
        fixture.detectChanges();

        expect(el.querySelector('p').textContent).toBe('Hello');
    }));

    it('Advanced functionality', async(() => {
        const fixture = TestBed.createComponent(AdvancedTestComponent);
        fixture.componentInstance.translationData = { userName: 'John' };
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement as HTMLElement;
        expect(el.querySelector('p').textContent).toBe('Hello John');
    }));
});