// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    initializeDataTable();
    loadData();

    const itemForm = document.getElementById('itemForm');
    itemForm.addEventListener('submit', handleFormSubmit);
});

// Hàm khởi tạo DataTable
let dataTable;

function initializeDataTable() {
    dataTable = new simpleDatatables.DataTable("#datatablesSimple", {
        searchable: true,
        fixedHeight: true,
        perPage: 10,
    });
}

// Hàm tải dữ liệu từ API và hiển thị lên DataTable
async function loadData() {
    const items = await getAllItems();
    if (items) {
        populateTable(items);
    }
}

// Hàm populate dữ liệu vào DataTable
function populateTable(items) {
    const tableData = items.map(item => [
        item.name,
        item.position, // Thay bằng các thuộc tính phù hợp
        item.office,
        item.age,
        item.startDate,
        item.salary,
        `<button class="btn btn-sm btn-primary me-2" onclick="openEditModal(${item.id})">Sửa</button>
         <button class="btn btn-sm btn-danger" onclick="deleteItemHandler(${item.id})">Xóa</button>`
    ]);

    dataTable.clear();
    dataTable.rows.add(tableData);
    dataTable.render();
}

// Hàm mở modal tạo mới mục
function openCreateModal() {
    document.getElementById('itemModalLabel').innerText = 'Thêm Mới Mục';
    document.getElementById('itemId').value = '';
    document.getElementById('itemName').value = '';
    document.getElementById('itemDescription').value = '';
}

// Hàm mở modal chỉnh sửa mục
async function openEditModal(id) {
    const items = await getAllItems();
    const item = items.find(it => it.id === id);
    if (!item) {
        alert('Không tìm thấy mục cần sửa');
        return;
    }

    document.getElementById('itemModalLabel').innerText = 'Chỉnh Sửa Mục';
    document.getElementById('itemId').value = item.id;
    document.getElementById('itemName').value = item.name;
    document.getElementById('itemDescription').value = item.description;

    // Mở modal
    const itemModal = new bootstrap.Modal(document.getElementById('itemModal'));
    itemModal.show();
}

// Hàm xử lý form submit
async function handleFormSubmit(e) {
    e.preventDefault();

    const id = document.getElementById('itemId').value;
    const name = document.getElementById('itemName').value.trim();
    const description = document.getElementById('itemDescription').value.trim();

    if (name === '' || description === '') {
        alert('Vui lòng điền đầy đủ thông tin');
        return;
    }

    if (id) {
        // Update
        await updateItem(id, { name, description });
        alert('Cập nhật thành công');
    } else {
        // Create
        await createItem({ name, description });
        alert('Thêm mới thành công');
    }

    // Đóng modal
    const itemModalEl = document.getElementById('itemModal');
    const itemModal = bootstrap.Modal.getInstance(itemModalEl);
    itemModal.hide();

    // Tải lại dữ liệu
    loadData();
}

// Hàm xử lý xóa mục
async function deleteItemHandler(id) {
    if (confirm('Bạn có chắc chắn muốn xóa mục này?')) {
        await deleteItem(id);
        alert('Đã xóa mục');
        loadData();
    }
}
