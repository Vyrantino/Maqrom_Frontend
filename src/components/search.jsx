import React from "react";

export default function Search(props) {
  return (
    <>
      <input
        id="search"
        type="text"
        onChange={props.onSearch}
        value={props.search}
      />
      <label id="search" htmlFor="search">
        Search:{" "}
      </label>
    </>
  );
}
