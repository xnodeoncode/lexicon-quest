/*************************************************************************************
 * Service provider to fetch records from the dictionary API.
 *************************************************************************************/

/*************************************************************************************
 * Import the ApplicationConfiguration class from the appConfig.js file.
 * The ApplicationConfiguration class is used to provide the API key and the API URL.
 ************************************************************************************/
import { ApplicationConfiguration } from "../../../appConfig.js";

/********************************************************************
 * Class definition.
 ********************************************************************/
export class DictionaryService {
  constructor() {
    this.APIKey = null;
    this.RequestUrl = null;
    this.init();
  }

  /********************************************************************
   * init() | Void: This method initializes the API key and the API URL.
   ********************************************************************/
  init() {
    var appConfig = new ApplicationConfiguration();
    this.APIKey = appConfig.APIKey;
    this.RequestUrl = appConfig.APIUrl;
  }

  /********************************************************************
   * fetchTerm() | string: This method fetches a term from the dictionary API.
   ********************************************************************/
  async fetchTerm() {
    try {
      const response = await fetch(this.RequestUrl, {
        method: "GET", // string or object
        headers: {
          "X-Api-Key": this.APIKey,
        },
      });
      const jsonResponse = await response.json(); //extract JSON from the http response
      console.log(`New term found. ${jsonResponse}.`);
      return jsonResponse.word[0];
    } catch (e) {
      console.log("fetch word error:", e);
      throw e;
    }
  }
}
