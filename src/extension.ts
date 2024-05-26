// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('luapathconverter.convertpath', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;
		if (editor)
		{
			const filePath = editor.document.uri.fsPath;
			const workspaceFolder = vscode.workspace.getWorkspaceFolder(editor.document.uri);
			if (workspaceFolder)
			{
				let relativePath = path.relative(workspaceFolder.uri.fsPath, filePath);
				console.log('Relative path: %s', relativePath);
				relativePath = relativePath.replaceAll(/\\/g, '.');
				relativePath = relativePath.replace(/\.lua$/, '');
				console.log('Converted path: %s', relativePath);
				vscode.env.clipboard.writeText(relativePath);
				vscode.window.showInformationMessage('Converted path already send to clipboard.');
			}
			else
			{
				vscode.window.showInformationMessage('Convert path can only works within a workspace.');
			}
		} 
		else 
		{
			vscode.window.showInformationMessage('No active editor found.');
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
