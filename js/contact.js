// ===== CONTACT.JS =====
function sendMessage() {
  const name = document.getElementById('cf-name')?.value.trim();
  const email = document.getElementById('cf-email')?.value.trim();
  const subject = document.getElementById('cf-subject')?.value;
  const message = document.getElementById('cf-message')?.value.trim();

  if (!name || !email || !message) {
    alert('Please fill in all required fields (name, email, and message).');
    return;
  }
  if (!email.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }

  // Build mailto link as fallback
  const mailtoSubject = subject || 'Message from NeuroForge ML';
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  const mailto = `mailto:musharibramzan950@gmail.com?subject=${encodeURIComponent(mailtoSubject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;

  // Show success
  const success = document.getElementById('form-success');
  if (success) {
    success.style.display = 'block';
    setTimeout(() => { success.style.display = 'none'; }, 6000);
  }
}
