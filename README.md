# Chat Eliza (Vue 3 + TypeScript)

Mini chat application that allows a user to send messages and receive replies from the **Eliza bot** via **ConnectRPC**.

## Project Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Run the project in development mode

```bash
npm run dev
```

The application will be available at:

```
http://localhost:5173
```

## Notes

- Chat history is stored in `localStorage` and restored on page reload
- Failed messages show a retry option
- To retry a message, press ↻. Message will then be moved to the bottom of the chat with "pending" status
- System messages are displayed in the chat when errors occur

---

## Scripts

```bash
npm run dev      # start dev server
npm run build    # build for production
npm run lint     # run ESLint
npm run format   # run Prettier
```
