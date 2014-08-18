function importResources(type, importUrl) {
  HTTP.get(importUrl, function (err, res) {
    var category = '',
      subcategory = '';

    if (err) {
      console.log('Couldnt load programming books for: ' + importUrl);
      return;
    }

    res.content.split('\n').compact(true).each(function (line) {
      var ct;

      if (line.startsWith('### ') || line.startsWith('## ')) {
        // Is a category
        category = line.remove(/[\#]+\s/g).trim();
        subcategory = '';
      } else if (line.startsWith('#### ')) {
        // Is a subcategory
        subcategory = line.remove('#### ').trim();
      } else if (line.has(/\[.+\]\(.*\)/g)) {
        // Is an item
        ct = category;

        if (subcategory) {
          ct += ' - ' + subcategory;
        }

        line.match(/(\[(.+)\])(\((.+)\))/g).each(function (book) {
          var bookParts = book.split(']('),
            name = bookParts[0].from(1).replace(/(\].+\[)/g, ' - '),
            url = bookParts[1].slice(0, -1).remove(/(\)|\(|\[|\]).+/g);

          if (url.startsWith('http')) {
            Resources.insert({ name : name, link : url, type : type, category : ct, likes : 0 });
          }
        });
      }
    });
  });
}

Meteor.startup(function () {
  var githubUrl = 'https://raw.githubusercontent.com/vhf/free-programming-books/master/';

  if (Resources.find().count() === 0) {
    (['free-programming-books.md', 'javascript-frameworks-resources.md']).forEach(function (md) {
      importResources('book', githubUrl + md);
    });

    (['free-courses-en.md']).forEach(function (md) {
      importResources('course', githubUrl + md);
    });

    (['free-podcasts-screencasts-en.md']).forEach(function (md) {
      importResources('podcast', githubUrl + md);
    });

    (['free-programming-interactive-tutorials-en.md']).forEach(function (md) {
      importResources('interactive', githubUrl + md);
    });
  }
});