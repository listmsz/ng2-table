import {Injectable} from "angular2/core";
@Injectable()
export class FiltersService {
    public filters = [];
    update(k, v) {
        this.filters[k] = v;
    };

    get() {
        return this.filters;
    }
}
