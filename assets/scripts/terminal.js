document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("user-input");
    const terminalOutput = document.getElementById("terminal-output");
    const userPrompt = document.getElementById("user-prompt");

    // Focus input and set up event listener
    userInput.focus();
    userInput.addEventListener("keydown", handleKeyPress);

    // Handle user input and commands
    function handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();  // Prevent form submission

            const input = userInput.value.trim();
            userInput.value = '';  // Clear input after pressing Enter

            // Clear terminal output and execute the command
            terminalOutput.innerHTML = ''; 
            executeCommand(input);
        }
    }

    // Execute the typed command
    function executeCommand(command) {
        if (command === 'clear') {
            loadCommand('clear');
        } else if (command === 'help') {
            loadCommand('help');
        } else if (command.startsWith('load')) {
            loadCommand('load', command);
        } else {
            terminalOutput.innerHTML = `<pre class="error">Error: Command "${command}" not found</pre>`;
            scrollToBottom();
        }
    }

    // Dynamically load command file from assets/scripts/commands/
    function loadCommand(command, args = '') {
        import(`/assets/scripts/commands/${command}.js`)
            .then(module => {
                module.execute(args); // Execute the relevant command
            })
            .catch(error => {
                terminalOutput.innerHTML = `<pre class="error">Error: Command "${command}" not found</pre>`;
                scrollToBottom();
            });
    }

    // Scroll to the bottom of the terminal output
    function scrollToBottom() {
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});
