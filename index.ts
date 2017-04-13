// Imports
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';

// Declarations
import { TranslateDirective } from './src/translate.directive';
import { TranslateService } from './src/translate.service';
import { TranslatePipe } from './src/translate.pipe';

// Exports
export { TranslateService } from './src/translate.service';
export { TranslateDirective } from './src/translate.directive';
export { TranslatePipe } from './src/translate.pipe';

@NgModule({
    imports: [
        HttpModule
    ],
    declarations: [
        TranslateDirective,
        TranslatePipe
    ],
    exports: [
        TranslateDirective,
        TranslatePipe
    ]
})
export class AngularTranslateJsonModule {

    public static forRoot(): ModuleWithProviders {
        return {
            ngModule: AngularTranslateJsonModule,
            providers: [
                TranslateService
            ]
        }
    }

}