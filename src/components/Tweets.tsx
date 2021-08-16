import React from "react";

interface TweetProps {
  tweets: string[];
}

const Tweets: React.FC<TweetProps> = (props: TweetProps) => {
  const {tweets} = props;
  return (
    <ul aria-label="tweets">
      {tweets && tweets.map((val, idx) => {
        return <li key={`t_${idx}`}>{val}</li>
      })}
    </ul>
  )
}

export default Tweets;
