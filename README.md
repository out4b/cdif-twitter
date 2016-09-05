Introduction
------------
CDIF's Twitter API implementation

### Notes to Twitter API support in CDIF
This module provides [Twitter API ](https://dev.twitter.com/rest/public) support to CDIF. The API request and response data are validated based on their [JSON schema definitions](https://github.com/out4b/cdif-twitter/blob/master/schema.json) which are acquired from the information from official [Twitter API documentation](https://dev.twitter.com/rest/public).

A successful connection to this virtual twitter device means user granted access to CDIF and its authenticated clients to access contents in user's Twitter account.

This module relies on the code from [Twitter node.js library](https://github.com/Isolus/twitter-ng) trying not to reinvent the wheel. However because CDIF has its own abstraction to manage oauth flow and access tokens, we decide to manually copy the library code here and rewrite a few portion of them to integrate with this module.

For now the stream API is not support yet.

See following links for more details:

[Common device interconnect framework](https://github.com/out4b/cdif)

[Twitter node.js library](https://github.com/Isolus/twitter-ng)

[Twitter API](https://dev.twitter.com/rest/public)