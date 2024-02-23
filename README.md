![숨숨집로고(재) 1](https://github.com/YeonjuSeo/sumsum-frontend/assets/56028436/b87bbabc-4664-4f02-af4b-41191e9bc081)

## **✈️ Tech stacks**

### **Core**

- React 17
- JavaScript
- Expo

### Data Fetching

- Axios for using RESTful API

### **Styling**

- Styled Components

## **🛰 Features**

### Check only items within a specific range
![🔥메인홈](https://github.com/YeonjuSeo/sumsum-frontend/assets/56028436/79840904-c3ec-4e46-8839-ef14363d30f2)
![image](https://github.com/YeonjuSeo/sumsum-frontend/assets/56028436/fcb98ecf-a315-4fef-ab73-d6f3f9be37c2)
![image](https://github.com/YeonjuSeo/sumsum-frontend/assets/56028436/710744fb-3c54-4b82-843b-eecc144abefc)

Set your desired location of residence. <br/>
Only listings within a specific range based on the coordinates of the set location will be displayed. <br/>
You can create a listing upload post with various features if you want to register a property.

### Filter items according to desired conditions.  
![🔥필터링버튼 누를시](https://github.com/YeonjuSeo/sumsum-frontend/assets/56028436/6c272561-f136-4ebf-b8cc-e4a5f6943bd4)
![🔥서치결과](https://github.com/YeonjuSeo/sumsum-frontend/assets/56028436/9bc0d558-7867-4fb5-bb3a-a528b3a20cd0)

You can filter listings based on various criteria beyond quantitative standards.

### **Authentication**

- Access Token & Refresh Token
    - When a user requires an Access Token, it is obtained using the refresh Token stored in cookies.
    - The Access Token is then stored locally.
- Conditional Routes
    - if you are not authenticated, any private routes **can't be accessed.**
    - if you are not authenticated, some features may **be restricted.**
    - In root, loader **prevent** users from `NOT AUTHENTICATED`.

## 🏎 Getting Started

### Development

1. Clone this repository

    ```jsx
    $ git clone https://github.com/YeonjuSeo/sumsum-frontend.git
    ```

2. Install node packages with npm

    ```jsx
    $ npm install
    ```

3. Start developing

    ```jsx
    $ expo start
    ```

## 🐛 Bug Report

[Issues](https://github.com/YeonjuSeo/sumsum-frontend/issues)

## 💻 Contribution Guide

### Pull Request

### Forked strategy

```jsx
# Fork this repository to yours.
$ git clone https://github.com/YeonjuSeo/sumsum-frontend.git

# Install npm packages and start this project.
$ npm install
$ expo start

# (Working on your own..!)

# After that
$ git commit [...]
$ git push origin [YOUR_REPOSITORY]

# Enroll pull-request!
```

### Commit message rules

Consider starting the commit message: [Gitmoji](https://gitmoji.dev/)
 
- 🎨 : prefix
  - when improving structure / format of the code.
- ⚡️ : prefix
  - when improving performance.
- 🐛 : prefix
  - when fixing a bug
- ♻️ : prefix
  - when code refactoring
- 💄 : prefix
  - when adding or updating the UI and style files
- ✨ : prefix
  - when introducing new features
- 📝 : prefix
  - when adding or updating documentation
- 🔥 : prefix
  - when removing code or files

## LICENSE

Not yet decided.
