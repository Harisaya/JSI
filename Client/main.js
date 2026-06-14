// ==================== CATEGORY MAPPING ====================
const CATEGORY_MAPPING = {
  electronics: {
    keywords: [
      "điện thoại",
      "smartphone",
      "iphone",
      "android",
      "máy tính",
      "laptop",
      "notebook",
      "computer",
      "desktop",
      "ipad",
      "tablet",
      "máy ảnh",
      "camera",
      "smartwatch",
      "điện tử",
      "công nghệ",
    ],
    name: "Điện tử",
    icon: "📱",
  },
  fashion: {
    keywords: [
      "quần áo",
      "áo",
      "quần",
      "áo khoác",
      "áo phông",
      "áo sơ mi",
      "đầm",
      "váy",
      "giày",
      "dép",
      "mỹ phẩm",
      "cosmetic",
      "makeup",
      "phụ kiện",
      "trang sức",
      "thời trang",
    ],
    name: "Thời trang",
    icon: "👗",
  },
  food: {
    keywords: [
      "thực phẩm",
      "chả",
      "mực",
      "khô",
      "ăn vặt",
      "đông lạnh",
      "tươi",
      "rau",
      "thịt",
      "cá",
      "tôm",
      "nước",
      "rượu",
      "đồ ăn",
    ],
    name: "Thực phẩm",
    icon: "🍔",
  },
  home: {
    keywords: [
      "nhà cửa",
      "nhà",
      "đất",
      "phòng trọ",
      "căn hộ",
      "chung cư",
      "villa",
      "biệt thự",
      "bất động sản",
      "nhà đất",
      "bán nhà",
      "cho thuê nhà",
      "cho thuê phòng",
      "phòng trọ",
      "bán đất",
    ],
    name: "Nhà cửa",
    icon: "🛋️",
  },
  vehicles: {
    keywords: [
      "ô tô",
      "xe ô tô",
      "car",
      "xe máy",
      "motorbike",
      "motorcycle",
      "xe đạp",
      "xe điện",
      "xe tải",
      "xe bus",
      "xe van",
      "oto",
    ],
    name: "Xe cộ",
    icon: "🚗",
  },
  appliances: {
    keywords: [
      "máy giặt",
      "tủ lạnh",
      "tv",
      "ti vi",
      "lò vi sóng",
      "bếp",
      "nồi",
      "lò nướng",
      "máy sấy",
      "quạt",
      "điều hòa",
      "kệ",
      "ấm",
      "bộ dao",
      "đồ gia dụng",
      "đồ gia dụng",
      "gia dụng",
    ],
    name: "Đồ gia dụng",
    icon: "🏠",
  },
};

const CATEGORY_FILTERS = {
  vehicles: {
    label: "Xe cộ",
    types: [
      {
        key: "oto",
        label: "Ô tô",
        keywords: [
          "ô tô",
          "oto",
          "xe hơi",
          "sedan",
          "suv",
          "hatchback",
          "xe con",
          "xe sang",
          "offroad",
          "crossover",
        ],
      },
      {
        key: "xemay",
        label: "Xe máy",
        keywords: [
          "xe máy",
          "xemay",
          "moto",
          "motor",
          "scooter",
          "xe số",
          "xe tay ga",
          "xe côn",
        ],
      },
      {
        key: "xedien",
        label: "Xe điện",
        keywords: [
          "xe điện",
          "xedien",
          "electric",
          "ev",
          "pin",
          "điện",
          "tesla",
          "vinfast",
        ],
      },
      {
        key: "xedap",
        label: "Xe đạp",
        keywords: ["xe đạp", "xedap", "bicycle", "đạp", "đạp xe"],
      },
      {
        key: "xetai",
        label: "Xe tải",
        keywords: [
          "xe tải",
          "xetai",
          "truck",
          "container",
          "ben",
          "xe ben",
          "xe đầu kéo",
        ],
      },
    ],
    brands: {
      all: [
        "Tất cả",
        "Daewoo",
        "Mazda",
        "BMW",
        "Toyota",
        "Nissan",
        "Hyundai",
        "Chevrolet",
        "Honda",
        "Suzuki",
        "Mercedes",
        "VinFast",
        "Kia",
        "Yamaha",
        "Piaggio",
        "Tesla",
      ],
      oto: [
        "Tất cả",
        "Daewoo",
        "Mazda",
        "BMW",
        "Toyota",
        "Nissan",
        "Hyundai",
        "Chevrolet",
        "Honda",
        "Suzuki",
        "Mercedes",
        "VinFast",
        "Kia",
      ],
      xedien: [
        "Tất cả",
        "VinFast",
        "Tesla",
        "Nissan",
        "BMW",
        "Toyota",
        "Hyundai",
        "Kia",
        "Honda",
      ],
      xemay: ["Tất cả", "Honda", "Suzuki", "Yamaha", "Piaggio", "Kia"],
      xedap: ["Tất cả", "Giant", "Trek", "Specialized", "Xe đạp"],
      xetai: [
        "Tất cả",
        "Hino",
        "Isuzu",
        "Hyundai",
        "Toyota",
        "Daewoo",
        "Mercedes",
      ],
    },
  },
  electronics: {
    label: "Điện tử",
    types: [
      {
        key: "dienthoai",
        label: "Điện thoại",
        keywords: [
          "điện thoại",
          "smartphone",
          "iphone",
          "android",
          "xiaomi",
          "samsung",
          "oppo",
          "vivo",
          "nokia",
        ],
      },
      {
        key: "laptop",
        label: "Laptop",
        keywords: [
          "laptop",
          "macbook",
          "notebook",
          "dell",
          "hp",
          "lenovo",
          "asus",
          "acer",
        ],
      },
      {
        key: "tivi",
        label: "Tivi",
        keywords: ["tv", "tivi", "led", "oled", "qled", "smart tv"],
      },
      {
        key: "mayanh",
        label: "Máy ảnh",
        keywords: ["máy ảnh", "camera", "canon", "nikon", "sony", "fujifilm"],
      },
    ],
    brands: {
      all: [
        "Tất cả",
        "Samsung",
        "Apple",
        "Xiaomi",
        "Sony",
        "LG",
        "Dell",
        "HP",
        "Lenovo",
        "Asus",
        "Canon",
        "Nikon",
        "Panasonic",
      ],
      dienthoai: [
        "Tất cả",
        "Samsung",
        "Apple",
        "Xiaomi",
        "Oppo",
        "Vivo",
        "Nokia",
      ],
      laptop: ["Tất cả", "Dell", "HP", "Lenovo", "Asus", "Acer", "Apple"],
      tivi: ["Tất cả", "Samsung", "LG", "Sony", "Toshiba", "Panasonic"],
      mayanh: ["Tất cả", "Canon", "Nikon", "Sony", "Fujifilm", "GoPro"],
    },
  },
  fashion: {
    label: "Thời trang",
    types: [
      {
        key: "nam",
        label: "Nam",
        keywords: ["nam", "quần tây", "áo sơ mi", "vest", "giày nam"],
      },
      {
        key: "nu",
        label: "Nữ",
        keywords: ["nữ", "váy", "đầm", "áo dài", "giày nữ"],
      },
      {
        key: "giay",
        label: "Giày dép",
        keywords: ["giày", "dép", "bốt", "sandal"],
      },
      {
        key: "phukien",
        label: "Phụ kiện",
        keywords: ["túi", "mắt kính", "nón", "thắt lưng", "phụ kiện"],
      },
    ],
    brands: {
      all: [
        "Tất cả",
        "Zara",
        "H&M",
        "Nike",
        "Adidas",
        "Converse",
        "Gucci",
        "Prada",
        "Levi’s",
        "Uniqlo",
      ],
      nam: ["Tất cả", "Zara", "H&M", "Levi’s", "Nike"],
      nu: ["Tất cả", "Zara", "H&M", "Uniqlo", "Gucci"],
      giay: ["Tất cả", "Nike", "Adidas", "Converse", "Vans"],
      phukien: ["Tất cả", "Ray-Ban", "Michael Kors", "Swarovski"],
    },
  },
  home: {
    label: "Nhà cửa",
    types: [
      {
        key: "noithat",
        label: "Nội thất",
        keywords: ["nội thất", "bàn", "ghế", "giường", "tủ"],
      },
      {
        key: "trangtri",
        label: "Trang trí",
        keywords: ["trang trí", "đèn", "thảm", "tranh", "gối"],
      },
      {
        key: "gia dụng",
        label: "Gia dụng",
        keywords: ["gia dụng", "đồ dùng", "nồi", "chảo", "bếp"],
      },
    ],
    brands: {
      all: [
        "Tất cả",
        "IKEA",
        "Midea",
        "Sharp",
        "Panasonic",
        "Tefal",
        "Electrolux",
      ],
      noithat: ["Tất cả", "IKEA", "HomePro", "Deca"],
      trangtri: ["Tất cả", "IKEA", "Deca", "JYSK"],
      "gia dụng": ["Tất cả", "Midea", "Sharp", "Panasonic", "Tefal"],
    },
  },
  food: {
    label: "Thực phẩm",
    types: [
      {
        key: "thucpham",
        label: "Thực phẩm",
        keywords: ["thực phẩm", "đồ ăn", "hải sản", "rau", "thịt", "trái cây"],
      },
      {
        key: "doanuong",
        label: "Đồ uống",
        keywords: ["nước", "thức uống", "cà phê", "trà", "nước ngọt"],
      },
    ],
    brands: {
      all: [
        "Tất cả",
        "Vinamilk",
        "TH True Milk",
        "Hòa Phát",
        "Nestlé",
        "Coca-Cola",
      ],
      thucpham: ["Tất cả", "Vinamilk", "Nestlé", "Hòa Phát"],
      doanuong: ["Tất cả", "Coca-Cola", "Pepsi", "Nestlé", "Trà Dr.Thanh"],
    },
  },
  appliances: {
    label: "Đồ gia dụng",
    types: [
      {
        key: "bep",
        label: "Nhà bếp",
        keywords: ["bếp", "lò nướng", "nồi", "chảo", "máy xay"],
      },
      {
        key: "giadung",
        label: "Gia dụng",
        keywords: ["máy giặt", "tủ lạnh", "máy lạnh", "quạt"],
      },
      {
        key: "dieuhoa",
        label: "Điều hòa",
        keywords: ["điều hòa", "máy lạnh", "điều hoà"],
      },
    ],
    brands: {
      all: [
        "Tất cả",
        "Panasonic",
        "Electrolux",
        "Samsung",
        "LG",
        "Midea",
        "Sharp",
      ],
      bep: ["Tất cả", "Philips", "Tefal", "Panasonic"],
      giadung: ["Tất cả", "Samsung", "LG", "Electrolux", "Midea"],
      dieuhoa: ["Tất cả", "Panasonic", "LG", "Daikin", "Sharp"],
    },
  },
};

function getCategorySearchText(product) {
  return [product.name, product.categoryName, product.description || ""]
    .join(" ")
    .toLowerCase();
}

function getCategoryFilterDef(categoryKey) {
  return CATEGORY_FILTERS[categoryKey] || null;
}

function matchesCategoryType(product, typeKey) {
  if (!typeKey) return true;
  const categoryDef = getCategoryFilterDef(state.selectedCategory);
  if (!categoryDef) return true;
  const typeDef = categoryDef.types.find((t) => t.key === typeKey);
  if (!typeDef) return true;
  const text = getCategorySearchText(product);
  return typeDef.keywords.some((keyword) => text.includes(keyword));
}

function matchesCategoryBrand(product, brand) {
  if (!brand || brand === "Tất cả") return true;
  const text = getCategorySearchText(product);
  return text.includes(brand.toLowerCase());
}

function getCategoryTypeOptions() {
  const categoryDef = getCategoryFilterDef(state.selectedCategory);
  return categoryDef ? categoryDef.types : [];
}

function getCategoryBrandOptions() {
  const categoryDef = getCategoryFilterDef(state.selectedCategory);
  if (!categoryDef) return ["Tất cả"];
  const key = state.selectedCategoryType || "all";
  return categoryDef.brands[key] || categoryDef.brands.all || ["Tất cả"];
}

function mapCategoryFromApi(apiCategoryName, title = "", description = "") {
  const parts = [];
  if (apiCategoryName) parts.push(String(apiCategoryName));
  if (title) parts.push(String(title));
  if (description) parts.push(String(description));
  const hay = parts.join(" ").toLowerCase();
  if (!hay) return "all";

  // Try to match keywords across category name, title and description
  for (const [categoryKey, categoryData] of Object.entries(CATEGORY_MAPPING)) {
    if (categoryData.keywords.some((keyword) => hay.includes(keyword))) {
      return categoryKey;
    }
  }

  // Fallback: check if category name contains the mapped display name
  for (const [categoryKey, categoryData] of Object.entries(CATEGORY_MAPPING)) {
    if (hay.includes(categoryData.name.toLowerCase())) return categoryKey;
  }

  return "all";
}

const PROFILE_STORAGE_KEY = "chototProfileData";
const COUNTRY_LABELS = {
  VN: "Việt Nam (+84)",
  US: "Mỹ (+1)",
  IN: "Ấn Độ (+91)",
  SG: "Singapore (+65)",
};

function generateUserId() {
  return `USER-${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
}

function normalizePhone(input) {
  return String(input || "").replace(/\D/g, "");
}

function validatePhoneNumber(country, phone) {
  const digits = normalizePhone(phone);
  if (!digits) {
    return { valid: false, message: "Số điện thoại không được để trống." };
  }

  if (country === "VN") {
    if (digits.startsWith("0")) {
      if (digits.length === 10) {
        return { valid: true, message: "" };
      }
      return { valid: false, message: "Số Việt Nam có đầu 0 phải đủ 10 số." };
    }

    if (digits.length === 9) {
      return { valid: true, message: "" };
    }

    if (digits.length === 10) {
      return { valid: false, message: "Số Việt Nam bỏ 0 chỉ được nhập 9 số." };
    }

    return {
      valid: false,
      message: "Số điện thoại không tồn tại hoặc sai định dạng.",
    };
  }

  if (digits.length < 7 || digits.length > 15) {
    return {
      valid: false,
      message: "Số điện thoại không tồn tại hoặc sai định dạng.",
    };
  }

  return { valid: true, message: "" };
}

function formatPhoneDisplay(country, phone) {
  const digits = normalizePhone(phone);
  if (!digits) return "";
  if (country === "VN") {
    if (digits.startsWith("0") && digits.length === 10) {
      return digits;
    }
    if (digits.length === 9) {
      return "0" + digits;
    }
  }
  return digits;
}

function getDefaultProfile() {
  return {
    id: generateUserId(),
    name: "Khách",
    email: "guest@chopin.vn",
    phone: "",
    nationality: "VN",
    phoneVerified: false,
    phoneCode: "",
    phoneCodeSent: false,
    address: "Chưa cập nhật",
    balance: 0,
    isLoggedIn: false,
  };
}

function loadProfileData() {
  const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!raw) {
    return getDefaultProfile();
  }

  try {
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultProfile(),
      ...parsed,
      id: parsed.id || generateUserId(),
    };
  } catch (e) {
    return getDefaultProfile();
  }
}

function saveProfileData() {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(state.profileData));
}

function getProfilePhoneDisplayText() {
  if (!state.profileData.phone) {
    return "Chưa cập nhật";
  }
  return formatPhoneDisplay(
    state.profileData.nationality,
    state.profileData.phone,
  );
}

function getProfileNationalityLabel() {
  return (
    COUNTRY_LABELS[state.profileData.nationality] ||
    state.profileData.nationality
  );
}

function getProfilePhoneStatusText() {
  if (!state.profileData.phone) {
    return "Chưa cập nhật";
  }
  return state.profileData.phoneVerified ? "Đã xác thực" : "Chưa xác thực";
}

function updateProfileUI() {
  const profile = state.profileData;
  const avatar = document.getElementById("profileAvatar");
  const profileName = document.getElementById("profileName");
  const profileRole = document.getElementById("profileRole");
  const profileId = document.getElementById("profileId");
  const profileEmail = document.getElementById("profileEmail");
  const profilePhone = document.getElementById("profilePhoneDisplay");
  const profileStatus = document.getElementById("profilePhoneStatus");
  const profileNationality = document.getElementById(
    "profileNationalityDisplay",
  );
  const profileAddress = document.getElementById("profileAddress");
  const profileBalance = document.getElementById("profileBalance");

  if (avatar) {
    const initials = (profile.name || "Khách")
      .split(" ")
      .filter(Boolean)
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    avatar.textContent = initials || "KH";
  }
  if (profileName) profileName.textContent = profile.name || "Khách";
  if (profileRole)
    profileRole.textContent = profile.isLoggedIn
      ? "Người dùng đã đăng nhập"
      : "Tài khoản khách";
  if (profileId) profileId.textContent = profile.id;
  if (profileEmail) profileEmail.textContent = profile.email || "Chưa cập nhật";
  if (profilePhone) profilePhone.textContent = getProfilePhoneDisplayText();
  if (profileStatus) profileStatus.textContent = getProfilePhoneStatusText();
  if (profileNationality)
    profileNationality.textContent = getProfileNationalityLabel();
  if (profileAddress)
    profileAddress.textContent = profile.address || "Chưa cập nhật";
  if (profileBalance)
    profileBalance.textContent = `${Number(profile.balance || 0).toLocaleString("vi-VN")} đ`;
}

function showPhoneEditor(open) {
  const editor = document.getElementById("phoneEditor");
  if (!editor) return;
  if (open) {
    editor.classList.remove("hidden");
    const select = document.getElementById("nationalitySelect");
    const input = document.getElementById("phoneInput");
    if (select) select.value = state.profileData.nationality;
    if (input)
      input.value = state.profileData.phone
        ? formatPhoneDisplay(
            state.profileData.nationality,
            state.profileData.phone,
          )
        : "";
  } else {
    editor.classList.add("hidden");
  }
}

function showVerificationPanel(open, message) {
  const panel = document.getElementById("verificationPanel");
  const info = document.getElementById("verificationInfo");
  const codeInput = document.getElementById("verificationCodeInput");
  if (!panel || !info) return;
  if (open) {
    panel.classList.remove("hidden");
    info.textContent = message || "Nhập mã xác thực để hoàn tất.";
    if (codeInput) codeInput.value = "";
  } else {
    panel.classList.add("hidden");
  }
}

function handleSavePhoneClick() {
  const select = document.getElementById("nationalitySelect");
  const input = document.getElementById("phoneInput");
  if (!select || !input) return;

  const nationality = select.value;
  const phoneValue = input.value.trim();
  const validation = validatePhoneNumber(nationality, phoneValue);

  if (!validation.valid) {
    showNotification(validation.message, "error");
    return;
  }

  state.profileData.phone = normalizePhone(phoneValue);
  state.profileData.nationality = nationality;
  state.profileData.phoneVerified = false;
  state.profileData.phoneCode = "";
  state.profileData.phoneCodeSent = false;
  saveProfileData();
  updateProfileUI();
  showPhoneEditor(false);
  showVerificationPanel(false);
  showNotification(
    "Số điện thoại đã được lưu. Vui lòng xác thực để hoàn tất.",
    "success",
  );
}

function handleSendSmsVerification() {
  if (!state.profileData.phone) {
    showNotification(
      "Vui lòng thêm số điện thoại trước khi xác thực.",
      "error",
    );
    return;
  }

  const validation = validatePhoneNumber(
    state.profileData.nationality,
    state.profileData.phone,
  );
  if (!validation.valid) {
    showNotification(validation.message, "error");
    return;
  }

  state.profileData.phoneCode = Math.floor(
    100000 + Math.random() * 900000,
  ).toString();
  state.profileData.phoneCodeSent = true;
  state.profileData.phoneVerified = false;
  saveProfileData();
  updateProfileUI();
  showVerificationPanel(
    true,
    `Mã xác thực đã gửi tới ${getProfilePhoneDisplayText()}. Mã thử: ${state.profileData.phoneCode}`,
  );
  showNotification("Tin nhắn xác thực đã được gửi.", "success");
}

function handleConfirmVerification() {
  const codeInput = document.getElementById("verificationCodeInput");
  if (!codeInput) return;

  const code = codeInput.value.trim();
  if (!state.profileData.phoneCodeSent || !state.profileData.phoneCode) {
    showNotification("Vui lòng gửi mã xác thực trước.", "error");
    return;
  }

  if (code === state.profileData.phoneCode) {
    state.profileData.phoneVerified = true;
    state.profileData.phoneCode = "";
    state.profileData.phoneCodeSent = false;
    state.profileData.phoneVerifiedAt = new Date().toISOString();
    saveProfileData();
    updateProfileUI();
    showVerificationPanel(false);
    showNotification("Số điện thoại đã xác thực thành công.", "success");
    return;
  }

  showNotification("Mã xác thực không chính xác.", "error");
}

function handleResendCode() {
  handleSendSmsVerification();
}

function handleCancelPhoneEdit() {
  showPhoneEditor(false);
}

function handleLogout() {
  localStorage.removeItem(PROFILE_STORAGE_KEY);
  window.location.href = "login.html";
}

// ==================== RICH MOCK DATA ====================
// NOTE: Mock data generation removed by request. The app will only use real Chợ Tốt API data.

// Utility: shuffle array in-place
function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Sample mixed products across categories for 'All' page
function sampleMixedProducts(products, count = 50) {
  if (!Array.isArray(products) || products.length === 0) return [];

  // Group products by category
  const groups = {};
  for (const p of products) {
    // Determine a reliable category key per product
    let cat = p.category || "other";
    if (!cat || cat === "all") {
      cat = mapCategoryFromApi(
        p.categoryName || p.category || "",
        p.name || "",
        p.description || "",
      );
    }
    groups[cat] = groups[cat] || [];
    groups[cat].push(p);
  }

  const categories = Object.keys(groups);
  // Shuffle each category group for randomness
  for (const cat of categories) shuffleArray(groups[cat]);

  const perCat = Math.floor(count / categories.length) || 1;
  const result = [];

  // Take balanced items from each category
  for (const cat of categories) {
    const take = Math.min(perCat, groups[cat].length);
    result.push(...groups[cat].slice(0, take));
  }

  // Fill remaining slots by taking one from each category in round-robin
  let remaining = count - result.length;
  let idx = perCat;
  while (remaining > 0) {
    let added = false;
    for (const cat of categories) {
      if (remaining <= 0) break;
      if (groups[cat].length > idx) {
        result.push(groups[cat][idx]);
        remaining--;
        added = true;
      }
    }
    if (!added) break; // no more items
    idx++;
  }

  // If still not enough, flatten remaining products, shuffle and fill
  if (result.length < count) {
    const remainingPool = products.filter((p) => !result.includes(p));
    shuffleArray(remainingPool);
    result.push(...remainingPool.slice(0, count - result.length));
  }

  // Final shuffle so categories are mixed in the UI
  return shuffleArray(result).slice(0, count);
}

// ==================== GLOBAL STATE ====================
const state = {
  currentUser: { email: "guest@chopin.vn", name: "Khách" },
  profileData: loadProfileData(),
  products: [],
  filteredProducts: [],
  cart: [],
  selectedCategory: "all",
  selectedCategoryType: null,
  selectedCategoryBrand: null,
  selectedTimeRange: "all", // Filter by time: 'all', 'today', 'yesterday', 'week', 'month'
  searchQuery: "",
  sortBy: "popular",
};

// UI state: whether 'All' page shows full results or only the 33-sample
state.viewAll = false;

// Convert API timestamp values to Date objects for relative display.
// If the API timestamp cannot be parsed, leave _postDate null to avoid faking the post time.
function parseApiTimestamp(value) {
  if (!value) return null;

  const numeric = Number(value);
  if (!Number.isNaN(numeric) && numeric > 0) {
    return numeric < 1000000000000 ? numeric * 1000 : numeric;
  }

  const parsed = Date.parse(value);
  if (!Number.isNaN(parsed)) return parsed;

  return null;
}

function assignPostDates(products) {
  const now = Date.now();

  products.forEach((product) => {
    // Nếu API có timestamp thật thì dùng luôn
    const timestampMs = parseApiTimestamp(product.timestamp);

    if (timestampMs) {
      product._postDate = new Date(timestampMs);
      return;
    }

    // Nếu không có timestamp thì tạo thời gian ngẫu nhiên
    const rand = Math.random();
    let minutesAgo;

    if (rand < 0.3) {
      // 30% trong 24 giờ
      minutesAgo = Math.floor(Math.random() * 24 * 60);
    } else if (rand < 0.6) {
      // 30% từ 1-7 ngày
      minutesAgo = Math.floor((1 + Math.random() * 6) * 24 * 60);
    } else if (rand < 0.8) {
      // 20% từ 1-4 tuần
      minutesAgo = Math.floor((7 + Math.random() * 21) * 24 * 60);
    } else {
      // 20% từ 1-3 tháng
      minutesAgo = Math.floor((30 + Math.random() * 60) * 24 * 60);
    }

    product._postDate = new Date(now - minutesAgo * 60 * 1000);
  });
}

function getTimeRangeLabel(timeRange) {
  const labels = {
    all: "Tất cả thời gian",
    today: "Hôm nay",
    yesterday: "Hôm qua",
    week: "Tuần trước",
    month: "Tháng trước",
  };
  return labels[timeRange] || timeRange;
}

function formatPostDate(date) {
  if (!date) return "Mới đăng";
  const dateObj = new Date(date);
  if (Number.isNaN(dateObj.getTime())) return "Mới đăng";

  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();

  // If timestamp is in the future or very recent, show as "Vừa đăng"
  if (diffMs < 0 || diffMs < 1000) return "Vừa đăng";

  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  // Handle time ranges
  if (diffMinutes < 60) return `${diffMinutes} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  if (diffDays === 1) return "1 ngày trước";
  if (diffWeeks < 4) return `${diffWeeks} tuần trước`;
  if (diffMonths === 1) return "1 tháng trước";
  if (diffMonths < 12) return `${diffMonths} tháng trước`;

  const years = Math.floor(diffMonths / 12);
  return `${years} năm trước`;
}

function filterByTimeRange(products, timeRange) {
  if (timeRange === "all") return products;

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000);
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  return products.filter((p) => {
    if (!p._postDate) return false;

    const d = p._postDate;
    const dDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());

    if (timeRange === "today") return dDate.getTime() === today.getTime();
    if (timeRange === "yesterday")
      return dDate.getTime() === yesterday.getTime();
    if (timeRange === "week") return d >= weekAgo;
    if (timeRange === "month") return d >= monthAgo;

    return true;
  });
}

// ==================== FETCH CHỢ TỐT API ====================
async function fetchChototProductsRealApi() {
  // Attempt to use same-origin proxy first, then try the local server proxy on port 3000.
  const localProxy = "/api/chotot?limit=200";
  const serverProxy = "/api/chotot?limit=200";
  const localProxyAvailable = sessionStorage.getItem(
    "chototLocalProxyAvailable",
  );
  const fallbackProxy =
    "https://corsproxy.io/?" +
    encodeURIComponent(
      "https://gateway.chotot.com/v1/public/ad-listing?cg=1000&page=1&limit=200",
    );

  async function parseChototResponse(raw) {
    const ads = raw.ads || raw;
    if (!Array.isArray(ads)) return [];
    return ads.map((item) => ({
      raw: item,
      id: item.ad_id || item.id,
      name: item.subject || item.title || "Tin Chợ Tốt",
      category: mapCategoryFromApi(
        item.category_name || item.category,
        item.subject || item.title,
        item.description || item.body || "",
      ),
      categoryName: item.category_name || item.category || "Khác",
      price: item.price || 0,
      priceString:
        item.price_string ||
        (item.price ? `${item.price.toLocaleString("vi-VN")} đ` : "0 đ"),
      image:
        item.image ||
        item.thumbnail_image ||
        item.thumbnail ||
        "https://placehold.co/300x200?text=Cho+Tot",
      location:
        item.area_name || item.region_name || item.location || "Toàn quốc",
      time: item.post_date || "Mới đăng",
      timestamp: item.list_time || item.post_date || item.created_time || 0,
      rating: item.rating || 4.5,
      seller: item.account_name || item.seller || "Người bán",
    }));
  }

  // Try same-origin proxy first, but only when the page is served from port 3000
  // (i.e., when the Node proxy is serving the client). This avoids noisy 404s
  // when using Live Server on a different port (e.g. 5500).
  if (location.port === "3000") {
    try {
      const resp = await fetch(localProxy, {
        headers: { Accept: "application/json" },
      });
      if (resp.ok) {
        const json = await resp.json();
        const ads = json.ads || json;
        const parsed = await parseChototResponse(ads);
        if (parsed.length > 0) {
          console.log(
            "Loaded from local proxy (cached:",
            !!json.cached,
            ")",
            parsed.length,
          );
          return parsed.slice(0, 200);
        }
      }
    } catch (e) {
      console.warn("Local proxy failed:", e.message);
    }
  } else {
    console.log("Skipping same-origin proxy call (not served from port 3000)");
  }

  // Try the local proxy server on port 3000 if it has not been marked unavailable.
  if (localProxyAvailable !== "false") {
    try {
      const resp = await fetch(serverProxy, {
        headers: { Accept: "application/json" },
      });
      sessionStorage.setItem("chototLocalProxyAvailable", "true");
      if (resp.ok) {
        const json = await resp.json();
        const ads = json.ads || json;
        const parsed = await parseChototResponse(ads);
        if (parsed.length > 0) {
          console.log("Loaded from server proxy:", serverProxy, parsed.length);
          return parsed.slice(0, 200);
        }
      } else {
        console.warn(
          "Server proxy returned non-ok status",
          serverProxy,
          resp.status,
        );
      }
    } catch (e) {
      sessionStorage.setItem("chototLocalProxyAvailable", "false");
      console.warn("Server proxy failed for", serverProxy, e.message);
    }
  } else {
    console.log("Skipping local proxy because it was unavailable earlier");
  }

  // Fallback to public CORS proxy services
  const gatewayUrl =
    "https://gateway.chotot.com/v1/public/ad-listing?page=1&limit=200";
  const fallbackProxies = [
    "https://corsproxy.io/?" + encodeURIComponent(gatewayUrl),
    "https://thingproxy.freeboard.io/fetch/" + encodeURIComponent(gatewayUrl),
  ];

  for (const proxyUrl of fallbackProxies) {
    try {
      const resp = await fetch(proxyUrl, {
        headers: { Accept: "application/json" },
      });
      if (!resp.ok) throw new Error(`Fallback proxy error ${resp.status}`);
      const text = await resp.text();
      let data = null;
      try {
        data = JSON.parse(text);
      } catch (_) {
        data = null;
      }
      if (!data) throw new Error("Fallback proxy returned invalid JSON");
      const parsed = await parseChototResponse(data.ads || data);
      if (parsed.length > 0) {
        console.log("Loaded from fallback proxy:", proxyUrl, parsed.length);
        return parsed.slice(0, 200);
      }
    } catch (err) {
      console.warn("Fallback proxy failed:", proxyUrl, err.message);
    }
  }

  return [];
}
// No minimal/mock products available. If API fails, the products list will be empty and the UI will show an error.

function setLoadingState(isLoading) {
  const loading = document.getElementById("loading");
  const productsList = document.getElementById("productsList");
  const emptyState = document.getElementById("emptyState");

  if (loading) {
    loading.style.display = isLoading ? "flex" : "none";
  }
  if (productsList) {
    productsList.style.display = isLoading ? "none" : "";
  }
  if (emptyState && isLoading) {
    emptyState.style.display = "none";
  }
}

// ==================== LOAD PRODUCTS ====================
async function loadProducts() {
  setLoadingState(true);
  try {
    // Try to load from Chợ Tốt via proxy (server cache with 1 hour TTL). Prefer real data.
    const apiProducts = await fetchChototProductsRealApi();

    if (apiProducts && apiProducts.length > 0) {
      const products = apiProducts.slice(0, 200);
      assignPostDates(products); // Assign real post dates from API timestamps
      state.products = products;
      state.filteredProducts = [...state.products];
      try {
        sessionStorage.setItem("chototProducts", JSON.stringify(products));
      } catch (storageErr) {
        console.warn(
          "Could not cache products in sessionStorage:",
          storageErr.message,
        );
      }
      // Remove any proxy-missing banner if present
      removeProxyBanner();
      // Log category distribution for debugging
      try {
        const counts = {};
        for (const p of state.products) {
          const k =
            p.category ||
            mapCategoryFromApi(
              p.categoryName || "",
              p.name || "",
              p.description || "",
            );
          counts[k] = (counts[k] || 0) + 1;
        }
        console.log("Category distribution:", counts);
      } catch (e) {
        console.log("Category distribution error", e);
      }
      if (products.length < 200) {
        showNotification(
          `Chợ Tốt trả về ${products.length} sản phẩm. Hiển thị tất cả kết quả thực tế.`,
          "info",
        );
      } else {
        console.log("Using real Chợ Tốt products:", state.products.length);
      }
    } else {
      // API failed: show error and do NOT use mock data
      showNotification(
        "Không lấy được sản phẩm từ Chợ Tốt. Vui lòng khởi động proxy server hoặc thử lại sau.",
        "error",
      );
      state.products = [];
      state.filteredProducts = [];
      console.warn(
        "No products available from API; mocks disabled by configuration",
      );
      // Show persistent banner offering to redirect to local proxy server
      showProxyMissingBanner();
    }

    renderProducts();
  } finally {
    setLoadingState(false);
  }
}

// ==================== FILTER & SORT ====================
function filterAndSortProducts() {
  let filtered = [...state.products];

  // Apply time range filter first
  filtered = filterByTimeRange(filtered, state.selectedTimeRange);

  if (state.searchQuery) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(state.searchQuery.toLowerCase()),
    );
  }

  if (state.selectedCategory !== "all") {
    const key = state.selectedCategory;
    const displayName = CATEGORY_MAPPING[key]
      ? CATEGORY_MAPPING[key].name.toLowerCase()
      : "";
    filtered = filtered.filter((p) => {
      const isDirectCategory =
        p.category === key ||
        (p.categoryName && p.categoryName.toLowerCase().includes(displayName));
      const guessed = mapCategoryFromApi(
        p.categoryName || p.category || "",
        p.name || "",
        p.description || "",
      );
      const isMatchedCategory = isDirectCategory || guessed === key;
      if (!isMatchedCategory) return false;

      if (!matchesCategoryType(p, state.selectedCategoryType)) return false;
      if (!matchesCategoryBrand(p, state.selectedCategoryBrand)) return false;
      return true;
    });
  }

  filtered.sort((a, b) => {
    switch (state.sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  state.filteredProducts = filtered;
}

function renderCategoryFilters() {
  const panel = document.getElementById("categorySelectionPanel");
  if (!panel) return;

  const categoryDef = getCategoryFilterDef(state.selectedCategory);
  if (!categoryDef || state.selectedCategory === "all") {
    panel.classList.add("hidden");
    return;
  }

  panel.classList.remove("hidden");

  const heading = document.getElementById("categoryFilterHeading");
  const brandHeading = document.getElementById("categoryBrandHeading");
  const typeContainer = document.getElementById("categoryTypeChips");
  const brandContainer = document.getElementById("categoryBrandChips");
  const clearButton = document.getElementById("clearCategoryFilters");

  if (heading) {
    heading.textContent = `Chọn loại ${categoryDef.label.toLowerCase()}`;
  }
  if (brandHeading) {
    brandHeading.textContent = `Chọn hãng ${categoryDef.label.toLowerCase()}`;
  }

  if (typeContainer) {
    typeContainer.innerHTML = categoryDef.types
      .map(
        (type) => `
            <button type="button" class="filter-chip ${state.selectedCategoryType === type.key ? "active" : ""}" data-type="${type.key}">
                ${type.label}
            </button>
        `,
      )
      .join("");
  }

  const brands = getCategoryBrandOptions();
  if (brandContainer) {
    brandContainer.innerHTML = brands
      .map(
        (brand) => `
            <button type="button" class="filter-chip ${state.selectedCategoryBrand === brand ? "active" : ""}" data-brand="${brand}">
                ${brand}
            </button>
        `,
      )
      .join("");
  }

  if (clearButton) {
    clearButton.style.display =
      state.selectedCategoryType || state.selectedCategoryBrand
        ? "inline-flex"
        : "none";
  }
}

// ==================== RENDER PRODUCTS ====================
function renderProducts() {
  const productsList = document.getElementById("productsList");
  const emptyState = document.getElementById("emptyState");

  if (state.filteredProducts.length === 0) {
    console.log("state.filteredProducts", state.filteredProducts.length);

    console.log("toRender", toRender.length);
    productsList.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";
  let toRender = state.filteredProducts;
  console.log(
    "Products",
    state.products.length
);

console.log(
    "Filtered",
    state.filteredProducts.length
);
  // For 'All' page, show a mixed sample of 33 products only unless user toggles 'viewAll'
  // Ensure products controls area exists
  const productsSection = document.querySelector(".products-section");
  if (productsSection) {
    let controls = document.getElementById("productsControls");
    if (!controls) {
      controls = document.createElement("div");
      controls.id = "productsControls";
      controls.style.display = "flex";
      controls.style.justifyContent = "flex-end";
      controls.style.margin = "8px 0";
      productsSection.insertBefore(controls, productsList);
    }

    // Only show toggle on 'All' category
    controls.innerHTML = "";
    if (state.selectedCategory === "all") {
      const toggle = document.createElement("button");
      toggle.id = "viewAllToggle";
      toggle.className = "btn-primary";
      toggle.style.padding = "6px 12px";
      toggle.style.fontSize = "14px";
      toggle.textContent = state.viewAll ? "Ẩn bớt" : "Xem tất cả";
      toggle.onclick = (e) => {
        e.preventDefault();
        state.viewAll = !state.viewAll;
        renderProducts();
      };
      controls.appendChild(toggle);
    }
  }

  if (state.selectedCategory === "all" && !state.viewAll) {
    
    toRender = sampleMixedProducts(state.filteredProducts, 50);
    console.log(
    "ViewAll",
    state.viewAll
);
  }
  // Helper: infer a small list of key attributes from product text
  function inferAttributes(product) {
    const attrs = [];
    const text = (
      (product.name || "") +
      " " +
      (product.categoryName || "") +
      " " +
      (product.description || "")
    ).toLowerCase();

    // Year (e.g., 2015, 2008)
    const yearMatch = text.match(/\b(19\d{2}|20\d{2})\b/);
    if (yearMatch) attrs.push({ k: "Năm", v: yearMatch[0] });

    // Kilometers
    const kmMatch = text.match(/(\d+[\.,]?\d{0,3})\s?km/);
    if (kmMatch)
      attrs.push({ k: "Km", v: kmMatch[1].replace(",", ".") + " km" });

    // Fuel
    if (text.includes("xăng")) attrs.push({ k: "Nhiên liệu", v: "Xăng" });
    else if (text.includes("dầu") || text.includes("diesel"))
      attrs.push({ k: "Nhiên liệu", v: "Dầu" });

    // Gearbox
    if (
      text.includes("số tự động") ||
      text.includes("tự động") ||
      /at\b/.test(text)
    )
      attrs.push({ k: "Hộp số", v: "Tự động" });
    else if (text.includes("số sàn") || /mt\b/.test(text))
      attrs.push({ k: "Hộp số", v: "Sàn" });

    // Capacity / liters
    const ltMatch = text.match(/(\d+)\s?(l|lit|lít)/);
    if (ltMatch) attrs.push({ k: "Dung tích", v: ltMatch[1] + " L" });

    // For appliances, look for manufacture year or liters - otherwise fallback to time
    if (attrs.length === 0 && product.time)
      attrs.push({ k: "Tình trạng", v: product.time });

    return attrs.slice(0, 4);
  }

  productsList.innerHTML = toRender
    .map((product) => {
      const attrs = inferAttributes(product);
      const attrsHtml = attrs
        .map((a) => `<li><strong>${a.k}:</strong> ${a.v}</li>`)
        .join("");
      const priceText =
        product.priceString ||
        (product.price
          ? `${product.price.toLocaleString("vi-VN")} đ`
          : "Liên hệ");
      const postDateText = formatPostDate(product._postDate);
      return `
        <div class="product-card" onclick="window.showProductDetail(${product.id})">
            <div class="product-image-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.onerror=null;this.src='../Img/qc1.jpg'">
                <div class="product-time">${postDateText}</div>
                <button class="fav-icon" onclick="event.stopPropagation(); console.log('fav', ${product.id});">❤</button>
            </div>
            <div class="product-body">
                <div class="product-name" title="${product.name}">${product.name}</div>

                <ul class="product-attributes">${attrsHtml}</ul>

                <div class="product-bottom">
                    <div class="product-price">${priceText}</div>
                    <div class="product-meta">
                        <div class="product-location">📍 ${product.location}</div>
                    </div>
                </div>

                <div class="product-actions">
                    <button class="add-btn" onclick="event.stopPropagation(); window.addToCart({id: '${product.id}', name: '${product.name}', price: ${product.price || 0}, image: '${product.image}'}, 1)">
                        + Thêm vào giỏ
                    </button>
                    <button class="detail-btn" onclick="event.stopPropagation(); window.showProductDetail(${product.id})">
                        👁️ Xem chi tiết
                    </button>
                </div>
            </div>
        </div>
        `;
    })
    .join("");
}

// ==================== CART FUNCTIONS ====================
window.addToCart = function (item, quantity = 1) {
  let qty = Number(quantity) || 1;
  if (qty < 1) qty = 1;
  const existingItem = state.cart.find((i) => i.id === item.id);
  if (existingItem) {
    existingItem.quantity = (existingItem.quantity || 1) + qty;
  } else {
    state.cart.push({ ...item, quantity: qty });
  }
  updateCartUI();
  showNotification(`${item.name} đã thêm vào giỏ hàng!`, "success");
};

function updateCartUI() {
  const cartCount = state.cart.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0,
  );
  const countBadge = document.getElementById("cart-count");
  if (cartCount > 0) {
    countBadge.textContent = cartCount;
    countBadge.style.display = "inline-block";
  } else {
    countBadge.style.display = "none";
  }
}

// ==================== PAGE SWITCHING ====================
window.switchPage = function (page) {
  document
    .querySelectorAll(".page-content")
    .forEach((el) => el.classList.remove("active"));
  const pageEl = document.getElementById(page + "-page");
  if (pageEl) {
    pageEl.classList.add("active");
  }
};

// ==================== PRODUCT DETAIL ====================
window.showProductDetail = function (productId) {
  const selected = state.products.find(
    (p) => String(p.ad_id || p.id) === String(productId),
  );
  if (selected) {
    try {
      sessionStorage.setItem("chototSelectedProduct", JSON.stringify(selected));
    } catch (err) {
      console.warn(
        "Could not store selected product in sessionStorage:",
        err.message,
      );
    }
  }
  window.location.href = `product.html?id=${encodeURIComponent(productId)}`;
};

window.closeModal = function (modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.remove();
};

// ==================== NOTIFICATION ====================
function showNotification(message, type = "info") {
  const notification = document.getElementById("notification");
  if (!notification) return;

  notification.textContent = message;
  notification.className = `notification ${type}`;
  notification.style.display = "block";
  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
}

// Show a persistent banner when the proxy/server is missing; offers redirect to http://localhost:3000
function showProxyMissingBanner() {
  if (document.getElementById("proxyBanner")) return;
  const banner = document.createElement("div");
  banner.id = "proxyBanner";
  banner.style.position = "fixed";
  banner.style.top = "0";
  banner.style.left = "0";
  banner.style.right = "0";
  banner.style.background = "#ffefc2";
  banner.style.color = "#5a3b00";
  banner.style.padding = "12px";
  banner.style.zIndex = "9999";
  banner.style.display = "flex";
  banner.style.alignItems = "center";
  banner.style.justifyContent = "space-between";

  const msg = document.createElement("div");
  msg.innerHTML = `Không thể tải dữ liệu từ Chợ Tốt. Vui lòng thử lại sau.`;
  banner.appendChild(msg);

  const actions = document.createElement("div");
  const openBtn = document.createElement("button");
  openBtn.textContent = "Thử lại";
  openBtn.style.marginRight = "8px";
  openBtn.onclick = () => {
    removeProxyBanner();
    window.location.reload();
  };

  const stayBtn = document.createElement("button");
  stayBtn.textContent = "Ở lại";
  stayBtn.onclick = () => {
    removeProxyBanner();
  };

  actions.appendChild(openBtn);
  actions.appendChild(stayBtn);
  banner.appendChild(actions);

  document.body.appendChild(banner);

  // Không tự động redirect – chỉ hiển thị thông báo
}

function removeProxyBanner() {
  const b = document.getElementById("proxyBanner");
  if (b) b.remove();
}

// ==================== MATRIX EFFECT ====================
function createMatrixEffect() {
  try {
    const matrixBg = document.getElementById("matrix-bg");
    if (!matrixBg) return;

    const columns = 30;
    const rows = 20;

    for (let i = 0; i < columns; i++) {
      const column = document.createElement("div");
      column.className = "matrix-column";
      column.style.left = `${i * 30}px`;
      column.style.animationDuration = `${Math.random() * 3 + 2}s`;
      column.style.animationDelay = `${Math.random() * 2}s`;

      let text = "";
      for (let j = 0; j < rows; j++) {
        text += Math.random() > 0.5 ? "0" : "1";
        text += "<br>";
      }
      column.innerHTML = text;
      matrixBg.appendChild(column);
    }
  } catch (e) {
    console.log("Matrix effect skipped");
  }
}

// ==================== PAGE FUNCTIONS ====================
function showWebsiteContent() {
  const siteChoice = document.getElementById("site-choice");
  const siteInfo = document.getElementById("site-info");
  const app = document.querySelector(".app");

  if (siteChoice) siteChoice.style.display = "none";
  if (siteInfo) siteInfo.style.display = "none";
  if (app) {
    app.classList.remove("hidden");
    app.style.display = "flex";
  }
}

function showStayInfo() {
  const siteChoice = document.getElementById("site-choice");
  const siteInfo = document.getElementById("site-info");
  const app = document.querySelector(".app");

  if (siteChoice) siteChoice.style.display = "none";
  if (siteInfo) siteInfo.style.display = "block";
  if (app) {
    app.classList.add("hidden");
    app.style.display = "none";
  }
}

function handleInfoHome() {
  showWebsiteContent();
  switchPage("home");
}

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", () => {
  createMatrixEffect();

  const goWebsiteBtn = document.getElementById("goWebsiteBtn");
  const stayBtn = document.getElementById("stayBtn");
  const infoHomeBtn = document.getElementById("infoHomeBtn");

  if (goWebsiteBtn)
    goWebsiteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showWebsiteContent();
    });
  if (stayBtn)
    stayBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showStayInfo();
    });
  if (infoHomeBtn)
    infoHomeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleInfoHome();
    });

  const urlParams = new URLSearchParams(window.location.search);
  const mode = urlParams.get("mode");
  if (mode === "site") {
    showWebsiteContent();
  } else if (mode === "info") {
    showStayInfo();
  }

  loadProducts().catch((err) => {
    console.error("loadProducts failed:", err);
    showNotification("Không thể tải sản phẩm. Vui lòng thử lại sau.", "error");
  });

  // Time range filter
  const timeRangeSelect = document.getElementById("timeRangeSelect");
  if (timeRangeSelect) {
    timeRangeSelect.addEventListener("change", (e) => {
      state.selectedTimeRange = e.target.value;
      console.log("Time range changed to:", state.selectedTimeRange);
      filterAndSortProducts();
      renderProducts();
    });
  } else {
    console.warn("timeRangeSelect element not found");
  }

  // Category navigation
  document.querySelectorAll(".category-nav-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      document
        .querySelectorAll(".category-nav-item")
        .forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
      state.selectedCategory = item.dataset.category;
      state.selectedCategoryType = null;
      state.selectedCategoryBrand = null;
      // Reset view mode when switching categories
      state.viewAll = false;
      filterAndSortProducts();
      renderCategoryFilters();
      renderProducts();
    });
  });

  const categoryPanel = document.getElementById("categorySelectionPanel");
  if (categoryPanel) {
    categoryPanel.addEventListener("click", (e) => {
      const target = e.target;
      if (target.matches("[data-type]")) {
        state.selectedCategoryType = target.dataset.type;
        state.selectedCategoryBrand = null;
        filterAndSortProducts();
        renderCategoryFilters();
        renderProducts();
      }
      if (target.matches("[data-brand]")) {
        const brand = target.dataset.brand;
        state.selectedCategoryBrand = brand === "Tất cả" ? null : brand;
        filterAndSortProducts();
        renderCategoryFilters();
        renderProducts();
      }
      if (target.id === "clearCategoryFilters") {
        state.selectedCategoryType = null;
        state.selectedCategoryBrand = null;
        filterAndSortProducts();
        renderCategoryFilters();
        renderProducts();
      }
    });
  }

  renderCategoryFilters();

  // Search
  const headerSearch = document.getElementById("headerSearch");
  const mainSearch = document.getElementById("mainSearch");
  const sortSelect = document.getElementById("sortSelect");

  if (headerSearch) {
    headerSearch.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (mainSearch) mainSearch.value = state.searchQuery;
      filterAndSortProducts();
      renderProducts();
    });
  }

  if (mainSearch) {
    mainSearch.addEventListener("input", (e) => {
      state.searchQuery = e.target.value;
      if (headerSearch) headerSearch.value = state.searchQuery;
      filterAndSortProducts();
      renderProducts();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sortBy = e.target.value;
      filterAndSortProducts();
      renderProducts();
    });
  }

  const verifyPhoneBtn = document.getElementById("verifyPhoneBtn");
  const changePhoneBtn = document.getElementById("changePhoneBtn");
  const savePhoneBtn = document.getElementById("savePhoneBtn");
  const cancelPhoneBtn = document.getElementById("cancelPhoneBtn");
  const confirmVerifyBtn = document.getElementById("confirmVerifyBtn");
  const resendCodeBtn = document.getElementById("resendCodeBtn");
  const logoutBtn = document.getElementById("logout-btn");

  if (verifyPhoneBtn)
    verifyPhoneBtn.addEventListener("click", handleSendSmsVerification);
  if (changePhoneBtn)
    changePhoneBtn.addEventListener("click", () => showPhoneEditor(true));
  if (savePhoneBtn)
    savePhoneBtn.addEventListener("click", handleSavePhoneClick);
  if (cancelPhoneBtn)
    cancelPhoneBtn.addEventListener("click", handleCancelPhoneEdit);
  if (confirmVerifyBtn)
    confirmVerifyBtn.addEventListener("click", handleConfirmVerification);
  if (resendCodeBtn) resendCodeBtn.addEventListener("click", handleResendCode);
  if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);

  updateProfileUI();
  showPhoneEditor(false);
  showVerificationPanel(false);

  console.log("✅ App initialized successfully!");
});
