## Validate your domain using the [Universal Links Validator](https://branch.io/resources/universal-links/) ##

The [first version of this tool](https://github.com/shortstuffsushi/Universal-Link-Validator) was created by Graham, a previous Branch employee. He understood the pain that developers were going through when confirming to Apple's requirements of hosting the apple-app-site-association. Our version of the tool is largely built on his open-source framework, but takes a few more aspects of apple-app-site-association into consideration.

Branch’s Site Validator for Universal Links builds upon knowledge gained from troubleshooting various setups from [Jack's 51 iOS 9 Apps that Support Universal Links](http://www.jackivers.me/blog/2015/9/17/list-of-universal-link-ios-9-apps). If a Universal Link worked on our iOS 9.2 devices, we went back to the tool to understand whether the apple-app-site-association file validated correctly or not. If it didn't, we tried to understand why and made the tool validate it. During the process, we learned a lot about apple-app-site-association file configurations for Universal Links. 

As a result, the Universal Links Validator tool will test for the following when you type in your domain:

1. That your domain has valid DNS.

2. That your apple-app-site-assoication file is served over https at the root of your domain i.e. https://<your-domain.com>/apple-app-site-association

3. That your apple-app-site-association file's 'content-type' header is set to one of the following MIME types:

  * application/pkcs7-mime
  * application/octet-stream
  * application/json
  * text/json
  * text/plain

4. The fact that your server does not return an error code greater than or equal to 400.

5. That the content in your file can be parsed as JSON.

6. That the JSON in your file has the appropriate paths entered.

7. That the combination of your Apple-App-Prefix and Bundle Identifier that comprise the appId is available in the JSON file (optional).

The original tool used validation rules that were more restrictive. Branch's tool is a little bit different in the sense that the requirements for a successful validation of your apple-app-site-association file are closer to what we have found works in production.

## Below is what the tool does not check for: ##

1. The apple-app-site-association file being behind any sort of redirection scheme.

2. The apple-app-site-association file being CMS signed by a valid TLS certificate.

3. Whether your Xcode project is setup correctly.

Also, our tool allows for many more content type headers on the file other than just application/pkcs7-mime (again this comes from production data).

### Dependencies

1. Install nodejs version 4.2.4 (use npm install n -g to manage multiple node version)
2. Install npm modules: npm install

### Running it

1. Clone the repository

2. Open config.json and update port to 8000

3. `cd` into the repository

4. Run `npm start` or `node index.js`

5. Wait for the server to start and then open http://localhost:8000/resources/aasa-validator/ in your web browser.
