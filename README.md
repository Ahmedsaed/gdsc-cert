# GDSC Certificate Generator

This project is a certificate generator website for Google Developer Student Clubs (GDSC). It's built using Next.js and hosted on Firebase. The project also utilizes Firebase Hosting, Firebase Authentication and Firebase Database services, along with a Cloudflare worker.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v16.x)
- npm

### Installation

1. Clone the repo
   ```sh
   git clone <repository-url>
   ```
2. Navigate to the project directory
   ```sh
   cd <project-directory>
	```
3. Install the dependencies:
   ```sh
   npm install
   ```
   > Note: if npm modified the `package-lock.json` file, please revert the changes before proceeding.

### Project Setup

1. Create a new Firebase project.
2. Enable the following services:
   - Firebase Hosting
   - Firebase Authentication
   - Firebase Realtime Database
3. Create a new web app to get the Firebase configuration.
4. Update the configuration in `firebase.js`, `.firebaserc` and `_app.js` with your Firebase project configuration.
5. Create a new Cloudflare worker using the code in `cloudflare-worker.js` and update the url in `components/admin.js`.
6. Create GitHub secrets for build-deploy.yaml
	- `FIREBASE_SERVICE_ACCOUNT_GDSC_CERT`: Firebase service account JSON
	- `ACCESS_TOKEN`: GitHub access token

## Usage

### Development

To start the development server, run the following command:

```sh
npm run dev
```

### Production

To build the project, run the following command:

```sh
npm run build
```

To start the production server, run the following command:

```sh
npm run start
```

For more information on how the project works, take a look at issue [#3](https://github.com/Ahmedsaed/gdsc-cert/issues/3).

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

- [Ahmed Saed](https://github.com/Ahmedsaed)
