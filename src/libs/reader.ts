
import "whatwg-fetch";
//@ts-ignore
import userText from "../txt/user.txt";
//@ts-ignore
import tweetText from "../txt/tweet.txt";

interface FinalOutputDict {
    [key: string]: any;
}

const LINE_ENDINGS = /\r\n|\n\r|\n|\r/g;

const followKeyword = "follows";
let users: {[key: string]: string[]} = {};
let tweets: string[] = [];

const isValidUserData = (userData: string): boolean => {
  if (userData !== "") {
    const dataList = userData.split(LINE_ENDINGS);
    let isValiddData: boolean = true;
    
    dataList.forEach((value) => {
      if (value.trim() === "" && value.indexOf(followKeyword) < 1) {
        isValiddData = false;
      }
    });
    return isValiddData;
  }
  return false;
}

const isValidTweetData = (tweetData: string): boolean => {
  if (tweetData !== "") {
    const dataList = tweetData.trim().split(LINE_ENDINGS);
    let isValiddData: boolean = true;
    dataList.forEach((value) => {
      if (value.indexOf('>') < 1) {
        isValiddData = false;
      }
    });
    return isValiddData;
  }
  return false;
}

const loadData = async () => {
    const userDataResponse = await fetch(userText);
    const tweetDataResponse = await fetch(tweetText);

    if (userDataResponse && tweetDataResponse && userDataResponse.ok && tweetDataResponse.ok) {
      const userData = await userDataResponse.text();
      const tweetData = await tweetDataResponse.text();

      users = sortUsers(userData);
      tweets = sortTweets(tweetData);
      return mapUserTweets();
    }
    return {};
}

const sortUsers = (userFileData: string) => {
    let localUsers: {[key: string]: string[]} = {};
    if (isValidUserData(userFileData)) {
      const uLines = userFileData.split(LINE_ENDINGS);
      if (uLines.length) {
        uLines.forEach((userValue: string) => {
          localUsers = {...localUsers, ...sortUser(userValue, localUsers)};
        });
      }
    }
    return localUsers;
}

const sortUser = (userLine: string, localUsers: {[key: string]: string[]} = {}) => {
  if (userLine.includes(followKeyword)) {
    const data = userLine.split(followKeyword);
    const follower = data[0].trim();
    const followed = data[1].split(",").map((fp: string) => {
      return fp.trim();
    });
    if (follower != "") { // sanity check to make sure that string didn't start with " >"
      if (Object.hasOwnProperty.call(localUsers, follower)) {
        localUsers[follower] = Array.from(new Set([...localUsers[follower], ...followed]).values());
      } else {
        localUsers[follower] = [follower, ...followed];
      }
  
      // map followed onto the users object since they are users as well
      followed.forEach((follow: string) => {
        if (!Object.hasOwnProperty.call(localUsers, follow)) {
          localUsers[follow] = [follow];
        }
      });
      return localUsers;
    }
    return {};
  } else {
    console.error("Follow Keyword not found in input data!");
  }
}

const sortTweets = (tweetData: string) => {
  const localTweets: string[] = [];
  if (isValidTweetData(tweetData)) {
    const tweetLines = tweetData.split(LINE_ENDINGS);
    tweetLines.forEach((tweetLine: string) => {
      localTweets.push(tweetLine);
    });
  }
  return localTweets;
}

const mapUserTweets = () => {
  const finalOutput: FinalOutputDict = {};
  const sorted_users: any = Object.keys(users)
    .sort()
    .reduce((val: any, key) => ({
      ...val, [key]: users[key]
    }), {});

  for (const item in sorted_users) {
    const tweetGroup = users[item];
    if (tweetGroup && tweetGroup.length) {
      const tweetBlocks: string[] = [];
      tweets.forEach((tweet) => {
        const t = tweet.split(">").map((val) => {
          return val.trim();
        });
        if (users[item].includes(t[0])) {
          tweetBlocks.push(formatTweet(tweet));
        }
      });
      finalOutput[item] = tweetBlocks;
    }
  }
  return finalOutput;
}

const formatTweet = (tweetLine: string) => {
  if (tweetLine && tweetLine.indexOf(">") > 0) { // we check for > 0 because the ">" can"t be the first char as we use that to split on.
      const data = tweetLine.split(">");
      const characterLimit = 280; // specified by brief.
      if (data && data.length === 2) {
          const tweeter = data[0].trim();
          const tweet = data[1].trim();
          return `@${tweeter}: ${limitTweet(tweet, characterLimit)}`;
      }
  }
  return "";
};

const limitTweet = (tweet: string, characterLimit: number) => {
  if (tweet.length > characterLimit) {
    return tweet.substr(0, characterLimit);
  }
  return tweet;
}

const processFileData = (userData: string, tweetData: string, updateDisplay: any) => {
  // reset the users and tweets array.
  users = {};
  tweets = [];
  users = sortUsers(userData);
  tweets = sortTweets(tweetData);
  const updatedFinalOutput = mapUserTweets();
  updateDisplay(updatedFinalOutput);
}



export {
  processFileData, loadData, sortTweets, formatTweet, sortUsers,
  isValidUserData, isValidTweetData, mapUserTweets
};
