const assert = require('assert');
const wiki = require('../functions');

// fetchArticle test
describe('fetchArticle function', function(){
    it('It should return undefined', function(){
        wiki.URL = 'https://en.wikipedia.org/w/api.php';
        let title = 'Canada';
        let result = wiki.fetchArticle(title);
        assert.equal(result, undefined);
    });
});

// fetchArticleMetadata test
describe('fetchArticleMetadata function', function(){
    it('It should return undefined', function(){
        wiki.URL = 'https://en.wikipedia.org/w/api.php';
        let title = 'Canada';
        let result = wiki.fetchArticleMetadata(title);
        assert.equal(result, undefined);
    });
});

// textify test
describe('textify function', function(){
    it('It should return a plain text', function(){
        let string = '<p>Canada</p>';
        let result = wiki.textify(string);
        assert.equal(result, 'Canada');
    });

    it('Fails to return a plain text with a newline', function(){
        let string = '<br>Canada</br>';
        let result = wiki.textify(string);
        assert.notEqual(result, 'Canada');
    });
});