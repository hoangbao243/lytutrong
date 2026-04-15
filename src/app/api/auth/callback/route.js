const params = new URLSearchParams();
params.append("code", "4/0Aci98E-YN4QYFXAuSrAtx3eoN72wNxNzSD-Rew1aaaFfeN0vdB7KSwSLx9alWVLjDCeerQ");
params.append("client_id", process.env.CLIENT_ID);
params.append("client_secret", process.env.CLIENT_SECRET);
params.append("redirect_uri", "https://lytutrong.edu.vn/api/auth/callback");
params.append("grant_type", "authorization_code");

const res = await fetch("https://oauth2.googleapis.com/token", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: params,
});

const data = await res.json();
console.log(data);