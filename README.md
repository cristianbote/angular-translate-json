# Angular(latest) Translate Json
Inspired by https://github.com/angular-translate/angular-translate

It's built to support latest angular version, with a friendly to use api.

## How it works

##### 1. Define the module and configurations
```typescript
// Imports
import { Angular2TranslateJsonModule, TranslateService } from 'angular-translate-json';


// Import it
@NgModule({
    imports: [
        Angular2TranslateJsonModule.forRoot(),
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
            <div class="greet" translate="HELLO"></div>
            <div class="greet" translate="HELLO_USER" [translateValues]="userData"></div>
        </div>
    `
})
class MyComponent {
    userData = {
        userName: 'johnsnow'        
    }
}
```