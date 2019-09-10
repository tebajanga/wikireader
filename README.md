# Wiki Reader

#### A Command Line Application to read from Wikipedia.

#### By Timothy Anthony

## Description

The Wikireader application, allow user to enter different commands to read the article from Wikipedia. The information includes article content and its metadata.

## Available Commands

Wiki Reader application current support 5 commands which are;

1. `READ <article>` - Reading certain article.
2. `ABOUT <article>` - View article metadata.
3. `RANDOM` - Read random article.
4. `QUIT` - Quiting the application.
5. `HELP` - List available commands.

## Installation

This application require `node` and `npm` to run. If you do not have them you can install as `sudo apt-get install nodejs` which will also install `npm` package.

1. Clone the project repository 
`git clone https://github.com/tebajanga/wikireader.git`
2. Navigate to the project repository and run `npm install` or `npm i` to install dependencies.

## Runing

You need to specify the language you want to use to fetch the article by passing the language code while running the script i.e `node index.js <lang_code>`. For example Language code for English is `en` and for French is `fr`.

While you are in the project directory, you can start the application as;

`node index.js en` for English language, or

`node index.js fr` for Frech language.

The application will validate your language code and will present you with a prompt to enter commands.
```
>
```

### Reading Article

The command to read article is `READ <article>`, you must specify or pass the article title as parameter. You can run it as;
```
> READ Canada
```

The article content will be displayed one paragraph at a time, to read the next paragraph press `ENTER` or `RETURN` key, and to quit reading the article press `Q`.


#### Viewing Article Metadata

The command to view article metadata is `ABOUT <article>`, you must specify or pass the article as parameter. You can run ti as;
```
> ABOUT Canada
```


#### Reading Random Article

To read random article you can use `RANDOM` command, this command will fetch random article and will display article content one paragraph at a time, similar to `READ` command. You can run it as;
```
> RANDOM
```

And you will be able to viee the next paragraph by pressing `ENTER` or `RETURN` key, and `Q` to quit reading the article.


#### Listing available commands

To list available commands of Wiki Reader application, you can use `HELP` command. You can run it as;
```
> HELP
```

#### Quiting the application

To quit or exit the application, you can use `QUIT` command. You can run it as;
```
> QUIT
```

## Test

To run automated test, first navigate to the project directory and run `npm test`
