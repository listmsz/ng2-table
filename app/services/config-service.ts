import {Injectable} from "angular2/core";
@Injectable()
export class ConfigService {
    public searchEnabled = true;
    public orderEnabled = true;
    public globalSearchEnabled = true;
    public footerEnabled = true;
    public resourceUrl = "http://beta.json-generator.com/api/json/get/Nyl81BFTg";
}
