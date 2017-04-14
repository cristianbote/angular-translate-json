import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { AngularTranslateJsonModule } from '../index';

@Component({
    selector: 'basic-test',
    template: `
    <p>{{ translationKey | translate | async }}</p>
    `
})
class BasicTestComponent {
    translationKey;
}

@Component({
    selector: 'advanced-test',
    template: `
    <p>{{ translationKey | translate:translationData | async }}</p>
    `
})
class AdvancedTestComponent {
    translationKey;
    translationData;
}

describe('Translate Pipe', () => {

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
        fixture.componentInstance.translationKey = 'COMMON.HELLO';
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement as HTMLElement;
        expect(el.querySelector('p').textContent).toBe('Hello');
    }));

    it('Advanced functionality', async(() => {
        const fixture = TestBed.createComponent(AdvancedTestComponent);
        fixture.componentInstance.translationData = { userName: 'John' };
        fixture.componentInstance.translationKey = 'COMMON.HELLO_USER';
        fixture.detectChanges();

        const el = fixture.debugElement.nativeElement as HTMLElement;
        expect(el.querySelector('p').textContent).toBe('Hello John');
    }));
});