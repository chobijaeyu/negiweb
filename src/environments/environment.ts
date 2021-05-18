// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost:8080",
  imgUrl:"https://storage.googleapis.com/negiimg/",
  
  firebase: {
    apiKey: "AIzaSyC8KmZ5V6wrA09h2KUkUYUDBP6ZEUjPkLo",
    authDomain: "negi-304307.firebaseapp.com",
    projectId: "negi-304307",
    storageBucket: "negi-304307.appspot.com",
    messagingSenderId: "25092095791",
    appId: "1:25092095791:web:dd6357f5fd83d053d7ebda",
    measurementId: "G-EBZDQS4D1G"
  },

  nonce: "09876xyz",
  redirect_uri: "http://localhost:3990/auth/callback",
  LineLoginChannelID: "1655653188",
  LineLoginChannelSecret: "dc75693ad26f8604e3180917e661279c",
  firebaseLineFuncURL: "https://asia-northeast2-negi-304307.cloudfunctions.net/negiLineLogin",
  operatinglogpath : "samurainegi/log/operatelog",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
