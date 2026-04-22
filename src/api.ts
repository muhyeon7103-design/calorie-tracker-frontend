const BASE_URL = "http://localhost:8080";

export async function signupUser(data: {
  name: string;
  email: string;
  password: string;
  dailyCalorieGoal: number;
}) {
  const response = await fetch(`${BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("회원가입 실패");
  }

  return response.json();
}