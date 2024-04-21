# mqSystem - MapleQuest Application Development System

mqSystem is a framework for writing web applications entirely in
Javascript. It works by consolidating the conventional multi-domain
HTML+CSS+JS structure of a web application into a single Javascript
workflow, transparently handling the different domains. This allows for
very rapid development and is particularly well suited for programtic
interface development.

## Usage

Simply include mqSystem.min.js in your page, and start using the API.
Typically, the index.html file of a mqSystem application will be empty
except for the inclusion of mqSystem and the payload javascript, like this:

```html
<html lang="en">
<head>
<meta charset="utf-8">
</head>
<body>
<script src="mqSystem.min.js"></script>
<script src="mqPayload.min.js"></script>
</body>
</html>
```

### Example applications:

- [eegstudio.maplequestlabs.com](https://eegstudio.maplequestlabs.com)

### License

mqSystem is licensed under the permissive MIT license. You are free to
use it for whatever purpose you want, including commercial applications.

For academic projects we ask (but do not require) that you reference this
repository to help spread the word about this project.

