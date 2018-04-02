/* eslint-env node */

const Case = require('case');
const walkSync = require('walk-sync');

module.exports = {
  description: 'Generates a new post',

  locals(options) {

    let author;

    if(options.author) {
      author = Case.kebab(options.author)
    } else {
      // search for existing author files if they exist
      const authors = walkSync('author', {
        globs: ['*.md'],
      });

      if (authors.length === 1) {
        author = authors[0].replace(/\.md$/, '');
      } else if (authors.length > 1) {
        // eslint-disable-next-line no-console
        console.log('Available Authors:', authors.map(file => file.replace(/\.md$/, '')));
        throw new Error('More than one author created, specify which author you want to use with `ember g post something --author=your-name`');
      }
    }

    if(!author) {
      throw new Error('You must create an author first. Use `ember g author your-name` to create an author');
    }

    return {
      title: Case.title(options.entity.name),
      name: Case.kebab(options.entity.name),
      author: Case.kebab(author),
      date: (new Date()).toString()
    };
  }
};
