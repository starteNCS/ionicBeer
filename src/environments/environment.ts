// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyDmbOctEmHKMrKbw8GT29S9OZcgKRZDLJM",
    authDomain: "adinex-beer.firebaseapp.com",
    databaseURL: "https://adinex-beer-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "adinex-beer",
    storageBucket: "adinex-beer.appspot.com",
    messagingSenderId: "642372549119",
    appId: "1:642372549119:web:0c0ac71b3232265693cfca",
    measurementId: "G-QCYNQ7GPFT"
  },
  apiBaseUrl: "http://localhost:3000"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
