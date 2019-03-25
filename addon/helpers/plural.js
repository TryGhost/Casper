import { helper } from '@ember/component/helper';
import _ from 'lodash';

// # Plural Helper
// Usage example: `{{plural ../pagination.total empty='No posts' singular='1 post' plural='% posts'}}`
// or for translatable themes, with (t) translation helper's subexpressions:
// `{{plural ../pagination.total empty=(t "No posts") singular=(t "1 post") plural=(t "% posts")}}`
//
// Pluralises strings depending on item count
//
// The 1st argument is the numeric variable which the helper operates on
// The 2nd argument is the string that will be output if the variable's value is 0
// The 3rd argument is the string that will be output if the variable's value is 1
// The 4th argument is the string that will be output if the variable's value is 2+
export function plural([number], hash) {
  if (_.isUndefined(hash) || _.isUndefined(hash.empty) ||
      _.isUndefined(hash.singular) || _.isUndefined(hash.plural)) {
      throw new Error("you need to define `empty`, `singular` and `plural`");
  }

  if (number === 0) {
      return hash.empty.replace('%', number);
  } else if (number === 1) {
      return hash.singular.replace('%', number);
  } else if (number >= 2) {
      return hash.plural.replace('%', number);
  }
}

export default helper(plural);
