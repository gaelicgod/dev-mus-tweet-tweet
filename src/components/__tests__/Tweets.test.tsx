import React from "react";
import { render, screen, within } from '@testing-library/react';
import Tweets from "../Tweets";

test("it renders example Tweets",() => {
    const testTweets: string[] = [
        "This is a test tweet"
    ]
    render(<Tweets tweets={testTweets} />);
    const exampleTweet = screen.getByText(/test\stweet/);
    expect(exampleTweet).toBeInTheDocument();

    const htmlList = screen.getByRole("list", { name: /tweets/i });
    const { getAllByRole } = within(htmlList);
    const items = getAllByRole("listitem");
    expect(items.length).toBe(1);
    
});
