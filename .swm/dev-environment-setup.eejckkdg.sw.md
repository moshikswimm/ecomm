---
title: Dev environment setup
---
To run your local dev environment you will need a few things on your machine. Follow the steps below.

## Installations

- Install [Node JS](https://nodejs.org/en/download/), version `14.x`

- Install an IDE (preferably [VS Code](https://code.visualstudio.com/))

- Install Git (if you don't already have it on your machine).

## Getting the sources

Clone the repository locally:

```
git clone https://github.com/my_company/company_repo.git
```

## Build

- Within the repository directory, run `yarn install` to install the project's dependencies.

- Then, build the project by running `yarn build`.

Here's what `yarn build` doing behind the scenes:

<SwmSnippetPlaceholder>

Insert a snippet that shows where `yarn build` logic is implemented.

</SwmSnippetPlaceholder>

### Troubleshooting

```
Error! Cannot execute command (...) "need executable 'ar' to convert dir to deb"(...)
```

- For electron builder to run, the package `binutils` needs to be installed. Although it should be included when installing electron on the machine/VM - it sometimes fails

- To avoid build issues, please run `sudo apt-get install binutils` to install this dependency before trying to build the app

## Windows additional steps

## Run the Tests

To run all the tests, run:

```
$ yarn test
```

To run subsets of the tests - you can use `yarn test:<name>`. For example:

```
$ yarn test:server
$ yarn test:utils
```

## Run

### macOS and Linux

```
./scripts/run.sh
```

### Windows

```
 .\scripts\run.bat
```

### Web

```
yarn web
```

## Scripts worth mentioning ⚡️✨

Serve your code with a development web server

```
$ yarn dev
```

Pack for Production. This will generate installers.

```
$ yarn pack
```

See package.json for full list of supported yarn scripts:

## 

<SwmSnippet path="/users.json" line="9">

---

&nbsp;

```json
    "password": "d433e22bac2ff0302063bc32962e6a220d88c1f21b24513438e4b5412bdae0eb39d9bad1e530bd3e74fcf5f5316932bc59250c796ff490d4ae6889ab46dbe542.0d210a604284e0f2",
    "id": "86993d18"
  }
]
```

---

</SwmSnippet>

## Debugging

- Open DevTools by pressing Command+Option+I (Mac) or Control+Shift+I (Windows, Linux). This shortcut opens the Console panel.

- Click the Sources tab and pick a file from the files navigator.

- A common method for debugging a problem is to insert a lot of console.log() statements into the code, in order to inspect values as the script executes, but breakpoints can get it done faster.

## Congrats

You now have your dev environment ready 🎉

<SwmMeta repo-id="Z2l0aHViJTNBJTNBZWNvbW0lM0ElM0Ftb3NoaWtzd2ltbQ==" repo-name="ecomm"><sup>Powered by [Swimm](https://swimm-web-app--swmdv3-develop-staging-a696gm5o.web.app/)</sup></SwmMeta>