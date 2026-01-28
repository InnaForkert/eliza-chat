<script setup lang="ts">
import Messages from "./Messages.vue"
</script>

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
        <Messages />
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
