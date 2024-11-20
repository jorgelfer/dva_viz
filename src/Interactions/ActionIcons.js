import cursorImg from "../assets/cursor.png";
import brushImg from "../assets/brush.png";

export default function ActionIcons(action) {

  switch (action) {
    case "cursor":
      return cursorImg;
    case "brush":
      return brushImg;
    default:
      return null;
  };

};