import {combineReducers} from "redux";
import {reducer as data} from "./data/data.js";
import {reducer as user} from "./user/user.js";
import {reducer as comments} from "./comments/comments.js";
import NameSpace from "./name-space.js";

export default combineReducers({
  [NameSpace.COMMENTS]: comments,
  [NameSpace.DATA]: data,
  [NameSpace.USER]: user,
});

