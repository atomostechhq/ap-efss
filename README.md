
# Atomos AP EFSS

Atomos AP EFSS (Enterprise File Storage System) is a Node.js application for securely uploading and serving static assets in a structured directory system. This application supports API key authentication for secure file uploads and serves files publicly via URLs. It also leverages Nginx for caching to ensure fast file serving.

## Features

- Secure file uploads with API key authentication
- Structured directory system (company-wise and content-wise)
- Supports multiple file types (PDF, TXT, XLSX, PNG, JPEG, SVG, etc.)
- Public access to files via URLs
- Nginx caching for fast file serving

## Installation

### Prerequisites

- Node.js and npm installed
- Nginx installed
- A Google Cloud Platform (GCP) VM instance (optional, for deployment)

### Clone the Repository

```sh
git clone https://github.com/atomostechhq/atomos-ap-efss.git
cd atomos-ap-efss
```

### Install Dependencies

```sh
npm install
```

### Environment Configuration

Create a `.env` file in the root directory with the following content:

```env
PORT=3000
UPLOAD_DIR=uploads
API_KEY=your-secure-api-key
```

Replace `your-secure-api-key` with a secure API key of your choice.

## Usage

### Running the Application

To start the application, run:

```sh
node src/app.js
```

The server will start on the port specified in your `.env` file (default is 3000).

### Uploading Files

You can upload files using a tool like Postman or `curl`. The API endpoint for file uploads requires an API key for authentication.

Example `curl` command:

```sh
curl -H "x-api-key: your-secure-api-key" \
     -F "company=CompanyA" \
     -F "contentType=pdf" \
     -F "filename=customName.pdf" \
     -F "file=@path/to/your/file.pdf" \
     http://localhost:3000/api/files/upload
```

If `filename` is not provided, the original file name will be used.

### Retrieving Files

Files can be retrieved by navigating to their URL in the browser. The URL structure is as follows:

```
http://localhost:3000/uploads/<company>/<contentType>/<fileName>
```

Example:

```
http://localhost:3000/uploads/CompanyA/pdf/customName.pdf
```

## Nginx Configuration for Caching

To enable caching and improve file serving speed, you can configure Nginx as a reverse proxy.

### Install Nginx

```sh
sudo apt update
sudo apt install nginx
```

### Configure Nginx

Create a new Nginx configuration file:

```sh
sudo nano /etc/nginx/sites-available/atomos-ap-efss
```

Add the following content to the file:

```nginx
server {
    listen 80;
    server_name your_domain_or_ip;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /uploads/ {
        alias /path/to/your/uploads/;
        expires 30d;
        add_header Cache-Control "public";
        access_log off;
    }
}
```

Replace `/path/to/your/uploads/` with the actual path to your uploads directory.

### Enable the Configuration

Create a symbolic link to enable the new configuration:

```sh
sudo ln -s /etc/nginx/sites-available/atomos-ap-efss /etc/nginx/sites-enabled/
```

### Test the Configuration

Test the Nginx configuration for syntax errors:

```sh
sudo nginx -t
```

### Restart Nginx

Restart Nginx to apply the changes:

```sh
sudo systemctl restart nginx
```

## Deployment on GCP VM Instance

To deploy the application on a Google Cloud Platform (GCP) VM instance, follow these steps:

1. **Create a VM Instance**: Create a new VM instance on GCP with the desired specifications.

2. **Install Node.js and Nginx**: SSH into your VM instance and install Node.js and Nginx.

3. **Clone the Repository and Install Dependencies**:

   ```sh
   git clone https://github.com/yourusername/atomos-ap-efss.git
   cd atomos-ap-efss
   npm install
   ```

4. **Configure Environment Variables**: Create a `.env` file with your configuration.

5. **Start the Application**: Run the application.

6. **Configure Nginx**: Set up Nginx as described in the Nginx Configuration section.

7. **Open Necessary Ports**: Ensure that the necessary ports (e.g., 80 for HTTP) are open in your GCP firewall settings.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss improvements or bugs.

## Acknowledgments

- Inspired by the need for a robust enterprise file storage system.
- Built with love by the Atomos AP EFSS team.
