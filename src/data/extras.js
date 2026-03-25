// ============================================================
// EXTRA EXERCISES, LABS & INSTRUCTOR INFO
// ============================================================

export const instructor = {
  name: "Phúc Trần",
  fullName: "Trần Vĩnh Phúc",
  title: "Giảng viên Khoa Công nghệ Thông tin",
  university: "Trường Đại học Đà Lạt (DLU)",
  email: "phuctv@dlu.edu.vn",
  phone: "0976 353 605",
  avatar: "",
  bio: "Giảng viên giảng dạy các học phần IoT, Mạng thế hệ mới, Voice over IP, Chuyên đề Mạng máy tính 1. Hướng nghiên cứu: Triển khai hệ thống AIoT, Bảo mật cho Edge Computing và Mạng Phân tán",
  subjects: ["IoT", "Mạng thế hệ mới", "Voice over IP", "Chuyên đề Mạng máy tính 1"],
  office: "Triển khai hệ thống AIoT, Bảo mật cho Edge Computing và Mạng Phân tán",
  officeHours: "phuctv@dlu.edu.vn",
  social: {
    github: "github.com/phuctran2510",
    website: "dlu.edu.vn",
  },
  quotes: [
    "\"TrustAware-X: Integrating Game-Theoretic Incentives, Reinforcement Learning, and Shapley Value Fair Compensation in Blockchain-Secured Federated Learning, Phuc Tran-Vinh, Thai-Minh Truong, and Cuong Pham-Quoc, 2026.\"",
    "\"Federated Learning with Trust-aware Blockchain Fingerprinting: A Secure and Verifiable Framework for Edge AI, Phuc Tran-Vinh, Thai-Minh Truong, and Cuong Pham-Quoc, 2025\"",
    "\"FPGA-based Secure Federated Learning with CNN Inference and Hardware Cryptography, Phuc Tran-Vinh and Cuong Pham-Quoc,2025\"",
  "\"Environmental Fingerprint-Based Access Control for Edge-AI Inference on FPGA, Phuc Tran-Vinh and Cuong Pham-Quoc,2025\"",
"\"Edge AI: A Comprehensive Survey on Applications, Challenges, and Future Directions,2025\"",
"\..."

  ]
};

// ============================================================
// EXTRA EXERCISES PER CHAPTER
// ============================================================

export const extraExercises = {
  // Chapter 1 — Python Cơ Bản
  "1-1": [
    {
      title: "Bài 4: Đổi đơn vị nhiệt độ",
      level: "Cơ bản",
      desc: "Viết chương trình nhập nhiệt độ Celsius, tính và in ra: Fahrenheit (F = C × 9/5 + 32), Kelvin (K = C + 273.15), Rankine (R = (C + 273.15) × 9/5).",
      hint: "Dùng f-string in kết quả với 2 chữ số thập phân: f'{value:.2f}'",
      solution: `c = float(input("Nhập nhiệt độ Celsius: "))
f = c * 9/5 + 32
k = c + 273.15
r = (c + 273.15) * 9/5
print(f"Celsius    : {c:.2f}°C")
print(f"Fahrenheit : {f:.2f}°F")
print(f"Kelvin     : {k:.2f}K")
print(f"Rankine    : {r:.2f}°R")`
    },
    {
      title: "Bài 5: Tính diện tích các hình",
      level: "Cơ bản",
      desc: "Nhập vào loại hình (tròn/vuông/chữ nhật/tam giác). Tùy loại hình, nhập thêm thông số rồi tính và in diện tích, chu vi.",
      hint: "Dùng if-elif-else để phân nhánh, import math để dùng math.pi",
      solution: `import math
hinh = input("Nhập loại hình (tron/vuong/chunhat/tamgiac): ").strip().lower()
if hinh == "tron":
    r = float(input("Bán kính: "))
    print(f"Diện tích: {math.pi * r**2:.2f}")
    print(f"Chu vi: {2 * math.pi * r:.2f}")
elif hinh == "vuong":
    a = float(input("Cạnh: "))
    print(f"Diện tích: {a**2:.2f}")
    print(f"Chu vi: {4*a:.2f}")
elif hinh == "chunhat":
    d, r = float(input("Dài: ")), float(input("Rộng: "))
    print(f"Diện tích: {d*r:.2f}")
    print(f"Chu vi: {2*(d+r):.2f}")
elif hinh == "tamgiac":
    a, b, c = [float(input(f"Cạnh {x}: ")) for x in ['a','b','c']]
    s = (a+b+c)/2
    dt = math.sqrt(s*(s-a)*(s-b)*(s-c))
    print(f"Diện tích: {dt:.2f}")
    print(f"Chu vi: {a+b+c:.2f}")`
    },
    {
      title: "Bài 6: Phân loại tam giác",
      level: "Trung bình",
      desc: "Nhập 3 cạnh tam giác a, b, c. Kiểm tra có tạo thành tam giác không (tổng 2 cạnh bất kỳ > cạnh còn lại). Nếu có, phân loại: đều/cân/vuông/thường.",
      hint: "Tam giác vuông: a² + b² == c² (sắp xếp tăng dần trước). Dùng sorted().",
      solution: `a, b, c = sorted([float(input(f"Cạnh {x}: ")) for x in ['a','b','c']])
if a + b <= c:
    print("Không tạo thành tam giác!")
else:
    if a == b == c:
        loai = "Đều"
    elif a == b or b == c:
        loai = "Cân"
    elif abs(a**2 + b**2 - c**2) < 1e-9:
        loai = "Vuông"
    else:
        loai = "Thường"
    print(f"Tam giác {loai}")`
    },
    {
      title: "Bài 7: Xử lý chuỗi",
      level: "Trung bình",
      desc: "Nhập một câu. In ra: số từ, số ký tự (không đếm khoảng trắng), từ dài nhất, số lần xuất hiện của mỗi nguyên âm (a,e,i,o,u), đảo ngược câu.",
      hint: "Dùng split() tách từ, lower() chuẩn hoá, count() đếm, ' '.join(reversed(words)) đảo câu",
      solution: `cau = input("Nhập câu: ")
tu = cau.split()
print(f"Số từ: {len(tu)}")
print(f"Số ký tự (không khoảng trắng): {len(cau.replace(' ',''))}")
print(f"Từ dài nhất: {max(tu, key=len)}")
for nv in 'aeiouăâêôơưáàảãạ':
    cnt = cau.lower().count(nv)
    if cnt: print(f"  '{nv}': {cnt} lần")
print(f"Đảo ngược: {' '.join(reversed(tu))}")`
    },
    {
      title: "Bài 8: Số Armstrong",
      level: "Trung bình",
      desc: "Số Armstrong (narcissistic number) là số bằng tổng lũy thừa n của các chữ số (n là số chữ số). VD: 153 = 1³+5³+3³. Tìm tất cả số Armstrong từ 1 đến 10000.",
      hint: "str(n) để lấy từng chữ số, len(str(n)) để đếm số chữ số",
      solution: `armstrong = []
for n in range(1, 10001):
    digits = [int(d) for d in str(n)]
    k = len(digits)
    if sum(d**k for d in digits) == n:
        armstrong.append(n)
print(f"Số Armstrong từ 1-10000: {armstrong}")`
    },
    {
      title: "Bài 9: Ma trận nhân đôi",
      level: "Nâng cao",
      desc: "Nhập ma trận m×n từ bàn phím. In ma trận gốc, ma trận chuyển vị (transpose), tổng mỗi hàng, tổng mỗi cột.",
      hint: "Transpose: [[row[i] for row in matrix] for i in range(cols)]",
      solution: `m, n = int(input("Hàng m: ")), int(input("Cột n: "))
print("Nhập ma trận:")
A = [[float(input(f"  A[{i+1}][{j+1}]: ")) for j in range(n)] for i in range(m)]
print("\\nMa trận gốc:")
for row in A: print(" ", row)
T = [[A[i][j] for i in range(m)] for j in range(n)]
print("\\nChuyển vị:")
for row in T: print(" ", row)
print("\\nTổng mỗi hàng:", [sum(row) for row in A])
print("Tổng mỗi cột:", [sum(A[i][j] for i in range(m)) for j in range(n)])`
    },
    {
      title: "Bài 10: Mã hóa Caesar",
      level: "Nâng cao",
      desc: "Cài đặt mã hóa/giải mã Caesar cipher. Mã hóa: dịch mỗi chữ cái k vị trí trong bảng chữ cái. Giữ nguyên ký tự không phải chữ cái.",
      hint: "ord('a')=97, chr(97)='a'. Công thức: chr((ord(c)-97+k)%26+97) cho chữ thường",
      solution: `def caesar(text, k, decrypt=False):
    if decrypt: k = -k
    result = ""
    for c in text:
        if c.isalpha():
            base = ord('A') if c.isupper() else ord('a')
            result += chr((ord(c) - base + k) % 26 + base)
        else:
            result += c
    return result

msg = input("Nhập chuỗi: ")
k   = int(input("Khóa dịch chuyển: "))
enc = caesar(msg, k)
dec = caesar(enc, k, decrypt=True)
print(f"Mã hóa  : {enc}")
print(f"Giải mã : {dec}")`
    }
  ],
  "1-2": [
    {
      title: "Bài 4: Dãy số Collatz",
      level: "Cơ bản",
      desc: "Dãy Collatz: nếu n chẵn → n/2, nếu n lẻ → 3n+1, lặp đến khi n=1. Nhập n, in toàn bộ dãy và số bước cần thiết.",
      hint: "Dùng while n != 1, đếm số bước bằng biến count",
      solution: `def collatz(n):
    steps, seq = 0, [n]
    while n != 1:
        n = n // 2 if n % 2 == 0 else 3 * n + 1
        seq.append(n)
        steps += 1
    return seq, steps

n = int(input("Nhập n: "))
seq, steps = collatz(n)
print(f"Dãy: {seq}")
print(f"Số bước: {steps}")`
    },
    {
      title: "Bài 5: Tháp Hà Nội",
      level: "Trung bình",
      desc: "Cài đặt bài toán Tháp Hà Nội đệ quy. In từng bước di chuyển đĩa từ cột nguồn sang cột đích qua cột trung gian.",
      hint: "Hàm hanoi(n, src, dst, mid): đệ quy n-1 đĩa từ src→mid, di chuyển đĩa n, rồi đệ quy n-1 từ mid→dst",
      solution: `def hanoi(n, src='A', dst='C', mid='B'):
    if n == 1:
        print(f"  Di chuyển đĩa 1: {src} → {dst}")
        return 1
    moves = hanoi(n-1, src, mid, dst)
    print(f"  Di chuyển đĩa {n}: {src} → {dst}")
    moves += 1
    moves += hanoi(n-1, mid, dst, src)
    return moves

n = int(input("Số đĩa: "))
total = hanoi(n)
print(f"Tổng số bước: {total} (lý thuyết: {2**n - 1})")`
    },
    {
      title: "Bài 6: Xử lý danh sách số",
      level: "Cơ bản",
      desc: "Viết hàm nhận list số, trả về: (tổng, trung bình, số lớn nhất, số nhỏ nhất, trung vị, độ lệch chuẩn). KHÔNG dùng thư viện statistics.",
      hint: "Trung vị: sort rồi lấy giữa. Độ lệch chuẩn: sqrt(Σ(xi-mean)²/n)",
      solution: `import math

def thong_ke(lst):
    if not lst: return None
    n   = len(lst)
    tb  = sum(lst) / n
    srt = sorted(lst)
    med = srt[n//2] if n%2 else (srt[n//2-1]+srt[n//2])/2
    std = math.sqrt(sum((x-tb)**2 for x in lst) / n)
    return {
        "tong": sum(lst), "trung_binh": round(tb,2),
        "max": max(lst),  "min": min(lst),
        "trung_vi": med,  "do_lech_chuan": round(std,2)
    }

nums = list(map(float, input("Nhập số (cách nhau bởi dấu phẩy): ").split(',')))
result = thong_ke(nums)
for k, v in result.items():
    print(f"  {k}: {v}")`
    },
    {
      title: "Bài 7: Kiểm tra palindrome",
      level: "Cơ bản",
      desc: "Viết hàm is_palindrome(s) kiểm tra chuỗi s có phải palindrome không (đọc xuôi bằng đọc ngược, bỏ qua khoảng trắng và hoa/thường). VD: 'A man a plan a canal Panama'.",
      hint: "Lọc chỉ giữ ký tự alpha: ''.join(c.lower() for c in s if c.isalpha()), so sánh với [::-1]",
      solution: `def is_palindrome(s):
    clean = ''.join(c.lower() for c in s if c.isalpha())
    return clean == clean[::-1]

tests = ["racecar", "hello", "A man a plan a canal Panama", "Was it a car or a cat I saw"]
for t in tests:
    result = "✓ Palindrome" if is_palindrome(t) else "✗ Không phải"
    print(f"  '{t[:30]}...': {result}")`
    },
    {
      title: "Bài 8: Số hoàn hảo & bội số",
      level: "Trung bình",
      desc: "Viết hàm: (1) perfect_numbers(n): tìm số hoàn hảo ≤ n. (2) abundant(n): tìm số dư (tổng ước < n > n). (3) deficient(n): số thiếu. In kết quả với n=500.",
      hint: "Số hoàn hảo: tổng các ước = số (VD 6 = 1+2+3). Dùng sum(i for i in range(1,n) if n%i==0)",
      solution: `def sum_divisors(n): return sum(i for i in range(1,n) if n%i==0)

perfect   = [n for n in range(1,501) if sum_divisors(n)==n]
abundant  = [n for n in range(1,501) if sum_divisors(n)>n]
deficient = [n for n in range(1,501) if sum_divisors(n)<n]

print(f"Số hoàn hảo ≤500: {perfect}")
print(f"Số dư ≤500 ({len(abundant)} số): {abundant[:10]}...")
print(f"Số thiếu ≤500 ({len(deficient)} số)")`
    },
    {
      title: "Bài 9: Generator Fibonacci",
      level: "Trung bình",
      desc: "Viết generator function fib_gen() tạo dãy Fibonacci vô hạn. Dùng islice để lấy 20 số đầu. Tính tỷ lệ vàng (golden ratio) từ 2 số liên tiếp.",
      hint: "Generator dùng yield. Tỷ lệ vàng ≈ 1.618... bằng fib(n+1)/fib(n) khi n→∞",
      solution: `from itertools import islice

def fib_gen():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fibs = list(islice(fib_gen(), 20))
print("20 số Fibonacci:", fibs)
ratios = [fibs[i+1]/fibs[i] for i in range(1, 19)]
print(f"Tỷ lệ vàng (xấp xỉ): {ratios[-1]:.10f}")
print(f"Golden ratio thực:    1.6180339887...")`
    },
    {
      title: "Bài 10: Decorator memoize",
      level: "Nâng cao",
      desc: "Viết decorator @memoize lưu cache kết quả hàm. Áp dụng vào hàm fib(n) và tính thời gian chạy. So sánh với fib không có cache.",
      hint: "Dùng dict cache = {}. Trước khi tính, kiểm tra cache.get(args)",
      solution: `import time, functools

def memoize(func):
    cache = {}
    @functools.wraps(func)
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    wrapper.cache = cache
    return wrapper

@memoize
def fib_cached(n):
    if n <= 1: return n
    return fib_cached(n-1) + fib_cached(n-2)

def fib_plain(n):
    if n <= 1: return n
    return fib_plain(n-1) + fib_plain(n-2)

N = 35
t0 = time.perf_counter(); fib_cached(N); t1 = time.perf_counter()
t2 = time.perf_counter(); fib_plain(N); t3 = time.perf_counter()
print(f"Có cache: {(t1-t0)*1000:.3f}ms")
print(f"Không cache: {(t3-t2)*1000:.3f}ms")
print(f"Tăng tốc: {(t3-t2)/(t1-t0):.0f}x")`
    }
  ],
  "1-3": [
    {
      title: "Bài 4: Flatten list lồng nhau",
      level: "Trung bình",
      desc: "Viết hàm flatten(lst) để làm phẳng list lồng nhiều cấp. VD: [1,[2,[3,4]],5] → [1,2,3,4,5]. Hỗ trợ lồng bất kỳ độ sâu.",
      hint: "Đệ quy: if isinstance(item, list): flatten(item) else: [item]",
      solution: `def flatten(lst):
    result = []
    for item in lst:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result

nested = [1, [2, [3, [4, [5]]]], 6, [7, 8]]
print(flatten(nested))  # [1, 2, 3, 4, 5, 6, 7, 8]`
    },
    {
      title: "Bài 5: Chunk list",
      level: "Cơ bản",
      desc: "Viết hàm chunk(lst, n) chia list thành các nhóm kích thước n. VD: chunk([1..9], 3) → [[1,2,3],[4,5,6],[7,8,9]].",
      hint: "Dùng list comprehension: [lst[i:i+n] for i in range(0, len(lst), n)]",
      solution: `def chunk(lst, n):
    return [lst[i:i+n] for i in range(0, len(lst), n)]

print(chunk(list(range(1,10)), 3))   # [[1,2,3],[4,5,6],[7,8,9]]
print(chunk(list(range(1,11)), 4))   # [[1,2,3,4],[5,6,7,8],[9,10]]`
    },
    {
      title: "Bài 6: Sliding window",
      level: "Trung bình",
      desc: "Tính trung bình trượt (moving average) với cửa sổ kích thước k trên list giá cổ phiếu. VD: [1,2,3,4,5], k=3 → [2.0, 3.0, 4.0].",
      hint: "Dùng list comprehension: [sum(lst[i:i+k])/k for i in range(len(lst)-k+1)]",
      solution: `def moving_average(lst, k):
    return [round(sum(lst[i:i+k])/k, 2) for i in range(len(lst)-k+1)]

prices = [100, 102, 104, 101, 105, 107, 103, 108, 110, 106]
print("Giá gốc:", prices)
print("MA(3):", moving_average(prices, 3))
print("MA(5):", moving_average(prices, 5))`
    },
    {
      title: "Bài 7: Transpose matrix",
      level: "Trung bình",
      desc: "Nhập ma trận m×n dưới dạng list of lists. In ma trận gốc và ma trận chuyển vị. Dùng list comprehension và zip.",
      hint: "Transpose bằng zip: list(map(list, zip(*matrix)))",
      solution: `def print_matrix(m, title):
    print(f"\\n{title}:")
    for row in m:
        print("  " + "  ".join(f"{x:5.1f}" for x in row))

A = [[1,2,3],[4,5,6],[7,8,9]]
T = list(map(list, zip(*A)))
print_matrix(A, "Ma trận gốc")
print_matrix(T, "Chuyển vị")`
    },
    {
      title: "Bài 8: Xếp loại học sinh",
      level: "Cơ bản",
      desc: "Danh sách 10 HS mỗi người có 5 điểm môn học. Tính điểm TB có trọng số [0.2, 0.2, 0.2, 0.2, 0.2]. Sắp xếp theo điểm, in bảng xếp hạng.",
      hint: "Dùng zip(diem, trong_so) rồi sum(d*w for d,w in ...), sorted với key=lambda",
      solution: `import random
random.seed(42)
hs = [(f"HS{i:02d}", [random.uniform(4,10) for _ in range(5)]) for i in range(1,11)]
ws = [0.2]*5
for ten, diem in hs:
    tb = sum(d*w for d,w in zip(diem, ws))
    print(f"{ten}: TB={tb:.2f}")
ranked = sorted(hs, key=lambda x: sum(d*w for d,w in zip(x[1],ws)), reverse=True)
print("\\n=== Bảng xếp hạng ===")
for rank, (ten, diem) in enumerate(ranked, 1):
    tb = sum(d*w for d,w in zip(diem, ws))
    print(f"  {rank}. {ten}: {tb:.2f}")`
    },
    {
      title: "Bài 9: Two Sum",
      level: "Trung bình",
      desc: "Cho list số nguyên và target. Tìm TẤT CẢ cặp (i,j) sao cho nums[i]+nums[j]==target, i<j. Trả về list các cặp index. Độ phức tạp O(n).",
      hint: "Dùng dict lưu: {value: index}. Với mỗi num, kiểm tra target-num đã có trong dict chưa.",
      solution: `def two_sum_all(nums, target):
    seen = {}
    pairs = []
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            for j in seen[complement]:
                pairs.append((j, i))
        if num not in seen:
            seen[num] = []
        seen[num].append(i)
    return pairs

nums = [2, 7, 11, 15, 2, 9, 4, 6]
target = 9
print(f"Nums: {nums}, Target: {target}")
pairs = two_sum_all(nums, target)
print(f"Các cặp: {pairs}")
for i, j in pairs:
    print(f"  nums[{i}]={nums[i]} + nums[{j}]={nums[j]} = {target}")`
    },
    {
      title: "Bài 10: Xử lý dữ liệu bán hàng",
      level: "Nâng cao",
      desc: "List giao dịch: [(ngày, sản phẩm, số_lượng, giá)]. Tính: doanh thu từng sản phẩm, ngày doanh thu cao nhất, top 3 sản phẩm bán chạy.",
      hint: "Dùng defaultdict(float) tích lũy doanh thu, sorted để tìm top",
      solution: `from collections import defaultdict
import random, datetime

random.seed(1)
products = ["Táo", "Chuối", "Cam", "Xoài", "Nho"]
data = []
base = datetime.date(2024, 1, 1)
for i in range(30):
    day = base + datetime.timedelta(days=i%10)
    p   = random.choice(products)
    qty = random.randint(5, 50)
    price = random.uniform(10000, 50000)
    data.append((day, p, qty, price))

doanh_thu_sp = defaultdict(float)
doanh_thu_ngay = defaultdict(float)
so_luong_sp = defaultdict(int)

for day, p, qty, price in data:
    rev = qty * price
    doanh_thu_sp[p]   += rev
    doanh_thu_ngay[day] += rev
    so_luong_sp[p]    += qty

print("Doanh thu từng sản phẩm:")
for k,v in sorted(doanh_thu_sp.items(), key=lambda x:-x[1]):
    print(f"  {k}: {v:,.0f} đ")

best_day = max(doanh_thu_ngay, key=doanh_thu_ngay.get)
print(f"\\nNgày doanh thu cao nhất: {best_day}: {doanh_thu_ngay[best_day]:,.0f} đ")

top3 = sorted(so_luong_sp, key=so_luong_sp.get, reverse=True)[:3]
print(f"\\nTop 3 bán chạy: {top3}")`
    }
  ],
  "1-4": [
    {
      title: "Bài 4: Tần suất ký tự",
      level: "Cơ bản",
      desc: "Nhập đoạn văn bản. Đếm tần suất xuất hiện của từng ký tự (không tính khoảng trắng). Sắp xếp theo tần suất giảm dần, in dạng bar chart ASCII.",
      hint: "Dùng Counter, rồi for k,v in counter.most_common(): print(k, '█'*v)",
      solution: `from collections import Counter
text = input("Nhập văn bản: ").lower()
counter = Counter(c for c in text if c.strip())
print("\\nTần suất ký tự:")
for ch, cnt in counter.most_common(15):
    bar = '█' * cnt
    print(f"  '{ch}': {bar} ({cnt})")`
    },
    {
      title: "Bài 5: Lịch sử trình duyệt",
      level: "Trung bình",
      desc: "Quản lý lịch sử duyệt web bằng dict {url: {title, visits, last_visit}}. Thêm trang, tăng số lần thăm, tìm trang thăm nhiều nhất, xóa trang.",
      hint: "Dùng datetime.now().isoformat() cho last_visit",
      solution: `from datetime import datetime

history = {}

def visit(url, title):
    if url in history:
        history[url]['visits'] += 1
    else:
        history[url] = {'title': title, 'visits': 1}
    history[url]['last_visit'] = datetime.now().isoformat()

for url, title in [
    ("google.com", "Google"), ("dlu.edu.vn", "DLU"),
    ("google.com", "Google"), ("github.com", "GitHub"),
    ("google.com", "Google"), ("dlu.edu.vn", "DLU"),
]:
    visit(url, title)

top = max(history, key=lambda u: history[u]['visits'])
print(f"Thăm nhiều nhất: {top} ({history[top]['visits']} lần)")
print("\\nToàn bộ lịch sử:")
for url, info in sorted(history.items(), key=lambda x: -x[1]['visits']):
    print(f"  [{info['visits']}x] {info['title']} — {url}")`
    },
    {
      title: "Bài 6: Graph biểu diễn bằng dict",
      level: "Nâng cao",
      desc: "Biểu diễn đồ thị không có hướng bằng adjacency list (dict of sets). Thêm cạnh, xóa cạnh, kiểm tra kết nối, tìm hàng xóm.",
      hint: "graph = defaultdict(set); graph[u].add(v); graph[v].add(u)",
      solution: `from collections import defaultdict

class Graph:
    def __init__(self): self.g = defaultdict(set)
    def add_edge(self, u, v): self.g[u].add(v); self.g[v].add(u)
    def remove_edge(self, u, v): self.g[u].discard(v); self.g[v].discard(u)
    def neighbors(self, u): return self.g[u]
    def has_edge(self, u, v): return v in self.g[u]
    def bfs(self, start):
        visited, queue = {start}, [start]
        order = []
        while queue:
            node = queue.pop(0)
            order.append(node)
            for nb in self.g[node]:
                if nb not in visited:
                    visited.add(nb); queue.append(nb)
        return order

g = Graph()
for u, v in [('A','B'),('A','C'),('B','D'),('C','D'),('D','E')]:
    g.add_edge(u, v)
print("BFS từ A:", g.bfs('A'))
print("Hàng xóm D:", g.neighbors('D'))`
    },
    {
      title: "Bài 7: Inventory hệ thống",
      level: "Trung bình",
      desc: "Quản lý tồn kho: {mã: {tên, số_lượng, giá}}. Nhập hàng (+), xuất hàng (-), kiểm tra tồn kho, giá trị tổng kho, cảnh báo hết hàng.",
      hint: "Giá trị kho = sum(v['qty']*v['price'] for v in inventory.values())",
      solution: `inventory = {
    'SP001': {'ten': 'Táo', 'qty': 100, 'price': 5000},
    'SP002': {'ten': 'Chuối', 'qty': 50, 'price': 3000},
    'SP003': {'ten': 'Cam', 'qty': 8, 'price': 8000},
    'SP004': {'ten': 'Nho', 'qty': 3, 'price': 15000},
}

def nhap_hang(ma, qty):
    if ma in inventory: inventory[ma]['qty'] += qty
    else: print(f"Không tìm thấy {ma}")

def xuat_hang(ma, qty):
    if inventory.get(ma, {}).get('qty', 0) >= qty:
        inventory[ma]['qty'] -= qty
        return True
    print(f"Không đủ hàng!"); return False

nhap_hang('SP001', 50)
xuat_hang('SP002', 30)

total = sum(v['qty']*v['price'] for v in inventory.values())
print(f"Giá trị kho: {total:,} đ")

print("\\nCảnh báo hết hàng (< 10):")
for ma, info in inventory.items():
    if info['qty'] < 10:
        print(f"  ⚠️  {info['ten']} ({ma}): còn {info['qty']}")`
    },
    {
      title: "Bài 8: Phân tích log server",
      level: "Nâng cao",
      desc: "Phân tích file log web server. Đếm số request theo IP, HTTP method, status code. Tìm IP truy cập nhiều nhất, tỷ lệ lỗi 4xx/5xx.",
      hint: "Mỗi dòng log: '192.168.1.1 GET /index.html 200'. Dùng split() phân tách.",
      solution: `from collections import Counter

logs = [
    "192.168.1.1 GET /index.html 200",
    "192.168.1.2 POST /login 200",
    "192.168.1.1 GET /about.html 200",
    "10.0.0.1 GET /admin 403",
    "192.168.1.3 GET /missing 404",
    "192.168.1.1 DELETE /api/v1 405",
    "10.0.0.2 GET /index.html 500",
]

ips = Counter(); methods = Counter(); statuses = Counter()
for log in logs:
    ip, method, _, status = log.split()
    ips[ip] += 1; methods[method] += 1; statuses[int(status)] += 1

print("Top IP:", ips.most_common(3))
print("Methods:", dict(methods))
errors = sum(v for k,v in statuses.items() if k >= 400)
total  = sum(statuses.values())
print(f"Tỷ lệ lỗi: {errors}/{total} = {errors/total*100:.1f}%")`
    }
  ],
  "1-5": [
    {
      title: "Bài 4: Đọc ghi file nhị phân",
      level: "Trung bình",
      desc: "Ghi list số nguyên vào file binary (.bin) dùng struct. Đọc lại và xác minh. So sánh kích thước file binary vs text file.",
      hint: "import struct; struct.pack('>I', num) đóng gói số nguyên 4 byte big-endian",
      solution: `import struct, os

numbers = list(range(1, 101))

# Ghi binary
with open('numbers.bin', 'wb') as f:
    for n in numbers:
        f.write(struct.pack('>I', n))  # unsigned int 4 bytes

# Ghi text để so sánh
with open('numbers.txt', 'w') as f:
    f.write('\\n'.join(map(str, numbers)))

# Đọc lại binary
read_back = []
with open('numbers.bin', 'rb') as f:
    while chunk := f.read(4):
        read_back.append(struct.unpack('>I', chunk)[0])

print(f"Đúng: {numbers == read_back}")
print(f"Binary: {os.path.getsize('numbers.bin')} bytes")
print(f"Text:   {os.path.getsize('numbers.txt')} bytes")`
    },
    {
      title: "Bài 5: Config file parser",
      level: "Trung bình",
      desc: "Viết parser đọc file cấu hình dạng INI (như .ini hoặc .cfg). Hỗ trợ [section], key=value, comment (#). Trả về dict lồng nhau.",
      hint: "Đọc từng dòng, strip, bỏ qua comment, nhận ra [section] bằng startswith('[') và endswith(']')",
      solution: `def parse_ini(filename):
    config = {}
    section = None
    with open(filename, 'r') as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith('#'): continue
            if line.startswith('[') and line.endswith(']'):
                section = line[1:-1]
                config[section] = {}
            elif '=' in line and section:
                k, _, v = line.partition('=')
                config[section][k.strip()] = v.strip()
    return config

# Tạo file test
with open('app.ini', 'w') as f:
    f.write("""[database]\\nhost = localhost\\nport = 5432\\nname = mydb\\n\\n[server]\\nhost = 0.0.0.0\\nport = 8080\\n# debug mode\\ndebug = true""")

cfg = parse_ini('app.ini')
print(cfg)
print(f"DB host: {cfg['database']['host']}")
print(f"Server port: {cfg['server']['port']}")`
    },
    {
      title: "Bài 6: File watcher",
      level: "Nâng cao",
      desc: "Viết chương trình theo dõi thay đổi trong thư mục: phát hiện file mới, file bị xóa, file thay đổi (dựa trên mtime). In thông báo khi có thay đổi.",
      hint: "os.listdir() + os.path.getmtime(). Lưu snapshot trước, so sánh với snapshot sau",
      solution: `import os, time

def snapshot(folder):
    snap = {}
    for f in os.listdir(folder):
        path = os.path.join(folder, f)
        if os.path.isfile(path):
            snap[f] = os.path.getmtime(path)
    return snap

folder = "."
print(f"Đang theo dõi thư mục: {os.path.abspath(folder)}")
before = snapshot(folder)

# Mô phỏng thay đổi
with open('test_new.txt', 'w') as f: f.write('mới')
time.sleep(0.1)

after = snapshot(folder)
new_files = set(after) - set(before)
del_files = set(before) - set(after)
changed   = {f for f in before & after if before[f] != after[f]}

if new_files:   print(f"📄 Mới: {new_files}")
if del_files:   print(f"🗑️  Xóa: {del_files}")
if changed:     print(f"✏️  Sửa: {changed}")
if not any([new_files, del_files, changed]): print("Không có thay đổi")
os.remove('test_new.txt')`
    },
    {
      title: "Bài 7: Gộp nhiều CSV",
      level: "Trung bình",
      desc: "Viết script gộp tất cả file CSV trong một thư mục thành 1 file CSV tổng hợp. Bỏ qua header trùng lặp. Thêm cột 'source' để biết dữ liệu từ file nào.",
      hint: "Đọc header từ file đầu tiên, các file sau bỏ qua header (next(reader))",
      solution: `import csv, os, glob

def merge_csvs(folder, output):
    all_rows = []
    header   = None
    for filepath in glob.glob(os.path.join(folder, '*.csv')):
        fname = os.path.basename(filepath)
        with open(filepath, newline='', encoding='utf-8') as f:
            reader = csv.reader(f)
            file_header = next(reader)
            if header is None:
                header = file_header + ['source']
            for row in reader:
                all_rows.append(row + [fname])
    
    with open(output, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(header)
        writer.writerows(all_rows)
    print(f"Đã gộp {len(all_rows)} dòng → {output}")

# Tạo test CSVs
for i, data in enumerate([
    [['Ten','Diem'],['An','8'],['Binh','9']],
    [['Ten','Diem'],['Chi','7'],['Dung','8.5']],
]):
    with open(f'test_{i}.csv','w',newline='') as f:
        csv.writer(f).writerows(data)

merge_csvs('.', 'merged.csv')
os.remove('test_0.csv'); os.remove('test_1.csv')`
    }
  ],
  "2-1": [
    {
      title: "Bài 4: Lớp Stack & Queue",
      level: "Trung bình",
      desc: "Dùng OOP xây dựng Stack và Queue. Thêm method __len__, __iter__, __contains__, __repr__. Stack có thêm method peek_all() xem toàn bộ.",
      hint: "Implement __iter__ bằng cách yield từng phần tử",
      solution: `class Stack:
    def __init__(self, max_size=None):
        self._data = []
        self.max_size = max_size
    def push(self, item):
        if self.max_size and len(self) >= self.max_size:
            raise OverflowError("Stack đầy!")
        self._data.append(item)
    def pop(self):
        if not self._data: raise IndexError("Stack rỗng!")
        return self._data.pop()
    def peek(self):
        if not self._data: raise IndexError("Stack rỗng!")
        return self._data[-1]
    def peek_all(self): return list(reversed(self._data))
    def __len__(self): return len(self._data)
    def __iter__(self): yield from reversed(self._data)
    def __contains__(self, item): return item in self._data
    def __repr__(self): return f"Stack({self._data})"

s = Stack(max_size=5)
for v in [1,2,3,4,5]: s.push(v)
print(s)
print("Peek:", s.peek())
print("3 in stack:", 3 in s)
print("Iter:", list(s))`
    },
    {
      title: "Bài 5: Lớp Matrix",
      level: "Nâng cao",
      desc: "Lớp Matrix: lưu ma trận 2D. Implement __add__, __mul__, __eq__, __str__, transpose(), determinant() (cho ma trận 2x2 và 3x3).",
      hint: "det 2x2: ad-bc. det 3x3: khai triển theo hàng đầu",
      solution: `class Matrix:
    def __init__(self, data):
        self.data = data
        self.rows = len(data)
        self.cols = len(data[0])
    def __add__(self, other):
        return Matrix([[self.data[i][j]+other.data[i][j]
                        for j in range(self.cols)] for i in range(self.rows)])
    def __mul__(self, other):
        if isinstance(other, (int,float)):
            return Matrix([[x*other for x in row] for row in self.data])
        result = [[sum(self.data[i][k]*other.data[k][j]
                       for k in range(self.cols))
                   for j in range(other.cols)] for i in range(self.rows)]
        return Matrix(result)
    def transpose(self):
        return Matrix([[self.data[j][i] for j in range(self.rows)]
                       for i in range(self.cols)])
    def det(self):
        if self.rows==2:
            return self.data[0][0]*self.data[1][1]-self.data[0][1]*self.data[1][0]
    def __str__(self):
        return '\\n'.join(' '.join(f'{x:6.2f}' for x in row) for row in self.data)

A = Matrix([[1,2],[3,4]])
B = Matrix([[5,6],[7,8]])
print("A+B:"); print(A+B)
print("A*B:"); print(A*B)
print(f"det(A): {A.det()}")`
    },
    {
      title: "Bài 6: Lớp Fraction",
      level: "Nâng cao",
      desc: "Lớp phân số Fraction: tử số + mẫu số. Implement +,-,*,/ giữa phân số, rút gọn tự động (dùng GCD), __str__ (ví dụ '3/4'), so sánh ==, <, >.",
      hint: "GCD: math.gcd(a,b). Sau mỗi phép tính, chia tử/mẫu cho GCD của chúng",
      solution: `import math

class Fraction:
    def __init__(self, num, den=1):
        if den == 0: raise ZeroDivisionError("Mẫu số không thể bằng 0!")
        g = math.gcd(abs(num), abs(den))
        sign = -1 if den < 0 else 1
        self.num = sign * num // g
        self.den = sign * den // g
    def __add__(self, o): return Fraction(self.num*o.den+o.num*self.den, self.den*o.den)
    def __sub__(self, o): return Fraction(self.num*o.den-o.num*self.den, self.den*o.den)
    def __mul__(self, o): return Fraction(self.num*o.num, self.den*o.den)
    def __truediv__(self, o): return Fraction(self.num*o.den, self.den*o.num)
    def __eq__(self, o): return self.num*o.den == o.num*self.den
    def __lt__(self, o): return self.num*o.den < o.num*self.den
    def __float__(self): return self.num/self.den
    def __str__(self): return f"{self.num}/{self.den}" if self.den!=1 else str(self.num)
    def __repr__(self): return f"Fraction({self.num},{self.den})"

a, b = Fraction(1,3), Fraction(1,6)
print(f"{a} + {b} = {a+b}")
print(f"{a} * {b} = {a*b}")
print(f"{a} / {b} = {a/b}")
print(f"Float: {float(a):.4f}")`
    },
    {
      title: "Bài 7: Observable pattern",
      level: "Nâng cao",
      desc: "Implement Observer design pattern: Subject (phát sự kiện), Observer (nhận sự kiện). VD: StockMarket phát giá → nhiều Investor nhận cập nhật.",
      hint: "Subject có list observers, method notify() gọi update() của tất cả observer",
      solution: `class Observer:
    def update(self, event, data): pass

class Subject:
    def __init__(self):
        self._observers = []
    def subscribe(self, obs): self._observers.append(obs)
    def unsubscribe(self, obs): self._observers.remove(obs)
    def notify(self, event, data):
        for obs in self._observers: obs.update(event, data)

class StockMarket(Subject):
    def __init__(self):
        super().__init__()
        self._prices = {}
    def set_price(self, stock, price):
        old = self._prices.get(stock)
        self._prices[stock] = price
        if old: self.notify('price_change', {'stock':stock,'old':old,'new':price})

class Investor(Observer):
    def __init__(self, name, threshold=5):
        self.name = name; self.threshold = threshold
    def update(self, event, data):
        change = (data['new']-data['old'])/data['old']*100
        if abs(change) >= self.threshold:
            arrow = '📈' if change>0 else '📉'
            print(f"  {self.name}: {arrow} {data['stock']} {change:+.1f}%")

market = StockMarket()
market.subscribe(Investor("Nguyễn An", threshold=3))
market.subscribe(Investor("Trần Bình", threshold=5))
market.set_price("VNM", 100000)
market.set_price("VNM", 107000)  # +7%
market.set_price("VNM", 105000)  # -1.9%`
    }
  ],
  "3-1": [
    {
      title: "Bài 4: Infix to Postfix",
      level: "Nâng cao",
      desc: "Chuyển đổi biểu thức Infix sang Postfix (Shunting-yard algorithm). VD: '3+4*2' → '3 4 2 * +'. Xử lý ngoặc đơn và độ ưu tiên toán tử.",
      hint: "Stack cho toán tử. Ưu tiên: * / > + -. Khi gặp toán tử, pop những toán tử ưu tiên cao hơn ra output trước.",
      solution: `def infix_to_postfix(expr):
    precedence = {'+':1, '-':1, '*':2, '/':2, '^':3}
    output, stack = [], []
    tokens = expr.replace('(', ' ( ').replace(')', ' ) ').split()
    for token in tokens:
        if token.lstrip('-').replace('.','').isdigit():
            output.append(token)
        elif token == '(':
            stack.append(token)
        elif token == ')':
            while stack and stack[-1] != '(':
                output.append(stack.pop())
            stack.pop()
        else:
            while (stack and stack[-1] != '(' and
                   stack[-1] in precedence and
                   precedence.get(stack[-1],0) >= precedence.get(token,0)):
                output.append(stack.pop())
            stack.append(token)
    while stack: output.append(stack.pop())
    return ' '.join(output)

tests = ["3+4*2", "(3+4)*2", "3+4*2/(1-5)^2"]
for t in tests:
    print(f"  {t:25s} → {infix_to_postfix(t)}")`
    },
    {
      title: "Bài 5: Deque ứng dụng",
      level: "Trung bình",
      desc: "Dùng collections.deque implement: (1) sliding window maximum, (2) palindrome checker, (3) undo/redo system với giới hạn lịch sử.",
      hint: "deque(maxlen=k) tự động bỏ phần tử khi đầy. popleft() và pop() đều O(1)",
      solution: `from collections import deque

# 1. Sliding window maximum O(n)
def window_max(arr, k):
    dq, result = deque(), []
    for i, x in enumerate(arr):
        while dq and arr[dq[-1]] <= x: dq.pop()
        dq.append(i)
        if dq[0] <= i - k: dq.popleft()
        if i >= k-1: result.append(arr[dq[0]])
    return result

print("Window max(k=3):", window_max([1,3,-1,-3,5,3,6,7], 3))

# 2. Palindrome bằng deque
def is_palindrome_deque(s):
    dq = deque(c.lower() for c in s if c.isalpha())
    while len(dq) > 1:
        if dq.popleft() != dq.pop(): return False
    return True

print("'racecar':", is_palindrome_deque("racecar"))
print("'hello':", is_palindrome_deque("hello"))

# 3. Undo/Redo
class Editor:
    def __init__(self):
        self.text = ""
        self.undo_stack = deque(maxlen=20)
        self.redo_stack = deque(maxlen=20)
    def type(self, txt):
        self.undo_stack.append(self.text)
        self.redo_stack.clear()
        self.text += txt
    def undo(self):
        if self.undo_stack:
            self.redo_stack.append(self.text)
            self.text = self.undo_stack.pop()
    def redo(self):
        if self.redo_stack:
            self.undo_stack.append(self.text)
            self.text = self.redo_stack.pop()

ed = Editor()
ed.type("Hello"); ed.type(", World"); ed.type("!")
print(f"Text: '{ed.text}'")
ed.undo()
print(f"Undo: '{ed.text}'")`
    },
    {
      title: "Bài 6: LRU Cache",
      level: "Nâng cao",
      desc: "Implement LRU (Least Recently Used) Cache với capacity k. get(key): trả về value hoặc -1. put(key, value): nếu full, xóa entry ít dùng nhất.",
      hint: "Dùng OrderedDict: move_to_end(key) đẩy lên cuối (most recent), popitem(last=False) xóa đầu (least recent)",
      solution: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.cap   = capacity
        self.cache = OrderedDict()
    def get(self, key):
        if key not in self.cache: return -1
        self.cache.move_to_end(key)
        return self.cache[key]
    def put(self, key, value):
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)
    def __repr__(self): return f"LRU{dict(self.cache)}"

cache = LRUCache(3)
cache.put(1, 'a'); cache.put(2, 'b'); cache.put(3, 'c')
print(cache)
print("get(2):", cache.get(2))
cache.put(4, 'd')  # evict key 1
print(cache)
print("get(1):", cache.get(1))  # -1 (evicted)`
    }
  ],
  "6-1": [
    {
      title: "Bài 4: Chuẩn hóa dữ liệu",
      level: "Trung bình",
      desc: "Cho mảng điểm sinh viên. Thực hiện: (1) Min-Max normalization → [0,1], (2) Z-score standardization (mean=0, std=1), (3) Robust scaling (dùng IQR).",
      hint: "Min-Max: (x-min)/(max-min). Z-score: (x-mean)/std. Robust: (x-median)/IQR",
      solution: `import numpy as np

scores = np.array([45, 67, 89, 78, 56, 90, 34, 72, 83, 61, 88, 49, 75, 92, 58])

minmax = (scores - scores.min()) / (scores.max() - scores.min())
zscore = (scores - scores.mean()) / scores.std()
Q1, Q3 = np.percentile(scores, [25, 75])
robust = (scores - np.median(scores)) / (Q3 - Q1)

print(f"Gốc     : {scores}")
print(f"Min-Max : {np.round(minmax, 3)}")
print(f"Z-score : {np.round(zscore, 3)}")
print(f"Robust  : {np.round(robust, 3)}")`
    },
    {
      title: "Bài 5: Hồi quy tuyến tính thuần túy",
      level: "Nâng cao",
      desc: "Implement Linear Regression bằng NumPy (không dùng sklearn). Tính: hệ số w, b bằng Normal Equation: θ = (XᵀX)⁻¹Xᵀy. Tính MSE, R².",
      hint: "Normal Equation: theta = np.linalg.inv(X.T @ X) @ X.T @ y. Thêm cột 1 vào X.",
      solution: `import numpy as np

np.random.seed(42)
X_raw = np.random.uniform(0, 10, 50)
y     = 3 * X_raw + 7 + np.random.normal(0, 1, 50)

X = np.column_stack([np.ones(50), X_raw])  # thêm bias
theta = np.linalg.inv(X.T @ X) @ X.T @ y
b, w = theta

y_pred = X @ theta
mse    = np.mean((y - y_pred)**2)
ss_res = np.sum((y - y_pred)**2)
ss_tot = np.sum((y - y.mean())**2)
r2     = 1 - ss_res/ss_tot

print(f"Hệ số w: {w:.4f} (thực: 3.0)")
print(f"Hệ số b: {b:.4f} (thực: 7.0)")
print(f"MSE : {mse:.4f}")
print(f"R²  : {r2:.4f}")`
    }
  ]
};

// ============================================================
// EXTRA LABS
// ============================================================

export const extraLabs = {
  "1-1": [
    {
      title: "LAB 1.1B: Máy tính tiền điện",
      difficulty: "⭐⭐",
      duration: "45 phút",
      desc: "Tính tiền điện theo bậc thang EVN",
      steps: [
        "Nhập chỉ số điện đầu tháng và cuối tháng",
        "Tính số KWh tiêu thụ = cuối - đầu",
        "Bậc 1: 0-50 KWh: 1.678đ/KWh",
        "Bậc 2: 51-100 KWh: 1.734đ/KWh",
        "Bậc 3: 101-200 KWh: 2.014đ/KWh",
        "Bậc 4: 201-300 KWh: 2.536đ/KWh",
        "Bậc 5: 301-400 KWh: 2.834đ/KWh",
        "Bậc 6: >400 KWh: 2.927đ/KWh",
        "Tính VAT 10%, in hóa đơn đẹp"
      ],
      expectedOutput: `=== HÓA ĐƠN TIỀN ĐIỆN ===
Số điện tiêu thụ: 250 KWh
Bậc 1 (50 KWh): 83,900 đ
Bậc 2 (50 KWh): 86,700 đ
Bậc 3 (100 KWh): 201,400 đ
Bậc 4 (50 KWh): 126,800 đ
Tổng chưa VAT: 498,800 đ
VAT 10%: 49,880 đ
TỔNG CỘNG: 548,680 đ`
    },
    {
      title: "LAB 1.1C: Hệ tọa độ 2D",
      difficulty: "⭐⭐⭐",
      duration: "60 phút",
      desc: "Các bài toán hình học 2D cơ bản",
      steps: [
        "Nhập tọa độ 3 điểm A(x1,y1), B(x2,y2), C(x3,y3)",
        "Tính khoảng cách AB, BC, CA (sqrt((x2-x1)²+(y2-y1)²))",
        "Kiểm tra 3 điểm có thẳng hàng không (diện tích = 0)",
        "Tính diện tích tam giác (công thức Shoelace)",
        "Tính tọa độ trọng tâm G = ((x1+x2+x3)/3, (y1+y2+y3)/3)",
        "Tính tâm đường tròn ngoại tiếp",
        "Kiểm tra 1 điểm D có nằm trong tam giác không"
      ]
    }
  ],
  "1-2": [
    {
      title: "LAB 1.2B: Module xử lý chuỗi",
      difficulty: "⭐⭐",
      duration: "50 phút",
      desc: "Xây dựng thư viện xử lý chuỗi nâng cao",
      steps: [
        "ham camel_to_snake: 'myVariableName' → 'my_variable_name'",
        "ham snake_to_camel: 'my_variable_name' → 'myVariableName'",
        "ham truncate(s, max_len, suffix='...'): cắt chuỗi",
        "ham word_wrap(s, width=80): xuống dòng tại width",
        "ham highlight(text, keyword): in đậm keyword trong text",
        "ham slugify(s): 'Hello World!' → 'hello-world'",
        "Test tất cả hàm với nhiều trường hợp",
        "Viết unit test đơn giản bằng assert"
      ]
    },
    {
      title: "LAB 1.2C: Chương trình Menu tương tác",
      difficulty: "⭐⭐⭐",
      duration: "75 phút",
      desc: "Ứng dụng quản lý sinh viên với menu CLI",
      steps: [
        "Thiết kế menu chính: 1.Thêm 2.Xem 3.Sửa 4.Xóa 5.Tìm 6.Thống kê 0.Thoát",
        "Mỗi option gọi hàm riêng",
        "Validate input: tuổi phải là số 18-30, điểm 0-10",
        "Lưu dữ liệu vào list of dict",
        "Tìm kiếm theo tên (không phân biệt hoa thường)",
        "Thống kê: điểm TB, max, min, đếm xếp loại",
        "Thoát tự động lưu vào file JSON"
      ]
    }
  ],
  "1-3": [
    {
      title: "LAB 1.3B: Mê cung 2D",
      difficulty: "⭐⭐⭐",
      duration: "90 phút",
      desc: "Giải bài toán mê cung bằng list 2D",
      steps: [
        "Biểu diễn mê cung bằng list 2D (0=đường, 1=tường)",
        "In mê cung dạng ASCII: '█' tường, '·' đường, 'S' start, 'E' end",
        "BFS tìm đường đi ngắn nhất từ S đến E",
        "In đường đi tìm được với '*' đánh dấu",
        "Đếm số bước, hiển thị từng bước di chuyển",
        "Cho phép người dùng nhập mê cung tuỳ chỉnh"
      ]
    },
    {
      title: "LAB 1.3C: Trò chơi Hangman",
      difficulty: "⭐⭐",
      duration: "60 phút",
      desc: "Game Hangman sử dụng list và string",
      steps: [
        "List từ vựng theo chủ đề (động vật, màu sắc, quốc gia)",
        "Chọn ngẫu nhiên 1 từ, ẩn dạng '_ _ _ _'",
        "Cho phép đoán 1 chữ mỗi lần",
        "Hiển thị hình người treo cổ ASCII (6 bước)",
        "Track: chữ đoán đúng, chữ đoán sai",
        "Cho phép đoán cả từ (thưởng thêm lượt nếu đúng)",
        "Lưu điểm cao vào file"
      ]
    }
  ],
  "2-1": [
    {
      title: "LAB 2.1B: Hệ thống ATM",
      difficulty: "⭐⭐⭐",
      duration: "90 phút",
      desc: "Mô phỏng máy ATM bằng OOP",
      steps: [
        "Class BankAccount: số TK, tên, số dư, PIN, lịch sử",
        "Class ATM: list accounts, xác thực PIN (3 lần)",
        "Giao dịch: xem số dư, nạp tiền, rút tiền, chuyển khoản",
        "Mỗi giao dịch ghi log: thời gian, loại, số tiền",
        "Giới hạn: rút tối đa 10 triệu/lần, 20 triệu/ngày",
        "Phí chuyển khoản liên ngân hàng: 0.05%",
        "In sao kê 5 giao dịch gần nhất"
      ]
    },
    {
      title: "LAB 2.1C: Vector & Point 3D",
      difficulty: "⭐⭐⭐",
      duration: "75 phút",
      desc: "Thư viện toán học 3D bằng OOP",
      steps: [
        "Class Vector3D: x, y, z",
        "Phép toán: +, -, * (scalar), dot product, cross product",
        "Magnitude, normalize, angle giữa 2 vector",
        "Class Point3D kế thừa Vector3D",
        "Distance giữa 2 điểm, midpoint",
        "Class Line3D: 2 điểm, parametric form",
        "Class Plane3D: normal vector + point, distance từ point đến plane",
        "Kiểm tra intersection Line-Plane"
      ]
    }
  ],
  "2-2": [
    {
      title: "LAB 2.2B: Plugin System",
      difficulty: "⭐⭐⭐⭐",
      duration: "120 phút",
      desc: "Hệ thống plugin extensible bằng Abstract Class",
      steps: [
        "Abstract class Plugin: tên, phiên bản, method run()",
        "PluginManager: đăng ký, load, chạy plugin",
        "Implement: LogPlugin (ghi log), EmailPlugin (giả lập gửi mail)",
        "TimerPlugin (đo thời gian), CachePlugin (cache kết quả)",
        "Chain plugins: output plugin này là input plugin kia",
        "Config từ JSON file",
        "Error handling khi plugin lỗi (không crash toàn bộ)"
      ]
    },
    {
      title: "LAB 2.2C: Hệ thống phân cấp công ty",
      difficulty: "⭐⭐⭐",
      duration: "90 phút",
      desc: "Quản lý nhân sự phân cấp bằng Inheritance",
      steps: [
        "Abstract class Employee: tên, mã NV, lương cơ bản",
        "Manager kế thừa Employee: thêm department, list subordinates",
        "Developer: level (junior/senior/lead), tech stack",
        "Designer, QA, DevOps với specializations riêng",
        "calculate_salary(): mỗi loại có phụ cấp khác nhau",
        "Phương thức tree() in cây phân cấp",
        "Thống kê: tổng lương, headcount, lương TB theo level"
      ]
    }
  ],
  "3-2": [
    {
      title: "LAB 3.2B: Implement BST",
      difficulty: "⭐⭐⭐⭐",
      duration: "120 phút",
      desc: "Binary Search Tree đầy đủ",
      steps: [
        "Class Node: data, left, right",
        "Class BST: insert, search, delete",
        "Traversal: inorder, preorder, postorder",
        "Height, size, is_balanced",
        "Min, max, floor, ceiling",
        "Level-order traversal (BFS)",
        "Serialize/Deserialize tree sang string",
        "Visualize tree dạng ASCII"
      ]
    },
    {
      title: "LAB 3.2C: Sort Race",
      difficulty: "⭐⭐⭐",
      duration: "75 phút",
      desc: "Benchmark và visualize các giải thuật sắp xếp",
      steps: [
        "Implement: Bubble, Selection, Insertion, Merge, Quick, Heap Sort",
        "Benchmark với 3 loại input: sorted, reverse-sorted, random",
        "Kích thước: 100, 500, 1000, 5000 phần tử",
        "Đo thời gian chạy và số lần so sánh",
        "In bảng kết quả có border ASCII",
        "Xác định best/worst case cho từng thuật toán",
        "Suggest: dùng sort nào cho từng trường hợp"
      ]
    }
  ],
  "4-1": [
    {
      title: "LAB 4.1B: Paint App mini",
      difficulty: "⭐⭐⭐",
      duration: "120 phút",
      desc: "Ứng dụng vẽ đơn giản bằng Tkinter Canvas",
      steps: [
        "Canvas 800x600 pixel",
        "Tool: Bút vẽ tự do (B1-Motion)",
        "Hình: Line, Rectangle, Oval, Polygon",
        "Chọn màu (colorchooser), chọn kích thước bút",
        "Eraser tool (vẽ màu nền)",
        "Undo (Ctrl+Z) lưu tối đa 20 bước",
        "Lưu ảnh ra file PNG (canvas.postscript + PIL)",
        "Clear all, Fill bucket (đơn giản: fill màu nền)"
      ]
    },
    {
      title: "LAB 4.1C: Quiz Application",
      difficulty: "⭐⭐⭐",
      duration: "90 phút",
      desc: "Ứng dụng thi trắc nghiệm",
      steps: [
        "Load câu hỏi từ JSON file (bộ 20 câu Python)",
        "Giao diện: số câu, câu hỏi, 4 lựa chọn (Radiobutton)",
        "Timer đếm ngược 60 giây/câu (sau khi hết tự next)",
        "Màu xanh/đỏ khi trả lời đúng/sai",
        "Progress bar hiển thị tiến độ",
        "Màn hình kết quả: điểm số, % đúng, thời gian",
        "Review: xem lại câu trả lời đúng/sai",
        "Lưu lịch sử bài thi vào SQLite"
      ]
    }
  ],
  "5-1": [
    {
      title: "LAB 5.1B: Dashboard COVID-19",
      difficulty: "⭐⭐⭐",
      duration: "90 phút",
      desc: "Visualize dữ liệu dịch bệnh thực tế",
      steps: [
        "Tạo/đọc dataset: ngày, ca mới, tử vong, hồi phục",
        "Plot 1: Line chart ca mới theo ngày + 7-day MA",
        "Plot 2: Stacked bar: active, recovered, deaths",
        "Plot 3: Scatter: ca vs tử vong với regression line",
        "Plot 4: Heatmap tuần × ngày trong tuần",
        "Annotation: đánh dấu ngày đỉnh dịch",
        "Lưu figure DPI=200 và HTML interactive"
      ]
    },
    {
      title: "LAB 5.1C: Phân tích chứng khoán",
      difficulty: "⭐⭐⭐⭐",
      duration: "120 phút",
      desc: "Technical analysis cho cổ phiếu",
      steps: [
        "Sinh data: Open, High, Low, Close, Volume cho 252 phiên",
        "Plot Candlestick chart (dùng mpl-finance hoặc tự vẽ Rectangle)",
        "Overlay: MA20, MA50, MA200",
        "RSI (Relative Strength Index) panel bên dưới",
        "Bollinger Bands (±2 std)",
        "Volume bar chart với màu theo giá tăng/giảm",
        "Đánh dấu Golden Cross (MA50 cắt MA200)"
      ]
    }
  ],
  "6-2": [
    {
      title: "LAB 6.2B: ETL Pipeline",
      difficulty: "⭐⭐⭐⭐",
      duration: "120 phút",
      desc: "Extract-Transform-Load data pipeline với Pandas",
      steps: [
        "Extract: đọc 3 nguồn (CSV, JSON, Excel giả lập)",
        "Transform: chuẩn hóa tên cột, kiểu dữ liệu",
        "Xử lý NaN: điền giá trị hoặc xóa theo chiến lược",
        "Remove duplicates, xử lý outliers (IQR method)",
        "Merge 3 bảng thành 1 DataFrame tổng hợp",
        "Tính các features mới (derived columns)",
        "Load: xuất sang CSV, JSON, summary report",
        "Log mỗi bước: số dòng trước/sau, số lỗi"
      ]
    },
    {
      title: "LAB 6.2C: Báo cáo tự động",
      difficulty: "⭐⭐⭐⭐",
      duration: "150 phút",
      desc: "Tự động tạo báo cáo HTML từ dữ liệu",
      steps: [
        "Đọc dữ liệu bán hàng từ CSV (1000 records)",
        "Pandas: tổng hợp theo tháng, danh mục, khu vực",
        "Matplotlib: tạo 4 biểu đồ lưu ra file PNG",
        "Jinja2 template: chèn data + biểu đồ vào HTML",
        "Highlight: tốt nhất (xanh), tệ nhất (đỏ)",
        "Thêm bảng pivot và sparkline mini",
        "Lưu file HTML tự chứa (embed base64 images)",
        "Schedule: tự chạy mỗi ngày (dùng schedule lib)"
      ]
    }
  ]
};

// ============================================================
// PRACTICE TESTS (Đề kiểm tra thực hành)
// ============================================================

export const practiceTests = [
  {
    id: "test-1",
    title: "Kiểm tra thực hành 1: Python Cơ Bản",
    duration: "90 phút",
    chapters: ["Chương 1"],
    problems: [
      {
        points: 2,
        title: "Bài 1: Số nguyên tố và hoàn hảo (2 điểm)",
        desc: `Viết chương trình:
a) Hàm is_prime(n): kiểm tra n có phải số nguyên tố
b) Hàm is_perfect(n): kiểm tra n có phải số hoàn hảo  
c) In tất cả số vừa nguyên tố vừa hoàn hảo trong [1..1000]
d) In 10 số nguyên tố đầu tiên dạng bảng 5 cột`
      },
      {
        points: 3,
        title: "Bài 2: Quản lý sinh viên (3 điểm)",
        desc: `Cho list các sinh viên (tên, mã, điểm toán, lý, hóa):
a) Tính điểm TB mỗi SV (trọng số bằng nhau)
b) Xếp loại: Xuất sắc(≥9), Giỏi(≥8), Khá(≥6.5), TB(≥5), Yếu(<5)
c) Sắp xếp theo điểm giảm dần
d) Thống kê: số SV mỗi loại, lớp TB, SV giỏi nhất`
      },
      {
        points: 3,
        title: "Bài 3: Đọc ghi file (3 điểm)",
        desc: `a) Đọc file input.txt chứa danh sách số nguyên (mỗi số 1 dòng)
b) Lọc số nguyên tố, số chẵn, số lẻ vào 3 list riêng
c) Ghi kết quả vào output.json dạng: {"prime":[...],"even":[...],"odd":[...]}
d) Đọc lại JSON, in thống kê: count, sum, mean cho từng nhóm`
      },
      {
        points: 2,
        title: "Bài 4: Dictionary và Set (2 điểm)",
        desc: `Cho 2 câu văn tiếng Anh:
a) Đếm tần suất từng từ (không phân biệt hoa thường, bỏ dấu câu)
b) Tìm từ xuất hiện trong cả 2 câu (intersection)
c) Từ chỉ xuất hiện trong câu 1 hoặc câu 2 (symmetric difference)
d) Top 5 từ phổ biến nhất (dùng Counter.most_common)`
      }
    ]
  },
  {
    id: "test-2",
    title: "Kiểm tra thực hành 2: OOP & CTDL",
    duration: "90 phút",
    chapters: ["Chương 2", "Chương 3"],
    problems: [
      {
        points: 4,
        title: "Bài 1: Thiết kế lớp (4 điểm)",
        desc: `Thiết kế hệ thống quản lý bãi đỗ xe:
a) Class Vehicle: biển số, loại xe (ô tô/xe máy), giờ vào
b) Class ParkingLot: sức chứa, dict {vị_trí: vehicle}
c) Method park(vehicle): tìm vị trí trống, ghi nhận giờ vào
d) Method leave(bien_so): tính tiền (ô tô: 5000đ/h, xe máy: 2000đ/h)
e) Method status(): in bảng trạng thái bãi xe
f) Xử lý exception khi bãi đầy hoặc xe không tồn tại`
      },
      {
        points: 3,
        title: "Bài 2: Stack & Queue ứng dụng (3 điểm)",
        desc: `a) Dùng Stack kiểm tra HTML tags cân bằng
   VD: "<div><p>Hello</p></div>" → Valid
       "<div><p>Hello</div></p>" → Invalid
b) Dùng Queue mô phỏng CPU scheduler (Round Robin, quantum=3)
   Input: list process (name, burst_time)
   Output: thứ tự thực thi, turnaround time mỗi process`
      },
      {
        points: 3,
        title: "Bài 3: Sắp xếp và Tìm kiếm (3 điểm)",
        desc: `Cho dataset 50 sinh viên {tên, điểm, tuổi}:
a) Implement Merge Sort sắp xếp theo điểm giảm dần
b) Binary Search tìm sinh viên theo tên (sau khi sort theo tên)
c) Interpolation Search tìm theo điểm
d) So sánh số lần so sánh giữa Linear Search và Binary Search`
      }
    ]
  },
  {
    id: "test-3",
    title: "Kiểm tra thực hành 3: Pandas & Matplotlib",
    duration: "90 phút",
    chapters: ["Chương 5", "Chương 6"],
    problems: [
      {
        points: 5,
        title: "Bài 1: Phân tích dữ liệu (5 điểm)",
        desc: `Cho file CSV "students.csv" (name, age, gender, math, physics, chemistry, english, programming):
a) Load và kiểm tra: shape, dtypes, null values, duplicates
b) Tính điểm TB có trọng số: [0.2, 0.2, 0.2, 0.2, 0.2]
c) GroupBy gender: điểm TB mỗi môn theo giới tính
d) Tìm 10 sinh viên điểm cao nhất, 5 sinh viên điểm thấp nhất
e) Phát hiện outlier (z-score > 3) theo từng môn
f) Correlation matrix giữa các môn học`
      },
      {
        points: 5,
        title: "Bài 2: Visualize (5 điểm)",
        desc: `Tạo figure 3×2 với 6 biểu đồ từ data bài 1:
a) Histogram phân bố điểm tổng (có đường KDE)
b) Box plot so sánh điểm các môn
c) Bar chart điểm TB theo giới tính (nhóm)
d) Scatter plot toán vs lập trình với regression line
e) Heatmap correlation matrix
f) Pie chart tỷ lệ xếp loại (A/B/C/D/F)
Yêu cầu: tiêu đề, nhãn trục, legend, màu sắc nhất quán`
      }
    ]
  }
];
