# ES-Query

Lets you run queries against ElasticSearch in the same format they show up in the
ElasticSearch documentation.



## Features
```
GET _cat/indices
```

```
POST /messages/inbox
{
  "from": "bob",
  "message": "Hello World!"
}
```

> Simply select the text query and either right-click "Execute ElasticSearch Query"
or use the hotkey `ctrl/cmd + shift + e`

![Demo](images/demo.gif)

## Extension Settings

This extension contributes the following settings:

* `esQuery.execute`: Execute selected text as query
* `esQuery.setHost`: Set/Change ElasticSearch host (workspace setting)

## Known Issues

## Release Notes

### 0.0.1

Initial Release