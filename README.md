# 🏝️ DeskLab: Bali Workspace Visualizer

**DeskLab** is an interactive 3D workspace designer built for digital workspace design in Bali. It moves away from boring product catalogs, offering a fun, visual experience where users can build their dream office setup—picking desks, chairs, monitors, and accessories—and see it come to life in a CSS-powered 3D mockup before renting.

## 🚀 Approach & Philosophy

The project was designed with a **"Visual First"** approach. Instead of traditional e-commerce lists, we focused on a high-fidelity "Dark Studio" aesthetic that mirrors the premium experience of a designer tool. 

- **Frontend**: Built with **Next.js 16 (App Router)** for a fast, interactive user interface. Tailwind CSS for modern styling.
- **State Management**: Migrated from prop-drilling to **Zustand** to ensure a single source of truth for complex product selections and UI states.
- **Visuals**: Leveraged **CSS 3D Transforms** (`perspective`, `rotateX/Y`) instead of heavy WebGL/Three.js to maintain lightning-fast load times while still providing a depth-filled, interactive mockup.
- **AI-Powered Consultation**: A unique **"Chat with AI"** feature powered by OpenRouter that acts as a personal workspace consultant, providing real-time product recommendations from the DeskLab catalog based on ergonomic needs and Bali lifestyle.

## ✨ Key Features

- **Interactive 3D Visualizer**: Real-time CSS 3D preview of your workspace as you swap products (desktop version).
- **Smart AI Assistant**: Floating chat interface that understands our product catalog and provides expert advice.
- **Dummy Checkout Flow**: Interactive payment processing and live delivery status tracking for a complete end-to-end experience (UI only).

## 🛠️ Tech Choices

- **Next.js 16 (App Router)**: For cutting-edge routing, image optimization, and server-side capabilities.
- **Tailwind CSS 4**: Modern styling with a utility-first approach for the "Dark Studio" UI.
- **Framer Motion**: Powering smooth, physics-based animations and layout transitions.
- **Zustand**: Lightweight, scalable state management for product selections.
- **Lucide React**: Consistent, high-quality iconography.
- **OpenRouter (AI)**: Powering the "DeskLab AI" assistant with `nvidia/nemotron-3-super-120b-a12b`.

## 📈 Future Improvements

Given more time, the following features would be prioritized:

1. **Login/Registration**: Implement user authentication to save user login sessions. Or if just for client-side only we can using localStorage.
2. **Integration with Database**: Allow users to save their setups to a database and share a unique URL with their team.
3. **Payment Processing**: Integrate a secure gateway to handle payments for digital workspace rentals.
4. **Dark Mode**: Add a dark mode toggle for a more comfortable experience in low-light environments.
5. **Adjustment Styling**: Improve the UI make more beautiful.
---

Built with 🌴 for the Bali Workspace Design Community.
