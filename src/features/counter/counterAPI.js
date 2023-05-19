// A mock function to mimic making an async request for data
// Hàm mô phỏng để bắt chước yêu cầu dữ liệu không đồng bộ
export function fetchCount(amount = 1) {
    return new Promise((resolve) => setTimeout(() => resolve({ data: amount }), 500));
}
