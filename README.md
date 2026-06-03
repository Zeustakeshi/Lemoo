# 🛍️ Lemoo — Community-Powered E-Commerce Platform

> A modern, microservices-based e-commerce platform that combines seamless online shopping with rich social interaction, AI-powered search, and real-time community features.

---

## 📌 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
  - [High-Level Design](#high-level-design)
  - [Authentication & Authorization](#authentication--authorization)
  - [Store Registration Flow](#store-registration-flow)
  - [Product Lifecycle](#product-lifecycle)
  - [Order Processing & Saga Pattern](#order-processing--saga-pattern)
  - [Distributed Locking for Inventory & Promotions](#distributed-locking-for-inventory--promotions)
  - [Real-Time Chat System](#real-time-chat-system)
  - [AI Search & Chat System](#ai-search--chat-system)
  - [CI/CD Pipeline](#cicd-pipeline)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Lemoo is a full-featured e-commerce ecosystem built from the ground up on a **microservices architecture**, designed to handle massive scale while delivering a personalized, community-driven shopping experience.

Unlike traditional e-commerce platforms that focus purely on transactions, Lemoo blends **social commerce** into the core product — users can connect as friends, share vouchers, chat in real-time, and get AI-powered shopping recommendations, all within a single integrated ecosystem.


---

## Key Features

### 🛒 Shopping
- Personalized product recommendations
- Shopping cart management
- Voucher collection and redemption
- Order placement and real-time order tracking (pending → processing → shipping → delivered)

### 🔍 AI-Powered Search
- **Natural language search**: describe what you're looking for in plain Vietnamese or English
- **Semantic vector search** using Google Text-Embedding-004 + Qdrant
- Traditional keyword search with filtering

### 🤖 AI Shopping Assistant
- Integrated LLM chatbot (Gemini 2.0 Flash) for personalized shopping advice
- Budget-based product planning (e.g. *"I have 2 million VND, what massage chair should I buy?"*)
- Order tracking and voucher management via natural language
- Built on the **Model Context Protocol (MCP)** for structured tool-calling into backend services

### 👥 Community & Social
- Real-time 1-on-1 and group messaging
- Friend discovery and requests
- Voucher sharing between friends
- Notification center for order and product events

### 🏪 Seller Tools (Lemoo Seller Center)
- Product creation with variant management (SKU, size, color, images)
- Inventory and pricing management
- Promotion/voucher campaign creation
- Order fulfillment and shipping status management
- AI-assisted product listing evaluation (auto-moderation)

### 🛡️ Admin
- Store approval workflow (approve / reject with notifications)
- Product moderation (manual + AI-assisted auto-approval)
- System monitoring via Kubernetes Dashboard, Kafka UI, Redis Insight

---

## Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Microservices Framework | Spring Boot, Spring Cloud, Spring Security |
| Service Discovery | Spring Cloud Eureka |
| API Gateway | Spring Cloud Gateway |
| AI Integration | Spring AI, LangChain, LangGraph |
| MCP Protocol | Spring MCP Server, Spring MCP Client |
| Authentication | OAuth 2.0, JWT |

### Frontend
| Layer | Technology |
|---|---|
| UI Framework | ReactJS |
| Data Fetching | TanStack Query |
| Routing | TanStack Router |

### Data & Messaging
| Purpose | Technology |
|---|---|
| Relational Data | PostgreSQL |
| Document Data | MongoDB |
| Distributed Cache & Locks | Redis (Redisson) |
| Vector Database | Qdrant |
| Message Broker | Apache Kafka |

### AI & ML
| Purpose | Technology |
|---|---|
| LLM (Chat & Evaluation) | Gemini 2.0 Flash |
| Text Embeddings | Google Text-Embedding-004 |
| Agent Framework | LangChain + LangGraph |

### Infrastructure & DevOps
| Purpose | Technology |
|---|---|
| Containerization | Docker |
| Orchestration | Kubernetes (K8s) |
| Cloud Provider | Google Cloud Platform (GCP) |
| CI/CD | GitHub Actions |
| Monitoring | K8s Dashboard, Kafka UI, Redis Insight |

---

## System Architecture

### High-Level Design

The Lemoo ecosystem is divided into three primary layers: the **Client Layer**, the **Microservices Layer** (orchestrated on Kubernetes), and the **Data Layer**.


<!-- INSERT: Hình 3.1 - Thiết kế tổng quan hệ thống (high-level design diagram) -->

**Client Applications:**
- **Lemoo Mall** — buyer-facing storefront with search, cart, and order tracking
- **Lemoo Chat** — social layer: friends, direct messaging, voucher sharing, AI chat
- **Lemoo Seller Center** — seller dashboard for product, order, promotion management
- **Lemoo Admin** — back-office for store/product approval and system monitoring

**Lemoo SSO** provides single sign-on across all four apps via OAuth 2.0, so users authenticate once and move freely between surfaces.

---

### Authentication & Authorization

The authentication system uses a **token-based, gateway-enforced** model:

1. **Login via SSO** → Auth Service validates credentials → issues JWT access token
2. **Every API request** passes through the **API Gateway**, which validates the token
3. If the token is missing or invalid → `HTTP 401 Unauthorized`
4. Internal resource services call Auth Service's `/auth/internal/token_key` endpoint to decode the token and extract the user's roles
5. If the user lacks required permissions → `HTTP 403 Forbidden`

<!-- INSERT: Hình 3.2 - Sơ đồ đăng nhập qua SSO và Auth Service -->

<!-- INSERT: Hình 3.3 - Sơ đồ xác thực token trong hệ thống phân tán -->

This design means **no service trusts the client directly** — all authorization is verified internally, ensuring clean separation of concerns and a strong security posture.

---

### Store Registration Flow

Becoming a seller on Lemoo goes through a structured approval pipeline:

```
Seller creates account (SSO)
        │
        ▼
Submits business info via Seller Center
(ID card, business license, bank account)
        │
        ▼
Store Service saves store with status: PENDING
        │
        ▼
Kafka event → Admin Service notified
        │
        ├── Admin APPROVES
        │       ├── Auth Service → grants SELLER role
        │       ├── Store Service → status: ACTIVE
        │       └── Notification Service → notifies seller
        │
        └── Admin REJECTS
                ├── Store Service → status: INACTIVE
                └── Notification Service → notifies seller
```

<!-- INSERT: Hình 3.4 - Quy trình tạo tài khoản và đăng ký cửa hàng -->

<!-- INSERT: Hình 3.5 - Quy trình Admin xét duyệt cửa hàng -->

<!-- INSERT: Hình 3.6 - Quy trình Admin từ chối xét duyệt cửa hàng -->

---

### Product Lifecycle

When a seller creates a product, it goes through a multi-stage asynchronous pipeline before becoming visible to buyers:

```
Seller submits product
        │
        ▼
Product Service → saves with status: PENDING
        │
        ├──► Kafka → Product Evaluation Worker
        │           └── LLM evaluates product content & quality
        │                   ├── evaluation.success → update status
        │                   └── evaluation.failed  → reject & notify
        │
        └──► Kafka → Product Analysis Worker
                    └── Extracts key attributes (name, SKU, category…)
                        │
                        ▼
                    Embedding (Google Text-Embedding-004)
                        │
                        ▼
                    Saved to Qdrant Vector DB
                        │
                        ▼
                Notification → seller informed of result
```

<!-- INSERT: Hình 3.7 - Quy trình tạo và xử lý sản phẩm -->

**Key design decisions:**
- LLM-based auto-moderation reduces admin workload significantly
- Vector embeddings are generated at creation time, so AI search is always up-to-date
- All steps are fully decoupled via Kafka — Product Service never blocks on evaluation

---

### Order Processing & Saga Pattern

Order processing is the most complex workflow in Lemoo, coordinating multiple services with strict consistency requirements. It uses the **Saga Orchestration Pattern** with `Order Service` as the central orchestrator.

```
User places order
        │
        ▼
Order Service (orchestrator)
        │
        ├──[Step 1]──► Promotion Service
        │               ├── APPLY promotion (distributed lock)
        │               ├── apply.success → proceed
        │               └── apply.failed  → stop, notify user
        │
        ├──[Step 2]──► Product Service
        │               ├── RESERVE inventory (distributed lock)
        │               ├── reserve.success → proceed
        │               └── reserve.failed  → COMPENSATE: refund promotion
        │
        └──[Step 3]──► Notification Service
                        └── Notify seller of new order
```

<!-- INSERT: Hình 3.8 - Quy trình xử lý đơn hàng (Saga orchestration diagram) -->

**Why Saga over 2PC?**

Traditional two-phase commit (2PC) requires global resource locks across services — this kills throughput at scale. Saga breaks the transaction into local transactions per service, with **compensating transactions** that roll back only what's needed if a step fails. Combined with Kafka as the event bus, this approach supports 10 million orders per minute without bottlenecks.

---

### Distributed Locking for Inventory & Promotions

In high-concurrency scenarios, multiple order requests may target the same product SKU or promotion code simultaneously. Without synchronization, this leads to:

- **Race conditions** — two requests both read stock = 1, both proceed, stock goes to -1
- **Overselling** — more units sold than available
- **Promotion overuse** — voucher used more times than its configured limit

Lemoo solves this using **Redis distributed locks via Redisson**:

```
Service needs to update a shared resource
        │
        ▼
Acquire Redis lock: lock:product:<productId>
        │
        ├── Lock acquired
        │       ├── Read current value (from cache or DB)
        │       ├── Validate & update
        │       └── Release lock
        │
        └── Lock not acquired
                └── Wait / retry / return failure
```

<!-- INSERT: Hình 3.9 - Ảnh minh họa cơ chế khóa phân tán -->

**Inventory lock key**: `lock:product:<productId>`
**Promotion lock key**: `lock:promotion:<promotionId>`

Redis also serves as a **distributed cache layer** (via Redis Cluster) for frequently accessed data like product listings, voucher metadata, and session state — significantly reducing load on PostgreSQL and MongoDB.

---

### Real-Time Chat System

The chat system is built on **WebSocket + Kafka** to achieve low-latency message delivery at scale:

```
User A opens Lemoo Chat
        │
        ▼
WebSocket connection established with Socket Service
        │
User A sends message
        │
        ▼
Socket Service → Kafka topic: chat-service.message.realtime.send
        │
        ▼
Chat Service
        ├── Validates & processes message
        ├── Saves to MongoDB (chat history)
        └── Kafka topic: chat-service.message.status.update
                │
                ▼
        Socket Service → pushes to User B via WebSocket
```

<!-- INSERT: Hình 3.10 - Sơ đồ thiết kế hệ thống chat realtime với socket -->

**Design choices:**
- **MongoDB** is used for chat storage — its flexible document model and high write throughput fit chat history perfectly
- **Kafka** decouples the Socket Service from Chat Service, allowing each to scale independently
- Target message delivery latency: **< 100ms** under high load

---

### AI Search & Chat System

The AI layer uses **Model Context Protocol (MCP)** to give the LLM structured, real-time access to backend data without tight coupling.

```
User types: "Tìm áo thun nam giá dưới 300k"
        │
        ▼
Chat AI Service (MCP Client)
        │
        ├── LLM (Gemini 2.0 Flash) parses intent
        │
        ├── Routes to: Product MCP Server
        │       └── HTTP → Product Service
        │               └── Qdrant vector search
        │                   (query embedded → semantic match)
        │                       └── Returns ranked product list
        │
        └── LLM formats response
                └── "Here are men's t-shirts under 300k that match…"
```

**Three MCP Servers:**

| MCP Server | Connected Service | Example Queries |
|---|---|---|
| Product MCP Server | Product Service + Qdrant | "Find me a blue t-shirt under 300k" |
| Order MCP Server | Order Service | "Where is my order?" |
| Voucher MCP Server | Promotion Service | "Do I have any vouchers for this shop?" |

<!-- INSERT: Hình 3.11 - Hệ thống AI chat sử dụng MCP server -->

This architecture means the AI can answer complex, multi-step queries like:

> *"I have 2 million VND. What's the best massage chair I can buy right now, and do I have any vouchers I can apply?"*

The LLM will call the Product MCP Server to find matching products, then call the Voucher MCP Server to check applicable vouchers, and synthesize a complete answer.

---

### CI/CD Pipeline

Every push to the main branch triggers an automated GitHub Actions pipeline:

```
Developer pushes code
        │
        ▼
GitHub Actions triggered
        ├── Build Docker image
        ├── Run tests
        └── Push image to Docker Hub
                │
                ▼
        Kubernetes (GKE) pulls new image
                │
                ▼
        Rolling update deployed to cluster
        (zero-downtime, auto-scaling preserved)
```

<!-- INSERT: Hình 3.12 - Quy trình CI/CD với Github Actions và Kubernetes -->

<!-- INSERT: Hình 4.7 - Giao diện quản lý CI qua Github Actions -->

---

## Screenshots

### Authentication

| Login | Register |
|---|---|
| <!-- INSERT: Hình 4.8 - Giao diện đăng nhập --> | <!-- INSERT: Hình 4.9 - Giao diện tạo tài khoản --> |

---

### Lemoo Mall

**Homepage**

<!-- INSERT: Hình 4.10 - Giao diện trang chủ Lemoo Mall -->

---

**Product Detail Page**

<!-- INSERT: Hình 4.12 - Giao diện chi tiết sản phẩm -->

---

### AI Chat Assistant

<!-- INSERT: Hình 4.11 - Giao diện chat AI -->

*Example conversation: User asks for a massage chair recommendation within budget — the AI searches the platform, finds matching products, and suggests the best fit.*

---

### Order Management

| Shopping Cart | Checkout |
|---|---|
| <!-- INSERT: Hình 4.13 - Giao diện giỏ hàng --> | <!-- INSERT: Hình 4.14 - Giao diện tạo đơn hàng --> |

| Order List | Order Tracking |
|---|---|
| <!-- INSERT: Hình 4.15 - Giao diện quản lý đơn hàng --> | <!-- INSERT: Hình 4.16 - Giao diện theo dõi đơn hàng --> |

---

### Lemoo Seller Center

| Create Product | Manage Products |
|---|---|
| <!-- INSERT: Hình 4.19 - Giao diện tạo sản phẩm --> | <!-- INSERT: Hình 4.20 - Giao diện quản lý sản phẩm --> |

| Promotions Dashboard | Create Promotion |
|---|---|
| <!-- INSERT: Hình 4.21 - Giao diện quản lý khuyến mãi --> | <!-- INSERT: Hình 4.22 - Giao diện tạo khuyến mãi --> |

**Store Registration**

<!-- INSERT: Hình 4.18 - Giao diện đăng ký bán hàng -->

---

### Community Features

| Friend Suggestions | Friend Requests |
|---|---|
| <!-- INSERT: Hình 4.24 - Giao diện gợi ý kết bạn --> | <!-- INSERT: Hình 4.25 - Giao diện lời mời kết bạn --> |

**Real-Time Chat**

<!-- INSERT: Hình 4.26 - Giao diện chat -->

**Notification Center**

<!-- INSERT: Hình 4.23 - Giao diện trung tâm thông báo -->

---

### Infrastructure

| GCP VPS Nodes | Kubernetes Node Dashboard |
|---|---|
| <!-- INSERT: Hình 4.1 - Danh sách các máy chủ VPS trên GCP --> | <!-- INSERT: Hình 4.4 - Giao diện quản lý node qua K8s dashboard --> |

| K8s Deployments | Kafka Topics |
|---|---|
| <!-- INSERT: Hình 4.3 - Giao diện quản lý service qua K8s dashboard --> | <!-- INSERT: Hình 4.6 - Giao diện quản lý Kafka topic qua Kafka-UI --> |

**Redis Cache Monitoring**

<!-- INSERT: Hình 4.5 - Giao diện quản lý Redis qua Redis Insight -->

---

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Java 21+
- Node.js 20+
- kubectl (for Kubernetes deployment)
- A Google Cloud project (for production deployment)

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-org/lemoo.git
cd lemoo

# Start infrastructure services (Kafka, Redis, PostgreSQL, MongoDB, Qdrant)
docker compose -f docker-compose.infra.yml up -d

# Start each microservice (example: product-service)
cd services/product-service
./mvnw spring-boot:run

# Start the frontend (Lemoo Mall)
cd frontends/lemoo-mall
npm install
npm run dev
```

### Environment Variables

Each service reads configuration from environment variables or a Spring Cloud Config Server. Key variables:

```env
# Auth Service
JWT_SECRET=...
OAUTH2_GOOGLE_CLIENT_ID=...
OAUTH2_GOOGLE_CLIENT_SECRET=...

# Product / AI Services
GEMINI_API_KEY=...
GOOGLE_EMBEDDING_API_KEY=...
QDRANT_HOST=localhost
QDRANT_PORT=6333

# Messaging
KAFKA_BOOTSTRAP_SERVERS=localhost:9092

# Cache
REDIS_HOST=localhost
REDIS_PORT=6379
```

> Full configuration documentation is available in each service's `README.md`.

### Kubernetes Deployment (GCP)

```bash
# Authenticate with GCP
gcloud container clusters get-credentials lemoo-cluster --zone us-central1-c

# Apply all manifests
kubectl apply -f k8s/

# Check deployment status
kubectl get deployments -n lemoo
```

---

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a pull request.

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push and open a Pull Request

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by the Lemoo Team
</p>
