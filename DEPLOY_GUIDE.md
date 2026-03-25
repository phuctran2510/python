# 🚀 Hướng dẫn Deploy Python Mastery lên GitHub Pages

## ✅ CÁCH 1: Deploy bằng `npm run deploy` (KHUYẾN NGHỊ - Đơn giản nhất)

Mở **Git Bash** trong thư mục project, chạy từng lệnh:

```bash
# === BƯỚC 1: Cài đặt dependencies ===
npm install --legacy-peer-deps

# === BƯỚC 2: Deploy lên GitHub Pages ===
npm run deploy
```

> ⏱ Chờ khoảng 1-2 phút → truy cập: https://phuctran2510.github.io/python-mastery

---

## ✅ CÁCH 2: Clone repo mới và deploy (Lần đầu tiên)

```bash
# === BƯỚC 1: Clone repo về máy ===
git clone https://github.com/phuctran2510/python-mastery.git
cd python-mastery

# === BƯỚC 2: Cài dependencies ===
npm install --legacy-peer-deps

# === BƯỚC 3: Deploy ===
npm run deploy
```

---

## ✅ CÁCH 3: Push code + tự động deploy qua GitHub Actions

```bash
# === BƯỚC 1: Vào thư mục project ===
cd /duong/dan/den/python-mastery

# === BƯỚC 2: Khởi tạo git (chỉ lần đầu) ===
git init
git branch -M main

# === BƯỚC 3: Kết nối với GitHub repo (chỉ lần đầu) ===
git remote add origin https://github.com/phuctran2510/python-mastery.git

# === BƯỚC 4: Thêm tất cả file ===
git add .

# === BƯỚC 5: Commit ===
git commit -m "feat: Python Mastery - initial deploy"

# === BƯỚC 6: Push lên GitHub ===
git push -u origin main

# GitHub Actions sẽ tự động build và deploy!
```

---

## 🔄 Khi cập nhật code mới

```bash
git add .
git commit -m "update: mô tả thay đổi"
git push origin main
# Hoặc deploy thủ công ngay:
npm run deploy
```

---

## ⚙️ Cài đặt GitHub Pages (chỉ làm 1 lần)

Sau khi deploy lần đầu:
1. Vào **GitHub repo** → **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `gh-pages` → `/ (root)`
4. Nhấn **Save**

---

## 🐛 Xử lý lỗi thường gặp

### Lỗi: "git is not recognized"
```bash
# Tải Git tại: https://git-scm.com/download/win
# Sau khi cài, mở lại Git Bash
```

### Lỗi: "npm is not recognized"  
```bash
# Tải Node.js tại: https://nodejs.org (chọn LTS)
# Sau khi cài, mở lại Git Bash
```

### Lỗi: "remote: Permission denied"
```bash
# Cấu hình git với tài khoản GitHub của bạn:
git config --global user.email "phuctv@dlu.edu.vn"
git config --global user.name "Tran Vinh Phuc"

# Hoặc dùng GitHub CLI để login:
gh auth login
```

### Lỗi: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/phuctran2510/python-mastery.git
```

### Lỗi build: "ENOSPC" (hết dung lượng)
```bash
npm cache clean --force
npm install --legacy-peer-deps
```
