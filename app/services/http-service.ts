import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {ConfigService} from "./config-service";
@Injectable()
export class HttpService {
  constructor(public http:Http,
              public config:ConfigService) {

  }

  public getData() {
    return this.http.get(this.config.resourceUrl)
      .map((responseData) => {
        return responseData.json();
      });
  }
}
