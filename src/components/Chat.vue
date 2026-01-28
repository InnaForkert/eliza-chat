<script setup lang="ts"></script>

<template>
  <div class="page">
    <div class="chat-card">
      <header class="chat-header">
        <div class="chat-title">
          <div class="chat-title__name">Chat Eliza</div>
          <div class="chat-title__sub">Vue 3 + TypeScript + ConnectRPC</div>
        </div>

        <div class="chat-actions">
          <button class="btn btn--ghost" type="button">Clear</button>
        </div>
      </header>

      <main class="chat-body">
        <ul class="messages" aria-label="Chat messages">
          <!-- Message item examples -->
          <li class="msg msg--bot">
            <div class="msg__bubble">
              <div class="msg__meta">Eliza • <span class="msg__time">12:41</span></div>
              <div class="msg__text">Hello. How are you feeling today?</div>
            </div>
          </li>

          <li class="msg msg--user">
            <div class="msg__bubble">
              <div class="msg__meta">You • <span class="msg__time">12:42</span></div>
              <div class="msg__text">I feel anxious lately.</div>
            </div>
          </li>

          <li class="msg msg--system">
            <div class="msg__bubble">
              <div class="msg__meta">System</div>
              <div class="msg__text">Network error. Please try again.</div>
            </div>
          </li>
        </ul>
      </main>

      <footer class="chat-footer">
        <form class="composer" action="#" aria-label="Message composer">
          <div class="composer__field">
            <label class="sr-only" for="message">Message</label>
            <input
              id="message"
              class="input"
              type="text"
              placeholder="Type your message…"
              autocomplete="off"
            />
            <div class="composer__hint">Enter — send • Shift+Enter — new line</div>
          </div>

          <button class="btn btn--primary" type="submit">
            <span class="btn__text">Send</span>
            <span class="btn__spinner" aria-hidden="true"></span>
          </button>
        </form>

        <div class="status">
          <span class="status__dot"></span>
          <span class="status__text">Ready</span>
        </div>
      </footer>
    </div>
  </div>
</template>
