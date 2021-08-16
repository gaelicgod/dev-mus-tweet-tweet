# dev-mus-tweet-tweet
This is a sample project based on a brief I received.
We are creating a low key Twitter clone. (Very, very simple).

### **Thoughts**
Used react create project to make a simple viewer based around some sample text files (*users text* file and *tweets text* file). You can also upload your own sample files.
To run this project just go with the following cmds:
- `yarn install --production=false`
- `yarn build`
- `yarn start`.

To run the tests for this project:
- `yarn test`

## Project Notes
- Decided to do the project in react with typescript as I prefer doing it this way (there's no pretty console.logs).
- Due to time constraints I have not set a Type for every variable. (Some have var: any set to them).
- I have also provided rudimentary error handling, for checking the file formats esp. when uploading.
- The script loads the sample text files provided at runtime by default.
- Provided an interface to allow file uploads, one for the users file and one for the tweets file.
- It reads the uploaded files as `ascii`. I am assuming based on brief that files will indeed be `ascii`.
- I have included some test data with text like `Björn`.
- This gets validated on upload by default, but the rudimentary error message will only display when the user clicks to submit the files.
- Upon uploading new files and processing them, the system will clear the `users` object and `tweets` array.
- I did think about providing a fallback to rewind the state in case the new files provided were incorrect for some reason and we wish to return to the original state. I deemed it out of scope, also time constraints.
- Also made sure the `users` object got converted into an alphbetically sorted obj before final use. (Could probably merge that step into one after the original setup of the user object was done).
- Also made sure that the `formatTweet` function limited the tweets to `280` characters set via a variable.
- Both the users and tweets files are validated via `isValidUserData` and `isValidTweetData` respectively.
- while I initially wrote this using higher scoped variables for `users` and `tweets`, I changed the code to make it more localized so that it would be more testable.