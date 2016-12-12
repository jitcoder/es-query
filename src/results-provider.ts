import * as vscode from 'vscode';

export default class ElasticSearchResultsProvider implements vscode.TextDocumentContentProvider {
  // private results: Map<string, string>;
  public results: string;
  
  public queryResultsUri = vscode.Uri.parse("es-query://results");
  private changeEvent = new vscode.EventEmitter<vscode.Uri>();

  public provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): string | Thenable<string> {
    // if (this.results.has(uri.path)) {
    //   return this.results.get(uri.path);
    // } else {
    //   return "No query found";
    // }
    return this.results;
  }

  // public addResults(queryKey: string, results: string) {
  //   this.results.set(queryKey, results);
  // }

  get onDidChange(): vscode.Event<vscode.Uri> {
    return this.changeEvent.event;
  }

  public update(results: string) {
    this.results = results;
    this.changeEvent.fire(this.queryResultsUri);
  }
}