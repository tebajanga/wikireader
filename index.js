const readline = require('readline');
const fetch = require('node-fetch');
const wiki = require('./functions');

const args = process.argv.slice(2);

// Wiki Reader REPL
let replWiki = function() {
    return new Promise(function(resolve, reject){
        let rline = readline.createInterface(process.stdin, process.stdout);
        rline.setPrompt('> ');
        rline.prompt();

        // Taking user input
        rline.on('line', function(line){
            // Splitting command and title
            let command = title = '';
            if (line.indexOf(' ') >= 0) {
                command = line.substr(0, line.indexOf(' '));
                title = line.substr(line.indexOf(' ')+1);
            } else {
                command = line;
            }

            // Processing commands
            if (command === 'READ') {
                if (title != '') {
                    title = escape(title.replace(/ /g,"_"));
                    console.log(`Reading article...`);
                    wiki.fetchArticle(title);
                } else {
                    console.log(`To read article you need to pass article title as argument.`);
                    console.log(`Type "HELP", for help.`)
                }
            } else if (command === 'ABOUT') {
                // Get article metadata
            } else if (command === 'RANDOM') {
                // Reading random article
            } else if (command === 'HELP') {
                wiki.help();
            } else if (command === 'QUIT') {
                console.log(`Thank you for using wikireader.`);
                rline.close();
                return;
            } else if (command === '') {
                wiki.printParagraph();
            } else if (command === 'Q') {
                wiki.resetParagraphs();
            } else {
                console.log(`Unknown command: "${command}"`);
                console.log(`Type "HELP", to see the list of available commands.`);
            }

            rline.prompt();
        });
    });
}

// Async
async function run() {
    try {
        await replWiki();
    } catch(e) {
        console.log('Something went wrong. \nTry Again.');
    }
}

// Running app
if (args[0]) {
    let lang = args[0];
    // Validating the language
    fetch('https://en.wikipedia.org/w/api.php?action=languagesearch&format=json&search='+lang)
        .then(response => response.json())
        .then(data => {
            if (data.languagesearch) {
                if(lang in data.languagesearch) {
                    wiki.URL = 'https://'+lang+'.wikipedia.org/w/api.php';
                    wiki.langFound = true;
                }
            }
            if (wiki.langFound) {
                run();
            } else {
                console.log('Language code "'+lang+'" does not exist. \nTry to run again with a different language.');
            }
        })
} else {
    console.log('You must specify language code to continue. \nFor example: wikireader en');
}