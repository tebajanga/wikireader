const fetch = require('node-fetch');
const htmlToText = require('html-to-text');

module.exports = {
    URL: '',
    langFound: false,
    paragraphs: null,
    totalParagraphs: 0,
    currentParagraph: 0,
    firstParagraph: true,

    fetchArticle: function(title = '', random = false) {
        this.resetParagraphs();
    
        // Prepare URL
        let URL = '';
        if (random) {
            URL = this.URL + '?format=json&action=query&generator=random&grnnamespace=0&prop=revisions&rvprop=content&grnlimit=1&rvslots=main';
        } else {
            URL = this.URL + '?action=query&prop=revisions&rvprop=content&rvslots=main&format=json&titles='+title;
        }
    
        // Get article
        fetch(URL)
            .then(response => response.json())
            .then(data => {
                if (data.query.pages) {
                    let content = data.query.pages[Object.keys(data.query.pages)[0]];
                    if (content.revisions[0].slots.main['*']) {
                        let text = content.revisions[0].slots.main['*'];
                        if (random) {
                            title = content.title;
                            console.log('Article Title: '+ title + '\n');
                        }
                        // Split text into paragraphs
                        this.paragraphs = text.split(/[\r\n]+/);
                        this.totalParagraphs = this.paragraphs.length;
                        this.printParagraph();
                    } else {
                        console.log("Article not found.");
                    }
                }
            });
    },
    
    // List of commands
    help: function() {
        console.log(`List of available commands.\n`);
        console.log(`READ <article> \t Print the given article text.`);
        console.log(`ABOUT <article> \t Print the given article metadata.`);
        console.log(`RANDOM \t\t Print random article text.`);
        console.log(`HELP \t\t\t Print the available commands.`);
        console.log(`QUIT \t\t\t Exit the application.\n`);
    },

    // Print a paragraph
    printParagraph: function() {
        if (this.paragraphs && (this.currentParagraph != this.totalParagraphs)) {
            if (this.currentParagraph < this.totalParagraphs) {
                this.currentParagraph++;
                let plainText = this.textify(this.paragraphs[this.currentParagraph]);
                if (plainText == '') {
                    this.printParagraph(this.currentParagraph);
                } else {
                    console.log(plainText);
                    if (this.firstParagraph) {
                        console.log(`\nPress "Enter" to read next paragraph, "Q" to Quit.`);
                        this.firstParagraph = false;
                    }
                }
            } else {
                console.log(`\n\n--------End of Article.------------`);
            }
        }
    },

    // Cleaning text
    textify: function(string) {
        let str = htmlToText.fromString(string, {wordwrap: false});
        str = str.replace(/ *\{[^)]*\} */g, "").replace("| ", "").replace(/[\{\}\[\]]/g,"");
        return str;
    },

    // Reset paragraphs variables
    resetParagraphs: function() {
        this.paragraphs = null;
        this.totalParagraphs = 0;
        this.currentParagraph = 0;
        this.firstParagraph = true;
    }
};