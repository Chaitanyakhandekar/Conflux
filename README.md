Conflux

A production-oriented, real-time communication platform built with modern web technologies.

Conflux is a Discord-inspired communication platform designed around servers, channels, roles, permissions, direct conversations, real-time messaging, and community management.

The project focuses on building a scalable real-time architecture rather than simply reproducing an existing chat application's UI.

✨ Features
🔐 Authentication
User registration and login
Email verification with OTP
Secure password handling with bcrypt
JWT-based authentication
Access and refresh token architecture
Profile setup
Avatar support
Protected routes
Persistent authentication state
🏠 Servers
Create and manage servers
Server templates for different communities
Server ownership
Server membership
Server-specific roles
Server invitations
Member management
💬 Channels
Text channels
Voice-channel architecture
Channel categories
Channel ordering/positioning
Channel-specific permissions
Channel management
👥 Roles & Permissions

Conflux uses a role-based permission system.

Permissions are defined centrally and assigned to roles.

Examples include:

View channels
Send messages
Delete messages
Manage channels
Manage roles
Create invites
Manage invites
Kick members
Ban members
Timeout members
Voice permissions
Administrator

Channel-level permission overrides allow permissions to be modified for specific roles within individual channels.

💬 Real-Time Messaging
Real-time message delivery
Socket.IO communication
Message replies
Reactions
Message deletion
Message editing architecture
Read/seen state
Typing-event architecture
Real-time server/member events
👤 Direct Conversations
Direct messaging
Conversation-based architecture
Conversation participants
Recent conversations
Message history
🔔 Notifications
Server invitations
User-related notifications
Read/unread notification state
Notification metadata
Real-time notification architecture
📎 Media
Avatar uploads
Cloudinary integration
Attachment architecture for messages
⚙️ Background Processing

Email-related operations are handled asynchronously using:

BullMQ
Redis workers
Email queues

This prevents email delivery operations from blocking API requests.

🏗️ Architecture

Conflux is structured around a separation of responsibilities between the client, API layer, services, database, and real-time infrastructure.

                        ┌─────────────────────┐
                        │      Client         │
                        │   React + Vite      │
                        └──────────┬──────────┘
                                   │
                     HTTP / REST   │   WebSocket
                                   │
                    ┌──────────────┴──────────────┐
                    │                             │
                    ▼                             ▼
             ┌─────────────┐              ┌─────────────┐
             │   Express   │              │  Socket.IO  │
             │    API      │              │   Server    │
             └──────┬──────┘              └──────┬──────┘
                    │                             │
                    └──────────────┬──────────────┘
                                   │
                                   ▼
                           ┌──────────────┐
                           │   Services   │
                           │    Layer     │
                           └──────┬───────┘
                                  │
                    ┌─────────────┼─────────────┐
                    ▼             ▼             ▼
               MongoDB         Redis        Cloudinary
                    │             │
                    │             ▼
                    │        BullMQ Workers
                    │             │
                    │             ▼
                    │        Email Provider
                    │
                    ▼
                Persistent
                   Data
🧱 Tech Stack
Frontend
React
TypeScript
Vite
Tailwind CSS
Zustand
Axios
Socket.IO Client
React Router
Lucide React
Backend
Node.js
Express
TypeScript
MongoDB
Mongoose
Socket.IO
Redis
BullMQ
JWT
bcrypt
Cloudinary
Infrastructure / Services
MongoDB Atlas
Redis
Cloudinary
Email provider
Docker-ready architecture
📁 Project Structure
conflux/
│
├── client/
│   │
│   └── src/
│       ├── api/
│       ├── assets/
│       ├── components/
│       ├── config/
│       ├── constants/
│       ├── hooks/
│       ├── layouts/
│       ├── pages/
│       ├── routes/
│       ├── services/
│       ├── store/
│       ├── types/
│       ├── utils/
│       └── main.tsx
│
├── server/
│   │
│   └── src/
│       ├── config/
│       ├── constants/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── producers/
│       ├── providers/
│       ├── routes/
│       ├── services/
│       ├── sockets/
│       ├── templates/
│       ├── types/
│       ├── utils/
│       ├── workers/
│       └── server.ts
│
├── README.md
└── ...
🔄 Frontend Architecture

The frontend follows a layered approach:

UI
 ↓
Hook / State
 ↓
API Layer
 ↓
Backend

For example:

Register.tsx
      ↓
useAuth()
      ↓
authApi.registerUser()
      ↓
POST /api/v1/auth/register

API-specific request types are kept separate from general application types where appropriate.

This keeps UI components from directly handling HTTP implementation details.

🔌 Real-Time Architecture

Socket.IO is used for real-time communication.

The client maintains a shared Socket.IO instance:

Client
   │
   │ WebSocket
   ▼
Socket.IO Server
   │
   ├── Server Events
   ├── Channel Events
   ├── Message Events
   ├── Member Events
   └── Notification Events

Socket events are organized by domain rather than being maintained as one large unstructured collection.

Example:

socketEvents.message.NEW
socketEvents.message.DELETED
socketEvents.server.INVITE
socketEvents.member.JOINED

This makes event names consistent across the application.

🗄️ Data Model

The core data model consists of:

Users
  │
  ├── Servers
  ├── Server Members
  ├── Messages
  ├── Conversations
  ├── Notifications
  └── Requests


Servers
  │
  ├── Categories
  ├── Channels
  ├── Roles
  └── Server Members


Categories
  └── Channels


Channels
  ├── Messages
  └── Permission Overrides


Roles
  └── Permission Overrides


Conversations
  └── Messages

Core entities include:

Users
Servers
Categories
Channels
Roles
Server Members
Messages
Conversations
Permission Overrides
Notifications
Requests
🧩 Server Templates

Server creation can use predefined templates instead of creating every channel manually.

Current template architecture supports concepts such as:

Gaming Community
Study Group
Developer Community
Friends
Startup Team
Custom Server

Templates define:

Server
 └── Categories
      └── Channels

This makes server creation data-driven and allows new templates to be added without changing the core server creation logic.

🔐 Permission Architecture

Permission resolution follows:

User
 ↓
Server Member
 ↓
Assigned Roles
 ↓
Role Permissions
 ↓
Channel Overrides
 ↓
Final Permissions
 ↓
Permission Check
 ↓
ALLOW / DENY

Role permissions provide the base permissions.

Channel overrides can modify those permissions for a specific channel.

The system also supports an ADMINISTRATOR permission for elevated access.

📬 Background Jobs

Operations that should not block API requests can be processed asynchronously.

Example:

API Request
     ↓
Create Email Job
     ↓
Redis Queue
     ↓
BullMQ Worker
     ↓
Email Provider

This architecture is primarily used for email-related operations such as verification and authentication emails.

🛡️ Security

Conflux is designed with several security layers:

Password hashing with bcrypt
JWT authentication
Access/refresh token architecture
HTTP-only authentication cookies where applicable
Protected API routes
Role-based authorization
Channel-level permission checks
Input validation
Rate limiting
Server/member authorization
Secure file upload handling
Environment-based secrets
CORS configuration

Security decisions are enforced on the backend, not trusted solely to the frontend.

⚡ Real-Time Event Organization

Socket events are grouped by domain:

socket/
│
├── connection
├── server
├── channel
├── message
├── member
└── notification

This allows Conflux to grow without turning the Socket.IO event system into one large collection of unrelated event names.

🚀 Getting Started
Prerequisites

Make sure you have:

Node.js
npm
MongoDB
Redis
Cloudinary account
Email provider credentials
Clone the repository
git clone <your-repository-url>


cd conflux
Install dependencies
Client
cd client
npm install
Server
cd ../server
npm install
🔑 Environment Variables

Create environment files for the client and server.

Example server configuration:

PORT=5000


MONGODB_URI=


CLIENT_URL=http://localhost:5173


JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=


REDIS_URL=


CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=


EMAIL_API_KEY=

Client:

VITE_ENV=development
VITE_SERVER_URL_LOCAL=http://localhost:5000
VITE_SERVER_URL_PRODUCTION=

Do not commit .env files or production secrets to Git.

▶️ Running the Project

Start the backend:

cd server
npm run dev

Start the frontend:

cd client
npm run dev

The frontend will normally be available at:

http://localhost:5173

and the backend at:

http://localhost:5000
🧪 Development Principles

Conflux follows several architectural principles:

Separation of concerns

Controllers should not contain all business logic.

Route
 ↓
Controller
 ↓
Service
 ↓
Model / Provider
Reusable infrastructure

Shared functionality such as:

authentication
permissions
socket events
API responses
error handling

should be centralized rather than duplicated.

Type safety

TypeScript is used across the application.

Runtime validation is still required for untrusted external input because TypeScript types do not exist at runtime.

Domain-driven organization

Features should be grouped according to their responsibility instead of creating large monolithic files.

🗺️ Roadmap

Potential future improvements include:

 Voice communication
 Video communication
 Screen sharing
 Advanced moderation
 Audit logs
 Server discovery
 Rich message embeds
 Threads
 Message search
 Advanced notification preferences
 Improved media handling
 Distributed Socket.IO deployment
 Horizontal server scaling
 Cloudflare integration
 Docker deployment
 Automated CI/CD
 Comprehensive automated testing
🤝 Contributing

Contributions are welcome.

Before making significant changes:

Create a branch.
Keep changes focused.
Follow the existing architecture.
Maintain TypeScript type safety.
Avoid introducing unnecessary dependencies.
Test affected functionality.
Submit a pull request with a clear description.
📜 License

This project is currently intended as an open-source project.

Add the final license here once the project's licensing terms are decided.

🌐 Project

Conflux

A modern, real-time communication platform focused on communities, servers, conversations, and scalable backend architecture.

Built with TypeScript • React • Node.js • MongoDB • Redis • Socket.IO

Conflux is an independent project inspired by modern community communication platforms. It is not affiliated with or endorsed by Discord.
