# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Đây là một dự án đầu tay của tôi khi học reactJS

-   web được xấy dựng trên cơ sở sử dụng ReactJS, và các thư viện như
    react-router, react-router-dom, ...
-   Các bộ phim được lấy thông tin từ API TMDB, sử dụng axios
-   sử dụng firebase để deploy dự án

### Do đây là dự án đầu tay nên không khỏi sai sót, tôi sẽ cố gắng khắc phục dần cũng như bổ sung thêm các kiến thức cần thiết

### How to deploy project with firebase

B1: Khởi chạy terminal và trỏ đến thư mục dự án cần deploy
B2: Gõ lệnh `npx firebase login` nếu chưa đăng nhập vào firebase
B3: Gõ tiếp `npx firebase init` để vào giao diện chọn chức năng
B4: Chọn /Hosting: Configure files for Firebase Hosting and (optionally) set up
GitHub Action deploys/
B5: Chọn build -> chọn Y -> nó hỏi có muốn deploy với github không -> chọn n
B6: Gõ `npm run build`
B7: Gõ `npx firebase deploy`
Nó sẽ trả về hoiting URL. đó là đường link dự án đã deploy

**Note: cần phải cài đặt firebase vào trong thư mục dự án của minh: `npm i firebase --save` để cài đặt!**

### Để tạo một dự án reactJS với redux

Gõ `npx create-react-app ten_du_an --template redux`
chuyển đên file vừa tạo `cd ten_du_an`
chạy dự án `npm start`

**_Node: Nếu như khi chạy lệnh `npm start`, nó sẽ chạy ở port 3000 ta có thể dổi thành cổng khác_**
vào file dự án, mở bằng vscode
thêm 1 file mới đặt tên là env.local
thêm 1 dòng mới là 'PORT=3001'
chạy lại dự án

### Định cấu hình cho Pretty

### Tạo file `.vscode/setting.json` và dán dòng lệnh

````{
// Định cấu hình cho extention Pretty
"editor.formatOnSave": true,
"editor.defaultFormatter": "esbenp.prettier-vscode"
}```

### đứng ở thư mục `/root` tạo file `.prettierrc` và dán dòng lệnh

```{
"arrowParens": "always",
"bracketSameLine": false,
"bracketSpacing": true,
"embeddedLanguageFormatting": "auto",
"htmlWhitespaceSensitivity": "css",
"insertPragma": false,
"jsxSingleQuote": false,
"printWidth": 120,
"proseWrap": "preserve",
"quoteProps": "as-needed",
"requirePragma": false,
"semi": true,
"singleQuote": true,
"tabWidth": 4,
"trailingComma": "all",
"useTabs": false,
"vueIndentScriptAndStyle": false
}```
````
