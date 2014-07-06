Meteor.startup(function () {
  var githubUrl = 'https://raw.githubusercontent.com/vhf/free-programming-books/master/';

  /*HTTP.get(githubUrl + 'free-programming-books.md', function (err, res) {
    var category = '',
      subcategory = '';

    if (err) {
      console.log('Couldnt load programming books!');
      return;
    }

    // TODO: still got wrong data (Javascript and Node FUNdamentals)
    Resources.remove({ });
    res.content.split('\n').compact(true).each(function (line) {
      var ct;

      if (line.startsWith(/###[\w]{1}/)) {
        // Is a category
        category = line.remove('###');
        subcategory = '';
      } else if (line.startsWith(/####[\w]{1}/)) {
        // Is a subcategory
        subcategory = line.remove('####');
      } else if (line.has(/\[.+\]\(.*\)/g)) {
        // Is an item
        ct = category;

        if (subcategory) {
          ct += ' ' + subcategory;
        }

        line.match(/(\[(.+)\])(\((.+)\))/g).each(function (book) {
          var bookParts = book.split(']('),
            name = bookParts[0].from(1),
            url = bookParts[1].slice(0, -1);

          if (url.startsWith('http')) {
            Resources.insert({ name : name, link : url, type : 'book', category : ct, likes : 0, dislikes: 0 });
          }

        });
      }
    });
  });*/
});