(function() {
    emailjs.init('ZmFbHKNFn--NzrXUC');
})();

function success() {
  const successMessageWrapper = document.createElement('div');
  successMessageWrapper.classList.add('success-message-wrapper');

  const messageElement = document.createElement('p');
  messageElement.classList.add('success-message');
  messageElement.textContent = 'Thanks for your message! I\'ll be in touch with you shortly.';
  successMessageWrapper.appendChild(messageElement);

  const form = document.querySelector('form');
  form.replaceChildren(successMessageWrapper);
}

function errorMessage() {
  alert('Please complete the reCAPTCHA form in order to send your message.');
}

window.onload = function() {
  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // generate a five digit number for the contact_number variable
    this.contact_number.value = Math.random() * 100000 | 0;
    // these IDs from the previous steps
    emailjs.sendForm('service_hniq4ik', 'contact_form', this)
      .then(function() {
          success();
      }, function(error) {
          errorMessage();
      });
  });
}
