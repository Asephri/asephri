export function execute() {
    const terminalOutput = document.getElementById("terminal-output");

    fetch('assets/uploads/help.txt')
        .then(response => response.text())
        .then(helpText => {
            terminalOutput.innerHTML = `<pre class="help">${helpText}</pre>`;
        })
        .catch(error => {
            terminalOutput.innerHTML = `<pre class="error">Error loading help: ${error.message}</pre>`;
        });
}

