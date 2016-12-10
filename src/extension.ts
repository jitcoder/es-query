'use strict';

import * as vscode from 'vscode';
import * as request from 'request';
import ElasticSearchResultsProvider from './results-provider';

export function activate(context: vscode.ExtensionContext) {
  context.workspaceState.get("esQuery.host", null) || setElasticSearchHost(context);

  let queryResultsUri = vscode.Uri.parse("es-query://results");
  let resultsProvider = new ElasticSearchResultsProvider();

  let disposable = vscode.commands.registerCommand('esQuery.execute', () => {
    const editor = vscode.window.activeTextEditor;
    const selection = editor.selection;

    const range = selection.with(selection.start, selection.end);
    const selectedCode = editor.document.getText(range);
    executeQuery(selectedCode, context);
  });

  context.subscriptions.push(disposable);
}

function getLines(code: string):string[] {
  const sanitizedCode: string = code
    .replace(/\r\n/g, "\n")
    .replace(/\n\n/g, "\n")

  return sanitizedCode.split("\n").map((line) => line.trim());
}

async function setElasticSearchHost(context: vscode.ExtensionContext) {
  let options: vscode.InputBoxOptions;

  const host = await vscode.window.showInputBox(<vscode.InputBoxOptions>{
    prompt: "Please enter the ElasticSearch host for this workspace",
    ignoreFocusOut: true,
    value: context.workspaceState.get("esQuery.host", "localhost:9200")
  });

  context.workspaceState.update("esQuery.host", host);
}

function executeQuery(code:string, context: vscode.ExtensionContext):void {
  const lines = getLines(code);
  const host = context.workspaceState.get("esQuery.host", null);
  let method:string|null = null;
  let uri:string|null = null;
  let body = '';

  for (let line of lines) {
    if (!method && line.indexOf(' ') > -1) {
      method = line.substring(0, line.indexOf(' ')).toUpperCase();
      uri = line.substring(method.length, line.length);
    }

    body = `${body}\n${line}`
  }

  method = method || "GET";
  const json = JSON.parse(body);

  request(<request.UrlOptions & request.CoreOptions>{
    url: `http://${host}/${uri}`,
    method,
    json
  }, (error, response, body) => {
    if (error) {
      vscode.window.showErrorMessage(error);
    } else {
      vscode.window.activeTextEditor.
    }
  })
}

export function deactivate() {
}