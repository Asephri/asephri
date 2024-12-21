export function execute(command) {
    const terminalOutput = document.getElementById("terminal-output");
    const parts = command.split(' ');
    const fileName = parts[1]; // Get the file name (if provided)

    if (!fileName) {
        // No file name provided, list HTML files in the uploads directory
        listHTMLFiles();
    } else {
        // Load the specified file, append '.html' if needed
        loadFile(fileName);
    }
}

// Fetch and list the HTML files from the backend
function listHTMLFiles() {
    const terminalOutput = document.getElementById("terminal-output");

    // Fetch the list of HTML files from the backend API
    fetch('http://localhost:8000/files')  // API call to the Node.js backend
        .then(response => response.json())  // Parse the JSON response
        .then(htmlFiles => {
            // If there are HTML files, show them; otherwise, inform the user
            const filesText = htmlFiles.length > 0
                ? `Available HTML files in 'assets/uploads/':
${htmlFiles.join('\n')}`
                : 'No HTML files available in the directory.';

            terminalOutput.innerHTML = `<pre>${filesText}</pre>`;
        })
        .catch(error => {
            terminalOutput.innerHTML = `<pre class="error">Error loading files: ${error.message}</pre>`;
        });
}

// Fetch the content of the specified file and display it in the terminal
function loadFile(fileName) {
    const terminalOutput = document.getElementById("terminal-output");

    // Ensure the file name ends with .html (if not, append it)
    const filePath = `${fileName.endsWith('.html') ? fileName : fileName + '.html'}`;

    // Fetch the content of the file from the server
    fetch(`http://localhost:8000/assets/uploads/${filePath}`)
        .then(response => {
            if (response.ok) {
                return response.text();  // Get the file content
            } else {
                throw new Error("File not found");
            }
        })
        .then(fileContent => {
            // Uncomment one of the two options depending on how you want the HTML displayed

            // Option 1: Render HTML content in the terminal (allows rendering of header, body, etc.)
            terminalOutput.innerHTML = fileContent;

            // Option 2: Display HTML as raw text in the terminal (no rendering, just showing the code)
            // const escapedContent = fileContent.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            // terminalOutput.innerHTML = `<pre>${escapedContent}</pre>`;

            scrollToBottom(); // Optional, if you want to auto-scroll the terminal
        })
        .catch(error => {
            terminalOutput.innerHTML = `<pre class="error">Error loading file: ${error.message}</pre>`;
            scrollToBottom();
        });
}

// Utility function to scroll to the bottom of the terminal (optional)
function scrollToBottom() {
    const terminalOutput = document.getElementById("terminal-output");
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}
