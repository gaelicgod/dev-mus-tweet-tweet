import React from 'react';
import {
  formatTweet,
  sortTweets,
  sortUsers,
  isValidUserData,
  isValidTweetData,
} from '../reader';

let userData: string;
let tweetData: string;

describe("testing the reader.ts file", () => {
  beforeAll(() => {
    userData = `Björn follows Kenny, Rob
      Kenny follows Björn`;
    
    tweetData = `Rob> New tech is great.
      Björn> Special day today.
      Kenyah> This tweet won't appear.
    `;
  });

  test("test sortTweets returns empty string if there's no '>'", () => {
    const testString = "TestUser is tweeting: What a great day";
    const response = sortTweets(testString);
    expect(response).toEqual([]);
  });

  test("test formatTweet returns an empty string if there's no '>'", () => {
    const testTweet = "Michael If your linter tortures you, its complexity and we're building?";
    const response = formatTweet(testTweet);
    expect(response).toEqual("");
  });

  test("test formatTweet returns '@Michael: It works!", () => {
    const testTweet = "Michael> It works!";
    const correctResponse = "@Michael: It works!";
    const response = formatTweet(testTweet);
    expect(response).toBe(correctResponse);
  });

  test('test formatTweet trims a long tweet to 280 chars, excludes tweeter name', () => {
    const longTweet = `Gabriel> Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec.`;
    const correctResponse = `@Gabriel: Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat mas`;
    const response = formatTweet(longTweet);
    expect(response).toBe(correctResponse);
  });

  test("test that sortUsers throws an error when empty string is passed", () => {
    const users = sortUsers("");
    expect(users).toEqual({});
  });

  test("test that sortUsers a proper formatted object", () => {
    const users = sortUsers(userData);
    const correctResponse = {
      "Björn": ["Björn", "Kenny", "Rob"],
      "Kenny": ["Kenny", "Björn"],
      "Rob": ["Rob"] 
    };
    expect(users).toEqual(correctResponse);
  });

  test("test that isValidUserData returns true for valid user data", () => {
    expect(isValidUserData(userData)).toBe(true);
  });

  test("test that isValidUserData returns false for an invalid string", () => {
    expect(isValidUserData("")).toBe(false);
  });

  test("test that isValidTweetData returns true for valid tweet data", () => {
    expect(isValidTweetData(tweetData)).toBe(true);
  });

  test("test that isValidTweetData returns false for an invalid string", () => {
    expect(isValidTweetData("")).toBe(false);
  });
});
