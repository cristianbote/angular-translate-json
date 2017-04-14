# Angular Translate Json
Translations module for latest version of angular. It's built to support latest angular version, with a friendly to use api.

> *Inspired by https://github.com/angular-translate/angular-translate*

[![npm version](https://badge.fury.io/js/angular-translate-json.svg)](https://badge.fury.io/js/angular-translate-json)

## How to get it
It's up on npm, so you can do:
```bash
npm install --save angular-translate-json
```

## How it works

##### 1. Define the module and configurations
```typescript
// Imports
import { AngularTranslateJsonModule, TranslateService } from 'angular-translate-json';


// Import it
@NgModule({
    imports: [
        AngularTranslateJsonModule.forRoot(),
    ]
})
class MyAngularModule {
    
    constructor( private translateService: TranslateService ) {
        
        // Set the translations configurations
        translateService.setConfig({
            locale: 'en',
            path: 'my/path/to/translations'
        });
    }
}
```
##### 2. Your translation file
And this is your `en.json` file
```json
{
  "COMMON": {
    "HELLO": "Hello mate!",
    "HELLO_USER": "Hello {{userName}}!"
  },
  "PAGE_TITLE": "Page title"
}
```

##### 3. Usage in component
Now, we're ready to use inside our components.
```typescript
@Component({
    template: `
        <div class="page">
            <div class="title" translate="PAGE_TITLE"></div>
            <div class="greet" translate="COMMON.HELLO"></div>
            <div class="greet" translate="COMMON.HELLO_USER" [translateValues]="userData"></div>
        </div>
    `
})
class MyComponent {
    userData = {
        userName: 'johnsnow'        
    }
}
```

##### 4. More options to use it
You could either use it as a atttribute(directive) or pipe, or simply by calling the service directly.
##### Directive
```html
<div class="greet" translate="COMMON.HELLO"></div>
```
##### Pipe or filter
```html
<div class="greet">{{'COMMON.HELLO' | translate}}</div>
```
##### Using the service
```typescript
import { TranslateService } from 'angular-translate-json';

@Component({
    template: `{{myNameIs}} {{name}}`
})
class NameBadgeComponent {
    
    myNameIs = '';
    name = 'John Snow';
    
    constructor( private translateService: TranslateService ) {
        translateService.getTranslation('COMMON.HELLO')
            .subscribe(res => {
                this.myNameIs = res;
            });
    }
    
}
```

## Feedback
Let me know if there's something broken and I'll be more than happy to address it.