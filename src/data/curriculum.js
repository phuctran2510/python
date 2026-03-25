export const chapters = [
  {
    id: 1,
    title: "Python Cơ Bản",
    subtitle: "Variables, Functions, Collections & Files",
    emoji: "🐍",
    color: "#00FF88",
    dark: "#003322",
    topics: [
      {
        id: "1-1",
        title: "Biến & Kiểu Dữ Liệu",
        icon: "📦",
        theory: `## Biến (Variables)

Biến là **tên** dùng để lưu trữ dữ liệu trong bộ nhớ. Python là ngôn ngữ **dynamic typing** — không cần khai báo kiểu.

### Quy tắc đặt tên
- Bắt đầu bằng chữ cái hoặc \`_\`  
- Không chứa ký tự đặc biệt  
- **Phân biệt HOA/thường**: \`name ≠ Name\`
- Không dùng từ khóa Python (\`if\`, \`for\`, \`def\`...)

### Các kiểu dữ liệu cơ bản

| Kiểu | Ví dụ | Mô tả |
|------|-------|-------|
| \`int\` | \`42\`, \`-7\` | Số nguyên |
| \`float\` | \`3.14\`, \`-0.5\` | Số thực |
| \`str\` | \`"Hello"\` | Chuỗi ký tự |
| \`bool\` | \`True\`, \`False\` | Logic |
| \`None\` | \`None\` | Giá trị rỗng |

### Type Casting
\`\`\`python
int("42")      # → 42
float("3.14")  # → 3.14
str(100)       # → "100"
bool(0)        # → False
\`\`\``,
        code: `# ==============================
# BIẾN VÀ KIỂU DỮ LIỆU TRONG PYTHON
# ==============================

# 1. Khai báo biến cơ bản
ten = "Nguyễn Văn An"
tuoi = 20
diem_trung_binh = 8.5
la_sinh_vien = True
dia_chi = None  # chưa có giá trị

# 2. In thông tin với f-string (Python 3.6+)
print(f"Tên: {ten}")
print(f"Tuổi: {tuoi}")
print(f"Điểm TB: {diem_trung_binh:.2f}")
print(f"Sinh viên: {la_sinh_vien}")

# 3. Kiểm tra kiểu dữ liệu
print(type(ten))           # <class 'str'>
print(type(tuoi))          # <class 'int'>
print(type(diem_trung_binh)) # <class 'float'>

# 4. Ép kiểu (Type Casting)
tuoi_str = str(tuoi)       # int → str
diem_int = int(diem_trung_binh)  # float → int (3.14 → 3)
diem_float = float("9.0")  # str → float

print(f"Tuổi (str): '{tuoi_str}', type: {type(tuoi_str)}")
print(f"Điểm (int): {diem_int}")

# 5. Multiple assignment
x = y = z = 0
a, b, c = 1, 2, 3
print(f"x={x}, y={y}, z={z}")
print(f"a={a}, b={b}, c={c}")

# 6. Swap biến (Python style)
a, b = b, a
print(f"Sau swap: a={a}, b={b}")

# 7. Hằng số (convention: UPPERCASE)
PI = 3.14159
MAX_SIZE = 100
DATABASE_URL = "localhost:5432"`,
        exercises: [
          {
            title: "Bài 1: Thông tin cá nhân",
            desc: "Tạo các biến lưu: họ tên, năm sinh, chiều cao (m), cân nặng (kg). Tính BMI = cân_nặng / chiều_cao². In kết quả với f-string.",
            hint: "BMI = weight / (height * height)"
          },
          {
            title: "Bài 2: Đổi tiền tệ",
            desc: "Nhập số tiền USD từ input(). Đổi sang VND (1 USD = 24,000 VND). In kết quả có dấu phẩy phân cách hàng nghìn.",
            hint: "Dùng f'{so:,}' để format số có dấu phẩy"
          },
          {
            title: "Bài 3: Kiểm tra kiểu",
            desc: "Tạo 5 biến với 5 kiểu khác nhau. Dùng isinstance() kiểm tra từng biến. In True/False cho từng kiểm tra.",
            hint: "isinstance(x, int) trả về True/False"
          }
        ],
        lab: {
          title: "LAB 1.1: Máy tính chỉ số sức khỏe",
          steps: [
            "Nhập tên, tuổi, chiều cao (cm), cân nặng (kg)",
            "Đổi chiều cao từ cm → m",
            "Tính BMI = cân_nặng / chiều_cao²",
            "Phân loại: <18.5 (Gầy), 18.5-24.9 (Bình thường), 25-29.9 (Thừa cân), ≥30 (Béo phì)",
            "Tính tuổi theo tháng và theo ngày",
            "In báo cáo đầy đủ với format đẹp"
          ]
        }
      },
      {
        id: "1-2",
        title: "Hàm (Functions)",
        icon: "⚙️",
        theory: `## Hàm trong Python

Hàm là **khối code** có tên, thực hiện một nhiệm vụ cụ thể, có thể tái sử dụng.

### Cú pháp
\`\`\`python
def tên_hàm(tham_số_1, tham_số_2, ...):
    """Docstring mô tả hàm"""
    # Thân hàm
    return kết_quả
\`\`\`

### Các loại tham số
- **Positional**: \`def f(a, b)\` — truyền theo thứ tự
- **Default**: \`def f(a, b=10)\` — có giá trị mặc định
- **Keyword**: \`f(b=5, a=1)\` — truyền theo tên
- **\*args**: nhận nhiều positional args → tuple
- **\*\*kwargs**: nhận nhiều keyword args → dict

### Scope (Phạm vi)
- **Local**: biến trong hàm, chỉ dùng trong hàm
- **Global**: biến ngoài hàm, dùng từ khóa \`global\`
- **Enclosing**: closure trong nested function
- **Built-in**: \`print\`, \`len\`, \`range\`...`,
        code: `# ==============================
# HÀM TRONG PYTHON
# ==============================

# 1. Hàm cơ bản
def chao(ten):
    """Hàm in lời chào"""
    return f"Xin chào, {ten}!"

print(chao("An"))  # Xin chào, An!

# 2. Tham số mặc định
def tinh_luy_thua(co_so, mu=2):
    return co_so ** mu

print(tinh_luy_thua(3))     # 9  (3^2)
print(tinh_luy_thua(3, 3))  # 27 (3^3)

# 3. *args — nhiều tham số positional
def tinh_tong(*so_nhieu):
    return sum(so_nhieu)

print(tinh_tong(1, 2, 3, 4, 5))  # 15

# 4. **kwargs — tham số keyword
def thong_tin_sv(**info):
    for key, value in info.items():
        print(f"  {key}: {value}")

thong_tin_sv(ten="Bình", tuoi=21, lop="CNTT01")

# 5. Hàm trả về nhiều giá trị
def tinh_toan(a, b):
    return a + b, a - b, a * b, a / b

tong, hieu, tich, thuong = tinh_toan(10, 3)
print(f"Tổng={tong}, Hiệu={hieu}, Tích={tich}, Thương={thuong:.2f}")

# 6. Lambda (hàm ẩn danh)
binh_phuong = lambda x: x ** 2
print(binh_phuong(5))  # 25

# Sắp xếp với lambda
sinh_vien = [("An", 8.5), ("Bình", 9.0), ("Chi", 7.5)]
sinh_vien_sorted = sorted(sinh_vien, key=lambda sv: sv[1], reverse=True)
print(sinh_vien_sorted)

# 7. Closure
def tao_bo_dem(bat_dau=0):
    dem = [bat_dau]
    def tang():
        dem[0] += 1
        return dem[0]
    return tang

counter = tao_bo_dem(10)
print(counter())  # 11
print(counter())  # 12

# 8. Decorator cơ bản
def log_func(func):
    def wrapper(*args, **kwargs):
        print(f"→ Gọi hàm: {func.__name__}")
        result = func(*args, **kwargs)
        print(f"← Kết quả: {result}")
        return result
    return wrapper

@log_func
def cong(a, b):
    return a + b

cong(3, 4)`,
        exercises: [
          {
            title: "Bài 1: Số nguyên tố",
            desc: "Viết hàm is_prime(n) kiểm tra n có phải số nguyên tố không. Dùng hàm đó in tất cả số nguyên tố từ 2 đến 100.",
            hint: "Duyệt từ 2 đến sqrt(n), nếu chia hết thì không phải nguyên tố"
          },
          {
            title: "Bài 2: Fibonacci",
            desc: "Viết 2 phiên bản hàm fibonacci: (1) dùng vòng lặp, (2) dùng đệ quy. So sánh kết quả với n=10.",
            hint: "fib(0)=0, fib(1)=1, fib(n)=fib(n-1)+fib(n-2)"
          },
          {
            title: "Bài 3: Calculator",
            desc: "Viết hàm calculator(a, op, b) nhận 2 số và phép tính (+,-,*,/,%). Dùng match-case hoặc if-elif xử lý từng phép.",
            hint: "Xử lý trường hợp chia cho 0"
          }
        ],
        lab: {
          title: "LAB 1.2: Thư viện toán học mini",
          steps: [
            "Viết hàm tính giai thừa (cả loop và recursion)",
            "Viết hàm tính UCLN và BCNN",
            "Viết hàm kiểm tra số hoàn hảo (perfect number)",
            "Viết hàm tính tổng các chữ số",
            "Tạo module math_utils.py và import vào main.py",
            "Viết docstring đầy đủ cho mỗi hàm"
          ]
        }
      },
      {
        id: "1-3",
        title: "List & Tuple",
        icon: "📋",
        theory: `## List và Tuple

### List — Danh sách có thể thay đổi
- **Mutable**: có thể thêm/xóa/sửa phần tử
- Cú pháp: \`[item1, item2, ...]\`

### Tuple — Danh sách bất biến  
- **Immutable**: không thể thay đổi sau khi tạo
- Cú pháp: \`(item1, item2, ...)\`
- Nhanh hơn List, dùng cho dữ liệu cố định

### List Comprehension
\`\`\`python
# Cú pháp:
[biểu_thức for phần_tử in iterable if điều_kiện]

# Ví dụ:
squares = [x**2 for x in range(10)]
evens   = [x for x in range(20) if x % 2 == 0]
\`\`\`

### Slicing
\`\`\`python
lst = [0, 1, 2, 3, 4, 5]
lst[1:4]    # [1, 2, 3]
lst[::2]    # [0, 2, 4]
lst[::-1]   # [5, 4, 3, 2, 1, 0]  ← đảo ngược
\`\`\``,
        code: `# ==============================
# LIST VÀ TUPLE
# ==============================

# === LIST ===
# 1. Tạo list
fruits = ["táo", "chuối", "cam", "xoài"]
numbers = list(range(1, 11))  # [1..10]
mixed = [1, "hai", 3.0, True, None]

# 2. Truy cập & Slicing
print(fruits[0])     # táo (index dương)
print(fruits[-1])    # xoài (index âm)
print(fruits[1:3])   # ['chuối', 'cam']
print(fruits[::-1])  # đảo ngược

# 3. Thêm/Xóa phần tử
fruits.append("nho")        # thêm cuối
fruits.insert(1, "dưa")     # chèn vị trí
fruits.extend(["ổi", "mít"]) # thêm nhiều
fruits.remove("cam")         # xóa theo giá trị
popped = fruits.pop()        # xóa & lấy cuối
del fruits[0]                # xóa theo index

# 4. Tìm kiếm & Sắp xếp
diem = [7, 9, 5, 8, 6, 9, 4]
print(f"Max: {max(diem)}, Min: {min(diem)}")
print(f"Tổng: {sum(diem)}, TB: {sum(diem)/len(diem):.2f}")
diem.sort()                  # sắp xếp tăng dần
diem.sort(reverse=True)      # sắp xếp giảm dần
diem_copy = sorted(diem)     # trả về list mới

print(9 in diem)             # True — kiểm tra tồn tại
print(diem.count(9))         # đếm số lần xuất hiện
print(diem.index(8))         # vị trí đầu tiên

# 5. List Comprehension (★ quan trọng ★)
squares = [x**2 for x in range(1, 11)]
evens   = [x for x in range(20) if x % 2 == 0]
matrix  = [[i*j for j in range(1,4)] for i in range(1,4)]

print("Bình phương:", squares)
print("Số chẵn:", evens)
print("Ma trận:")
for row in matrix:
    print(" ", row)

# === TUPLE ===
diem_so = (10, 9, 8, 7, 10)
toa_do  = (10.5, 20.3)
don_vi  = ("kg", "km", "m", "cm")

# Tuple unpacking
x, y = toa_do
print(f"Tọa độ: x={x}, y={y}")

# Named tuple (nâng cao)
from collections import namedtuple
SinhVien = namedtuple("SinhVien", ["ten", "tuoi", "diem"])
sv = SinhVien("An", 20, 9.0)
print(f"{sv.ten} - {sv.tuoi} tuổi - Điểm: {sv.diem}")

# 6. Zip và Enumerate
ten_list   = ["An", "Bình", "Chi"]
diem_list  = [8.5, 9.0, 7.5]

for i, (ten, diem) in enumerate(zip(ten_list, diem_list), 1):
    print(f"{i}. {ten}: {diem}")`,
        exercises: [
          {
            title: "Bài 1: Quản lý danh sách sinh viên",
            desc: "Tạo list chứa thông tin 5 sinh viên (dùng tuple). Tính điểm TB, tìm sinh viên điểm cao nhất/thấp nhất, sắp xếp theo điểm.",
            hint: "Dùng max(list, key=lambda x: x[2]) để tìm điểm cao nhất"
          },
          {
            title: "Bài 2: Ma trận",
            desc: "Tạo ma trận 3x3 bằng list comprehension. Tính tổng từng hàng, từng cột, đường chéo chính.",
            hint: "Ma trận = [[1,2,3],[4,5,6],[7,8,9]]"
          },
          {
            title: "Bài 3: Lọc và biến đổi",
            desc: "Cho list điểm: [5,8,3,9,7,4,6,10,2,8]. Dùng list comprehension: lọc điểm>=7, nhân đôi điểm<5, đổi thang 10→100.",
            hint: "Dùng [x*10 for x in lst] để nhân"
          }
        ],
        lab: {
          title: "LAB 1.3: Hệ thống bảng điểm",
          steps: [
            "Nhập danh sách 10 học sinh (tên + 3 điểm môn)",
            "Tính điểm trung bình từng học sinh",
            "Xếp loại: Xuất sắc(≥9), Giỏi(≥8), Khá(≥6.5), TB(≥5), Yếu(<5)",
            "Sắp xếp theo điểm giảm dần, xếp hạng",
            "In bảng điểm đẹp với format",
            "Thống kê: số HS mỗi loại, điểm TB cả lớp"
          ]
        }
      },
      {
        id: "1-4",
        title: "Dictionary & Set",
        icon: "🗂️",
        theory: `## Dictionary và Set

### Dictionary — Từ điển (key-value)
- Lưu dữ liệu theo **cặp key:value**
- **Key phải unique** và immutable (str, int, tuple)
- **Mutable**, **Ordered** (Python 3.7+)

### Set — Tập hợp
- Tập hợp các phần tử **không trùng lặp**
- **Unordered**, không có index
- Hỗ trợ các phép tập hợp: ∪, ∩, −, △

### Dict Comprehension
\`\`\`python
{key: value for item in iterable if condition}
\`\`\``,
        code: `# ==============================
# DICTIONARY VÀ SET
# ==============================

# === DICTIONARY ===
# 1. Tạo dictionary
sv = {
    "ten": "Nguyễn Văn An",
    "tuoi": 20,
    "diem": [8, 9, 7.5],
    "lop": "CNTT01"
}

# Truy cập
print(sv["ten"])                     # Nguyễn Văn An
print(sv.get("diachi", "Chưa có"))  # Chưa có (an toàn)

# 2. Thêm / Sửa / Xóa
sv["email"] = "an@example.com"      # thêm
sv["tuoi"] = 21                      # sửa
del sv["lop"]                        # xóa key
email = sv.pop("email", None)        # xóa & lấy giá trị

# 3. Duyệt dictionary
for key in sv.keys():
    print(key)

for value in sv.values():
    print(value)

for key, value in sv.items():
    print(f"  {key}: {value}")

# 4. Dict Comprehension
ten_list  = ["An", "Bình", "Chi", "Dung"]
diem_list = [8.5, 9.0, 7.5, 8.0]

diem_dict = {ten: diem for ten, diem in zip(ten_list, diem_list)}
print(diem_dict)

# Lọc sinh viên giỏi
gioi = {k: v for k, v in diem_dict.items() if v >= 8.5}
print("SV giỏi:", gioi)

# 5. Merge dictionaries (Python 3.9+)
info1 = {"ten": "An", "tuoi": 20}
info2 = {"email": "an@email.com", "diem": 9.0}
merged = info1 | info2
print(merged)

# 6. defaultdict & Counter
from collections import defaultdict, Counter

dd = defaultdict(list)
dd["CNTT"].append("An")
dd["CNTT"].append("Bình")
dd["KTPM"].append("Chi")
print(dict(dd))

words = ["táo", "chuối", "táo", "cam", "táo", "chuối"]
counter = Counter(words)
print(counter)               # Counter({'táo': 3, 'chuối': 2, 'cam': 1})
print(counter.most_common(2)) # [('táo', 3), ('chuối', 2)]

# === SET ===
# 7. Tạo set
A = {1, 2, 3, 4, 5}
B = {4, 5, 6, 7, 8}

print(A | B)  # Hợp: {1,2,3,4,5,6,7,8}
print(A & B)  # Giao: {4, 5}
print(A - B)  # Hiệu: {1, 2, 3}
print(A ^ B)  # Đối xứng: {1,2,3,6,7,8}

# Loại bỏ trùng lặp
emails = ["a@x.com", "b@x.com", "a@x.com", "c@x.com"]
emails_unique = list(set(emails))
print("Không trùng:", emails_unique)`,
        exercises: [
          {
            title: "Bài 1: Danh bạ điện thoại",
            desc: "Xây dựng danh bạ dùng dict. Thêm/xóa/tìm kiếm liên lạc. Lưu nhiều số cho 1 người (dùng list value).",
            hint: "{'An': ['0912...', '0933...'], 'Bình': ['0901...']}"
          },
          {
            title: "Bài 2: Đếm từ",
            desc: "Nhập 1 đoạn văn. Đếm tần suất xuất hiện của từng từ dùng dict. In top 5 từ xuất hiện nhiều nhất.",
            hint: "Dùng split() tách từ, rồi đếm dùng dict hoặc Counter"
          },
          {
            title: "Bài 3: Điểm chung",
            desc: "Nhập 2 danh sách môn học của 2 sinh viên. Dùng Set tìm: môn học chung, môn chỉ A học, môn chỉ B học.",
            hint: "Dùng & (giao), - (hiệu) của set"
          }
        ],
        lab: {
          title: "LAB 1.4: Quản lý kho hàng",
          steps: [
            "Tạo dict lưu: {mã_sản_phẩm: {tên, giá, số_lượng}}",
            "Thêm/sửa/xóa sản phẩm",
            "Tìm kiếm theo tên (không phân biệt hoa thường)",
            "Lọc sản phẩm giá < ngưỡng nhập vào",
            "Cảnh báo sản phẩm sắp hết hàng (< 5)",
            "Thống kê: tổng giá trị kho, top 3 sản phẩm đắt nhất"
          ]
        }
      },
      {
        id: "1-5",
        title: "Xử lý File",
        icon: "📁",
        theory: `## Xử lý File trong Python

### Mở file với \`open()\`
\`\`\`python
file = open("tên_file.txt", mode, encoding="utf-8")
file.close()  # PHẢI đóng!

# Cách tốt hơn — context manager
with open("file.txt", "r", encoding="utf-8") as f:
    content = f.read()
\`\`\`

### Các mode
| Mode | Ý nghĩa |
|------|---------|
| \`"r"\` | Đọc (mặc định) |
| \`"w"\` | Ghi (xóa nội dung cũ) |
| \`"a"\` | Ghi thêm vào cuối |
| \`"x"\` | Tạo file mới (lỗi nếu đã tồn tại) |
| \`"b"\` | Binary mode |

### CSV và JSON
- **csv**: dữ liệu bảng (Excel-like)
- **json**: dữ liệu cấu trúc, API`,
        code: `# ==============================
# XỬ LÝ FILE
# ==============================
import os
import json
import csv

# 1. Ghi file text
with open("hoc_sinh.txt", "w", encoding="utf-8") as f:
    f.write("Danh sách học sinh\\n")
    f.write("=" * 30 + "\\n")
    students = [
        ("An", 8.5), ("Bình", 9.0),
        ("Chi", 7.5), ("Dung", 8.0)
    ]
    for ten, diem in students:
        f.write(f"{ten}: {diem}\\n")

# 2. Đọc file text
with open("hoc_sinh.txt", "r", encoding="utf-8") as f:
    # Đọc toàn bộ
    content = f.read()
    print("Nội dung:")
    print(content)

with open("hoc_sinh.txt", "r", encoding="utf-8") as f:
    # Đọc từng dòng
    for line_num, line in enumerate(f, 1):
        print(f"  Dòng {line_num}: {line.rstrip()}")

# 3. Ghi thêm vào file
with open("hoc_sinh.txt", "a", encoding="utf-8") as f:
    f.write("Em: 9.5\\n")

# 4. JSON — lưu dữ liệu cấu trúc
data = {
    "lop": "CNTT01",
    "nam_hoc": "2024-2025",
    "sinh_vien": [
        {"ten": "An", "diem": 8.5, "xep_loai": "Giỏi"},
        {"ten": "Bình", "diem": 9.0, "xep_loai": "Xuất sắc"}
    ]
}

# Ghi JSON
with open("lop_hoc.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Đọc JSON
with open("lop_hoc.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)
    print(f"\\nLớp: {loaded['lop']}")
    for sv in loaded["sinh_vien"]:
        print(f"  {sv['ten']}: {sv['diem']} ({sv['xep_loai']})")

# 5. CSV
# Ghi CSV
with open("bang_diem.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["STT", "Tên", "Toán", "Lý", "Hóa", "TB"])
    writer.writerows([
        [1, "An", 8, 9, 7, 8.0],
        [2, "Bình", 9, 8, 10, 9.0],
        [3, "Chi", 7, 6, 8, 7.0]
    ])

# Đọc CSV
with open("bang_diem.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"  {row['Tên']}: TB = {row['TB']}")

# 6. Kiểm tra file tồn tại
if os.path.exists("lop_hoc.json"):
    size = os.path.getsize("lop_hoc.json")
    print(f"\\nFile lop_hoc.json: {size} bytes")
    os.remove("lop_hoc.json")  # Xóa file
print("✓ Hoàn thành!")`,
        exercises: [
          {
            title: "Bài 1: Nhật ký",
            desc: "Tạo chương trình nhật ký: ghi thêm entry với timestamp, đọc và hiển thị tất cả entry, tìm kiếm theo ngày.",
            hint: "Dùng datetime.now() lấy thời gian hiện tại"
          },
          {
            title: "Bài 2: Quản lý danh bạ JSON",
            desc: "Lưu danh bạ điện thoại vào file JSON. Cho phép: thêm, xóa, tìm kiếm, hiển thị tất cả, sắp xếp theo tên.",
            hint: "Load JSON vào dict, thao tác, rồi save lại"
          },
          {
            title: "Bài 3: Phân tích CSV",
            desc: "Đọc file CSV điểm sinh viên. Tính: điểm TB mỗi người, điểm TB mỗi môn, xếp hạng. Ghi kết quả ra file mới.",
            hint: "Dùng csv.DictReader để đọc theo tên cột"
          }
        ],
        lab: {
          title: "LAB 1.5: Hệ thống quản lý sinh viên với file",
          steps: [
            "Thiết kế cấu trúc dữ liệu JSON cho sinh viên",
            "Viết class DataManager: load/save JSON",
            "CRUD: Create, Read, Update, Delete sinh viên",
            "Xuất danh sách ra file CSV",
            "Nhập từ file CSV vào hệ thống",
            "Backup tự động với timestamp"
          ]
        }
      }
    ]
  },
  {
    id: 2,
    title: "Hướng Đối Tượng",
    subtitle: "OOP với Python",
    emoji: "🏗️",
    color: "#FF6B35",
    dark: "#331500",
    topics: [
      {
        id: "2-1",
        title: "Class & Object",
        icon: "🔷",
        theory: `## Lập trình Hướng Đối Tượng (OOP)

### 4 Tính chất cơ bản
1. **Encapsulation** (Đóng gói): gói data + methods vào class
2. **Inheritance** (Kế thừa): class con kế thừa class cha
3. **Polymorphism** (Đa hình): cùng method, hành vi khác nhau
4. **Abstraction** (Trừu tượng): ẩn chi tiết, chỉ hiển thị giao diện

### Cú pháp Class
\`\`\`python
class TênClass:
    class_var = "Biến class"  # Chia sẻ giữa các instances
    
    def __init__(self, tham_số):
        self.instance_var = tham_số  # Biến instance
    
    def method(self):  # Instance method
        pass
    
    @classmethod
    def class_method(cls):  # Class method
        pass
    
    @staticmethod
    def static_method():  # Static method
        pass
\`\`\`

### Magic Methods (Dunder)
- \`__init__\`: Constructor
- \`__str__\`: Chuỗi hiển thị (print)
- \`__repr__\`: Chuỗi kỹ thuật
- \`__len__\`, \`__add__\`, \`__eq__\`...`,
        code: `# ==============================
# CLASS VÀ OBJECT
# ==============================

class SinhVien:
    """Lớp đại diện cho sinh viên"""
    
    # Class variable (chung cho tất cả instances)
    truong = "Đại học ABC"
    so_luong = 0
    
    def __init__(self, ten, ma_sv, tuoi):
        # Instance variables (riêng từng instance)
        self.ten = ten
        self.ma_sv = ma_sv
        self.tuoi = tuoi
        self._diem = []  # protected (convention)
        self.__mat_khau = "12345"  # private (name mangling)
        SinhVien.so_luong += 1
    
    # Getter/Setter với @property
    @property
    def diem(self):
        return self._diem
    
    @property
    def diem_tb(self):
        if not self._diem:
            return 0.0
        return sum(self._diem) / len(self._diem)
    
    def them_diem(self, diem):
        if 0 <= diem <= 10:
            self._diem.append(diem)
        else:
            raise ValueError(f"Điểm {diem} không hợp lệ (0-10)")
    
    def xep_loai(self):
        tb = self.diem_tb
        if tb >= 9.0: return "Xuất sắc"
        elif tb >= 8.0: return "Giỏi"
        elif tb >= 6.5: return "Khá"
        elif tb >= 5.0: return "Trung bình"
        else: return "Yếu"
    
    # Magic methods
    def __str__(self):
        return f"SV[{self.ma_sv}] {self.ten} - TB: {self.diem_tb:.2f}"
    
    def __repr__(self):
        return f"SinhVien('{self.ten}', '{self.ma_sv}', {self.tuoi})"
    
    def __lt__(self, other):
        return self.diem_tb < other.diem_tb
    
    def __eq__(self, other):
        return self.ma_sv == other.ma_sv
    
    @classmethod
    def tao_tu_dict(cls, data):
        """Factory method"""
        sv = cls(data["ten"], data["ma_sv"], data["tuoi"])
        for d in data.get("diem", []):
            sv.them_diem(d)
        return sv
    
    @staticmethod
    def tinh_xep_loai(diem_tb):
        if diem_tb >= 9.0: return "Xuất sắc"
        elif diem_tb >= 8.0: return "Giỏi"
        elif diem_tb >= 6.5: return "Khá"
        elif diem_tb >= 5.0: return "Trung bình"
        return "Yếu"

# Sử dụng
sv1 = SinhVien("Nguyễn Văn An", "SV001", 20)
sv2 = SinhVien("Trần Thị Bình", "SV002", 21)

sv1.them_diem(8.5)
sv1.them_diem(9.0)
sv1.them_diem(7.5)

sv2.them_diem(9.5)
sv2.them_diem(9.0)

print(sv1)                   # str representation
print(repr(sv2))             # repr representation
print(f"Xếp loại: {sv1.xep_loai()}")
print(f"Tổng SV: {SinhVien.so_luong}")
print(f"sv1 < sv2: {sv1 < sv2}")   # so sánh điểm TB

# Tạo từ dict
data = {"ten": "Lê Chi", "ma_sv": "SV003", "tuoi": 19, "diem": [7,8,6]}
sv3 = SinhVien.tao_tu_dict(data)
print(sv3)

# Sắp xếp list của objects
ds_sv = [sv1, sv2, sv3]
ds_sv.sort(reverse=True)
print("\\nXếp hạng:")
for i, sv in enumerate(ds_sv, 1):
    print(f"  {i}. {sv}")`,
        exercises: [
          {
            title: "Bài 1: Lớp HinhChuNhat",
            desc: "Xây dựng class HinhChuNhat với thuộc tính chiều dài, rộng. Tính chu vi, diện tích. Kiểm tra có phải hình vuông. Magic method __str__, __lt__.",
            hint: "Chu vi = 2*(dài+rộng), Diện tích = dài*rộng"
          },
          {
            title: "Bài 2: Lớp TaiKhoanNganHang",
            desc: "Class BankAccount: số TK, tên, số dư. Methods: nap_tien, rut_tien (kiểm tra đủ tiền), lich_su_giao_dich. @property balance.",
            hint: "Lưu lịch sử dưới dạng list of tuples (thời gian, loại, số tiền)"
          },
          {
            title: "Bài 3: Lớp SachThuVien",
            desc: "Class Book: isbn, tên, tác giả, số trang, trạng thái (available/borrowed). Methods: muon_sach, tra_sach, __str__, __eq__ so sánh theo isbn.",
            hint: "Dùng @property cho trạng thái"
          }
        ],
        lab: {
          title: "LAB 2.1: Hệ thống quản lý thư viện mini",
          steps: [
            "Class Book: thuộc tính đầy đủ + mượn/trả",
            "Class Member: thông tin thành viên + list sách đang mượn",
            "Class Library: quản lý books + members",
            "Phương thức tìm kiếm sách (theo tên, tác giả)",
            "Kiểm tra hạn mượn (mỗi sách 14 ngày)",
            "Thống kê: sách được mượn nhiều nhất, member tích cực"
          ]
        }
      },
      {
        id: "2-2",
        title: "Kế thừa & Đa hình",
        icon: "🧬",
        theory: `## Kế thừa (Inheritance)

\`\`\`python
class Animal:           # Class cha (Parent/Base)
    def speak(self):
        pass

class Dog(Animal):      # Class con (Child/Derived)
    def speak(self):    # Override
        return "Gâu gâu!"
\`\`\`

### super() — gọi method của cha
\`\`\`python
class Child(Parent):
    def __init__(self, x, y):
        super().__init__(x)  # gọi __init__ của Parent
        self.y = y
\`\`\`

### Multiple Inheritance
\`\`\`python
class C(A, B):  # Kế thừa từ cả A và B
    pass
\`\`\`

### Abstract Class
\`\`\`python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass  # PHẢI override ở class con
\`\`\``,
        code: `# ==============================
# KẾ THỪA VÀ ĐA HÌNH
# ==============================
from abc import ABC, abstractmethod
import math

# ===== ABSTRACT BASE CLASS =====
class HinhHoc(ABC):
    """Abstract class cho các hình học"""
    
    def __init__(self, mau_sac="trắng"):
        self.mau_sac = mau_sac
    
    @abstractmethod
    def dien_tich(self):
        """Tính diện tích — phải override"""
        pass
    
    @abstractmethod
    def chu_vi(self):
        """Tính chu vi — phải override"""
        pass
    
    def mo_ta(self):
        return (f"{self.__class__.__name__} màu {self.mau_sac}: "
                f"DT={self.dien_tich():.2f}, CV={self.chu_vi():.2f}")

# ===== CÁC CLASS CON =====
class HinhTron(HinhHoc):
    def __init__(self, ban_kinh, mau_sac="xanh"):
        super().__init__(mau_sac)  # gọi __init__ của cha
        self.ban_kinh = ban_kinh
    
    def dien_tich(self):
        return math.pi * self.ban_kinh ** 2
    
    def chu_vi(self):
        return 2 * math.pi * self.ban_kinh
    
    def __str__(self):
        return f"Hình tròn R={self.ban_kinh}"

class HinhChuNhat(HinhHoc):
    def __init__(self, dai, rong, mau_sac="đỏ"):
        super().__init__(mau_sac)
        self.dai = dai
        self.rong = rong
    
    def dien_tich(self):
        return self.dai * self.rong
    
    def chu_vi(self):
        return 2 * (self.dai + self.rong)
    
    def la_hinh_vuong(self):
        return self.dai == self.rong

class HinhVuong(HinhChuNhat):  # Kế thừa từ HinhChuNhat
    def __init__(self, canh, mau_sac="vàng"):
        super().__init__(canh, canh, mau_sac)  # dai = rong = canh
    
    def __str__(self):
        return f"Hình vuông cạnh={self.dai}"

class TamGiac(HinhHoc):
    def __init__(self, a, b, c, mau_sac="tím"):
        super().__init__(mau_sac)
        self.a, self.b, self.c = a, b, c
    
    def chu_vi(self):
        return self.a + self.b + self.c
    
    def dien_tich(self):  # Heron's formula
        s = self.chu_vi() / 2
        return math.sqrt(s * (s-self.a) * (s-self.b) * (s-self.c))

# ===== ĐA HÌNH (POLYMORPHISM) =====
cac_hinh = [
    HinhTron(5),
    HinhChuNhat(4, 6),
    HinhVuong(3),
    TamGiac(3, 4, 5)
]

print("=== Thông tin các hình ===")
for hinh in cac_hinh:  # Duck typing — cùng interface
    print(f"  {hinh.mo_ta()}")

# Sắp xếp theo diện tích (polymorphism)
cac_hinh.sort(key=lambda h: h.dien_tich())
print("\\n=== Sắp xếp theo diện tích ===")
for hinh in cac_hinh:
    print(f"  {hinh.__class__.__name__}: {hinh.dien_tich():.2f}")

# isinstance kiểm tra kiểu
for hinh in cac_hinh:
    if isinstance(hinh, HinhChuNhat):
        print(f"  {hinh} là HinhChuNhat (hoặc con)")

# ===== MIXIN PATTERN =====
class SerializableMixin:
    def to_dict(self):
        return self.__dict__
    
    def to_json_str(self):
        import json
        return json.dumps(self.to_dict(), ensure_ascii=False)

class HinhTronEx(SerializableMixin, HinhTron):
    pass

ht = HinhTronEx(7, "hồng")
print(f"\\nJSON: {ht.to_json_str()}")`,
        exercises: [
          {
            title: "Bài 1: Hệ thống nhân viên",
            desc: "Abstract class NhanVien. Kế thừa: NhanVienFullTime (lương cơ bản), NhanVienPartTime (giờ x đơn giá). Override tính_luong(). In bảng lương.",
            hint: "Dùng @abstractmethod cho tính_luong()"
          },
          {
            title: "Bài 2: Hệ thống thú cưng",
            desc: "Class Animal → Dog, Cat, Bird. Mỗi con có sound khác nhau, tốc độ di chuyển khác nhau. Tạo list 5 con vật, duyệt gọi speak() và move().",
            hint: "Duck typing — không cần isinstance"
          },
          {
            title: "Bài 3: Đa kế thừa Mixin",
            desc: "Tạo Mixin: JSONMixin (to_json), CSVMixin (to_csv). Áp dụng vào class Student và Product. Kiểm tra MRO bằng Class.__mro__.",
            hint: "Dùng json.dumps(self.__dict__)"
          }
        ],
        lab: {
          title: "LAB 2.2: Game nhập vai mini",
          steps: [
            "Abstract class Character: hp, attack, defense",
            "Warrior (physical attack), Mage (magic attack), Archer (ranged)",
            "Mỗi class có skill đặc biệt riêng",
            "Simulate trận chiến 1v1 với random damage",
            "Level system: kinh nghiệm → lên cấp → tăng chỉ số",
            "Lưu/Load trạng thái nhân vật từ JSON"
          ]
        }
      }
    ]
  },
  {
    id: 3,
    title: "Cấu Trúc Dữ Liệu & Giải Thuật",
    subtitle: "DSA với Python",
    emoji: "⚡",
    color: "#A855F7",
    dark: "#1A0033",
    topics: [
      {
        id: "3-1",
        title: "Stack, Queue, LinkedList",
        icon: "🔗",
        theory: `## Cấu trúc dữ liệu tuyến tính

### Stack (Ngăn xếp) — LIFO
- **Last In, First Out**
- Push: thêm vào đỉnh | Pop: lấy từ đỉnh
- Ứng dụng: undo/redo, call stack, dấu ngoặc

### Queue (Hàng đợi) — FIFO
- **First In, First Out**
- Enqueue: thêm cuối | Dequeue: lấy đầu
- Ứng dụng: print queue, BFS, task scheduler

### Linked List
- Mỗi node chứa: **data + pointer đến next**
- Singly / Doubly / Circular
- Insert/Delete O(1) nếu có pointer | Search O(n)

### Độ phức tạp (Big O)
| Cấu trúc | Access | Search | Insert | Delete |
|----------|--------|--------|--------|--------|
| Array | O(1) | O(n) | O(n) | O(n) |
| Linked List | O(n) | O(n) | O(1) | O(1) |
| Stack | O(n) | O(n) | O(1) | O(1) |
| Queue | O(n) | O(n) | O(1) | O(1) |`,
        code: `# ==============================
# STACK, QUEUE, LINKED LIST
# ==============================
from collections import deque

# ===== STACK =====
class Stack:
    def __init__(self):
        self._data = []
    
    def push(self, item):
        self._data.append(item)
    
    def pop(self):
        if self.is_empty():
            raise IndexError("Stack rỗng!")
        return self._data.pop()
    
    def peek(self):
        if self.is_empty():
            raise IndexError("Stack rỗng!")
        return self._data[-1]
    
    def is_empty(self): return len(self._data) == 0
    def size(self):     return len(self._data)
    def __str__(self):  return f"Stack{self._data}"

# Ứng dụng: kiểm tra dấu ngoặc cân bằng
def kiem_tra_ngoac(s):
    stack = Stack()
    pairs = {')': '(', ']': '[', '}': '{'}
    for ch in s:
        if ch in '([{':
            stack.push(ch)
        elif ch in ')]}':
            if stack.is_empty() or stack.pop() != pairs[ch]:
                return False
    return stack.is_empty()

tests = ["((a+b)*c)", "((a+b)", "({[]})", "([)]"]
for t in tests:
    print(f"  '{t}': {'✓ Đúng' if kiem_tra_ngoac(t) else '✗ Sai'}")

# ===== QUEUE =====
class Queue:
    def __init__(self):
        self._data = deque()  # deque tối ưu hơn list
    
    def enqueue(self, item):
        self._data.append(item)
    
    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue rỗng!")
        return self._data.popleft()
    
    def front(self):    return self._data[0]
    def is_empty(self): return len(self._data) == 0
    def size(self):     return len(self._data)

# Ứng dụng: mô phỏng hàng đợi ngân hàng
print("\\n=== Hàng đợi ngân hàng ===")
hang_doi = Queue()
for i in range(1, 6):
    hang_doi.enqueue(f"KH{i:02d}")
    print(f"  KH{i:02d} vào hàng")

while not hang_doi.is_empty():
    kh = hang_doi.dequeue()
    print(f"  Phục vụ: {kh}")

# ===== LINKED LIST =====
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        self._size = 0
    
    def append(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = new_node
        else:
            curr = self.head
            while curr.next:
                curr = curr.next
            curr.next = new_node
        self._size += 1
    
    def prepend(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
        self._size += 1
    
    def delete(self, data):
        if not self.head: return
        if self.head.data == data:
            self.head = self.head.next
            self._size -= 1
            return
        curr = self.head
        while curr.next:
            if curr.next.data == data:
                curr.next = curr.next.next
                self._size -= 1
                return
            curr = curr.next
    
    def search(self, data):
        curr = self.head
        pos = 0
        while curr:
            if curr.data == data:
                return pos
            curr = curr.next
            pos += 1
        return -1
    
    def reverse(self):
        prev, curr = None, self.head
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        self.head = prev
    
    def to_list(self):
        result, curr = [], self.head
        while curr:
            result.append(curr.data)
            curr = curr.next
        return result
    
    def __str__(self):
        return " → ".join(map(str, self.to_list())) + " → None"
    def __len__(self): return self._size

ll = LinkedList()
for v in [1, 2, 3, 4, 5]:
    ll.append(v)
print(f"\\nLinked List: {ll}")
ll.prepend(0)
print(f"Sau prepend(0): {ll}")
ll.delete(3)
print(f"Sau delete(3): {ll}")
ll.reverse()
print(f"Sau reverse: {ll}")
print(f"Search(4): vị trí {ll.search(4)}")`,
        exercises: [
          {
            title: "Bài 1: Máy tính RPN",
            desc: "Cài đặt máy tính dùng Reverse Polish Notation dùng Stack. VD: '3 4 + 2 *' = (3+4)*2 = 14.",
            hint: "Đọc từng token, số → push, toán tử → pop 2 số, tính, push kết quả"
          },
          {
            title: "Bài 2: Queue ưu tiên",
            desc: "Priority Queue cho bệnh nhân cấp cứu: ưu tiên 1 (khẩn cấp) > 2 > 3. Enqueue với priority, Dequeue lấy ưu tiên cao nhất.",
            hint: "Dùng heapq module của Python"
          },
          {
            title: "Bài 3: LinkedList circular",
            desc: "Implement Circular Linked List. Thêm, xóa, duyệt. Ứng dụng: game xoay vòng (N người chơi, loại người thứ K).",
            hint: "Tail.next = head, dừng khi quay lại head"
          }
        ],
        lab: {
          title: "LAB 3.1: Trình duyệt web mini",
          steps: [
            "Stack 'back': lưu lịch sử trang đã thăm",
            "Stack 'forward': lưu trang đã back",
            "navigate(url): push vào back, xóa forward",
            "go_back(): pop from back, push to forward",
            "go_forward(): pop from forward, push to back",
            "Display current + full history"
          ]
        }
      },
      {
        id: "3-2",
        title: "Sắp xếp & Tìm kiếm",
        icon: "🔍",
        theory: `## Các giải thuật quan trọng

### Sắp xếp (Sorting)
| Giải thuật | Best | Avg | Worst | Space |
|-----------|------|-----|-------|-------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) |

### Tìm kiếm (Searching)
- **Linear Search**: O(n) — duyệt tuần tự
- **Binary Search**: O(log n) — mảng đã sắp xếp

### Quy tắc chọn giải thuật
- Dữ liệu nhỏ (< 20): Insertion Sort
- Cần stable: Merge Sort  
- Trung bình nhanh nhất: Quick Sort
- Đã sắp xếp gần đúng: Insertion Sort`,
        code: `# ==============================
# SẮP XẾP VÀ TÌM KIẾM
# ==============================
import time, random

def do_thoi_gian(func, *args):
    start = time.perf_counter()
    result = func(*args)
    end = time.perf_counter()
    return result, (end - start) * 1000  # milliseconds

# ===== CÁC GIẢI THUẬT SẮP XẾP =====

def bubble_sort(arr):
    """O(n²) - Đổi chỗ bọt khí nổi lên"""
    a = arr.copy()
    n = len(a)
    for i in range(n):
        swapped = False
        for j in range(0, n-i-1):
            if a[j] > a[j+1]:
                a[j], a[j+1] = a[j+1], a[j]
                swapped = True
        if not swapped:  # Tối ưu: đã sắp xếp
            break
    return a

def selection_sort(arr):
    """O(n²) - Chọn min đặt vào đầu"""
    a = arr.copy()
    n = len(a)
    for i in range(n):
        min_idx = i
        for j in range(i+1, n):
            if a[j] < a[min_idx]:
                min_idx = j
        a[i], a[min_idx] = a[min_idx], a[i]
    return a

def insertion_sort(arr):
    """O(n²) best O(n) - Chèn vào đúng vị trí"""
    a = arr.copy()
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j+1] = a[j]
            j -= 1
        a[j+1] = key
    return a

def merge_sort(arr):
    """O(n log n) - Chia để trị"""
    if len(arr) <= 1:
        return arr.copy()
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Merge
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

def quick_sort(arr):
    """O(n log n) avg - Phân hoạch"""
    if len(arr) <= 1:
        return arr.copy()
    pivot = arr[len(arr) // 2]
    left   = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right  = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# ===== TÌM KIẾM =====

def linear_search(arr, target):
    """O(n) - Tìm tuần tự"""
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

def binary_search(arr, target):
    """O(log n) - Tìm nhị phân (mảng đã sắp)"""
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

# ===== SO SÁNH HIỆU SUẤT =====
print("=== So sánh tốc độ sắp xếp ===")
test_data = random.sample(range(1000), 200)

algorithms = [
    ("Bubble Sort",    bubble_sort),
    ("Selection Sort", selection_sort),
    ("Insertion Sort", insertion_sort),
    ("Merge Sort",     merge_sort),
    ("Quick Sort",     quick_sort),
]

for name, func in algorithms:
    _, ms = do_thoi_gian(func, test_data)
    print(f"  {name:20s}: {ms:.3f} ms")

# Kiểm tra tìm kiếm
sorted_data = sorted(test_data)
target = sorted_data[100]

idx_linear = linear_search(sorted_data, target)
idx_binary = binary_search(sorted_data, target)
print(f"\\nTìm {target}:")
print(f"  Linear search: vị trí {idx_linear}")
print(f"  Binary search: vị trí {idx_binary}")`,
        exercises: [
          {
            title: "Bài 1: Visualize Bubble Sort",
            desc: "In từng bước của Bubble Sort với mảng 10 phần tử. Dùng ký tự ASCII để vẽ thanh bar chart sau mỗi lần swap.",
            hint: "In '█' * value để tạo bar"
          },
          {
            title: "Bài 2: Tim kiếm tên",
            desc: "Danh sách 20 sinh viên có tên và điểm. Implement binary search tìm theo tên (sau khi sort). Đếm số lần so sánh.",
            hint: "Sort theo tên trước, binary search theo tên"
          },
          {
            title: "Bài 3: Benchmark",
            desc: "So sánh 5 giải thuật sort với 3 kích thước: 100, 500, 1000 phần tử. Vẽ bảng kết quả thời gian chạy.",
            hint: "Dùng time.perf_counter() đo thời gian"
          }
        ],
        lab: {
          title: "LAB 3.2: Hệ thống tìm kiếm sản phẩm",
          steps: [
            "Tạo 100 sản phẩm với tên, giá, danh mục",
            "Implement search by name (linear) và by price range",
            "Sort theo giá, tên, danh mục",
            "Binary search tìm sản phẩm theo ID",
            "So sánh linear vs binary search speed",
            "Top 5 sản phẩm bán chạy (thêm thuộc tính lượt bán)"
          ]
        }
      }
    ]
  },
  {
    id: 4,
    title: "Tkinter & Database",
    subtitle: "GUI & SQLite",
    emoji: "🖥️",
    color: "#06B6D4",
    dark: "#001A22",
    topics: [
      {
        id: "4-1",
        title: "Tkinter GUI",
        icon: "🪟",
        theory: `## Tkinter — Thư viện GUI chuẩn của Python

### Các Widget cơ bản
| Widget | Mô tả |
|--------|-------|
| \`Label\` | Hiển thị text/image |
| \`Button\` | Nút bấm |
| \`Entry\` | Ô nhập một dòng |
| \`Text\` | Vùng nhập nhiều dòng |
| \`Listbox\` | Danh sách chọn |
| \`Combobox\` | Dropdown |
| \`Frame\` | Container |
| \`Canvas\` | Vẽ đồ họa |

### Layout Managers
- **pack()**: xếp liên tiếp (đơn giản)
- **grid()**: theo lưới hàng/cột (phổ biến)
- **place()**: tọa độ tuyệt đối (chính xác)

### Event Handling
\`\`\`python
btn = Button(root, text="Click", command=callback)
entry.bind("<Return>", on_enter)   # sự kiện bàn phím
label.bind("<Button-1>", on_click) # sự kiện chuột
\`\`\``,
        code: `# ==============================
# TKINTER - ỨNG DỤNG QUẢN LÝ SINH VIÊN
# ==============================
import tkinter as tk
from tkinter import ttk, messagebox, filedialog
import json

class SinhVienApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Quản Lý Sinh Viên")
        self.root.geometry("800x600")
        self.root.configure(bg="#1e1e2e")
        
        self.data = []  # Danh sách sinh viên
        self.setup_ui()
        self.load_data()
    
    def setup_ui(self):
        # ===== TIÊU ĐỀ =====
        header = tk.Frame(self.root, bg="#313244", height=60)
        header.pack(fill="x", padx=10, pady=5)
        
        tk.Label(header, text="🎓 Quản Lý Sinh Viên",
                 font=("Arial", 18, "bold"),
                 bg="#313244", fg="#cdd6f4").pack(pady=15)
        
        # ===== FORM NHẬP =====
        form_frame = tk.LabelFrame(self.root, text="Thông tin sinh viên",
                                    bg="#1e1e2e", fg="#cdd6f4",
                                    font=("Arial", 10, "bold"))
        form_frame.pack(fill="x", padx=10, pady=5)
        
        fields = [("Mã SV:", "ma_sv"), ("Họ Tên:", "ten"),
                  ("Tuổi:", "tuoi"), ("Điểm:", "diem")]
        self.entries = {}
        
        for i, (label, key) in enumerate(fields):
            tk.Label(form_frame, text=label, bg="#1e1e2e",
                     fg="#a6adc8", width=10).grid(row=i//2, column=(i%2)*2,
                                                   padx=5, pady=5)
            entry = tk.Entry(form_frame, bg="#313244", fg="#cdd6f4",
                             insertbackground="#cdd6f4", width=25)
            entry.grid(row=i//2, column=(i%2)*2+1, padx=5, pady=5)
            self.entries[key] = entry
        
        # ===== BUTTONS =====
        btn_frame = tk.Frame(self.root, bg="#1e1e2e")
        btn_frame.pack(fill="x", padx=10, pady=5)
        
        btn_configs = [
            ("➕ Thêm", "#a6e3a1", self.them_sv),
            ("✏️ Sửa",  "#f9e2af", self.sua_sv),
            ("🗑️ Xóa",  "#f38ba8", self.xoa_sv),
            ("🔍 Tìm",  "#89b4fa", self.tim_sv),
            ("📋 Tất cả","#cba6f7", self.load_data),
        ]
        
        for text, color, cmd in btn_configs:
            btn = tk.Button(btn_frame, text=text, bg=color,
                           fg="#1e1e2e", font=("Arial", 10, "bold"),
                           command=cmd, relief="flat", padx=15)
            btn.pack(side="left", padx=3, pady=5)
        
        # ===== BẢNG DỮ LIỆU (Treeview) =====
        table_frame = tk.Frame(self.root, bg="#1e1e2e")
        table_frame.pack(fill="both", expand=True, padx=10, pady=5)
        
        columns = ("ma_sv", "ten", "tuoi", "diem", "xep_loai")
        self.tree = ttk.Treeview(table_frame, columns=columns,
                                  show="headings", height=15)
        
        headers = {"ma_sv": "Mã SV", "ten": "Họ Tên",
                   "tuoi": "Tuổi", "diem": "Điểm TB", "xep_loai": "Xếp loại"}
        widths  = {"ma_sv": 80, "ten": 200, "tuoi": 60,
                   "diem": 80, "xep_loai": 100}
        
        for col in columns:
            self.tree.heading(col, text=headers[col])
            self.tree.column(col, width=widths[col], anchor="center")
        
        # Scrollbar
        scrollbar = ttk.Scrollbar(table_frame, orient="vertical",
                                   command=self.tree.yview)
        self.tree.configure(yscroll=scrollbar.set)
        self.tree.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        
        # Bind click
        self.tree.bind("<<TreeviewSelect>>", self.on_select)
        
        # ===== STATUS BAR =====
        self.status = tk.Label(self.root, text="Sẵn sàng",
                                bg="#313244", fg="#a6e3a1",
                                font=("Arial", 9))
        self.status.pack(fill="x", pady=2)
    
    def xep_loai(self, diem):
        if diem >= 9: return "Xuất sắc"
        if diem >= 8: return "Giỏi"
        if diem >= 6.5: return "Khá"
        if diem >= 5: return "Trung bình"
        return "Yếu"
    
    def them_sv(self):
        ma = self.entries["ma_sv"].get().strip()
        ten = self.entries["ten"].get().strip()
        try:
            tuoi = int(self.entries["tuoi"].get())
            diem = float(self.entries["diem"].get())
        except ValueError:
            messagebox.showerror("Lỗi", "Tuổi phải là số nguyên, Điểm là số thực!")
            return
        
        if not ma or not ten:
            messagebox.showwarning("Cảnh báo", "Vui lòng nhập đủ thông tin!")
            return
        
        sv = {"ma_sv": ma, "ten": ten, "tuoi": tuoi,
              "diem": diem, "xep_loai": self.xep_loai(diem)}
        self.data.append(sv)
        self.save_data()
        self.refresh_tree()
        self.clear_form()
        self.status.config(text=f"✓ Đã thêm: {ten}")
    
    def xoa_sv(self):
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("Cảnh báo", "Chọn sinh viên để xóa!")
            return
        
        item = self.tree.item(selected[0])
        ma = item["values"][0]
        
        if messagebox.askyesno("Xác nhận", f"Xóa sinh viên {ma}?"):
            self.data = [sv for sv in self.data if sv["ma_sv"] != ma]
            self.save_data()
            self.refresh_tree()
            self.status.config(text=f"✓ Đã xóa SV: {ma}")
    
    def sua_sv(self):
        selected = self.tree.selection()
        if not selected:
            messagebox.showwarning("Cảnh báo", "Chọn sinh viên để sửa!")
            return
        item = self.tree.item(selected[0])
        ma_old = item["values"][0]
        try:
            diem = float(self.entries["diem"].get())
            tuoi = int(self.entries["tuoi"].get())
        except ValueError:
            messagebox.showerror("Lỗi", "Giá trị không hợp lệ!"); return
        
        for sv in self.data:
            if sv["ma_sv"] == ma_old:
                sv.update({
                    "ten": self.entries["ten"].get(),
                    "tuoi": tuoi, "diem": diem,
                    "xep_loai": self.xep_loai(diem)
                }); break
        
        self.save_data(); self.refresh_tree()
        self.status.config(text="✓ Đã cập nhật!")
    
    def tim_sv(self):
        keyword = self.entries["ten"].get().lower()
        results = [sv for sv in self.data
                   if keyword in sv["ten"].lower()
                   or keyword in sv["ma_sv"].lower()]
        self.refresh_tree(results)
        self.status.config(text=f"Tìm thấy {len(results)} kết quả")
    
    def on_select(self, event):
        selected = self.tree.selection()
        if selected:
            item = self.tree.item(selected[0])
            vals = item["values"]
            keys = ["ma_sv", "ten", "tuoi", "diem"]
            for k, v in zip(keys, vals[:4]):
                self.entries[k].delete(0, tk.END)
                self.entries[k].insert(0, str(v))
    
    def refresh_tree(self, data=None):
        for row in self.tree.get_children():
            self.tree.delete(row)
        for sv in (data or self.data):
            self.tree.insert("", "end", values=(
                sv["ma_sv"], sv["ten"], sv["tuoi"],
                f"{sv['diem']:.1f}", sv["xep_loai"]))
    
    def clear_form(self):
        for entry in self.entries.values():
            entry.delete(0, tk.END)
    
    def save_data(self):
        with open("students.json", "w", encoding="utf-8") as f:
            json.dump(self.data, f, ensure_ascii=False, indent=2)
    
    def load_data(self):
        try:
            with open("students.json", "r", encoding="utf-8") as f:
                self.data = json.load(f)
        except FileNotFoundError:
            self.data = []
        self.refresh_tree()

if __name__ == "__main__":
    root = tk.Tk()
    app = SinhVienApp(root)
    root.mainloop()`,
        exercises: [
          {
            title: "Bài 1: Máy tính bỏ túi",
            desc: "Tkinter calculator: hiển thị như máy tính thật. Xử lý ngoại lệ chia 0. Keyboard bindings. History của phép tính.",
            hint: "Dùng grid() layout, bind số và toán tử"
          },
          {
            title: "Bài 2: To-Do List App",
            desc: "App ghi chú: thêm/xóa/đánh dấu hoàn thành. Lưu vào JSON. Lọc theo trạng thái. Deadline nhắc nhở.",
            hint: "Dùng Checkbutton hoặc Listbox với tags"
          },
          {
            title: "Bài 3: Text Editor Mini",
            desc: "Text editor với: File menu (New/Open/Save), Edit (Copy/Paste/Find), Font selector, Word count ở status bar.",
            hint: "Dùng Menu widget và Text widget"
          }
        ],
        lab: {
          title: "LAB 4.1: Ứng dụng quản lý kho hàng GUI",
          steps: [
            "Form thêm/sửa/xóa sản phẩm",
            "Treeview hiển thị danh sách",
            "Tìm kiếm realtime (bind <KeyRelease>)",
            "Xuất/Nhập CSV với filedialog",
            "Dialog xác nhận trước khi xóa",
            "Messagebox thông báo kết quả"
          ]
        }
      },
      {
        id: "4-2",
        title: "Kết nối Database SQLite",
        icon: "🗄️",
        theory: `## SQLite với Python

### Tại sao SQLite?
- **Serverless**: không cần cài server
- **File-based**: dữ liệu trong 1 file .db
- **Tích hợp Python**: module \`sqlite3\` có sẵn
- Phù hợp: ứng dụng desktop, prototype, test

### Workflow
\`\`\`python
import sqlite3

# 1. Kết nối
conn = sqlite3.connect("mydb.db")
cursor = conn.cursor()

# 2. Thực thi SQL
cursor.execute("CREATE TABLE IF NOT EXISTS ...")
cursor.execute("INSERT INTO ... VALUES (?, ?)", (val1, val2))
conn.commit()  # Lưu thay đổi

# 3. Đọc dữ liệu
cursor.execute("SELECT * FROM table")
rows = cursor.fetchall()   # tất cả
row  = cursor.fetchone()   # 1 dòng

# 4. Đóng kết nối
conn.close()
\`\`\`

### SQL cơ bản
- \`CREATE TABLE\`, \`DROP TABLE\`
- \`INSERT INTO\`, \`UPDATE ... SET\`, \`DELETE FROM\`
- \`SELECT ... FROM ... WHERE ... ORDER BY ... LIMIT\`
- \`JOIN\`: kết hợp nhiều bảng`,
        code: `# ==============================
# SQLITE DATABASE VỚI PYTHON
# ==============================
import sqlite3
from contextlib import contextmanager
from datetime import datetime

# ===== DATABASE MANAGER =====
class DatabaseManager:
    def __init__(self, db_file="school.db"):
        self.db_file = db_file
        self.init_database()
    
    @contextmanager
    def get_connection(self):
        """Context manager tự đóng kết nối"""
        conn = sqlite3.connect(self.db_file)
        conn.row_factory = sqlite3.Row  # Kết quả như dict
        try:
            yield conn
        finally:
            conn.close()
    
    def init_database(self):
        """Tạo bảng nếu chưa có"""
        with self.get_connection() as conn:
            conn.executescript("""
                CREATE TABLE IF NOT EXISTS students (
                    id       INTEGER PRIMARY KEY AUTOINCREMENT,
                    ma_sv    TEXT UNIQUE NOT NULL,
                    ten      TEXT NOT NULL,
                    tuoi     INTEGER,
                    email    TEXT,
                    created  TEXT DEFAULT (datetime('now','localtime'))
                );
                
                CREATE TABLE IF NOT EXISTS subjects (
                    id    INTEGER PRIMARY KEY AUTOINCREMENT,
                    ten   TEXT NOT NULL,
                    tin_chi INTEGER DEFAULT 3
                );
                
                CREATE TABLE IF NOT EXISTS grades (
                    id         INTEGER PRIMARY KEY AUTOINCREMENT,
                    student_id INTEGER REFERENCES students(id),
                    subject_id INTEGER REFERENCES subjects(id),
                    diem       REAL,
                    ky_hoc     TEXT
                );
            """)
            conn.commit()
            print("✓ Database khởi tạo thành công")
    
    # ===== CRUD SINH VIÊN =====
    def them_sv(self, ma_sv, ten, tuoi, email=None):
        try:
            with self.get_connection() as conn:
                conn.execute(
                    "INSERT INTO students (ma_sv, ten, tuoi, email) VALUES (?,?,?,?)",
                    (ma_sv, ten, tuoi, email)
                )
                conn.commit()
                return True, "Thêm thành công"
        except sqlite3.IntegrityError:
            return False, f"Mã SV '{ma_sv}' đã tồn tại!"
    
    def lay_tat_ca_sv(self, tim_kiem=None, sap_xep="ten"):
        with self.get_connection() as conn:
            if tim_kiem:
                rows = conn.execute(
                    f"SELECT * FROM students WHERE ten LIKE ? OR ma_sv LIKE ? ORDER BY {sap_xep}",
                    (f"%{tim_kiem}%", f"%{tim_kiem}%")
                ).fetchall()
            else:
                rows = conn.execute(
                    f"SELECT * FROM students ORDER BY {sap_xep}"
                ).fetchall()
            return [dict(row) for row in rows]
    
    def cap_nhat_sv(self, ma_sv, **kwargs):
        if not kwargs: return False, "Không có gì để cập nhật"
        fields = ", ".join(f"{k}=?" for k in kwargs)
        values = list(kwargs.values()) + [ma_sv]
        with self.get_connection() as conn:
            conn.execute(f"UPDATE students SET {fields} WHERE ma_sv=?", values)
            conn.commit()
        return True, "Cập nhật thành công"
    
    def xoa_sv(self, ma_sv):
        with self.get_connection() as conn:
            conn.execute("DELETE FROM students WHERE ma_sv=?", (ma_sv,))
            conn.commit()
        return True, f"Đã xóa SV {ma_sv}"
    
    # ===== ĐIỂM SỐ =====
    def them_mon(self, ten, tin_chi=3):
        with self.get_connection() as conn:
            conn.execute("INSERT INTO subjects (ten, tin_chi) VALUES (?,?)", (ten, tin_chi))
            conn.commit()
    
    def them_diem(self, ma_sv, ten_mon, diem, ky_hoc="2024-1"):
        with self.get_connection() as conn:
            sv_id = conn.execute(
                "SELECT id FROM students WHERE ma_sv=?", (ma_sv,)
            ).fetchone()
            mon_id = conn.execute(
                "SELECT id FROM subjects WHERE ten=?", (ten_mon,)
            ).fetchone()
            
            if not sv_id or not mon_id:
                return False, "Không tìm thấy SV hoặc môn học"
            
            conn.execute(
                "INSERT INTO grades (student_id,subject_id,diem,ky_hoc) VALUES (?,?,?,?)",
                (sv_id[0], mon_id[0], diem, ky_hoc)
            )
            conn.commit()
            return True, "Nhập điểm thành công"
    
    def bang_diem_sv(self, ma_sv):
        """JOIN 3 bảng lấy bảng điểm"""
        with self.get_connection() as conn:
            rows = conn.execute("""
                SELECT s.ten AS ten_mon, sub.tin_chi,
                       g.diem, g.ky_hoc,
                       CASE 
                           WHEN g.diem >= 9 THEN 'A+'
                           WHEN g.diem >= 8.5 THEN 'A'
                           WHEN g.diem >= 8 THEN 'B+'
                           WHEN g.diem >= 7 THEN 'B'
                           WHEN g.diem >= 6 THEN 'C+'
                           WHEN g.diem >= 5 THEN 'C'
                           ELSE 'F'
                       END AS chu_diem
                FROM grades g
                JOIN students st ON g.student_id = st.id
                JOIN subjects s  ON g.subject_id  = s.id
                WHERE st.ma_sv = ?
                ORDER BY g.ky_hoc, s.ten
            """, (ma_sv,)).fetchall()
            return [dict(r) for r in rows]
    
    def thong_ke(self):
        """Thống kê tổng hợp"""
        with self.get_connection() as conn:
            stats = conn.execute("""
                SELECT COUNT(*) as tong_sv,
                       (SELECT COUNT(*) FROM subjects) as tong_mon,
                       (SELECT AVG(diem) FROM grades) as diem_tb_truong
                FROM students
            """).fetchone()
            return dict(stats)

# ===== DEMO =====
db = DatabaseManager()

# Thêm sinh viên
for ma, ten, tuoi, email in [
    ("SV001", "Nguyễn Văn An", 20, "an@gmail.com"),
    ("SV002", "Trần Thị Bình", 21, "binh@gmail.com"),
    ("SV003", "Lê Văn Chi", 20, "chi@gmail.com"),
]:
    ok, msg = db.them_sv(ma, ten, tuoi, email)
    print(f"  {msg}: {ten}")

# Thêm môn học
for mon, tc in [("Python", 3), ("CSDL", 3), ("Mạng máy tính", 2)]:
    db.them_mon(mon, tc)

# Nhập điểm
for ma, mon, diem in [
    ("SV001", "Python", 9.0), ("SV001", "CSDL", 8.5),
    ("SV002", "Python", 9.5), ("SV002", "CSDL", 9.0),
]:
    ok, msg = db.them_diem(ma, mon, diem)

# Truy vấn
print("\\n=== Danh sách sinh viên ===")
for sv in db.lay_tat_ca_sv():
    print(f"  {sv['ma_sv']}: {sv['ten']} ({sv['tuoi']} tuổi)")

print("\\n=== Bảng điểm SV001 ===")
for d in db.bang_diem_sv("SV001"):
    print(f"  {d['ten_mon']}: {d['diem']} ({d['chu_diem']})")

print("\\n=== Thống kê trường ===")
stats = db.thong_ke()
print(f"  Tổng SV: {stats['tong_sv']}")
print(f"  Điểm TB: {stats['diem_tb_truong']:.2f}")`,
        exercises: [
          {
            title: "Bài 1: Quản lý sản phẩm",
            desc: "CRUD sản phẩm với SQLite. Bảng products(id, name, price, qty, category). Tìm kiếm, lọc theo category, cảnh báo hết hàng.",
            hint: "Dùng WHERE category=? và qty < 10"
          },
          {
            title: "Bài 2: Quán cà phê",
            desc: "DB: Menu(món, giá) + Orders(ngày, món, số lượng, khách). Tính: doanh thu ngày/tuần, món bán chạy, đơn hàng lớn nhất.",
            hint: "GROUP BY + SUM + ORDER BY"
          },
          {
            title: "Bài 3: Đăng nhập người dùng",
            desc: "Bảng users(username, password_hash, role). Hash password với hashlib. Login, register, phân quyền admin/user.",
            hint: "import hashlib; hashlib.sha256(pwd.encode()).hexdigest()"
          }
        ],
        lab: {
          title: "LAB 4.2: Ứng dụng Tkinter + SQLite hoàn chỉnh",
          steps: [
            "Schema: Students + Courses + Enrollments",
            "Login screen với xác thực SQLite",
            "CRUD đầy đủ với Treeview",
            "Tìm kiếm realtime",
            "Báo cáo thống kê với đồ thị (Matplotlib)",
            "Export PDF/CSV"
          ]
        }
      }
    ]
  },
  {
    id: 5,
    title: "Matplotlib",
    subtitle: "Visualización de datos",
    emoji: "📊",
    color: "#F59E0B",
    dark: "#1A1000",
    topics: [
      {
        id: "5-1",
        title: "Vẽ đồ thị cơ bản",
        icon: "📈",
        theory: `## Matplotlib — Thư viện vẽ đồ thị

### Import
\`\`\`python
import matplotlib.pyplot as plt
import numpy as np
\`\`\`

### Các loại đồ thị phổ biến
| Hàm | Loại đồ thị |
|-----|------------|
| \`plt.plot()\` | Đường (Line chart) |
| \`plt.bar()\` | Cột (Bar chart) |
| \`plt.scatter()\` | Điểm (Scatter plot) |
| \`plt.pie()\` | Tròn (Pie chart) |
| \`plt.hist()\` | Tần suất (Histogram) |
| \`plt.boxplot()\` | Hộp (Box plot) |

### Anatomy của một Figure
\`\`\`
Figure  ← toàn bộ canvas
  └── Axes  ← vùng vẽ
        ├── Title, xlabel, ylabel
        ├── x-axis, y-axis (ticks, labels)
        ├── Grid
        └── Legend
\`\`\``,
        code: `# ==============================
# MATPLOTLIB - VẼ ĐỒ THỊ
# ==============================
import matplotlib.pyplot as plt
import matplotlib.gridspec as gridspec
import numpy as np

# Style
plt.style.use('dark_background')

# ===== 1. LINE CHART — Điểm học kỳ =====
ky_hoc = ["HK1\\n2022", "HK2\\n2022", "HK1\\n2023", "HK2\\n2023", "HK1\\n2024"]
diem_sv1 = [6.5, 7.0, 7.5, 8.0, 8.5]
diem_sv2 = [8.0, 7.5, 8.5, 9.0, 9.5]
diem_sv3 = [5.0, 5.5, 6.0, 6.5, 7.0]

fig, axes = plt.subplots(2, 3, figsize=(15, 10))
fig.suptitle("Phân tích điểm học sinh", fontsize=16, fontweight='bold',
             color='#f1fa8c', y=0.98)

# Biểu đồ 1: Line chart
ax = axes[0, 0]
ax.plot(ky_hoc, diem_sv1, 'o-', color='#50fa7b', linewidth=2, 
        markersize=8, label='Sinh viên A')
ax.plot(ky_hoc, diem_sv2, 's-', color='#ff79c6', linewidth=2,
        markersize=8, label='Sinh viên B')
ax.plot(ky_hoc, diem_sv3, '^-', color='#ffb86c', linewidth=2,
        markersize=8, label='Sinh viên C')
ax.set_title('Tiến độ học tập', color='white')
ax.set_ylabel('Điểm', color='white')
ax.legend()
ax.set_ylim(0, 10)
ax.grid(alpha=0.3)
ax.axhline(y=8, color='#ff5555', linestyle='--', alpha=0.5, label='Mục tiêu')

# Biểu đồ 2: Bar chart
ax = axes[0, 1]
mon_hoc = ['Toán', 'Lý', 'Hóa', 'Văn', 'Anh']
diem_all = [8.5, 7.0, 6.5, 9.0, 8.0]
colors = ['#50fa7b' if d >= 8 else '#ffb86c' if d >= 6.5 else '#ff5555'
          for d in diem_all]
bars = ax.bar(mon_hoc, diem_all, color=colors, edgecolor='white', linewidth=0.5)
ax.set_title('Điểm theo môn', color='white')
ax.set_ylabel('Điểm', color='white')
ax.set_ylim(0, 10)
for bar, d in zip(bars, diem_all):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.1,
            f'{d}', ha='center', va='bottom', color='white', fontsize=10)

# Biểu đồ 3: Pie chart
ax = axes[0, 2]
xep_loai = ['Xuất sắc', 'Giỏi', 'Khá', 'TB', 'Yếu']
so_luong = [15, 25, 35, 20, 5]
explode = (0.05, 0.05, 0, 0, 0.1)
wedge_colors = ['#50fa7b', '#8be9fd', '#ffb86c', '#ff79c6', '#ff5555']
ax.pie(so_luong, labels=xep_loai, explode=explode,
       colors=wedge_colors, autopct='%1.1f%%',
       startangle=90, pctdistance=0.85)
ax.set_title('Phân bố xếp loại', color='white')

# Biểu đồ 4: Scatter plot
ax = axes[1, 0]
np.random.seed(42)
gio_hoc = np.random.normal(5, 1.5, 100)
diem_hs = gio_hoc * 0.8 + np.random.normal(0, 0.5, 100)
diem_hs = np.clip(diem_hs, 0, 10)
scatter = ax.scatter(gio_hoc, diem_hs, c=diem_hs,
                      cmap='RdYlGn', alpha=0.7, edgecolors='white', linewidth=0.5)
plt.colorbar(scatter, ax=ax, label='Điểm')
z = np.polyfit(gio_hoc, diem_hs, 1)
p = np.poly1d(z)
x_line = np.linspace(min(gio_hoc), max(gio_hoc), 100)
ax.plot(x_line, p(x_line), '--', color='#ff79c6', linewidth=2)
ax.set_title('Mối quan hệ giờ học - điểm', color='white')
ax.set_xlabel('Giờ học/ngày', color='white')
ax.set_ylabel('Điểm', color='white')

# Biểu đồ 5: Histogram
ax = axes[1, 1]
all_diem = np.random.normal(7, 1.2, 200)
n, bins, patches = ax.hist(all_diem, bins=20, edgecolor='black',
                             color='#8be9fd', alpha=0.8)
ax.axvline(np.mean(all_diem), color='#ff5555', linestyle='--',
           linewidth=2, label=f'TB = {np.mean(all_diem):.2f}')
ax.set_title('Phân bố điểm (histogram)', color='white')
ax.set_xlabel('Điểm', color='white')
ax.legend()

# Biểu đồ 6: Box plot
ax = axes[1, 2]
data_box = [np.random.normal(7, 1, 50),
             np.random.normal(8, 0.8, 50),
             np.random.normal(6.5, 1.5, 50)]
bp = ax.boxplot(data_box, labels=['Lớp A', 'Lớp B', 'Lớp C'],
                patch_artist=True)
for patch, color in zip(bp['boxes'], ['#50fa7b', '#8be9fd', '#ffb86c']):
    patch.set_facecolor(color)
    patch.set_alpha(0.7)
ax.set_title('So sánh điểm 3 lớp', color='white')
ax.set_ylabel('Điểm', color='white')

plt.tight_layout()
plt.savefig("charts.png", dpi=150, bbox_inches='tight')
plt.show()
print("✓ Đã lưu biểu đồ vào charts.png")`,
        exercises: [
          {
            title: "Bài 1: Dashboard điểm",
            desc: "Tạo figure 2x2 subplot: line chart tiến độ, bar chart theo môn, pie chart xếp loại, histogram phân bố. Dùng style 'seaborn'.",
            hint: "fig, axes = plt.subplots(2, 2, figsize=(12, 8))"
          },
          {
            title: "Bài 2: Phân tích thống kê",
            desc: "Tạo 100 điểm ngẫu nhiên (normal distribution). Vẽ: histogram + KDE curve, boxplot, scatter matrix. Tính và hiển thị mean, std, median.",
            hint: "from scipy import stats; stats.norm.pdf()"
          },
          {
            title: "Bài 3: Animated chart",
            desc: "Vẽ đồ thị sin/cos animation với matplotlib.animation.FuncAnimation. Thêm nút Play/Pause.",
            hint: "from matplotlib.animation import FuncAnimation"
          }
        ],
        lab: {
          title: "LAB 5.1: Dashboard phân tích lớp học",
          steps: [
            "Đọc dữ liệu từ CSV (điểm 30 sinh viên, 5 môn)",
            "Tính thống kê: mean, std, min, max, median",
            "Vẽ 6 biểu đồ trong 1 figure",
            "Color coding: xanh >= 8, cam >= 6.5, đỏ < 6.5",
            "Thêm annotation cho giá trị đặc biệt",
            "Lưu figure chất lượng cao (DPI=300)"
          ]
        }
      }
    ]
  },
  {
    id: 6,
    title: "NumPy & Pandas",
    subtitle: "Data Science với Python",
    emoji: "🔬",
    color: "#EC4899",
    dark: "#1A0011",
    topics: [
      {
        id: "6-1",
        title: "NumPy Arrays",
        icon: "🔢",
        theory: `## NumPy — Numerical Python

### Tại sao NumPy?
- **Nhanh hơn list Python** gấp 50-100x
- Vectorized operations (không cần for loop)
- Cơ sở của hầu hết thư viện data science

### ndarray — Mảng N chiều
\`\`\`python
import numpy as np
a = np.array([1, 2, 3])        # 1D
b = np.array([[1,2],[3,4]])    # 2D
c = np.zeros((3, 4))           # Ma trận 0
d = np.ones((2, 3, 4))         # 3D tensor
e = np.arange(0, 10, 2)        # [0,2,4,6,8]
f = np.linspace(0, 1, 5)       # [0, 0.25, 0.5, 0.75, 1.0]
\`\`\`

### Broadcasting
NumPy tự động mở rộng mảng nhỏ để phù hợp với mảng lớn:
\`\`\`python
a = np.array([[1,2,3],[4,5,6]])  # shape (2,3)
b = np.array([10, 20, 30])       # shape (3,)
a + b  # shape (2,3) — broadcast!
\`\`\``,
        code: `# ==============================
# NUMPY — SỐ HỌC VÀ MA TRẬN
# ==============================
import numpy as np

print("=" * 40)
print("   NUMPY ARRAYS")
print("=" * 40)

# ===== TẠO ARRAYS =====
a1d = np.array([1, 2, 3, 4, 5])
a2d = np.array([[1, 2, 3],
                 [4, 5, 6],
                 [7, 8, 9]])

print(f"1D shape: {a1d.shape}, dtype: {a1d.dtype}")
print(f"2D shape: {a2d.shape}, ndim: {a2d.ndim}")
print(f"Tổng phần tử: {a2d.size}")

# Các cách tạo
zeros  = np.zeros((3, 4))
ones   = np.ones((2, 3), dtype=int)
eye    = np.eye(3)          # Ma trận đơn vị
rand   = np.random.rand(3, 3)    # [0,1)
randn  = np.random.randn(3, 3)   # Normal distribution
arange = np.arange(0, 20, 2)     # [0,2,4,...,18]
space  = np.linspace(0, 1, 11)   # [0.0, 0.1, ..., 1.0]

print(f"\\nMa trận đơn vị 3x3:\\n{eye}")

# ===== INDEXING VÀ SLICING =====
print("\\n--- Indexing ---")
print(f"a2d[1, 2] = {a2d[1, 2]}")    # Phần tử hàng 1 cột 2
print(f"a2d[0] = {a2d[0]}")           # Hàng 0
print(f"a2d[:, 1] = {a2d[:, 1]}")     # Cột 1
print(f"a2d[1:, 1:] = \\n{a2d[1:, 1:]}")  # Submatrix

# Boolean indexing
data = np.array([3, 7, 1, 9, 4, 6, 2, 8])
print(f"\\nBoolean indexing:")
print(f"  Gốc: {data}")
print(f"  >5 : {data[data > 5]}")  # [7,9,6,8]
print(f"  Chẵn: {data[data % 2 == 0]}")  # [4,6,2,8]

# ===== PHÉP TOÁN =====
print("\\n--- Phép toán ---")
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print(f"A + B = \\n{A + B}")         # Cộng element-wise
print(f"A * 2 = \\n{A * 2}")         # Nhân scalar
print(f"A @ B = \\n{A @ B}")         # Ma trận multiplication
print(f"A.T = \\n{A.T}")             # Transpose

# ===== THỐNG KÊ =====
print("\\n--- Thống kê ---")
scores = np.array([85, 92, 78, 96, 88, 73, 95, 81, 87, 90])

stats = {
    "Mean":   np.mean(scores),
    "Median": np.median(scores),
    "Std":    np.std(scores),
    "Min":    np.min(scores),
    "Max":    np.max(scores),
    "Q1":     np.percentile(scores, 25),
    "Q3":     np.percentile(scores, 75),
}
for k, v in stats.items():
    print(f"  {k:8s}: {v:.2f}")

# ===== BROADCASTING =====
print("\\n--- Broadcasting ---")
matrix = np.array([[1,2,3],[4,5,6],[7,8,9]])
row    = np.array([10, 20, 30])
col    = np.array([[100],[200],[300]])

print(f"Matrix + Row =\\n{matrix + row}")   # Cộng từng hàng
print(f"Matrix + Col =\\n{matrix + col}")   # Cộng từng cột

# ===== ỨNG DỤNG: TÍNH ĐIỂM =====
print("\\n--- Tính điểm sinh viên ---")
np.random.seed(42)
sv_diem = np.random.uniform(4, 10, (5, 3))  # 5 SV, 3 môn
trong_so = np.array([0.3, 0.4, 0.3])        # Trọng số 3 môn

# Tính điểm TB có trọng số cho mỗi SV
diem_tb = sv_diem @ trong_so
print("Ma trận điểm (5 SV x 3 môn):")
print(np.round(sv_diem, 2))
print(f"\\nĐiểm TB có trọng số: {np.round(diem_tb, 2)}")
print(f"Xếp hạng (index): {np.argsort(diem_tb)[::-1]}")`,
        exercises: [
          {
            title: "Bài 1: Xử lý ảnh",
            desc: "Đọc ảnh bằng plt.imread() → numpy array. Chuyển sang grayscale (0.299*R + 0.587*G + 0.114*B). Tăng/giảm brightness, flip, rotate.",
            hint: "img = plt.imread('photo.jpg'); gray = img @ [0.299, 0.587, 0.114]"
          },
          {
            title: "Bài 2: Thống kê nhiều lớp",
            desc: "Tạo random 5 lớp × 30 sinh viên × 4 môn. Tính: điểm TB mỗi lớp, điểm TB mỗi môn, sv giỏi nhất, lớp tốt nhất.",
            hint: "np.mean(arr, axis=...) — axis=0 theo cột, axis=1 theo hàng"
          },
          {
            title: "Bài 3: Phép tính ma trận",
            desc: "Implement: nhân ma trận, nghịch đảo, determinant, giải hệ phương trình Ax=b bằng np.linalg.",
            hint: "np.linalg.inv(A), np.linalg.det(A), np.linalg.solve(A, b)"
          }
        ],
        lab: {
          title: "LAB 6.1: Phân tích dữ liệu điểm chuẩn quốc gia",
          steps: [
            "Tạo dataset ngẫu nhiên 1000 thí sinh × 9 môn",
            "Tính điểm tổ hợp (3 môn khối A, B, C, D)",
            "Phân tích phân phối điểm mỗi môn",
            "Tìm ngưỡng điểm chuẩn (top 20%)",
            "So sánh điểm theo vùng miền",
            "Vẽ heatmap ma trận tương quan"
          ]
        }
      },
      {
        id: "6-2",
        title: "Pandas DataFrame",
        icon: "🐼",
        theory: `## Pandas — Data Analysis

### Cấu trúc dữ liệu
- **Series**: mảng 1 chiều có nhãn (như column Excel)
- **DataFrame**: bảng 2 chiều (như sheet Excel)

### Đọc/Ghi dữ liệu
\`\`\`python
df = pd.read_csv("file.csv")
df = pd.read_excel("file.xlsx")
df = pd.read_json("file.json")

df.to_csv("output.csv", index=False)
\`\`\`

### Các thao tác quan trọng
- **Selection**: \`df['col']\`, \`df[['c1','c2']]\`, \`df.loc[]\`, \`df.iloc[]\`
- **Filtering**: \`df[df['col'] > 5]\`
- **GroupBy**: \`df.groupby('col').agg()\`
- **Merge**: \`pd.merge(df1, df2, on='key')\`
- **Apply**: \`df['col'].apply(func)\``,
        code: `# ==============================
# PANDAS - PHÂN TÍCH DỮ LIỆU
# ==============================
import pandas as pd
import numpy as np

# ===== TẠO DATAFRAME =====
np.random.seed(42)
n = 50

df = pd.DataFrame({
    'ma_sv':  [f'SV{i:03d}' for i in range(1, n+1)],
    'ten':    [f'Sinh viên {i}' for i in range(1, n+1)],
    'gioi_tinh': np.random.choice(['Nam', 'Nữ'], n),
    'tuoi':   np.random.randint(18, 25, n),
    'lop':    np.random.choice(['CNTT01', 'CNTT02', 'KTPM01', 'HTTT01'], n),
    'toan':   np.random.uniform(4, 10, n).round(1),
    'ly':     np.random.uniform(4, 10, n).round(1),
    'hoa':    np.random.uniform(4, 10, n).round(1),
    'anh':    np.random.uniform(4, 10, n).round(1),
})

# Tính điểm TB
df['diem_tb'] = df[['toan', 'ly', 'hoa', 'anh']].mean(axis=1).round(2)

# Xếp loại
def xep_loai(diem):
    if diem >= 9.0: return 'Xuất sắc'
    if diem >= 8.0: return 'Giỏi'
    if diem >= 6.5: return 'Khá'
    if diem >= 5.0: return 'Trung bình'
    return 'Yếu'

df['xep_loai'] = df['diem_tb'].apply(xep_loai)

print("=== Thông tin DataFrame ===")
print(df.info())

print("\\n=== 5 dòng đầu ===")
print(df.head())

# ===== THỐNG KÊ =====
print("\\n=== Thống kê mô tả ===")
print(df[['toan', 'ly', 'hoa', 'anh', 'diem_tb']].describe().round(2))

# ===== SELECTION & FILTERING =====
print("\\n=== Sinh viên xuất sắc ===")
xuat_sac = df[df['xep_loai'] == 'Xuất sắc'][['ten', 'lop', 'diem_tb']]
print(xuat_sac.to_string(index=False))

print("\\n=== Sinh viên giỏi toán (>=9) và tiếng anh (>=8) ===")
gioi = df[(df['toan'] >= 9) & (df['anh'] >= 8)][['ten', 'toan', 'anh']]
print(gioi)

# ===== GROUPBY =====
print("\\n=== Thống kê theo lớp ===")
lop_stats = df.groupby('lop').agg(
    so_sinh_vien=('ma_sv', 'count'),
    diem_tb_lop=('diem_tb', 'mean'),
    diem_cao_nhat=('diem_tb', 'max'),
    diem_thap_nhat=('diem_tb', 'min')
).round(2).sort_values('diem_tb_lop', ascending=False)
print(lop_stats)

print("\\n=== Phân bố xếp loại theo giới tính ===")
phan_bo = df.groupby(['gioi_tinh', 'xep_loai']).size().unstack(fill_value=0)
print(phan_bo)

# ===== THÊM CỘT MỚI =====
df['rank'] = df['diem_tb'].rank(ascending=False, method='min').astype(int)
df['pass'] = df['diem_tb'] >= 5.0

# ===== PIVOT TABLE =====
print("\\n=== Pivot: Điểm TB theo lớp và giới tính ===")
pivot = df.pivot_table(values='diem_tb', index='lop',
                        columns='gioi_tinh', aggfunc='mean').round(2)
print(pivot)

# ===== XỬ LÝ DỮ LIỆU THIẾU =====
df_missing = df.copy()
# Tạo giá trị NaN giả
mask = np.random.random(n) < 0.1
df_missing.loc[mask, 'anh'] = np.nan

print(f"\\n=== Giá trị thiếu ===")
print(df_missing.isnull().sum())

# Điền giá trị thiếu bằng median
df_missing['anh'].fillna(df_missing['anh'].median(), inplace=True)
print("Sau khi xử lý:", df_missing['anh'].isnull().sum())

# ===== LƯU VÀ ĐỌC =====
df.to_csv("sinh_vien.csv", index=False, encoding='utf-8')
df.to_excel("sinh_vien.xlsx", index=False)  # cần openpyxl

df2 = pd.read_csv("sinh_vien.csv")
print(f"\\n✓ Đọc lại: {len(df2)} dòng, {len(df2.columns)} cột")

# ===== TOP 5 SINH VIÊN =====
print("\\n=== Top 5 sinh viên xuất sắc ===")
top5 = df.nlargest(5, 'diem_tb')[['rank', 'ten', 'lop', 'diem_tb', 'xep_loai']]
print(top5.to_string(index=False))`,
        exercises: [
          {
            title: "Bài 1: Phân tích doanh thu",
            desc: "Dataset: 500 đơn hàng (ngày, sản phẩm, danh mục, doanh thu, khách hàng). Phân tích: top sản phẩm, xu hướng theo tháng, khách hàng VIP.",
            hint: "df.groupby(pd.Grouper(key='ngay', freq='M')).sum()"
          },
          {
            title: "Bài 2: Làm sạch dữ liệu",
            desc: "Dataset bẩn: có NaN, giá trị âm, kiểu sai, trùng lặp. Làm sạch: fillna, dropna, remove outliers (IQR), normalize chuỗi.",
            hint: "Q1, Q3 = df['col'].quantile([0.25, 0.75]); IQR = Q3 - Q1"
          },
          {
            title: "Bài 3: Merge & Join",
            desc: "3 bảng: students, courses, enrollments. Merge thành bảng hoàn chỉnh. Tìm SV học nhiều môn nhất, môn đông SV nhất.",
            hint: "pd.merge(df1, df2, on='id', how='left')"
          }
        ],
        lab: {
          title: "LAB 6.2: Phân tích dữ liệu COVID-19 Việt Nam",
          steps: [
            "Đọc CSV ca bệnh theo ngày/tỉnh",
            "Làm sạch: xử lý NaN, format ngày tháng",
            "Tính: 7-day rolling average, tỷ lệ tử vong",
            "GroupBy tỉnh: xếp hạng số ca tích lũy",
            "Vẽ: line chart theo thời gian, heatmap",
            "Báo cáo tổng hợp ra HTML"
          ]
        }
      }
    ]
  }
];

export const bigProjects = {
  individual: [
    {
      title: "🏪 Hệ thống quản lý cửa hàng bán lẻ",
      level: "Trung cấp",
      duration: "2-3 tuần",
      skills: ["OOP", "SQLite", "Tkinter", "Matplotlib"],
      desc: "Xây dựng ứng dụng desktop quản lý cửa hàng bán lẻ hoàn chỉnh.",
      features: [
        "Quản lý sản phẩm: CRUD, tìm kiếm, phân loại",
        "Bán hàng: tạo hóa đơn, tính tiền, in hóa đơn",
        "Quản lý kho: nhập hàng, xuất hàng, cảnh báo hết hàng",
        "Báo cáo: doanh thu theo ngày/tháng, sản phẩm bán chạy",
        "Đồ thị: biểu đồ doanh thu, tồn kho",
        "Đăng nhập: admin/staff, phân quyền"
      ],
      tech: "Tkinter + SQLite + Matplotlib + Pandas"
    },
    {
      title: "📰 Trình đọc tin tức với phân tích sentiment",
      level: "Nâng cao",
      duration: "3-4 tuần",
      skills: ["API", "Pandas", "Matplotlib", "NLP cơ bản"],
      desc: "Thu thập và phân tích tin tức từ nhiều nguồn.",
      features: [
        "Scraping tin tức từ web (requests + BeautifulSoup)",
        "Lưu trữ vào SQLite",
        "Phân tích từ khóa xuất hiện nhiều nhất",
        "Word cloud visualization",
        "Phân loại tin theo chủ đề (đơn giản)",
        "Dashboard hiển thị xu hướng"
      ],
      tech: "requests + BeautifulSoup + Pandas + Matplotlib + wordcloud"
    },
    {
      title: "💰 Ứng dụng quản lý chi tiêu cá nhân",
      level: "Cơ bản+",
      duration: "1-2 tuần",
      skills: ["Python cơ bản", "SQLite", "Matplotlib"],
      desc: "App theo dõi thu chi, phân tích thói quen chi tiêu.",
      features: [
        "Ghi nhận thu nhập và chi tiêu",
        "Phân loại: ăn uống, di chuyển, giải trí...",
        "Thiết lập ngân sách hàng tháng",
        "Cảnh báo khi vượt ngân sách",
        "Báo cáo tháng: biểu đồ thu-chi, phân bổ danh mục",
        "Export CSV/Excel"
      ],
      tech: "Tkinter + SQLite + Matplotlib"
    }
  ],
  group: [
    {
      title: "🎓 Hệ thống quản lý trường học",
      level: "Nâng cao",
      duration: "4-6 tuần",
      team: "4-5 người",
      desc: "Hệ thống quản lý toàn diện cho trường học/trung tâm đào tạo.",
      modules: [
        "Module 1 (SV A): Quản lý sinh viên, lớp học",
        "Module 2 (SV B): Quản lý môn học, thời khóa biểu",
        "Module 3 (SV C): Nhập điểm, tính kết quả học tập",
        "Module 4 (SV D): Học phí, công nợ",
        "Module 5 (SV E): Báo cáo thống kê tổng hợp"
      ],
      tech: "Python + SQLite + Tkinter + Matplotlib + Pandas",
      github: "Chia nhánh theo module, merge vào main"
    },
    {
      title: "🏥 Phần mềm quản lý phòng khám",
      level: "Chuyên nghiệp",
      duration: "5-7 tuần",
      team: "4-5 người",
      desc: "Hệ thống quản lý bệnh nhân, lịch khám, thuốc, hóa đơn.",
      modules: [
        "Module 1: Đăng ký bệnh nhân, hồ sơ bệnh án",
        "Module 2: Đặt lịch khám, nhắc nhở",
        "Module 3: Kê đơn thuốc, kho thuốc",
        "Module 4: Hóa đơn, bảo hiểm y tế",
        "Module 5: Dashboard, báo cáo thống kê"
      ],
      tech: "Python OOP + SQLite + Tkinter + Matplotlib",
      github: "GitFlow: feature branches, code review, pull request"
    }
  ]
};

export const tips = [
  {
    category: "⚡ Hiệu suất",
    items: [
      {
        title: "List Comprehension nhanh hơn for loop",
        code: `# ❌ Chậm
squares = []
for i in range(1000):
    squares.append(i**2)

# ✅ Nhanh (2-5x)
squares = [i**2 for i in range(1000)]

# ✅✅ Cực nhanh (numpy)
import numpy as np
squares = np.arange(1000)**2`
      },
      {
        title: "Dùng join thay vì += cho string",
        code: `# ❌ O(n²) — tạo string mới mỗi lần
result = ""
for word in words:
    result += word + ", "

# ✅ O(n) — join một lần
result = ", ".join(words)`
      },
      {
        title: "Generator thay vì list khi chỉ duyệt 1 lần",
        code: `# ❌ Chiếm 100MB RAM
big_list = [x**2 for x in range(10_000_000)]

# ✅ Chỉ tính khi cần, O(1) RAM
gen = (x**2 for x in range(10_000_000))
total = sum(gen)  # Tính lần lượt`
      }
    ]
  },
  {
    category: "🐛 Debug & Xử lý lỗi",
    items: [
      {
        title: "f-string debug nhanh (Python 3.8+)",
        code: `x = 42
lst = [1, 2, 3]

# ❌ Verbose
print("x =", x)
print("lst =", lst)

# ✅ Gọn với = syntax
print(f"{x = }")     # x = 42
print(f"{lst = }")   # lst = [1, 2, 3]
print(f"{x*2 = }")   # x*2 = 84`
      },
      {
        title: "Try-Except đúng cách",
        code: `# ❌ Bắt quá rộng, ẩn lỗi
try:
    result = risky_function()
except:  # Bắt TẤT CẢ kể cả Ctrl+C
    pass

# ✅ Bắt lỗi cụ thể
try:
    with open("file.txt") as f:
        data = json.load(f)
except FileNotFoundError:
    print("File không tồn tại")
except json.JSONDecodeError as e:
    print(f"JSON lỗi: {e}")
else:
    process(data)  # Chạy nếu không có lỗi
finally:
    cleanup()      # Luôn chạy`
      },
      {
        title: "Logging thay vì print",
        code: `import logging

# Cấu hình 1 lần
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s [%(levelname)s] %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)

log = logging.getLogger(__name__)

# Dùng thay print
log.debug("Chi tiết kỹ thuật")
log.info("Thông tin thông thường")
log.warning("Cảnh báo")
log.error("Lỗi nhưng vẫn chạy")
log.critical("Lỗi nghiêm trọng")`
      }
    ]
  },
  {
    category: "🎨 Code sạch & Pythonic",
    items: [
      {
        title: "Walrus operator := (Python 3.8+)",
        code: `# ❌ Phải gọi hàm 2 lần
data = get_data()
if data:
    process(data)

# ✅ Assign và kiểm tra cùng lúc
if data := get_data():
    process(data)

# Trong vòng lặp
while chunk := file.read(1024):
    process(chunk)`
      },
      {
        title: "Dataclass — class gọn hơn",
        code: `# ❌ Verbose
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    def __repr__(self):
        return f"Point({self.x}, {self.y})"
    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

# ✅ Gọn gàng với dataclass
from dataclasses import dataclass, field

@dataclass(order=True)
class Point:
    x: float
    y: float
    
    def distance(self):
        return (self.x**2 + self.y**2)**0.5

p = Point(3, 4)
print(p)        # Point(x=3, y=4)
print(p.distance())  # 5.0`
      },
      {
        title: "Context Manager tự tạo",
        code: `# Cách 1: class
class Timer:
    def __enter__(self):
        import time
        self.start = time.perf_counter()
        return self
    
    def __exit__(self, *args):
        self.elapsed = time.perf_counter() - self.start
        print(f"⏱ {self.elapsed*1000:.2f}ms")

# Cách 2: contextmanager decorator
from contextlib import contextmanager

@contextmanager
def timer():
    import time
    start = time.perf_counter()
    yield
    print(f"⏱ {(time.perf_counter()-start)*1000:.2f}ms")

# Dùng
with timer():
    [x**2 for x in range(100000)]`
      },
      {
        title: "Enum cho constants",
        code: `# ❌ Magic numbers
STATUS_ACTIVE = 1
STATUS_INACTIVE = 2
STATUS_BANNED = 3

# ✅ Enum rõ ràng
from enum import Enum, auto

class UserStatus(Enum):
    ACTIVE   = auto()
    INACTIVE = auto()
    BANNED   = auto()

user_status = UserStatus.ACTIVE
if user_status == UserStatus.ACTIVE:
    print("Tài khoản đang hoạt động")
    
# Enum có giá trị
class Direction(Enum):
    NORTH = "N"
    SOUTH = "S"
    EAST  = "E"
    WEST  = "W"

print(Direction.NORTH.value)  # "N"`
      }
    ]
  },
  {
    category: "🔧 Thủ thuật hay",
    items: [
      {
        title: "Unpacking nâng cao",
        code: `# Star unpacking
first, *rest = [1, 2, 3, 4, 5]
print(first)  # 1
print(rest)   # [2, 3, 4, 5]

head, *middle, tail = [1, 2, 3, 4, 5]
print(head, middle, tail)  # 1 [2,3,4] 5

# Swap không cần temp
a, b = 1, 2
a, b = b, a  # swap!

# Dict unpacking
defaults = {'color': 'blue', 'size': 10}
custom   = {'size': 20, 'weight': 5}
merged   = {**defaults, **custom}
# {'color': 'blue', 'size': 20, 'weight': 5}`
      },
      {
        title: "any() và all() thay if lồng nhau",
        code: `scores = [8, 7, 9, 6, 8]

# ❌ For loop
all_pass = True
for s in scores:
    if s < 5:
        all_pass = False
        break

# ✅ Pythonic
all_pass  = all(s >= 5 for s in scores)
any_great = any(s >= 9 for s in scores)
print(f"Tất cả qua: {all_pass}")    # True
print(f"Có xuất sắc: {any_great}")  # True`
      },
      {
        title: "itertools cho tổ hợp",
        code: `import itertools

# Hoán vị (permutations)
for p in itertools.permutations([1,2,3]):
    print(p)  # (1,2,3), (1,3,2), (2,1,3)...

# Tổ hợp (combinations)
for c in itertools.combinations([1,2,3,4], 2):
    print(c)  # (1,2), (1,3), (1,4), (2,3)...

# Nhóm liên tiếp (groupby)
data = [1,1,2,2,2,3,1,1]
for key, group in itertools.groupby(data):
    print(f"{key}: {list(group)}")
# 1: [1,1]  2: [2,2,2]  3: [3]  1: [1,1]

# Chuỗi vô hạn
counter = itertools.count(start=1, step=2)
first5 = list(itertools.islice(counter, 5))
print(first5)  # [1, 3, 5, 7, 9]`
      }
    ]
  }
];
