/*************************************************************************************
 * Service provider to fetch records from the dictionary API.
 *************************************************************************************/

/*************************************************************************************
 * Import the ApplicationConfiguration class from the appConfig.js file.
 * The ApplicationConfiguration class is used to provide the API key and the API URL.
 ************************************************************************************/
let ApplicationConfiguration;

if (window.location.hostname === "127.0.0.7") {
  ApplicationConfiguration = await import("../../../appConfig.js");
} else {
  ApplicationConfiguration = await import("./serviceConfiguration.js");
}

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
    var appConfig = new ApplicationConfiguration.ApplicationConfiguration();
    this.APIKey = appConfig.APIKey;
    this.RequestUrl = appConfig.APIUrl;
  }

  /********************************************************************
   * fetchTerm() | string: This method fetches a term from the dictionary API.
   ********************************************************************/
  async fetchTerm() {
    let term = "";
    if (this.RequestUrl !== null && this.APIKey !== null) {
      try {
        const response = await fetch(this.RequestUrl, {
          method: "GET",
          headers: {
            "X-Api-Key": this.APIKey,
          },
        });
        const jsonResponse = await response.json(); //extract JSON from the http response
        console.log(`New term found. ${jsonResponse}.`);
        term = jsonResponse.word[0];
      } catch (e) {
        console.log("fetch word error:", e);
        throw e;
      }
    }
    return term;
  }
}
