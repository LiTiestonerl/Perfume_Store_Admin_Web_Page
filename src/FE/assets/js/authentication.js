// /auth/userinfo.email
// /auth/userinfo.profile
const CLIENT_ID =
  "126101907342-02aiog8v0gil99ubmosejpdb88036le3.apps.googleusercontent.com";
const LINK_GET_TOKEN = `https://accounts.google.com/o/oauth2/v2/auth?
 scope=https://www.googleapis.com/auth/userinfo.email%20https://www.googleapis.com/auth/userinfo.profile
 response_type=token&
 redirect_uri=https://perfume-store-mo-app-web-dashboard.vercel.app/api/auth&
 client_id=${CLIENT_ID}`;
const BASE_API_URL =
  "https://perfume-store-mo-app-web-dashboard.vercel.app/api/auth";

document
  .getElementById("loginButton")
  .addEventListener("click", loginWithGoogle);

function loginWithGoogle() {
  window.location.href = `${BASE_API_URL}/signin-google`;
}

async function handleGoogleResponse() {
  try {
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get("access_token");

    if (!accessToken) {
      throw new Error("Không tìm thấy access token");
    }

    const response = await fetch(`${BASE_API_URL}/google-response`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("jwtToken", data.token);
      console.log("Đăng nhập thành công!");
      console.log("Thông tin người dùng:", data);

      window.location.href = "/index.html";
    } else {
      console.error("Token không tồn tại");
    }
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

if (window.location.pathname.includes("google-response")) {
  handleGoogleResponse();
}

document.getElementById("logout").addEventListener("click", logout);
function logout() {
  localStorage.removeItem("jwtToken");
  console.log("Đã đăng xuất");
  window.location.href = "/login.html";
}
