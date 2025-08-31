# 🚀 ADDMS - Automated Deployment & Domain Management System

<div align="center">

![ADDMS Logo](https://via.placeholder.com/200x100/4A90E2/FFFFFF?text=ADDMS)

**A modern, lightweight, and open-source control panel for automated website deployment, domain mapping, and server management**

*Built for developers and SMBs who value simplicity and efficiency*

[![GitHub Stars](https://img.shields.io/github/stars/EndFroZen/ADDMS?style=for-the-badge&logo=github&color=yellow)](https://github.com/EndFroZen/ADDMS/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/EndFroZen/ADDMS?style=for-the-badge&logo=github&color=blue)](https://github.com/EndFroZen/ADDMS/network)
[![License](https://img.shields.io/github/license/EndFroZen/ADDMS?style=for-the-badge&color=green)](LICENSE)
[![GitHub Issues](https://img.shields.io/github/issues/EndFroZen/ADDMS?style=for-the-badge&logo=github&color=red)](https://github.com/EndFroZen/ADDMS/issues)

[📖 Documentation](#documentation) • [🚀 Quick Start](#quick-start) • [✨ Features](#features) • [🤝 Contributing](#contributing) • [💬 Support](#support)

</div>

---

## 🎯 Overview

ADDMS (Automated Deployment & Domain Management System) is a comprehensive control panel designed to streamline web development workflows. It provides an intuitive interface for managing deployments, domains, and server resources while maintaining the flexibility that developers need.

### 🎯 Target Audience

- **Developers** looking for automated deployment solutions
- **Small to Medium Businesses (SMBs)** needing reliable server management
- **DevOps Teams** seeking streamlined deployment pipelines
- **Freelancers** managing multiple client projects

---

## ✨ Features

### 🔄 Automated Deployment
- **One-click deployments** from Git repositories
- **CI/CD pipeline integration** (GitHub Actions, GitLab CI, Jenkins)
- **Rollback capabilities** with version history
- **Blue-green deployment** support
- **Auto-scaling** based on traffic patterns

### 🌐 Domain Management
- **DNS management** with intuitive interface
- **SSL certificate** auto-provisioning (Let's Encrypt)
- **Subdomain creation** and management
- **Domain forwarding** and redirection
- **Custom domain mapping** for applications

### 🖥️ Server Management
- **Resource monitoring** (CPU, RAM, Disk, Network)
- **Log aggregation** and analysis
- **Database management** (MySQL, PostgreSQL, MongoDB)
- **Backup automation** with configurable schedules
- **Security scanning** and vulnerability assessment

### 📊 Analytics & Monitoring
- **Real-time performance metrics**
- **Uptime monitoring** with alerts
- **Traffic analytics** and insights
- **Error tracking** and debugging tools
- **Custom dashboards** with widgets

### 🔐 Security
- **Two-factor authentication (2FA)**
- **Role-based access control (RBAC)**
- **API key management**
- **Audit logging** for compliance
- **Firewall configuration** interface

---

## 🔧 Prerequisites

Before installing ADDMS, ensure you have the following:

### System Requirements
- **OS**: Ubuntu 20.04+ / CentOS 8+ / Docker
- **RAM**: 2GB minimum, 4GB recommended
- **CPU**: 2 cores minimum, 4 cores recommended
- **Storage**: 20GB available space
- **Network**: Stable internet connection

### Software Dependencies
- **Docker** 20.10+
- **Docker Compose** 2.0+
- **Node.js** 16+ (for development)
- **Python** 3.8+ (for scripts)
- **Git** 2.25+

---

## 🚀 Quick Start

Get ADDMS running in under 5 minutes:

```bash
# Clone the repository
git clone https://github.com/EndFroZen/ADDMS.git
cd ADDMS

# Start with Docker Compose
docker-compose up -d

# Access the web interface
open http://localhost:3000
```

**Default credentials:**
- Username: `admin`
- Password: `admin123`

> ⚠️ **Important**: Change the default password immediately after first login!

---

## 📋 Installation

### Option 1: Docker Installation (Recommended)

```bash
# Clone the repository
git clone https://github.com/EndFroZen/ADDMS.git
cd ADDMS

# Copy environment configuration
cp .env.example .env

# Edit configuration (optional)
nano .env

# Build and start services
docker-compose build
docker-compose up -d

# Check service status
docker-compose ps
```

### Option 2: Manual Installation

```bash
# Install dependencies
sudo apt update
sudo apt install nodejs npm python3 python3-pip git

# Clone and setup
git clone https://github.com/EndFroZen/ADDMS.git
cd ADDMS

# Install Node.js dependencies
npm install

# Install Python dependencies
pip3 install -r requirements.txt

# Setup database
npm run db:migrate

# Start the application
npm run start:prod
```

### Option 3: One-Line Installation Script

```bash
curl -fsSL https://raw.githubusercontent.com/EndFroZen/ADDMS/main/install.sh | bash
```

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the project root:

```bash
# Application Settings
APP_NAME=ADDMS
APP_ENV=production
APP_PORT=3000
APP_URL=https://yourdomain.com

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=addms
DB_USER=addms_user
DB_PASS=secure_password

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=redis_password

# Email Settings
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Security
JWT_SECRET=your-super-secret-jwt-key
API_KEY=your-api-key

# Cloud Provider Settings
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-west-2

# SSL Settings
SSL_ENABLED=true
SSL_CERT_PATH=/path/to/cert.pem
SSL_KEY_PATH=/path/to/private.key
```

### Configuration Files

#### `config/app.json`
```json
{
  "deployment": {
    "maxConcurrentDeployments": 5,
    "deploymentTimeout": 1800,
    "retryAttempts": 3
  },
  "monitoring": {
    "metricsRetention": "30d",
    "alertThresholds": {
      "cpu": 80,
      "memory": 85,
      "disk": 90
    }
  },
  "backup": {
    "enabled": true,
    "schedule": "0 2 * * *",
    "retention": "7d"
  }
}
```

---

## 💻 Usage

### Web Interface

1. **Dashboard**: Overview of all services and metrics
2. **Applications**: Manage your deployed applications
3. **Domains**: Configure DNS and SSL certificates
4. **Servers**: Monitor server resources and logs
5. **Settings**: Configure system preferences

### CLI Commands

```bash
# Application management
addms deploy <app-name>           # Deploy application
addms rollback <app-name> <version>  # Rollback to version
addms logs <app-name>             # View application logs
addms scale <app-name> <replicas> # Scale application

# Domain management
addms domain add <domain>         # Add new domain
addms domain ssl <domain>         # Generate SSL certificate
addms domain remove <domain>      # Remove domain

# Server management
addms server status               # Check server status
addms server backup               # Create backup
addms server restore <backup-id>  # Restore from backup
```

### API Examples

#### Deploy Application
```bash
curl -X POST https://your-domain.com/api/v1/deploy \
  -H "Authorization: Bearer YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "repository": "https://github.com/user/repo.git",
    "branch": "main",
    "environment": "production"
  }'
```

#### Get Application Status
```bash
curl -X GET https://your-domain.com/api/v1/apps/my-app/status \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Web Interface │    │   API Gateway   │    │   Mobile App    │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────┴──────────────┐
                    │     Application Core       │
                    │  ┌─────────────────────────┤
                    │  │   Deployment Engine     │
                    │  │   Domain Manager        │
                    │  │   Monitoring System     │
                    │  │   Security Layer        │
                    │  └─────────────────────────┤
                    └──────────────┬─────────────┘
                                   │
          ┌────────────────────────┼────────────────────────┐
          │                       │                        │
    ┌─────▼─────┐         ┌───────▼───────┐      ┌────────▼────────┐
    │ PostgreSQL│         │     Redis     │      │   File Storage  │
    │ Database  │         │     Cache     │      │   (S3/Local)    │
    └───────────┘         └───────────────┘      └─────────────────┘
```

### Component Overview

| Component | Description | Technology |
|-----------|-------------|------------|
| **Frontend** | User interface and dashboard | React, TypeScript, Tailwind CSS |
| **API Gateway** | RESTful API endpoints | Node.js, Express |
| **Deployment Engine** | Handles application deployments | Docker, Kubernetes |
| **Domain Manager** | DNS and SSL management | BIND, Certbot |
| **Monitoring** | System and application monitoring | Prometheus, Grafana |
| **Database** | Data persistence layer | PostgreSQL |
| **Cache** | Session and data caching | Redis |
| **Storage** | File and backup storage | AWS S3, Local FS |

---

## 📚 API Documentation

### Authentication

All API requests require authentication using Bearer tokens:

```bash
Authorization: Bearer YOUR_API_TOKEN
```

### Endpoints

#### Applications
- `GET /api/v1/apps` - List all applications
- `POST /api/v1/apps` - Create new application
- `GET /api/v1/apps/:id` - Get application details
- `PUT /api/v1/apps/:id` - Update application
- `DELETE /api/v1/apps/:id` - Delete application
- `POST /api/v1/apps/:id/deploy` - Deploy application
- `POST /api/v1/apps/:id/rollback` - Rollback application

#### Domains
- `GET /api/v1/domains` - List all domains
- `POST /api/v1/domains` - Add new domain
- `GET /api/v1/domains/:domain` - Get domain details
- `PUT /api/v1/domains/:domain` - Update domain
- `DELETE /api/v1/domains/:domain` - Remove domain
- `POST /api/v1/domains/:domain/ssl` - Generate SSL certificate

#### Monitoring
- `GET /api/v1/metrics` - Get system metrics
- `GET /api/v1/health` - Health check endpoint
- `GET /api/v1/logs/:app` - Get application logs

### Response Format

```json
{
  "success": true,
  "data": {
    "id": "app-123",
    "name": "my-application",
    "status": "running",
    "url": "https://my-app.example.com"
  },
  "message": "Application deployed successfully",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

For complete API documentation, visit: [https://docs.addms.io/api](https://docs.addms.io/api)

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run integration tests
npm run test:integration

# Run specific test suite
npm run test:unit -- --grep "deployment"
```

### Test Structure

```
tests/
├── unit/                   # Unit tests
│   ├── controllers/
│   ├── services/
│   └── utils/
├── integration/            # Integration tests
│   ├── api/
│   ├── database/
│   └── deployment/
└── e2e/                   # End-to-end tests
    ├── web/
    └── api/
```

### Writing Tests

```javascript
// Example unit test
describe('DeploymentService', () => {
  it('should deploy application successfully', async () => {
    const service = new DeploymentService();
    const result = await service.deploy({
      repository: 'https://github.com/user/repo.git',
      branch: 'main'
    });
    
    expect(result.success).toBe(true);
    expect(result.deploymentId).toBeDefined();
  });
});
```

---

## 🚀 Deployment

### Production Deployment

#### Using Docker Compose

```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  addms:
    image: addms:latest
    ports:
      - "80:3000"
      - "443:3443"
    environment:
      - NODE_ENV=production
      - DB_HOST=postgres
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  postgres:
    image: postgres:14
    environment:
      - POSTGRES_DB=addms
      - POSTGRES_USER=addms
      - POSTGRES_PASSWORD=secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

  redis:
    image: redis:7
    restart: unless-stopped

volumes:
  postgres_data:
```

#### Using Kubernetes

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: addms
spec:
  replicas: 3
  selector:
    matchLabels:
      app: addms
  template:
    metadata:
      labels:
        app: addms
    spec:
      containers:
      - name: addms
        image: addms:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
        resources:
          limits:
            cpu: 500m
            memory: 512Mi
          requests:
            cpu: 250m
            memory: 256Mi
```

#### Cloud Deployment

##### AWS ECS
```bash
# Deploy to AWS ECS
aws ecs create-service \
  --cluster addms-cluster \
  --service-name addms \
  --task-definition addms:1 \
  --desired-count 2
```

##### DigitalOcean App Platform
```yaml
# .do/app.yaml
name: addms
services:
- name: web
  source_dir: /
  github:
    repo: EndFroZen/ADDMS
    branch: main
  run_command: npm start
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  routes:
  - path: /
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/ADDMS.git
   cd ADDMS
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

### Contribution Guidelines

- **Code Style**: Follow ESLint and Prettier configurations
- **Testing**: Write tests for new features
- **Documentation**: Update documentation for any changes
- **Commit Messages**: Use conventional commits format

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test changes
- `chore`: Build/tooling changes

### Pull Request Process

1. Update the README.md if needed
2. Update documentation
3. Add tests for new functionality
4. Ensure all tests pass
5. Request review from maintainers

### Code of Conduct

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 ADDMS

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 Support

### Getting Help

- **📖 Documentation**: [https://docs.addms.io](https://docs.addms.io)
- **💬 Discord**: [Join our Discord server](https://discord.gg/addms)
- **🐛 Issues**: [GitHub Issues](https://github.com/EndFroZen/ADDMS/issues)
- **📧 Email**: support@addms.io

### Community

- **🌟 GitHub Discussions**: [Join the conversation](https://github.com/EndFroZen/ADDMS/discussions)
- **🐦 Twitter**: [@ADDMS_Official](https://twitter.com/addms_official)
- **📺 YouTube**: [ADDMS Channel](https://youtube.com/addms)

### Enterprise Support

For enterprise users, we offer:
- **Priority Support**: 24/7 support with SLA
- **Custom Training**: On-site or virtual training sessions
- **Consulting Services**: Architecture and implementation guidance
- **Custom Development**: Feature development and customization

Contact us at: enterprise@addms.io

---

## 🙏 Acknowledgments

We thank the following projects and contributors:

### Open Source Libraries
- **Node.js** - JavaScript runtime
- **React** - Frontend framework
- **PostgreSQL** - Database system
- **Redis** - Caching system
- **Docker** - Containerization
- **Kubernetes** - Container orchestration

### Contributors

Thanks to all the amazing people who have contributed to this project:

<a href="https://github.com/EndFroZen/ADDMS/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=EndFroZen/ADDMS" />
</a>

### Special Thanks
- **EndFroZen** - Project creator and maintainer
- **All Beta Testers** - For their valuable feedback
- **Community Members** - For their continuous support

---

## 📊 Project Statistics

![GitHub Repo Size](https://img.shields.io/github/repo-size/EndFroZen/ADDMS)
![GitHub Code Size](https://img.shields.io/github/languages/code-size/EndFroZen/ADDMS)
![GitHub Contributors](https://img.shields.io/github/contributors/EndFroZen/ADDMS)
![GitHub Last Commit](https://img.shields.io/github/last-commit/EndFroZen/ADDMS)
![GitHub Release](https://img.shields.io/github/v/release/EndFroZen/ADDMS)

---

<div align="center">

**Made with ❤️ by the ADDMS Team**

[⬆ Back to Top](#-addms---automated-deployment--domain-management-system)

</div>
