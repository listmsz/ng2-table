![Imgur](http://i.imgur.com/gwjpUqe.png "logo")


[![npm version](https://badge.fury.io/js/ng2-easy-table.svg)](https://badge.fury.io/js/ng2-easy-table)

Early alpha version. Do not add it to page, it is highly unstable.
Beta will be available around 10th of April 2016


This table always will be easy to add to every page.
You need to add only `<ng2-table></ng2-table>` to your html page

```html
<div class="row">
    <div class="col-sm-12">
        <ng2-table></ng2-table>
    </div>
</div>
```

Don't forget to add styles:

```html
<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="node_modules/font-awesome/css/font-awesome.min.css">
```

![table](http://i.imgur.com/XoxX8gM.png "table")

To customize your table add `ConfigService` to the bootstrap :

```js
bootstrap(AppComponent, [FiltersService, ConfigService]);
```
and create this service:

```typescript
import {Injectable} from "angular2/core";
@Injectable()
export class ConfigService {
    public searchEnabled = true;
    public orderEnabled = true;
    // etc.
}
```

###Available config settings:

| field               |      type      |  options   | example                                     |
|---------------------|:--------------:|:----------:|---------------------------------------------|
| searchEnabled       | bool           | true false | public searchEnabled = true;                |
| orderEnabled        | bool           | true false | public orderEnabled = true;                 |
| paginationEnabled   | bool           | true false | public paginationEnabled = true;            |
| globalSearchEnabled | bool           | true false | public globalSearchEnabled = true;          |
| resourceUrl         | string         |            | public resourceUrl = "api/v1/persons.json"; |
