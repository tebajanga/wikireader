module.exports = {
    URL: '',
    langFound: false,
    
    // List of commands
    help: function() {
        console.log(`List of available commands.\n`);
        console.log(`READ <article> \t Print the given article text.`);
        console.log(`ABOUT <article> \t Print the given article metadata.`);
        console.log(`RANDOM \t\t Print random article text.`);
        console.log(`HELP \t\t\t Print the available commands.`);
        console.log(`QUIT \t\t\t Exit the application.\n`);
    }
};