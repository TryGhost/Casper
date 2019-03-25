import { helper } from '@ember/component/helper';

export function is() {
  throw new Error('The Ghost `is` helper is not supported in empress-blog');
}

export default helper(is);
