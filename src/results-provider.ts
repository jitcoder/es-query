import * as vscode from 'vscode';

export default class ElasticSearchResultsProvider implements vscode.TextDocumentContentProvider {
  public results: string;
  
  public queryResultsUri = vscode.Uri.parse("es-query://results");
  private changeEvent = new vscode.EventEmitter<vscode.Uri>();

  public provideTextDocumentContent(uri: vscode.Uri, token: vscode.CancellationToken): string | Thenable<string> {
    return this.results;
  }

  get onDidChange(): vscode.Event<vscode.Uri> {
    return this.changeEvent.event;
  }

  public update(results: string) {
    this.results = results;
    this.changeEvent.fire(this.queryResultsUri);
  }
}