const BASE_API_URL = "https://perfume-store-mo-app-web-dashboard.vercel.app/api/auth";

document.getElementById("loginButton").addEventListener("click", loginWithGoogle);

function loginWithGoogle() {
  window.location.href = `${BASE_API_URL}/signin-google`;
}

// Xử lý phản hồi từ Google để nhận JWT token
async function handleGoogleResponse() {
  try {
    const response = await fetch(`${BASE_API_URL}/google-response`);

    if (!response.ok) {
      throw new Error("Authentication failed");
    }

    const data = await response.json();

    if (data.token) {
      localStorage.setItem("jwtToken", data.token);
      console.log("Đăng nhập thành công!");
      console.log("Thông tin người dùng:", data);

      window.location.href = '/index.html';
    } else {
      console.error("Token không tồn tại");
    }
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

if (window.location.pathname.includes('google-response')) {
  handleGoogleResponse();
}

document.getElementById("logout").addEventListener("click", logout);
function logout() {
  localStorage.removeItem("jwtToken");
  console.log("Đã đăng xuất");
  window.location.href = '/login.html';
}
