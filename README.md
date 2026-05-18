# 🏝️ DeskLab: Bali Workspace Visualizer

**DeskLab** is an interactive 3D workspace designer built for digital workspace design in Bali. It moves away from boring product catalogs, offering a fun, visual experience where users can build their dream office setup—picking desks, chairs, monitors, and accessories—and see it come to life in a CSS-powered 3D mockup before renting.

## 🚀 Approach & Philosophy

The project was designed with a **"Visual First"** approach. Instead of traditional e-commerce lists, we focused on a high-fidelity "Dark Studio" aesthetic that mirrors the premium experience of a designer tool. 

- **Frontend**: Built with **Next.js 16 (App Router)** for a fast, interactive user interface. Tailwind CSS for modern styling.
- **State Management**: Migrated from prop-drilling to **Zustand** to ensure a single source of truth for complex product selections and UI states.
- **Visuals**: Leveraged **CSS 3D Transforms** (`perspective`, `rotateX/Y`) instead of heavy WebGL/Three.js to maintain lightning-fast load times while still providing a depth-filled, interactive mockup.
- **Intelligence**: Integrated **OpenRouter (AI)** to act as a workspace consultant, helping customer choose products based on ergonomics and Bali lifestyle needs.

## 🛠️ Tech Choices

- **Next.js 16 (App Router)**: For cutting-edge routing, image optimization, and server-side capabilities.
- **Tailwind CSS 4**: Modern styling with a utility-first approach for the "Dark Studio" UI.
- **Framer Motion**: Powering smooth, physics-based animations and layout transitions.
- **Zustand**: Lightweight, scalable state management for product selections.
- **Lucide React**: Consistent, high-quality iconography.
- **OpenRouter (AI)**: Powering the "DeskLab AI" assistant with `nvidia/nemotron-3-super-120b-a12b`.

## 📈 Future Improvements

Given more time, the following features would be prioritized:

1. **Login/Registration**: Implement user authentication to save user login sessions.
2. **Persisted Sessions**: Allow users to save their setups to a database and share a unique URL with their team. Or if just for client only we can using localStorage.
---

Built with 🌴 for the Bali Workspace Design Community.
