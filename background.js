chrome.runtime.onInstalled.addListener(() => {
  chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true });
});

let sidePanelOpen = false;

chrome.commands.onCommand.addListener((command) => {
  if (command === "open_side_panel") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab) {
        if (sidePanelOpen) {
          chrome.runtime.sendMessage('closeSidePanel');
        } else {
          chrome.sidePanel.setOptions({ path: "sidepanel.html" });
          chrome.sidePanel.open({ tabId: activeTab.id });
        }
        sidePanelOpen = !sidePanelOpen;
      }
    });
  }
});
