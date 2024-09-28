// js/api.js

const API_BASE_URL = 'api/v1/perfumes'; // Thay đổi URL phù hợp

// Hàm GET tất cả mục
async function getAllItems() {
    try {
        const response = await fetch(`${API_BASE_URL}/items`);
        if (!response.ok) {
            throw new Error('Failed to fetch items');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        alert('Lỗi khi lấy dữ liệu');
    }
}

// Hàm POST tạo mới mục
async function createItem(data) {
    try {
        const response = await fetch(`${API_BASE_URL}/items`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to create item');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        alert('Lỗi khi tạo dữ liệu');
    }
}

// Hàm PUT cập nhật mục
async function updateItem(id, data) {
    try {
        const response = await fetch(`${API_BASE_URL}/items/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Failed to update item');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        alert('Lỗi khi cập nhật dữ liệu');
    }
}

// Hàm DELETE xóa mục
async function deleteItem(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/items/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error('Failed to delete item');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        alert('Lỗi khi xóa dữ liệu');
    }
}
