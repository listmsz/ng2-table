import {Component} from 'angular2/core';
import {ResourceService} from "../../services/resource-service";
@Component({
    selector: 'csv-export',
    template: `<button class="ng2-table__csv-export-button"
                    (click)="exportCsv()">Export to CSV
                </button>`
})

export class CsvExport {
    constructor(public resource:ResourceService) {
    }

    public exportCsv = () => {
        let data = this.resource.data;
        let csvContent = "data:text/csv;charset=utf-8,";
        let dataString = "";
        let x:Array<any> = [];
        data.forEach((row, index) => {
            x[index] = [];
            for (var i in row) {
                if (row.hasOwnProperty(i)) {
                    if (typeof row[i] === "object") {
                        row[i] = "Object"; // so far just change object to "Object" string
                    }
                    x[index].push(row[i]);
                }
            }
        });
        let header = this.resource.keys.join(",");
        csvContent += header + "\n";
        x.forEach((row, index) => {
            dataString = row.join(",");
            csvContent += index < data.length ? dataString+ "\n" : dataString;
        });
        const encodedUri = encodeURI(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "my_data.csv");

        link.click();
    }
}