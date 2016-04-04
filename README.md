![Imgur](http://i.imgur.com/gwjpUqe.png "logo")


[![npm version](https://badge.fury.io/js/ng2-easy-table.svg)](https://badge.fury.io/js/ng2-easy-table)
[![Build Status](https://travis-ci.org/ssuperczynski/ng2-easy-table.svg?branch=master)](https://travis-ci.org/ssuperczynski/ng2-easy-table)

Early alpha version. Do not add it to the page, it is highly unstable.
Beta will be available around 8th of April 2016


This table always will be easy to add to every page.
You need to add only `<ng2-table></ng2-table>` to your html page

```html
<div class="container">
    <ng2-table></ng2-table>
</div>
```

![table](http://i.imgur.com/diYGEMy.png "table")

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
| exportEnabled       | bool           | true false | public exportEnabled = true;                |
| orderEnabled        | bool           | true false | public orderEnabled = true;                 |
| paginationEnabled   | bool           | true false | public paginationEnabled = true;            |
| globalSearchEnabled | bool           | true false | public globalSearchEnabled = true;          |
| resourceUrl         | string         |            | public resourceUrl = "api/v1/persons.json"; |


run tests by typing:
`node_modules/karma/bin/karma start karma.conf.js --single-run`