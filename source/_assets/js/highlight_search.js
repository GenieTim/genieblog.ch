// From https://gist.github.com/evenfrost/1ba123656ded32fb7a0cd4651efd4db0
const highlight = (fuseSearchResult, highlightClassName = "highlight") => {
  console.log("search result to highlight", fuseSearchResult);
  const set = (obj, path, value) => {
    const pathValue = path.split(".");
    let i;

    for (i = 0; i < pathValue.length - 1; i++) {
      obj = obj[pathValue[i]];
    }

    obj[pathValue[i]] = value;
  };

  const generateHighlightedText = (inputText, regions = []) => {
    let content = "";
    let nextUnhighlightedRegionStartingIndex = 0;

    regions.forEach((region) => {
      const lastRegionNextIndex = region[1] + 1;

      content += [
        inputText.substring(nextUnhighlightedRegionStartingIndex, region[0]),
        `<span class="${highlightClassName}">`,
        inputText.substring(region[0], lastRegionNextIndex),
        "</span>",
      ].join("");

      nextUnhighlightedRegionStartingIndex = lastRegionNextIndex;
    });

    content += inputText.substring(nextUnhighlightedRegionStartingIndex);

    return content;
  };

  return fuseSearchResult
    .filter(({ matches }) => matches && matches.length)
    .map(({ item, matches }) => {
      const highlightedItem = { ...item };

      matches.forEach((match) => {
        set(
          highlightedItem,
          match.key,
          generateHighlightedText(match.value, match.indices)
        );
      });

      console.log(highlightedItem);
      return highlightedItem;
    });
};
export default highlight;

// usage:
// const res = highlight(fuse.search(text)); // array of items with highlighted fields
