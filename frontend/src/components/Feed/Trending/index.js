import React from "react";
import "./Trending.css";

function Trending() {
  return (
    <div className="trending">
      <div className="trending-title">Trending today</div>
      <div className="tending-feed">
        <div className="tending-article">
          <div className="t-a-title">Christmas Trees</div>
          <div className="t-a-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit Maecenas
            semper magna risus, in rutrum erat sollicitudin ut.
          </div>
          <div className="t-a-community">
            <div className="t-a-c-logo"></div>
            <div className="t-a-c-name">r/interestingasheck and more</div>
          </div>
        </div>
        <div className="tending-article">
          <div className="t-a-title">Jan. 6 Committee</div>
          <div className="t-a-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elitf Maecenas
            semper magna risus, in rutrum erat sollicitudin ut.
          </div>
          <div className="t-a-community">
            <div className="t-a-c-logo"></div>
            <div className="t-a-c-name">r/politics and more</div>
          </div>
        </div>
        <div className="tending-article">
          <div className="t-a-title">Zimbabwe Raw Lithium Export Ban</div>
          <div className="t-a-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elitf Maecenas
            semper magna risus, in rutrum erat sollicitudin ut.
          </div>
          <div className="t-a-community">
            <div className="t-a-c-logo"></div>
            <div className="t-a-c-name">r/technology and more</div>
          </div>
        </div>
        <div className="tending-article">
          <div className="t-a-title">Sam Bankman-Fried</div>
          <div className="t-a-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit Maecenas
            semper magna risus, in rutrum erat sollicitudin ut.
          </div>
          <div className="t-a-community">
            <div className="t-a-c-logo"></div>
            <div className="t-a-c-name">r/worldnews and more</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trending;
