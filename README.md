# nodejs-iota-web-confirm
A simple web app in nodejs to show confirmed IOTA transactions in a chart showing the message, tokens sent and identifying what range of tokens.


To load in Gitpod (the easy online Docker) click this link https://gitpod.io/#github.com/hpssjellis/nodejs-iota-web-confirm

This is just suppossed to be a starting point. Made August 22nd, 2019 and will probably be deprecated fairly soon

```npm install ```

``` npm start```

Open a web browser to whatever URL your node program suggests

1. Using your Trinity Wallet send IOTA to the below receive address
1. On confirmation of IOTA being sent using your Trinity Wallet, click the Submit button on the web app
1. If the chart does not update, click the "reload" button on the web app until your IOTA is confirmed in the chart
1. May need to click the "reload" button again to get a new recieve address





```
"express": "^4.17.1",
"@iota/core" : "^1.0.0-beta.21",
"@iota/mam": "^0.7.3",
"@iota/transaction-converter": "^1.0.0-beta.21",
"@iota/converter": "^1.0.0-beta.21",
"zeromq": "^5.1.0"

```
check npm search iota/core to get to

https://www.npmjs.com/package/express then click on "version"

https://www.npmjs.com/package/@iota/core then click on "version"

https://www.npmjs.com/package/@iota/converter then click on "version"

I don't actually yet use the other onces

https://www.npmjs.com/package/@iota/mam then click on "version"

https://www.npmjs.com/package/@iota/transaction-converter then click on "version"

https://www.npmjs.com/package/@iota/zeromq then click on "version"

By Jeremy Ellis Twitter @rocksetta Use at your Own Risk!

Do not use your main IOTA seed but setup a temporary seed for any projects.
