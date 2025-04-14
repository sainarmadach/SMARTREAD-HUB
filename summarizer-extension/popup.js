const summarizeBtn = document.getElementById("summarize-btn");
const summaryBox = document.getElementById("summary-output");

// Create an overlay + spinner in JS
const overlay = document.createElement("div");
overlay.id = "overlay";
overlay.innerHTML = `<div class="spinner"></div>`;
document.body.appendChild(overlay);

summarizeBtn.addEventListener("click", async () => {
  // Show spinner
  overlay.style.display = "flex";

  summaryBox.textContent = "Preparing to summarize...";

  try {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    // Extract visible text from the page
    const injectionResults = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => document.body.innerText,
    });

    const textContent = injectionResults[0].result.slice(0, 5000); // limit text
    summaryBox.textContent = "Summarizing...";

    // Send to your Summarize endpoint
    const response = await fetch("http://127.0.0.1:8000/summarize-text", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: textContent,
        mode: "full",
        length: "medium",
        language: "en",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to summarize: " + response.status);
    }

    const data = await response.json();
    summaryBox.textContent = data.summary;
  } catch (err) {
    summaryBox.textContent = "❌ Error: " + err.message;
  } finally {
    // Hide spinner
    overlay.style.display = "none";
  }
});
