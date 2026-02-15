// Simple Chatbot frontend logic (local mock) — replace with AI backend integration

const messagesContainer = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');

function appendMessage(content, sender = 'bot') {
  const msg = document.createElement('div');
  msg.className = `message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
  const body = document.createElement('div');
  body.className = 'message-content';
  body.innerHTML = content;
  const time = document.createElement('span');
  time.className = 'message-time';
  time.textContent = new Date().toLocaleTimeString();
  msg.appendChild(body);
  msg.appendChild(time);
  messagesContainer.appendChild(msg);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function sendQuickMessage(text) {
  messageInput.value = text;
  sendMessage();
}

async function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  appendMessage(escapeHtml(text), 'user');
  messageInput.value = '';

  // Show typing indicator
  const typing = document.createElement('div');
  typing.className = 'message bot-message typing-indicator';
  typing.innerHTML = `<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>`;
  messagesContainer.appendChild(typing);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Mock processing time
  await delay(800 + Math.random() * 800);

  // Remove typing indicator
  typing.remove();

  // Generate mock response (replace with AI call)
  const response = generateMockResponse(text);

  // If response includes gif flag, render animated gif
  if (response.gif) {
    const html = `<div>${escapeHtml(response.text)}<div style="margin-top:10px;"><img src="${response.gif}" alt="animated" style="max-width:240px;border-radius:8px;box-shadow:0 8px 20px rgba(0,0,0,0.08)"></div></div>`;
    appendMessage(html, 'bot');
  } else {
    appendMessage(escapeHtml(response.text), 'bot');
  }
}

function delay(ms) { return new Promise(res => setTimeout(res, ms)); }

function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function generateMockResponse(text) {
  const q = text.toLowerCase();

  if (q.includes('cement')) {
    return { text: 'Top cement brands: UltraTech, Ambuja, ACC, JK Cement. Choose based on grade (43/53) and project requirements.' };
  }

  if (q.includes('interior')) {
    return { text: 'For interiors, consider space planning, natural light, material durability, and budget. Would you like sample color palettes or furniture suggestions?', gif: 'images/modern-interior.gif' };
  }

  if (q.includes('mep')) {
    return { text: 'MEP stands for Mechanical, Electrical, and Plumbing. It covers HVAC, electrical distribution, fire protection, and plumbing systems.' };
  }

  if (q.includes('steel') || q.includes('aluminum')) {
    return { text: 'Steel is strong and durable for structural work; aluminum is lightweight and corrosion-resistant for certain applications.' };
  }

  if (q.includes('calculate') || q.includes('quantity') || q.includes('bill of quantities')) {
    return { text: 'I can help calculate material quantities. Tell me area dimensions and material type (e.g., flooring tiles 600x600 mm).', gif: 'images/material-calc.gif' };
  }

  // Fallback
  return { text: "I can help with materials, designs, MEP guidance, and supplier suggestions. Please provide more details about your project (location, area, budget)." };
}

// Enter key to send
messageInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
});

// Sample startup message
appendMessage('Hi! I can assist with materials, designs, and MEP. Try asking: "Best cement" or "Interior suggestions".');
