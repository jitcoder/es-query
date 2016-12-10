import * as vscode from 'vscode';

export default class ElasticSearchResultsProvider implements vscode.TextDocumentContentProvider {
  private results: Map<string, string>;

  public provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): string | Thenable<string> {
    if (this.results.has(uri.path)) {
      return this.results.get(uri.path);
    } else {
      return "No query found";
    }
  }

  public addResults(queryKey: string, results: string) {
    this.results.set(queryKey, results);
  }

}