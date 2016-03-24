import {Injectable, EventEmitter} from "angular2/core";
@Injectable()
export class ResourceService {
    resourceChange: EventEmitter<boolean> = new EventEmitter();
    constructor() {}
    public data = [];
    public key:String;
    public order = [];
    public footer = [];
    public emitResourceChangeEvent() {
        this.resourceChange.emit(true);
    }
    public getResourceChangeEmitter() {
        return this.resourceChange;
    }
    public getOrder = () => {
        return this.order[this.key];
    };
    public sortBy = (key) => {
        this.key = key;
        if (Object.keys(this.order).length === 0) {
            this.order[this.key] = 'asc';
        }
        if (this.order[this.key] === 'asc') {
            this.order = [];
            this.order[this.key] = 'desc';
            this.data.sort((a, b) => this.compare(a, b));
        } else {
            this.order = [];
            this.order[this.key] = 'asc';
            this.data.sort((a, b) => this.compare(b, a));
        }
    };

    public footerSummary = () => {
        this.footer = [];
        console.log("trying calculate footer:", this.data);
        this.data.forEach((row) => {
            for (var value in row) {
                if (row.hasOwnProperty(value)) {
                    if (typeof row[value] === "number") {
                        if(typeof this.footer[value] === "undefined") {
                            this.footer[value] = 0;
                        }
                        this.footer[value] = row[value] + this.footer[value];
                    } else {
                        this.footer[value] = "";
                    }
                }
            }
        });
        console.log("rendered: ", this.footer);
        return this.footer;
    };

    private compare = (a, b) => {
        if (a[this.key] < b[this.key]) {
            return -1;
        } else if (a[this.key] > b[this.key]) {
            return 1;
        } else {
            return 0;
        }
    };
}
