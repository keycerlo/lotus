
// console.log(navigator)
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((swReg) => { 
      // console.log('Service Worker Registered'); 
      swReg.pushManager.getSubscription().then((sub) => {
        // console.log('Subscription Info', sub)
      })
    });
}

// Code to handle install prompt on desktop

window.deferredPrompt = null

window.addEventListener('beforeinstallprompt', (e) => {
  // console.log(e, "e")
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  window.deferredPrompt = e;
  // Update UI to notify the user they can add to home screen

  // addBtn.addEventListener('click', () => {
  //   // hide our user interface that shows our A2HS button
  //   addBtn.style.display = 'none';
  //   // Show the prompt
  //   deferredPrompt.prompt();
  //   // Wait for the user to respond to the prompt
    // deferredPrompt.userChoice.then((choiceResult) => {
    //   if (choiceResult.outcome === 'accepted') {
    //     console.log('User accepted the A2HS prompt');
    //   } else {
    //     console.log('User dismissed the A2HS prompt');
    //   }
    //   deferredPrompt = null;
    // });
  // });
});
window.deferredPromptPrompt = function() {
  window.deferredPrompt.prompt();
  window.deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      // console.log('User accepted the A2HS prompt');
      
      localStorage.setItem('kayaPwaCloseNum', '10001')
    } else {
      // console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
  });
}