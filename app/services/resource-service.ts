import {Injectable, EventEmitter} from "angular2/core";
@Injectable()
export class ResourceService {
    public data = [];
    public key:String;
    public order = [];
    public previousData = [];
    private static _pipedDataEmitter;
    public footer = [];

    public footerSummary() {
        this.footer = [];
        console.log("trying calculate footer:", this.data);
        this.data.forEach((row) => {
            for (var value in row) {
                if (row.hasOwnProperty(value)) {
                    if (typeof row[value] === "number") {
                        if (typeof this.footer[value] === "undefined") {
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

    static getPipedData():EventEmitter<any> {
        if (!this._pipedDataEmitter) {
            this._pipedDataEmitter = new EventEmitter();
        }
        console.log("this._pipedDataEmitter: ", this._pipedDataEmitter);
        return this._pipedDataEmitter;
    }

    public getOrder() {
        return this.order[this.key];
    };

    public sortBy(key) {
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
        return this.data;
    };

    private compare(a, b) {
        if ((isNaN(parseFloat(a[this.key])) || !isFinite(a[this.key])) || (isNaN(parseFloat(b[this.key])) || !isFinite(b[this.key]))) {
            if (a[this.key].toLowerCase() < b[this.key].toLowerCase()) return -1;
            if (a[this.key].toLowerCase() > b[this.key].toLowerCase()) return 1;
        }
        else {
            if (parseFloat(a[this.key]) < parseFloat(b[this.key])) return -1;
            if (parseFloat(a[this.key]) > parseFloat(b[this.key])) return 1;
        }

        return 0;
    };
}
