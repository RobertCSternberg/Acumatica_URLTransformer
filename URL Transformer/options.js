document.addEventListener('DOMContentLoaded', () => {
  const runAutomatically = document.getElementById('runAutomatically');
  const saveButton = document.getElementById('save');

  // Load saved settings
  chrome.storage.sync.get('runAutomatically', (data) => {
    // Set the default value to false if there is no saved data
    runAutomatically.checked = data.runAutomatically || false;
  });

  // Save settings when the Save button is clicked
  saveButton.addEventListener('click', () => {
    chrome.storage.sync.set({ runAutomatically: runAutomatically.checked }, () => {
      
    saveButton.textContent = 'Saved';
    const feedback = document.getElementById('feedback');
    feedback.style.display = 'block';
    setTimeout(() => feedback.style.display = 'none', 2000);
    
      saveButton.classList.add('disabled');
      saveButton.disabled = true;
    });
  });

  // Enable the Save button when the checkbox is modified
  runAutomatically.addEventListener('change', () => {
    saveButton.textContent = 'Save';
    saveButton.classList.remove('disabled');
    saveButton.disabled = false;
  });
});
