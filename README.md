# About Mail7
[​Mail7.io](https://www.mail7.io/) is a service that allows receiving emails at a temporary address that self-destructed after 24 hours. It is the most advanced throwaway email service that helps you avoid spam and stay safe in such cases.

## Installation
````
npm i --save mail7
````
## Configuration
Replace the placeholders in the config object with your mail7 credentials apikey and apisceret. These can be obtained from [here](https://console.mail7.io/admin/inbox/private)
````
var  config = {
     apiKey:  '<mail7 apikey>',
     apiSecret:  '<mail7 apisecret>'
}
````

> *Don't have Mail7 Account ? Create you own account [here](https://mail7.io) and get your apikey and apisecret*

Require the `mail7` package and pass the config object
```
var mail7 = require('mail7')(config);
```
## Usage
````
mail7.getInboxByEmail("<example-email@mail7.io>").then((response) => {
   console.log(response);
}).catch((error) => {
   console.log(error);
});
````

> *The detailed document for apis parameters, body and output format, you can go through the mail7 [documents](https://docs.mail7.io/overview)*

### Inbox APIs:

 - **[getInboxByEmail(to)](https://docs.mail7.io/mail-apis/get-email)**
 - **[getEmailById(to, mesid)](https://docs.mail7.io/mail-apis/get-single-email)**
 - **[deleteEmailById(mesid, domain)](https://docs.mail7.io/mail-apis/delete-email)**

 #### Params
- *@param {string} to - full email address or username for example `testme` or `testme@mail7.io`*
- *@param {string} mesgid - the id of particular email object*
- *@param {string} domain - the domain name email is created by*

 > *As mail7 support custom domain, so you can use any email like example@testme.com. But you no need to pass this domain explicitly in function param as domain will be fetched from email. But make sure that your mail7 plan included the custom domain email addresses*
 
### Routing Rules APIs:

- **[getRoutingRules()](https://docs.mail7.io/routing-rules/get-rules)**
- **[createRoutingRules(data)](https://docs.mail7.io/routing-rules/create-update-rule)**
- **[deleteRoutingRules(ruleName)](https://docs.mail7.io/routing-rules/delete-rule)**

#### Params
- *@param {object} data - json object for roles need to be create*
- *@param {string} ruleName - rule to be delete*

> *If only username `testme` is passed then it will be treated as default `mail7.io` domain email like `testme@mail7.io`*

It is suggested that pass full email address for any other domain like `testme@domain1.com`