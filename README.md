# 📱 Node.js Mini Social App

A **mini social media application** built with **Node.js, Express, MongoDB, and EJS** that allows users to **register, login, create posts, like/unlike posts, edit posts, and upload profile pictures**.
The UI features a **dynamic sky background with clouds and birds** for a modern and engaging user experience.

---

## 📌 Overview

This project demonstrates:

* **User authentication** with JWT and bcrypt
* **Profile management** including profile picture upload
* **Post creation and interaction** (like/unlike, edit)
* **Responsive UI** using TailwindCSS
* **Animated sky background** for enhanced UX

The project is **perfect for practicing full-stack Node.js development** and creating a **resume-friendly portfolio project**.

---

## 🏗️ Architecture

![Profile Page](https://i.postimg.cc/W1YZf3rn/profile-sky.png)
![Register Page](https://i.postimg.cc/Kz2vJsBv/register-page.png)

**Components:**

* **Node.js & Express** → Backend server, routing, API endpoints
* **MongoDB & Mongoose** → Database for storing users and posts
* **EJS** → Templating engine for dynamic HTML
* **JWT & bcrypt** → User authentication and password security
* **Multer** → File uploads (profile pictures)
* **TailwindCSS** → Frontend styling
* **Animated Background** → Clouds and birds for UI dynamics

---

## 🛠️ Technologies Used

* **Node.js** – Backend runtime environment
* **Express.js** – Web framework
* **MongoDB** – Database
* **Mongoose** – ODM for MongoDB
* **EJS** – Templating engine
* **bcrypt** – Password hashing
* **jsonwebtoken (JWT)** – User authentication
* **Multer** – File uploads
* **TailwindCSS** – Frontend design
* **Vanilla JS & CSS animations** – Sky, clouds, and birds effects

---

## ⚡ Setup Instructions

### 1. Clone Repository

```bash
git clone https://github.com/<your-username>/node-mini-social.git
cd node-mini-social
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

```bash
node app.js
```

### 4. Open in Browser

```
http://localhost:3000
```

---

## 📂 Folder Structure

```
node-mini-social/
│
├─ app.js                 # Main server file
├─ package.json
├─ config/
│   └─ multerconfig.js    # File upload configuration
├─ models/
│   ├─ user.js            # User schema
│   └─ post.js            # Post schema
├─ public/
│   ├─ images/
│   │   └─ uploads/       # Uploaded profile images
│   └─ css/               # Optional styles
├─ views/
│   ├─ index.ejs          # Registration page
│   ├─ login.ejs
│   ├─ profile.ejs
│   ├─ edit.ejs
│   └─ profileupload.ejs
└─ README.md
```

---

## 📜 Resume-Friendly Project Description

**Project Title:**
Node.js Mini Social App with User Authentication and Dynamic UI

**Highlights:**

* Implemented **secure user registration & login** with JWT and bcrypt
* Designed **profile page with animated sky background** including clouds and birds
* Enabled **post creation, edit, and like/unlike features**
* Integrated **profile picture uploads** using Multer
* Built **responsive, clean UI** using TailwindCSS
* Full-stack **Node.js + MongoDB project**, ideal for portfolios

---

## 🤝 Acknowledgements

* [Node.js](https://nodejs.org/)
* [Express.js](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/)
* [EJS](https://ejs.co/)
* [TailwindCSS](https://tailwindcss.com/)
* Open-source community contributors

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

