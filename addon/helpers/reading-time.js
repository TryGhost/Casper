import { helper } from '@ember/component/helper';
import { wordCount, imageCount } from './utils';
import _ from 'lodash';

export function readingTime([post], hash) {
  var html,
      wordsPerMinute = 275,
      wordsPerSecond = wordsPerMinute / 60,
      readingTimeSeconds,
      readingTimeMinutes,
      readingTime,
      images,
      words,
      minute = _.isString(hash.minute) ? hash.minute : '1 min read',
      minutes = _.isString(hash.minutes) ? hash.minutes : '% min read';

  html = post.html;
  images = post.image ? 1 : 0;
  images += imageCount(html);
  words = wordCount(html);
  readingTimeSeconds = words / wordsPerSecond;

  for (var i = 12; i > 12 - images; i -= 1) {
      // add 12 seconds for the first image, 11 for the second, etc. limiting at 3
      readingTimeSeconds += Math.max(i, 3);
  }

  readingTimeMinutes = Math.round(readingTimeSeconds / 60);

  if (readingTimeMinutes <= 1) {
      readingTime = minute;
  } else {
      readingTime = minutes.replace('%', readingTimeMinutes);
  }

  return readingTime;
}

export default helper(readingTime);
