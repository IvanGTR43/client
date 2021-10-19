import React from 'react';
import { FacebookFilled, TwitterSquareFilled, YoutubeFilled, LinkedinFilled } from "@ant-design/icons"
import "./SocialLinks.scss";
export default function SocialLinks(props) {
  return (
    <div className="social-links">
      <ul>
        <li key="1">
          <a href="https://www.facebook.com/ivangtr4343"target="_blank" rel="noreferrer">
            <FacebookFilled style={{color: "#3b5998"}}/>
          </a>
        </li>
        <li key="2">
          <a href="https://twitter.com" target="_blank" rel="noreferrer">
            <TwitterSquareFilled style={{color: "#1da1f2"}}/>
          </a>
        </li>
        <li key="3">
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <YoutubeFilled style={{color: "#cd201f"}}/>
          </a>
        </li>
        <li key="4">
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <LinkedinFilled style={{color: "#0077b5"}}/>
          </a>
        </li>
      </ul>
    </div>
  );
};
