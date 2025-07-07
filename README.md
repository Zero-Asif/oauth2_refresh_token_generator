# 🔐 OAuth2 Refresh Token Generator

A simple command-line tool to generate a **Google OAuth 2.0 Refresh Token**.
Use this refresh token in your server-side apps to authenticate with Google APIs (like Gemini, Drive, YouTube, etc.) without needing repeated user sign-ins.

---

## 🚀 Features

- Command-line interface (CLI) to easily input credentials.
- Auto-generates the correct Google authorization URL.
- Starts a local server to capture the OAuth `code` from the redirect.
- Automatically exchanges the authorization `code` for a **refresh token**.
- Outputs `.env`-ready variables for easy copy-pasting.
- Works with any Google Cloud API, including Google Gemini / Generative AI.

---

## 🧰 Requirements

- [Node.js](https://nodejs.org/) version **16+**
- Your Google Cloud OAuth 2.0 credentials (Client ID & Client Secret).

---

## 🛠️ Setup

### 1. Get the Script
Clone the repository or simply download the `oauth2_refresh_token_generator.mjs` file.

```bash
git clone [https://github.com/your-username/oauth2_refresh_token_generator.git](https://github.com/your-username/oauth2_refresh_token_generator.git)
cd oauth2_refresh_token_generator
```
*(If you download the file manually, just create a new folder and place the `.mjs` file inside it.)*

### 2. Install Dependencies
Navigate to the folder in your terminal and run:

```bash
npm init -y
npm install googleapis open
```

### 3. Run the Script
Execute the script using Node.js:

```bash
node oauth2_refresh_token_generator.mjs
```

---

## ✍️ Input Guide

When you run the script, you will be prompted to enter the following:

1.  **Client ID**
2.  **Client Secret**
3.  **Redirect URI** (Example: `http://127.0.0.1:8000/google-callback`)

> If you don’t have these credentials, you must create them in the Google Cloud Console:
> 👉 **[https://console.cloud.google.com/apis/credentials/oauthclient](https://console.cloud.google.com/apis/credentials/oauthclient)**

---

### ⚠️ Pasting in Windows Terminals

If you have trouble pasting (Ctrl+V) your credentials into the Windows Command Prompt, try one of these methods:

| Terminal           | Paste Support         | How to Paste          |
| ------------------ | --------------------- | --------------------- |
| `cmd.exe`          | ⚠️ Yes (Right Click) | Use mouse **right-click** |
| `PowerShell`       | ✅ Yes                | Use mouse **right-click** |
| `Git Bash`         | ✅ Yes                | `Ctrl+V` works /  Use mouse **right-click** |
| `Windows Terminal` | ✅ Yes                | `Ctrl+V` works /  Use mouse **right-click** |

---

## ✅ Output

After you successfully log in with your Google account in the browser, the script will output the following in your terminal:

```env
# ✅ SUCCESS! Paste this in your .env file:
GEMINI_OAUTH_CLIENT_ID=your-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=your-secret
GEMINI_OAUTH_REFRESH_TOKEN=your-refresh-token
```
You can now use these variables in your application's environment configuration.

---

## 🧪 Sample Run

Here is an example of what a successful run looks like:

```bash
$ node oauth2_refresh_token_generator.mjs

If you don’t know your Google OAuth credentials, visit:
👉 [https://console.cloud.google.com/auth/clients/](https://console.cloud.google.com/auth/clients/)

Enter your Client ID: 12345-abc.apps.googleusercontent.com
Enter your Client Secret: GOCSPX-xyz123
Enter your Redirect URI (e.g., [http://127.0.0.1:8000/google-callback](http://127.0.0.1:8000/google-callback)): [http://127.0.0.1:8000/google-callback](http://127.0.0.1:8000/google-callback)

🌐 Starting local server on 127.0.0.1:8000...

🔗 Opening auth URL in your browser...
(A browser window opens for Google login)

🌐 Listening on [http://127.0.0.1:8000](http://127.0.0.1:8000)...
(Waiting for you to complete the login)

✅ SUCCESS! Paste this in your .env file:

GEMINI_OAUTH_CLIENT_ID=12345-abc.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-xyz123
GEMINI_OAUTH_REFRESH_TOKEN=1//aBcDeFgHiJkLmNoPqRsTuVwXyZ...
```

---

## 📄 License
This tool is open-sourced under the **MIT License**.
