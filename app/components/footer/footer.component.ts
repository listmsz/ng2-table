import {Component, Input} from "angular2/core";

@Component({
    selector: 'table-footer',
    templateUrl: 'app///components/footer/footer.html'
})

export class FooterComponent {
    @Input() footer;
}