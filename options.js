// Saves options to chrome.storage
function save_options() {
  var apikey = document.getElementById('apikey').value;
  chrome.storage.sync.set({
	"api":apikey
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'API Key saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get("api", function(items) {
	
    document.getElementById('apikey').value = items.api;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
