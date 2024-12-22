 window.onload = function() {
      // Define the rainbow colors
      const rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
      
      // Get the <pre> element
      const preElement = document.getElementById('rainbowText');
      
      // Get the text inside the <pre> element
      const text = preElement.textContent || preElement.innerText; // Ensures compatibility with older browsers
      
      let coloredText = '';
      let colorIndex = 0;

      // Loop through each character of the text
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        
        // Only color non-whitespace characters
        if (char.trim()) {
          coloredText += `<span style="color: ${rainbowColors[colorIndex]}">${char}</span>`;
          colorIndex = (colorIndex + 1) % rainbowColors.length;  // Cycle through the colors
        } else {
          coloredText += char; // Keep spaces as is
        }
      }

      // Set the new colored text back into the <pre> element
      preElement.innerHTML = coloredText;
    };