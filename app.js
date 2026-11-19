(() => {
  'use strict';

  const IMG_ROUND = 'assets/rug-round-cream.jpg';
  const IMG_GEOMETRIC = 'assets/rug-geometric-cream.jpg';
  const IMG_BOTANICAL = 'assets/rug-botanical-dark.jpg';
  const DEFAULT_AVATAR = 'assets/shop-avatar.jpg';
  const DEFAULT_SHOP_NAME = 'Thảm Trải Sàn Cao Cấp Bảo Long';
  const IS_ADMIN_PAGE =
    document.body.dataset.page === 'admin' || window.location.pathname.endsWith('/admin.html');

  const STORAGE_KEYS = {
    shop: 'baolong_shop_v1',
    products: 'baolong_products_v1',
    cart: 'baolong_cart_v1',
    pixel: 'baolong_pixel_v1',
    adminAuth: 'baolong_admin_auth_v1',
    adminSession: 'baolong_admin_session_v1'
  };

  const DEFAULT_PRODUCTS = [
    {
      id: 'fes-tho-nhi-ky',
      name: 'Thảm trải sàn Fes dệt Thổ Nhĩ Kỳ',
      price: 4590000,
      category: 'turkish',
      image: IMG_GEOMETRIC,
      material: 'Sợi dệt Thổ Nhĩ Kỳ cao cấp',
      origin: 'Thổ Nhĩ Kỳ',
      thickness: '12 mm',
      warranty: '24 tháng',
      description:
        'Thảm dệt nổi họa tiết hình học tinh xảo, bề mặt êm ái, chống bám bụi và dễ dàng vệ sinh cho phòng khách hiện đại.',
      variants: [
        { label: '160 x 230 cm', image: IMG_GEOMETRIC, price: 4590000 },
        { label: '200 x 300 cm', image: IMG_GEOMETRIC, price: 6290000 },
        { label: '240 x 340 cm', image: IMG_ROUND, price: 8490000 },
        { label: 'Đặt theo yêu cầu', image: IMG_BOTANICAL, price: 4590000 }
      ]
    },
    {
      id: 'tencha-luxury-penthouse',
      name: 'Thảm lông cừu Penthouse Geometric',
      price: 51690000,
      category: 'luxury',
      image: IMG_GEOMETRIC,
      material: '100% Len lông cừu tự nhiên',
      origin: 'Bỉ / Thổ Nhĩ Kỳ',
      thickness: '16 mm',
      warranty: '36 tháng',
      description:
        'Phiên bản thảm khổ lớn dành cho căn hộ Penthouse và biệt thự, giữ nhiệt tốt và tạo điểm nhấn sang trọng.',
      variants: [
        { label: '200 x 300 cm', image: IMG_GEOMETRIC, price: 51690000 },
        { label: '240 x 340 cm', image: IMG_GEOMETRIC, price: 58900000 },
        { label: '300 x 400 cm', image: IMG_BOTANICAL, price: 69500000 },
        { label: 'Đặt theo yêu cầu', image: IMG_ROUND, price: 51690000 }
      ]
    },
    {
      id: 'athena-kem-tron',
      name: 'Thảm dệt cao cấp Athena Kem',
      price: 34990000,
      category: 'round',
      image: IMG_ROUND,
      material: 'Sợi Cotton & Viscose dệt tay',
      origin: 'Thổ Nhĩ Kỳ',
      thickness: '14 mm',
      warranty: '24 tháng',
      description:
        'Thiết kế bo tròn thanh lịch, tông màu kem ấm áp kết hợp hoàn hảo với sofa, bàn trà và ghế thư giãn.',
      variants: [
        { label: 'Đường kính 180 cm', image: IMG_ROUND, price: 34990000 },
        { label: 'Đường kính 220 cm', image: IMG_ROUND, price: 39900000 },
        { label: 'Đường kính 260 cm', image: IMG_GEOMETRIC, price: 44500000 },
        { label: 'Đặt theo yêu cầu', image: IMG_BOTANICAL, price: 34990000 }
      ]
    },
    {
      id: 'chic-nau-tho-nhi-ky',
      name: 'Thảm trải sàn Chic nâu dệt Thổ Nhĩ Kỳ',
      price: 4590000,
      category: 'turkish',
      image: IMG_BOTANICAL,
      material: 'Sợi Polypropylene & Viscose mật độ cao',
      origin: 'Thổ Nhĩ Kỳ',
      thickness: '11 mm',
      warranty: '24 tháng',
      description:
        'Họa tiết lá nhiệt đới ánh vàng đồng trên nền tối sang trọng, chống trượt và bền màu vượt thời gian.',
      variants: [
        { label: '160 x 230 cm', image: IMG_BOTANICAL, price: 4590000 },
        { label: '200 x 300 cm', image: IMG_BOTANICAL, price: 5990000 },
        { label: '240 x 340 cm', image: IMG_GEOMETRIC, price: 7890000 },
        { label: 'Đặt theo yêu cầu', image: IMG_ROUND, price: 4590000 }
      ]
    },
    {
      id: 'botanical-luxury-den-vang',
      name: 'Thảm Luxury Botanical Đen Vàng',
      price: 23190000,
      category: 'luxury',
      image: IMG_BOTANICAL,
      material: 'Sợi tơ Bamboo & Len dệt nổi',
      origin: 'Thổ Nhĩ Kỳ',
      thickness: '15 mm',
      warranty: '36 tháng',
      description:
        'Tác phẩm nghệ thuật dưới chân bạn với họa tiết thực vật ánh kim nổi bật trên nền đen huyền bí.',
      variants: [
        { label: '200 x 300 cm', image: IMG_BOTANICAL, price: 23190000 },
        { label: '240 x 340 cm', image: IMG_BOTANICAL, price: 28900000 },
        { label: '300 x 400 cm', image: IMG_GEOMETRIC, price: 36500000 },
        { label: 'Đặt theo yêu cầu', image: IMG_ROUND, price: 23190000 }
      ]
    },
    {
      id: 'nordic-round-woven',
      name: 'Thảm tròn dệt thủ công Nordic',
      price: 4590000,
      category: 'round',
      image: IMG_ROUND,
      material: 'Sợi dệt tự nhiên thân thiện môi trường',
      origin: 'Thổ Nhĩ Kỳ',
      thickness: '10 mm',
      warranty: '24 tháng',
      description:
        'Đường viền dệt chắc chắn, phong cách Bắc Âu tối giản giúp không gian đọc sách và phòng ngủ thêm ấm cúng.',
      variants: [
        { label: 'Đường kính 160 cm', image: IMG_ROUND, price: 4590000 },
        { label: 'Đường kính 200 cm', image: IMG_ROUND, price: 5890000 },
        { label: 'Đường kính 240 cm', image: IMG_GEOMETRIC, price: 7490000 },
        { label: 'Đặt theo yêu cầu', image: IMG_BOTANICAL, price: 4590000 }
      ]
    },
    {
      id: 'minimalist-cream-living',
      name: 'Thảm phòng khách Minimalist Kem',
      price: 4590000,
      category: 'turkish',
      image: IMG_GEOMETRIC,
      material: 'Sợi Microfiber mềm mịn',
      origin: 'Thổ Nhĩ Kỳ',
      thickness: '12 mm',
      warranty: '24 tháng',
      description:
        'Gam màu kem trung tính dễ phối với mọi kiểu nội thất từ Japandi, Minimalist đến Modern Luxury.',
      variants: [
        { label: '160 x 230 cm', image: IMG_GEOMETRIC, price: 4590000 },
        { label: '200 x 300 cm', image: IMG_GEOMETRIC, price: 6190000 },
        { label: '240 x 340 cm', image: IMG_ROUND, price: 8190000 },
        { label: 'Đặt theo yêu cầu', image: IMG_BOTANICAL, price: 4590000 }
      ]
    },
    {
      id: 'solis-botanical-grand',
      name: 'Thảm tròn đan sợi tự nhiên Solis',
      price: 23190000,
      category: 'round',
      image: IMG_ROUND,
      material: 'Len dệt mật độ cao',
      origin: 'Thổ Nhĩ Kỳ',
      thickness: '14 mm',
      warranty: '24 tháng',
      description:
        'Bề mặt đan nổi dày dặn, cách âm tốt và mang lại cảm giác êm ái tối đa khi di chuyển chân trần.',
      variants: [
        { label: 'Đường kính 180 cm', image: IMG_ROUND, price: 23190000 },
        { label: 'Đường kính 220 cm', image: IMG_ROUND, price: 27900000 },
        { label: 'Đường kính 260 cm', image: IMG_BOTANICAL, price: 33500000 },
        { label: 'Đặt theo yêu cầu', image: IMG_GEOMETRIC, price: 23190000 }
      ]
    }
  ];

  // State
  let shopConfig = loadShopConfig();
  let pixelConfig = loadPixelConfig();
  let products = loadProducts();
  let currentCategory = 'all';
  let searchQuery = '';
  let currentProductId = null;
  let selectedVariantIndex = 0;
  let cart = loadCart();
  let checkoutMode = 'cart'; // 'cart' | 'buy-now'
  let buyNowItem = null;
  let editingProductId = null;
  let editingVariants = [];
  let initializedPixelId = null;
  let searchPixelTimer = null;

  // DOM Elements
  const viewStorefront = document.getElementById('view-storefront');
  const viewDetail = document.getElementById('view-detail');
  const viewAdmin = document.getElementById('view-admin');
  const productGrid = document.getElementById('product-grid');
  const emptySearchState = document.getElementById('empty-search-state');

  const mobileHeader = document.getElementById('mobile-header');
  const mobileHeaderStore = document.getElementById('mobile-header-store');
  const mobileHeaderDetail = document.getElementById('mobile-header-detail');
  const mobileBottomChips = document.getElementById('mobile-bottom-chips');
  const mobileSearchBar = document.getElementById('mobile-search-bar');
  const mobileSearchInput = document.getElementById('mobile-search-input');
  const btnClearMobileSearch = document.getElementById('btn-clear-mobile-search');
  const desktopSearchInput = document.getElementById('desktop-search-input');

  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartTotalPrice = document.getElementById('cart-total-price');

  const checkoutBackdrop = document.getElementById('checkout-backdrop');
  const checkoutModal = document.getElementById('checkout-modal');
  const checkoutSummary = document.getElementById('checkout-summary');
  const checkoutForm = document.getElementById('checkout-form');

  const chatBackdrop = document.getElementById('chat-backdrop');
  const chatModal = document.getElementById('chat-modal');
  const chatMessages = document.getElementById('chat-messages');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');

  const toastEl = document.getElementById('toast');
  let toastTimer = null;

  // =========================================
  // Storage & Helpers
  // =========================================
  function loadShopConfig() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.shop);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          name: parsed.name || DEFAULT_SHOP_NAME,
          avatar: parsed.avatar || DEFAULT_AVATAR
        };
      }
    } catch {
      // ignore
    }
    return { name: DEFAULT_SHOP_NAME, avatar: DEFAULT_AVATAR };
  }

  function saveShopConfig() {
    try {
      localStorage.setItem(STORAGE_KEYS.shop, JSON.stringify(shopConfig));
    } catch {
      showToast('Ảnh quá lớn, không thể lưu vào bộ nhớ trình duyệt');
    }
    syncToServer();
  }

  function loadProducts() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.products);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
  }

  function saveProducts() {
    try {
      localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
    } catch {
      showToast('Dữ liệu ảnh quá lớn, vui lòng chọn ảnh nhẹ hơn');
    }
    syncToServer();
  }

  function loadCart() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.cart);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }

  // =========================================
  // Meta Pixel Integration
  // =========================================
  function loadPixelConfig() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.pixel);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          pixelId: String(parsed.pixelId || '').trim(),
          enabled: Boolean(parsed.enabled)
        };
      }
    } catch {
      // ignore
    }
    return { pixelId: '', enabled: true };
  }

  function savePixelConfig() {
    try {
      localStorage.setItem(STORAGE_KEYS.pixel, JSON.stringify(pixelConfig));
    } catch {
      // ignore
    }
    syncToServer();
  }

  function isHttpOrigin() {
    return window.location.protocol === 'http:' || window.location.protocol === 'https:';
  }

  async function syncToServer() {
    if (!isHttpOrigin() || typeof fetch !== 'function') return;
    try {
      await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shopConfig, products, pixelConfig })
      });
    } catch {
      // ignore when running on static-only server
    }
  }

  async function loadFromServer() {
    if (!isHttpOrigin() || typeof fetch !== 'function') return;
    try {
      const res = await fetch('/api/data', { cache: 'no-store' });
      if (!res.ok) return;
      const json = await res.json();
      if (json && json.ok && json.data) {
        const d = json.data;
        if (d.shopConfig) {
          shopConfig = {
            name: d.shopConfig.name || DEFAULT_SHOP_NAME,
            avatar: d.shopConfig.avatar || DEFAULT_AVATAR
          };
          localStorage.setItem(STORAGE_KEYS.shop, JSON.stringify(shopConfig));
        }
        if (Array.isArray(d.products) && d.products.length > 0) {
          products = d.products;
          localStorage.setItem(STORAGE_KEYS.products, JSON.stringify(products));
        }
        if (d.pixelConfig) {
          pixelConfig = {
            pixelId: String(d.pixelConfig.pixelId || '').trim(),
            enabled: Boolean(d.pixelConfig.enabled)
          };
          localStorage.setItem(STORAGE_KEYS.pixel, JSON.stringify(pixelConfig));
        }
      } else if (json && json.ok && json.data === null) {
        await syncToServer();
      }
    } catch {
      // ignore when running on static-only server
    }
  }

  function ensureFbqStub() {
    if (window.fbq) return;
    /* eslint-disable */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */
  }

  function initMetaPixel() {
    if (!pixelConfig.enabled || !pixelConfig.pixelId) return;
    if (initializedPixelId === pixelConfig.pixelId) return;
    ensureFbqStub();
    window.fbq('init', pixelConfig.pixelId);
    initializedPixelId = pixelConfig.pixelId;
  }

  function trackPixelEvent(eventName, params = {}) {
    if (!pixelConfig.enabled || !pixelConfig.pixelId) return;
    initMetaPixel();
    if (typeof window.fbq === 'function') {
      if (Object.keys(params).length > 0) {
        window.fbq('track', eventName, params);
      } else {
        window.fbq('track', eventName);
      }
    }
  }

  function syncShopBranding() {
    document.title = shopConfig.name;
    document.querySelectorAll('[data-shop-name]').forEach((el) => {
      el.textContent = shopConfig.name;
    });
    document.querySelectorAll('[data-shop-avatar]').forEach((img) => {
      img.src = shopConfig.avatar;
      img.alt = shopConfig.name;
    });
  }

  function formatVND(amount) {
    return Number(amount || 0).toLocaleString('vi-VN') + ' ₫';
  }

  function escapeHTML(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function readFileAsCompressedDataURL(file, maxSize = 720) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let { width, height } = img;
          if (width > maxSize || height > maxSize) {
            if (width >= height) {
              height = Math.round((height * maxSize) / width);
              width = maxSize;
            } else {
              width = Math.round((width * maxSize) / height);
              height = maxSize;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', 0.82));
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.remove('hidden');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.add('hidden');
    }, 2400);
  }

  function updateCartBadges() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const mobileBadge = document.getElementById('mobile-cart-badge');
    const mobileDetailBadge = document.getElementById('mobile-detail-cart-badge');
    const desktopBadge = document.getElementById('desktop-cart-badge');

    [mobileBadge, mobileDetailBadge].forEach((el) => {
      if (!el) return;
      el.textContent = totalCount;
      el.classList.toggle('hidden', totalCount === 0);
    });
    if (desktopBadge) {
      desktopBadge.textContent = totalCount;
    }
  }

  function addToCart(product, variantIdx) {
    const variant = (product.variants && product.variants[variantIdx]) || {
      label: 'Tiêu chuẩn',
      image: product.image,
      price: product.price
    };
    const key = `${product.id}__${variant.label}`;
    const existing = cart.find((i) => i.key === key);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        key,
        productId: product.id,
        name: product.name,
        size: variant.label,
        price: variant.price,
        image: variant.image || product.image,
        qty: 1
      });
    }
    saveCart();
    updateCartBadges();
    showToast('Đã thêm vào giỏ hàng');

    trackPixelEvent('AddToCart', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: Number(variant.price) || 0,
      currency: 'VND'
    });
  }

  // =========================================
  // Storefront Rendering
  // =========================================
  function getFilteredProducts() {
    return products.filter((p) => {
      const matchCat = currentCategory === 'all' || p.category === currentCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchSearch = !q || p.name.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }

  function createProductCardHTML(p) {
    return `
      <article class="product-card" data-product-id="${escapeHTML(p.id)}" tabindex="0" role="button" aria-label="Xem ${escapeHTML(p.name)}">
        <div class="product-card-img-wrap">
          <img class="product-card-img" src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" loading="lazy" />
        </div>
        <div class="product-card-body">
          <h4 class="product-card-title">${escapeHTML(p.name)}</h4>
          <p class="product-card-price">${formatVND(p.price)}</p>
        </div>
      </article>
    `;
  }

  function renderStorefront() {
    const items = getFilteredProducts();
    if (items.length === 0) {
      productGrid.innerHTML = '';
      emptySearchState.classList.remove('hidden');
    } else {
      emptySearchState.classList.add('hidden');
      productGrid.innerHTML = items.map(createProductCardHTML).join('');
    }
  }

  // =========================================
  // Product Detail Rendering
  // =========================================
  function renderDetail(productId) {
    const product = products.find((p) => p.id === productId);
    if (!product) {
      navigateToStorefront();
      return;
    }

    currentProductId = product.id;
    const variants =
      product.variants && product.variants.length > 0
        ? product.variants
        : [{ label: 'Tiêu chuẩn', image: product.image, price: product.price }];
    const variant = variants[selectedVariantIndex] || variants[0];
    const related = products.filter((p) => p.id !== product.id).slice(0, 4);

    trackPixelEvent('ViewContent', {
      content_ids: [product.id],
      content_name: product.name,
      content_type: 'product',
      value: Number(variant.price) || 0,
      currency: 'VND'
    });

    viewDetail.innerHTML = `
      <div class="detail-breadcrumb">
        <button type="button" id="btn-breadcrumb-home">Trang chủ</button>
        <span>/</span>
        <button type="button" id="btn-breadcrumb-all">Tất cả sản phẩm</button>
        <span>/</span>
        <span>${escapeHTML(product.name)}</span>
      </div>

      <div class="detail-layout">
        <div class="detail-gallery">
          <div class="detail-main-img-wrap">
            <img class="detail-main-img" id="detail-main-img" src="${escapeHTML(variant.image || product.image)}" alt="${escapeHTML(product.name)}" />
          </div>
        </div>

        <div class="detail-info">
          <h2 class="detail-title">${escapeHTML(product.name)}</h2>
          <p class="detail-price" id="detail-price">${formatVND(variant.price)}</p>

          <div class="detail-variant-header">
            <span>Mẫu mã</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
          <p class="detail-variant-subtitle">
            Cỡ: ${variants.length} lựa chọn
            <span class="detail-size-label" id="detail-size-label">(${escapeHTML(variant.label)})</span>
          </p>

          <div class="detail-swatches" id="detail-swatches">
            ${variants
              .map(
                (v, idx) => `
              <button
                type="button"
                class="swatch-btn ${idx === selectedVariantIndex ? 'active' : ''}"
                data-variant-idx="${idx}"
                title="${escapeHTML(v.label)}"
              >
                <img src="${escapeHTML(v.image || product.image)}" alt="${escapeHTML(v.label)}" />
              </button>
            `
              )
              .join('')}
          </div>

          <div class="detail-chips-row">
            <button type="button" class="question-chip detail-q-chip" data-question="Tôi muốn hỏi thêm về ${escapeHTML(product.name)}">
              <img class="shop-avatar shop-avatar-xs" src="${escapeHTML(shopConfig.avatar)}" alt="${escapeHTML(shopConfig.name)}" />
              <span>Đặt câu hỏi</span>
            </button>
            <button type="button" class="question-chip detail-q-chip" data-question="Tôi quan tâm mẫu ${escapeHTML(product.name)} cỡ ${escapeHTML(variant.label)}">
              <span>Quan tâm!</span>
            </button>
            <button type="button" class="question-chip detail-q-chip" data-question="Mặt hàng ${escapeHTML(product.name)} này còn sẵn không ạ?">
              <span>Mặt hàng này...</span>
            </button>
          </div>

          <p class="detail-disclaimer">
            Hệ thống sẽ chuyển hướng bạn đến trang web của bên thứ ba để thanh toán.
          </p>

          <div class="detail-cta-stack">
            <button type="button" class="btn-primary-blue btn-full" id="btn-detail-buy-now">Mua ngay</button>
            <button type="button" class="btn-secondary btn-full" id="btn-detail-add-cart">Thêm vào giỏ hàng</button>
          </div>

          <div class="detail-divider"></div>

          <div class="detail-store-section">
            <h3>Giới thiệu về cửa hàng này</h3>
            <div class="detail-store-card">
              <img class="shop-avatar shop-avatar-lg" src="${escapeHTML(shopConfig.avatar)}" alt="${escapeHTML(shopConfig.name)}" />
              <div>
                <strong>${escapeHTML(shopConfig.name)}</strong>
                <span>Thảm trải sàn &amp; Nội thất cao cấp</span>
              </div>
            </div>

            <div class="detail-specs">
              <h4>Thông tin chi tiết</h4>
              <div class="spec-list">
                <div class="spec-row">
                  <span class="spec-label">Chất liệu</span>
                  <span class="spec-val">${escapeHTML(product.material)}</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">Xuất xứ</span>
                  <span class="spec-val">${escapeHTML(product.origin)}</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">Độ dày</span>
                  <span class="spec-val">${escapeHTML(product.thickness)}</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">Bảo hành</span>
                  <span class="spec-val">${escapeHTML(product.warranty)}</span>
                </div>
              </div>
              <p style="margin-top: 10px; font-size: 13.5px; color: var(--text-secondary); line-height: 1.5;">
                ${escapeHTML(product.description)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="related-section">
        <h3>Sản phẩm tương tự</h3>
        <div class="related-grid">
          ${related.map(createProductCardHTML).join('')}
        </div>
      </div>
    `;

    const btnHome = document.getElementById('btn-breadcrumb-home');
    const btnAll = document.getElementById('btn-breadcrumb-all');
    if (btnHome) btnHome.addEventListener('click', navigateToStorefront);
    if (btnAll) btnAll.addEventListener('click', navigateToStorefront);

    document.querySelectorAll('#detail-swatches .swatch-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        selectedVariantIndex = Number(btn.dataset.variantIdx);
        const v = variants[selectedVariantIndex];
        document.getElementById('detail-main-img').src = v.image || product.image;
        document.getElementById('detail-price').textContent = formatVND(v.price);
        document.getElementById('detail-size-label').textContent = `(${v.label})`;
        document.querySelectorAll('#detail-swatches .swatch-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    document.getElementById('btn-detail-add-cart').addEventListener('click', () => {
      addToCart(product, selectedVariantIndex);
    });

    document.getElementById('btn-detail-buy-now').addEventListener('click', () => {
      const v = variants[selectedVariantIndex] || variants[0];
      openCheckout('buy-now', {
        productId: product.id,
        name: product.name,
        size: v.label,
        price: v.price,
        qty: 1
      });
    });

    document.querySelectorAll('.detail-q-chip').forEach((chip) => {
      chip.addEventListener('click', () => {
        openChat(chip.dataset.question);
      });
    });
  }

  // =========================================
  // Admin Auth & View
  // =========================================
  let failedLoginAttempts = 0;
  let loginLockUntil = 0;

  async function hashPassword(str) {
    if (window.crypto && window.crypto.subtle) {
      const data = new TextEncoder().encode(str);
      const digest = await window.crypto.subtle.digest('SHA-256', data);
      return Array.from(new Uint8Array(digest))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
    }
    let h = 2166136261;
    for (let i = 0; i < str.length; i += 1) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return 'fb_' + (h >>> 0).toString(16);
  }

  async function ensureAdminAuthConfig() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.adminAuth);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.user && parsed.passHash) return parsed;
      }
    } catch {
      // ignore
    }
    const defaultHash = await hashPassword('BaoLong@2026');
    const config = { user: 'admin', passHash: defaultHash };
    try {
      localStorage.setItem(STORAGE_KEYS.adminAuth, JSON.stringify(config));
    } catch {
      // ignore
    }
    return config;
  }

  function isAdminAuthenticated() {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.adminSession) === 'ok';
    } catch {
      return false;
    }
  }

  function setAdminAuthenticated(flag) {
    try {
      if (flag) {
        sessionStorage.setItem(STORAGE_KEYS.adminSession, 'ok');
      } else {
        sessionStorage.removeItem(STORAGE_KEYS.adminSession);
      }
    } catch {
      // ignore
    }
  }

  function renderAdminLogin() {
    viewAdmin.innerHTML = `
      <div class="admin-login-wrap">
        <div class="admin-login-card">
          <div class="admin-login-header">
            <img class="shop-avatar shop-avatar-lg" src="${escapeHTML(shopConfig.avatar)}" alt="${escapeHTML(shopConfig.name)}" />
            <h2>Đăng nhập Quản trị</h2>
            <p>${escapeHTML(shopConfig.name)}</p>
          </div>
          <div class="admin-error-msg hidden" id="admin-login-error"></div>
          <form id="admin-login-form">
            <div class="form-group">
              <label for="login-user">Tài khoản</label>
              <input type="text" id="login-user" required autocomplete="username" placeholder="Nhập tài khoản" />
            </div>
            <div class="form-group">
              <label for="login-pass">Mật khẩu</label>
              <input type="password" id="login-pass" required autocomplete="current-password" placeholder="Nhập mật khẩu" />
            </div>
            <button type="submit" class="btn-primary-blue btn-full" style="margin-top:6px;">Đăng nhập</button>
          </form>
          <div style="text-align:center;margin-top:16px;">
            <a href="index.html" style="font-size:13px;color:var(--text-secondary);text-decoration:none;">← Quay lại trang cửa hàng</a>
          </div>
        </div>
      </div>
    `;

    document.getElementById('admin-login-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const errEl = document.getElementById('admin-login-error');
      const now = Date.now();
      if (now < loginLockUntil) {
        const secs = Math.ceil((loginLockUntil - now) / 1000);
        errEl.textContent = `Bạn đã nhập sai quá nhiều lần. Vui lòng thử lại sau ${secs} giây.`;
        errEl.classList.remove('hidden');
        return;
      }

      const user = document.getElementById('login-user').value.trim();
      const pass = document.getElementById('login-pass').value;
      const auth = await ensureAdminAuthConfig();
      const passHash = await hashPassword(pass);

      if (user === auth.user && passHash === auth.passHash) {
        failedLoginAttempts = 0;
        setAdminAuthenticated(true);
        renderAdmin();
        showToast('Đăng nhập quản trị thành công');
      } else {
        failedLoginAttempts += 1;
        if (failedLoginAttempts >= 5) {
          loginLockUntil = Date.now() + 30000;
          failedLoginAttempts = 0;
          errEl.textContent = 'Nhập sai 5 lần liên tiếp. Tạm khóa đăng nhập 30 giây.';
        } else {
          errEl.textContent = `Sai tài khoản hoặc mật khẩu (còn ${5 - failedLoginAttempts} lần thử).`;
        }
        errEl.classList.remove('hidden');
      }
    });
  }

  function renderAdmin() {
    if (!isAdminAuthenticated()) {
      renderAdminLogin();
      return;
    }

    viewAdmin.innerHTML = `
      <div class="admin-header-bar">
        <h2>Quản trị cửa hàng</h2>
        <div class="admin-header-actions">
          <button type="button" class="btn-secondary admin-btn-sm" id="btn-admin-reset-all">Khôi phục mặc định</button>
          <button type="button" class="btn-danger-soft admin-btn-sm" id="btn-admin-logout">Đăng xuất</button>
          <a href="index.html" class="btn-primary-blue admin-btn-sm" style="text-decoration:none;">Xem trang Landing</a>
        </div>
      </div>

      <!-- Shop Branding & Avatar -->
      <div class="admin-card">
        <div class="admin-card-title">Thông tin &amp; Ảnh đại diện Shop</div>
        <div class="admin-shop-row">
          <div class="admin-avatar-box">
            <img class="admin-avatar-preview" id="admin-avatar-preview" src="${escapeHTML(shopConfig.avatar)}" alt="Avatar Shop" />
            <div>
              <strong style="font-size:14px;">Ảnh đại diện cửa hàng</strong>
              <div class="admin-file-actions">
                <label class="btn-secondary admin-btn-sm" style="cursor:pointer;">
                  Tải ảnh lên
                  <input type="file" id="admin-avatar-file" accept="image/*" class="hidden" />
                </label>
                <button type="button" class="btn-secondary admin-btn-sm" id="btn-admin-reset-avatar">Dùng ảnh gốc</button>
              </div>
            </div>
          </div>

          <div style="flex:1; max-width:460px;">
            <div class="form-group">
              <label for="admin-shop-name">Tên cửa hàng</label>
              <input type="text" id="admin-shop-name" value="${escapeHTML(shopConfig.name)}" />
            </div>
            <div class="form-group">
              <label for="admin-avatar-url">Hoặc dán link ảnh đại diện</label>
              <input type="text" id="admin-avatar-url" value="${escapeHTML(shopConfig.avatar.startsWith('data:') ? '' : shopConfig.avatar)}" placeholder="https://... hoặc assets/shop-avatar.jpg" />
            </div>
            <button type="button" class="btn-primary-blue admin-btn-sm" id="btn-admin-save-shop">Lưu thông tin Shop</button>
          </div>
        </div>
      </div>

      <!-- Product Editor (Hidden unless adding/editing) -->
      <div class="admin-card ${editingProductId === null ? 'hidden' : ''}" id="admin-editor-card"></div>

      <!-- Product List -->
      <div class="admin-card">
        <div class="admin-card-title">
          <span>Danh sách sản phẩm (${products.length})</span>
          <button type="button" class="btn-primary-blue admin-btn-sm" id="btn-admin-add-product">+ Thêm sản phẩm</button>
        </div>
        <div class="admin-product-list" id="admin-product-list">
          ${products
            .map(
              (p) => `
            <div class="admin-product-item">
              <img class="admin-product-thumb" src="${escapeHTML(p.image)}" alt="${escapeHTML(p.name)}" />
              <div class="admin-product-meta">
                <strong>${escapeHTML(p.name)}</strong>
                <span>${formatVND(p.price)} • ${(p.variants || []).length} cỡ</span>
              </div>
              <div class="admin-product-actions">
                <button type="button" class="btn-secondary admin-btn-sm" data-admin-edit="${escapeHTML(p.id)}">Sửa</button>
                <button type="button" class="btn-danger-soft admin-btn-sm" data-admin-delete="${escapeHTML(p.id)}">Xóa</button>
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- Meta Pixel Settings -->
      <div class="admin-card">
        <div class="admin-card-title">
          <span>Cài đặt Meta Pixel (Facebook Pixel)</span>
          <span style="font-size:12px;font-weight:600;color:${pixelConfig.enabled && pixelConfig.pixelId ? '#15803d' : 'var(--text-secondary)'};">
            ${pixelConfig.enabled && pixelConfig.pixelId ? '● Đang hoạt động' : '○ Chưa kích hoạt'}
          </span>
        </div>
        <form id="admin-pixel-form" class="admin-form-grid">
          <div class="form-group">
            <label for="admin-pixel-id">Meta Pixel ID</label>
            <input type="text" id="admin-pixel-id" value="${escapeHTML(pixelConfig.pixelId)}" placeholder="Ví dụ: 123456789012345" inputmode="numeric" />
          </div>
          <div class="form-group" style="display:flex;align-items:flex-end;padding-bottom:8px;">
            <label style="display:inline-flex;align-items:center;gap:8px;cursor:pointer;margin:0;">
              <input type="checkbox" id="admin-pixel-enabled" ${pixelConfig.enabled ? 'checked' : ''} style="width:18px;height:18px;" />
              <span>Bật theo dõi sự kiện Meta Pixel</span>
            </label>
          </div>
          <div class="form-group admin-form-full" style="margin-bottom:4px;">
            <p style="font-size:12.5px;color:var(--text-secondary);line-height:1.5;">
              Sự kiện tiêu chuẩn được tích hợp sẵn: <strong>PageView</strong>, <strong>ViewContent</strong> (xem chi tiết), <strong>Search</strong> (tìm kiếm), <strong>AddToCart</strong> (thêm giỏ), <strong>InitiateCheckout</strong> (bấm mua ngay), <strong>Purchase</strong> (hoàn tất đơn hàng), <strong>Contact</strong> (nhấn hỏi đáp).
            </p>
          </div>
          <div class="form-group admin-form-full" style="margin-bottom:0;">
            <button type="submit" class="btn-primary-blue admin-btn-sm">Lưu cài đặt Pixel</button>
          </div>
        </form>
      </div>

      <!-- Security / Change Password -->
      <div class="admin-card">
        <div class="admin-card-title">Bảo mật &amp; Đổi mật khẩu Admin</div>
        <form id="admin-password-form" class="admin-form-grid">
          <div class="form-group">
            <label for="sec-old-pass">Mật khẩu hiện tại *</label>
            <input type="password" id="sec-old-pass" required />
          </div>
          <div class="form-group">
            <label for="sec-new-pass">Mật khẩu mới (tối thiểu 6 ký tự) *</label>
            <input type="password" id="sec-new-pass" required minlength="6" />
          </div>
          <div class="form-group admin-form-full" style="margin-bottom:0;">
            <button type="submit" class="btn-secondary admin-btn-sm">Cập nhật mật khẩu</button>
          </div>
        </form>
      </div>
    `;

    // Bind Shop Settings events
    const avatarFileInput = document.getElementById('admin-avatar-file');
    const avatarUrlInput = document.getElementById('admin-avatar-url');
    const avatarPreview = document.getElementById('admin-avatar-preview');
    let pendingAvatar = shopConfig.avatar;

    avatarFileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        pendingAvatar = await readFileAsCompressedDataURL(file, 400);
        avatarPreview.src = pendingAvatar;
        avatarUrlInput.value = '';
        showToast('Đã chọn ảnh mới, bấm "Lưu thông tin Shop" để áp dụng');
      } catch {
        showToast('Không thể đọc tệp ảnh này');
      }
    });

    avatarUrlInput.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      if (val) {
        pendingAvatar = val;
        avatarPreview.src = val;
      }
    });

    document.getElementById('btn-admin-reset-avatar').addEventListener('click', () => {
      pendingAvatar = DEFAULT_AVATAR;
      avatarPreview.src = DEFAULT_AVATAR;
      avatarUrlInput.value = DEFAULT_AVATAR;
    });

    document.getElementById('btn-admin-save-shop').addEventListener('click', () => {
      const newName = document.getElementById('admin-shop-name').value.trim();
      if (!newName) {
        showToast('Vui lòng nhập tên cửa hàng');
        return;
      }
      shopConfig.name = newName;
      shopConfig.avatar = pendingAvatar || DEFAULT_AVATAR;
      saveShopConfig();
      syncShopBranding();
      showToast('Đã lưu thông tin & ảnh đại diện Shop');
    });

    document.getElementById('btn-admin-reset-all').addEventListener('click', () => {
      if (!window.confirm('Khôi phục toàn bộ sản phẩm và thông tin Shop về mặc định?')) return;
      localStorage.removeItem(STORAGE_KEYS.shop);
      localStorage.removeItem(STORAGE_KEYS.products);
      shopConfig = loadShopConfig();
      products = loadProducts();
      editingProductId = null;
      syncToServer();
      syncShopBranding();
      renderAdmin();
      showToast('Đã khôi phục dữ liệu mặc định');
    });

    document.getElementById('btn-admin-add-product').addEventListener('click', () => {
      openProductEditor(null);
    });

    document.querySelectorAll('[data-admin-edit]').forEach((btn) => {
      btn.addEventListener('click', () => {
        openProductEditor(btn.dataset.adminEdit);
      });
    });

    document.querySelectorAll('[data-admin-delete]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.adminDelete;
        const target = products.find((p) => p.id === id);
        if (!target) return;
        if (!window.confirm(`Xóa sản phẩm "${target.name}"?`)) return;
        products = products.filter((p) => p.id !== id);
        saveProducts();
        if (editingProductId === id) editingProductId = null;
        renderAdmin();
        showToast('Đã xóa sản phẩm');
      });
    });

    document.getElementById('btn-admin-logout').addEventListener('click', () => {
      setAdminAuthenticated(false);
      editingProductId = null;
      renderAdminLogin();
      showToast('Đã đăng xuất');
    });

    document.getElementById('admin-pixel-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const rawId = document.getElementById('admin-pixel-id').value.trim();
      const enabled = document.getElementById('admin-pixel-enabled').checked;
      if (rawId && !/^\d{5,25}$/.test(rawId)) {
        showToast('Pixel ID chỉ nên gồm các chữ số (5-25 số)');
        return;
      }
      pixelConfig = { pixelId: rawId, enabled };
      savePixelConfig();
      initializedPixelId = null;
      initMetaPixel();
      renderAdmin();
      showToast('Đã lưu cài đặt Meta Pixel');
    });

    document.getElementById('admin-password-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const oldPass = document.getElementById('sec-old-pass').value;
      const newPass = document.getElementById('sec-new-pass').value;
      const auth = await ensureAdminAuthConfig();
      const oldHash = await hashPassword(oldPass);
      if (oldHash !== auth.passHash) {
        showToast('Mật khẩu hiện tại không đúng');
        return;
      }
      if (newPass.length < 6) {
        showToast('Mật khẩu mới phải có ít nhất 6 ký tự');
        return;
      }
      auth.passHash = await hashPassword(newPass);
      localStorage.setItem(STORAGE_KEYS.adminAuth, JSON.stringify(auth));
      e.target.reset();
      showToast('Đã cập nhật mật khẩu Admin mới');
    });

    if (editingProductId !== null) {
      renderProductEditorForm();
    }
  }

  function openProductEditor(productId) {
    if (productId === null) {
      editingProductId = '__NEW__';
      editingVariants = [
        { label: '160 x 230 cm', image: IMG_GEOMETRIC, price: 4590000 },
        { label: '200 x 300 cm', image: IMG_GEOMETRIC, price: 6290000 }
      ];
    } else {
      const p = products.find((item) => item.id === productId);
      if (!p) return;
      editingProductId = p.id;
      editingVariants = JSON.parse(JSON.stringify(p.variants || []));
    }
    renderProductEditorForm();
    const card = document.getElementById('admin-editor-card');
    card.classList.remove('hidden');
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function renderProductEditorForm() {
    const card = document.getElementById('admin-editor-card');
    if (!card) return;
    const isNew = editingProductId === '__NEW__';
    const existing = isNew ? null : products.find((p) => p.id === editingProductId);

    const pData = existing || {
      name: '',
      price: 4590000,
      category: 'turkish',
      image: IMG_GEOMETRIC,
      material: 'Sợi dệt Thổ Nhĩ Kỳ cao cấp',
      origin: 'Thổ Nhĩ Kỳ',
      thickness: '12 mm',
      warranty: '24 tháng',
      description: ''
    };

    card.innerHTML = `
      <div class="admin-card-title">
        <span>${isNew ? 'Thêm sản phẩm mới' : 'Chỉnh sửa sản phẩm & chi tiết'}</span>
        <button type="button" class="btn-secondary admin-btn-sm" id="btn-editor-cancel">Đóng</button>
      </div>
      <form id="admin-product-form">
        <div class="admin-form-grid">
          <div class="form-group admin-form-full">
            <label>Tên sản phẩm *</label>
            <input type="text" id="ed-name" required value="${escapeHTML(pData.name)}" placeholder="Ví dụ: Thảm trải sàn Fes dệt Thổ Nhĩ Kỳ" />
          </div>
          <div class="form-group">
            <label>Giá hiển thị (VNĐ) *</label>
            <input type="number" id="ed-price" required min="0" step="1000" value="${Number(pData.price)}" />
          </div>
          <div class="form-group">
            <label>Danh mục</label>
            <select id="ed-category" style="width:100%;padding:10px 12px;border:1px solid #d1d5db;border-radius:8px;font-size:14px;">
              <option value="turkish" ${pData.category === 'turkish' ? 'selected' : ''}>Dệt Thổ Nhĩ Kỳ</option>
              <option value="round" ${pData.category === 'round' ? 'selected' : ''}>Thảm tròn</option>
              <option value="luxury" ${pData.category === 'luxury' ? 'selected' : ''}>Luxury</option>
            </select>
          </div>
          <div class="form-group admin-form-full">
            <label>Ảnh chính sản phẩm</label>
            <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
              <img id="ed-img-preview" src="${escapeHTML(pData.image)}" alt="Preview" style="width:64px;height:64px;object-fit:cover;border-radius:8px;border:1px solid var(--border);" />
              <div style="flex:1;min-width:200px;">
                <input type="text" id="ed-image" value="${escapeHTML(pData.image)}" placeholder="URL ảnh hoặc tải ảnh từ máy" />
                <div class="admin-file-actions">
                  <label class="btn-secondary admin-btn-sm" style="cursor:pointer;">
                    Chọn ảnh từ máy
                    <input type="file" id="ed-image-file" accept="image/*" class="hidden" />
                  </label>
                  <button type="button" class="btn-secondary admin-btn-sm" data-preset-img="${IMG_GEOMETRIC}">Mẫu Kem</button>
                  <button type="button" class="btn-secondary admin-btn-sm" data-preset-img="${IMG_ROUND}">Mẫu Tròn</button>
                  <button type="button" class="btn-secondary admin-btn-sm" data-preset-img="${IMG_BOTANICAL}">Mẫu Đen Vàng</button>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Chất liệu</label>
            <input type="text" id="ed-material" value="${escapeHTML(pData.material)}" />
          </div>
          <div class="form-group">
            <label>Xuất xứ</label>
            <input type="text" id="ed-origin" value="${escapeHTML(pData.origin)}" />
          </div>
          <div class="form-group">
            <label>Độ dày</label>
            <input type="text" id="ed-thickness" value="${escapeHTML(pData.thickness)}" />
          </div>
          <div class="form-group">
            <label>Bảo hành</label>
            <input type="text" id="ed-warranty" value="${escapeHTML(pData.warranty)}" />
          </div>
          <div class="form-group admin-form-full">
            <label>Mô tả chi tiết sản phẩm</label>
            <textarea id="ed-description" rows="3">${escapeHTML(pData.description)}</textarea>
          </div>
        </div>

        <div style="margin-top:12px;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
            <strong style="font-size:14px;">Các lựa chọn Cỡ / Mẫu mã (${editingVariants.length})</strong>
            <button type="button" class="btn-secondary admin-btn-sm" id="btn-add-variant">+ Thêm cỡ</button>
          </div>
          <div class="admin-variant-list" id="admin-variant-list">
            ${editingVariants
              .map(
                (v, idx) => `
              <div class="admin-variant-row" data-v-idx="${idx}">
                <img class="admin-variant-thumb" src="${escapeHTML(v.image || pData.image)}" alt="" />
                <input type="text" class="v-label" value="${escapeHTML(v.label)}" placeholder="Cỡ (vd: 160 x 230 cm)" style="padding:8px;border:1px solid #d1d5db;border-radius:6px;font-size:13px;" />
                <input type="number" class="v-price" value="${Number(v.price)}" min="0" step="1000" placeholder="Giá" style="padding:8px;border:1px solid #d1d5db;border-radius:6px;font-size:13px;" />
                <div style="display:flex;gap:6px;align-items:center;">
                  <input type="text" class="v-image" value="${escapeHTML(v.image)}" placeholder="Link ảnh cỡ" style="flex:1;padding:8px;border:1px solid #d1d5db;border-radius:6px;font-size:13px;" />
                  <label class="btn-secondary admin-btn-sm" style="cursor:pointer;height:32px;padding:0 8px;">
                    Ảnh
                    <input type="file" class="v-image-file hidden" accept="image/*" />
                  </label>
                </div>
                <button type="button" class="btn-danger-soft admin-btn-sm btn-remove-variant" style="height:32px;padding:0 10px;">Xóa</button>
              </div>
            `
              )
              .join('')}
          </div>
        </div>

        <div style="display:flex;gap:10px;margin-top:18px;">
          <button type="submit" class="btn-primary-blue">Lưu sản phẩm</button>
          <button type="button" class="btn-secondary" id="btn-editor-cancel-2">Hủy</button>
        </div>
      </form>
    `;

    const edImageInput = document.getElementById('ed-image');
    const edImgPreview = document.getElementById('ed-img-preview');

    edImageInput.addEventListener('input', (e) => {
      if (e.target.value.trim()) edImgPreview.src = e.target.value.trim();
    });

    document.getElementById('ed-image-file').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const dataUrl = await readFileAsCompressedDataURL(file, 720);
      edImageInput.value = dataUrl;
      edImgPreview.src = dataUrl;
    });

    card.querySelectorAll('[data-preset-img]').forEach((btn) => {
      btn.addEventListener('click', () => {
        edImageInput.value = btn.dataset.presetImg;
        edImgPreview.src = btn.dataset.presetImg;
      });
    });

    function syncVariantsFromDOM() {
      const rows = card.querySelectorAll('.admin-variant-row');
      editingVariants = Array.from(rows).map((row) => ({
        label: row.querySelector('.v-label').value.trim() || 'Tiêu chuẩn',
        price: Number(row.querySelector('.v-price').value) || 0,
        image: row.querySelector('.v-image').value.trim() || edImageInput.value.trim()
      }));
    }

    document.getElementById('btn-add-variant').addEventListener('click', () => {
      syncVariantsFromDOM();
      editingVariants.push({
        label: 'Kích thước mới',
        price: Number(document.getElementById('ed-price').value) || 4590000,
        image: edImageInput.value.trim() || IMG_GEOMETRIC
      });
      renderProductEditorForm();
    });

    card.querySelectorAll('.btn-remove-variant').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        syncVariantsFromDOM();
        const idx = Number(e.target.closest('.admin-variant-row').dataset.vIdx);
        editingVariants.splice(idx, 1);
        renderProductEditorForm();
      });
    });

    card.querySelectorAll('.v-image-file').forEach((input) => {
      input.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const row = e.target.closest('.admin-variant-row');
        const dataUrl = await readFileAsCompressedDataURL(file, 600);
        row.querySelector('.v-image').value = dataUrl;
        row.querySelector('.admin-variant-thumb').src = dataUrl;
      });
    });

    const closeEditor = () => {
      editingProductId = null;
      card.classList.add('hidden');
    };
    document.getElementById('btn-editor-cancel').addEventListener('click', closeEditor);
    document.getElementById('btn-editor-cancel-2').addEventListener('click', closeEditor);

    document.getElementById('admin-product-form').addEventListener('submit', (e) => {
      e.preventDefault();
      syncVariantsFromDOM();

      const payload = {
        id: isNew ? 'sp-' + Date.now() : editingProductId,
        name: document.getElementById('ed-name').value.trim(),
        price: Number(document.getElementById('ed-price').value) || 0,
        category: document.getElementById('ed-category').value,
        image: edImageInput.value.trim() || IMG_GEOMETRIC,
        material: document.getElementById('ed-material').value.trim(),
        origin: document.getElementById('ed-origin').value.trim(),
        thickness: document.getElementById('ed-thickness').value.trim(),
        warranty: document.getElementById('ed-warranty').value.trim(),
        description: document.getElementById('ed-description').value.trim(),
        variants: editingVariants
      };

      if (isNew) {
        products.unshift(payload);
      } else {
        const idx = products.findIndex((p) => p.id === editingProductId);
        if (idx !== -1) products[idx] = payload;
      }

      saveProducts();
      editingProductId = null;
      renderAdmin();
      showToast(isNew ? 'Đã thêm sản phẩm mới' : 'Đã cập nhật sản phẩm');
    });
  }

  // =========================================
  // Routing (Clean URLs without #)
  // =========================================
  function getProductIdFromURL() {
    return new URLSearchParams(window.location.search).get('product');
  }

  function syncRoute() {
    if (IS_ADMIN_PAGE) {
      renderAdmin();
      return;
    }

    const productId = getProductIdFromURL();

    if (productId) {
      selectedVariantIndex = 0;
      if (viewAdmin) viewAdmin.classList.add('hidden');
      viewStorefront.classList.add('hidden');
      viewDetail.classList.remove('hidden');
      mobileHeader.classList.remove('hidden');
      mobileHeaderStore.classList.add('hidden');
      mobileHeaderDetail.classList.remove('hidden');
      mobileSearchBar.classList.add('hidden');
      mobileBottomChips.classList.add('hidden');
      trackPixelEvent('PageView');
      renderDetail(productId);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      currentProductId = null;
      if (viewAdmin) viewAdmin.classList.add('hidden');
      viewDetail.classList.add('hidden');
      viewStorefront.classList.remove('hidden');
      mobileHeader.classList.remove('hidden');
      mobileHeaderDetail.classList.add('hidden');
      mobileHeaderStore.classList.remove('hidden');
      mobileBottomChips.classList.remove('hidden');
      trackPixelEvent('PageView');
      renderStorefront();
    }
  }

  function navigateToProduct(id) {
    const url = `?product=${encodeURIComponent(id)}`;
    window.history.pushState({ productId: id }, '', url);
    syncRoute();
  }

  function navigateToStorefront() {
    window.history.pushState({}, '', window.location.pathname);
    syncRoute();
  }

  if (!IS_ADMIN_PAGE) {
    window.addEventListener('popstate', syncRoute);

    const desktopBrandLink = document.getElementById('desktop-brand-link');
    if (desktopBrandLink) {
      desktopBrandLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToStorefront();
      });
    }

    document.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (card && card.dataset.productId) {
        navigateToProduct(card.dataset.productId);
      }
    });
  }

  // =========================================
  // Category Filters & Search
  // =========================================
  function setCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.filter-pill, .nav-link').forEach((el) => {
      el.classList.toggle('active', el.dataset.category === cat);
    });
    if (getProductIdFromURL()) {
      navigateToStorefront();
    } else {
      renderStorefront();
    }
  }

  function handleSearch(val) {
    searchQuery = val;
    if (btnClearMobileSearch) {
      btnClearMobileSearch.classList.toggle('hidden', !val);
    }
    clearTimeout(searchPixelTimer);
    if (val.trim().length >= 2) {
      searchPixelTimer = setTimeout(() => {
        trackPixelEvent('Search', { search_string: val.trim() });
      }, 600);
    }
    if (getProductIdFromURL()) {
      navigateToStorefront();
    } else {
      renderStorefront();
    }
  }

  if (!IS_ADMIN_PAGE) {
    document.querySelectorAll('.filter-pill, .nav-link').forEach((btn) => {
      btn.addEventListener('click', () => setCategory(btn.dataset.category));
    });

    document.getElementById('btn-mobile-search').addEventListener('click', () => {
      mobileSearchBar.classList.toggle('hidden');
      if (!mobileSearchBar.classList.contains('hidden')) {
        mobileSearchInput.focus();
      }
    });

    mobileSearchInput.addEventListener('input', (e) => {
      desktopSearchInput.value = e.target.value;
      handleSearch(e.target.value);
    });

    desktopSearchInput.addEventListener('input', (e) => {
      mobileSearchInput.value = e.target.value;
      handleSearch(e.target.value);
    });

    btnClearMobileSearch.addEventListener('click', () => {
      mobileSearchInput.value = '';
      desktopSearchInput.value = '';
      handleSearch('');
    });

    document.getElementById('btn-reset-filters').addEventListener('click', () => {
      mobileSearchInput.value = '';
      desktopSearchInput.value = '';
      searchQuery = '';
      setCategory('all');
    });

    document.getElementById('btn-mobile-back').addEventListener('click', () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        navigateToStorefront();
      }
    });

    document.getElementById('btn-mobile-share').addEventListener('click', async () => {
      try {
        if (navigator.share) {
          await navigator.share({ title: document.title, url: window.location.href });
        } else if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href);
          showToast('Đã sao chép liên kết sản phẩm');
        }
      } catch {
        showToast('Đã sao chép liên kết sản phẩm');
      }
    });
  }

  // =========================================
  // Cart Drawer
  // =========================================
  function renderCart() {
    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<p style="text-align:center;color:var(--text-secondary);padding:32px 0;">Giỏ hàng của bạn đang trống.</p>';
      cartTotalPrice.textContent = '0 ₫';
      document.getElementById('btn-checkout-cart').disabled = true;
      document.getElementById('btn-checkout-cart').style.opacity = '0.5';
      return;
    }

    document.getElementById('btn-checkout-cart').disabled = false;
    document.getElementById('btn-checkout-cart').style.opacity = '1';

    let total = 0;
    cartItemsContainer.innerHTML = cart
      .map((item) => {
        total += item.price * item.qty;
        return `
          <div class="cart-item">
            <img class="cart-item-img" src="${escapeHTML(item.image)}" alt="${escapeHTML(item.name)}" />
            <div class="cart-item-info">
              <div class="cart-item-title">${escapeHTML(item.name)}</div>
              <div class="cart-item-size">Cỡ: ${escapeHTML(item.size)}</div>
              <div class="cart-item-price">${formatVND(item.price)}</div>
              <div>
                <div class="qty-controls">
                  <button type="button" class="qty-btn" data-action="dec" data-key="${escapeHTML(item.key)}">-</button>
                  <span class="qty-val">${item.qty}</span>
                  <button type="button" class="qty-btn" data-action="inc" data-key="${escapeHTML(item.key)}">+</button>
                </div>
                <button type="button" class="btn-remove-item" data-action="remove" data-key="${escapeHTML(item.key)}">Xóa</button>
              </div>
            </div>
          </div>
        `;
      })
      .join('');

    cartTotalPrice.textContent = formatVND(total);
  }

  function openCart() {
    renderCart();
    cartBackdrop.classList.remove('hidden');
    cartDrawer.classList.remove('hidden');
  }

  function closeCart() {
    cartBackdrop.classList.add('hidden');
    cartDrawer.classList.add('hidden');
  }

  if (!IS_ADMIN_PAGE) {
    ['btn-mobile-cart', 'btn-mobile-detail-cart', 'btn-desktop-cart'].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('click', openCart);
    });

    document.getElementById('btn-close-cart').addEventListener('click', closeCart);
    cartBackdrop.addEventListener('click', closeCart);

    cartItemsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const key = btn.dataset.key;
      const action = btn.dataset.action;
      const idx = cart.findIndex((i) => i.key === key);
      if (idx === -1) return;

      if (action === 'inc') cart[idx].qty += 1;
      if (action === 'dec') {
        cart[idx].qty -= 1;
        if (cart[idx].qty <= 0) cart.splice(idx, 1);
      }
      if (action === 'remove') cart.splice(idx, 1);

      saveCart();
      updateCartBadges();
      renderCart();
    });

    document.getElementById('btn-checkout-cart').addEventListener('click', () => {
      if (cart.length === 0) return;
      closeCart();
      openCheckout('cart', null);
    });
  }

  // =========================================
  // Checkout Modal
  // =========================================
  function openCheckout(mode, item) {
    checkoutMode = mode;
    buyNowItem = item || null;
    if (mode === 'buy-now' && item) {
      checkoutSummary.innerHTML = `
        <strong>${escapeHTML(item.name)}</strong><br />
        <span>Cỡ: ${escapeHTML(item.size)} • Số lượng: 1</span><br />
        <strong style="color:var(--blue-primary);">Tổng: ${formatVND(item.price)}</strong>
      `;
      trackPixelEvent('InitiateCheckout', {
        content_ids: item.productId ? [item.productId] : [],
        content_type: 'product',
        num_items: 1,
        value: Number(item.price) || 0,
        currency: 'VND'
      });
    } else {
      const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
      const count = cart.reduce((s, i) => s + i.qty, 0);
      checkoutSummary.innerHTML = `
        <strong>Đơn hàng từ giỏ (${count} sản phẩm)</strong><br />
        <strong style="color:var(--blue-primary);">Tổng thanh toán: ${formatVND(total)}</strong>
      `;
      trackPixelEvent('InitiateCheckout', {
        content_ids: cart.map((i) => i.productId),
        content_type: 'product',
        num_items: count,
        value: total,
        currency: 'VND'
      });
    }
    checkoutBackdrop.classList.remove('hidden');
    checkoutModal.classList.remove('hidden');
  }

  function closeCheckout() {
    checkoutBackdrop.classList.add('hidden');
    checkoutModal.classList.add('hidden');
  }

  if (!IS_ADMIN_PAGE) {
    document.getElementById('btn-close-checkout').addEventListener('click', closeCheckout);
    checkoutBackdrop.addEventListener('click', closeCheckout);

    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cust-name').value.trim();

      if (checkoutMode === 'buy-now' && buyNowItem) {
        trackPixelEvent('Purchase', {
          content_ids: buyNowItem.productId ? [buyNowItem.productId] : [],
          content_type: 'product',
          num_items: 1,
          value: Number(buyNowItem.price) || 0,
          currency: 'VND'
        });
      } else {
        const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
        const count = cart.reduce((s, i) => s + i.qty, 0);
        trackPixelEvent('Purchase', {
          content_ids: cart.map((i) => i.productId),
          content_type: 'product',
          num_items: count,
          value: total,
          currency: 'VND'
        });
        cart = [];
        saveCart();
        updateCartBadges();
      }

      buyNowItem = null;
      checkoutForm.reset();
      closeCheckout();
      showToast(`Cảm ơn ${name}! ${shopConfig.name} đã nhận đơn hàng.`);
    });
  }

  // =========================================
  // Quick Question / Chat Modal
  // =========================================
  function appendChatBubble(text, sender) {
    const div = document.createElement('div');
    div.className = `chat-bubble ${sender}`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function openChat(prefillQuestion) {
    trackPixelEvent('Contact', { content_name: prefillQuestion || 'Hỗ trợ tư vấn' });
    chatMessages.innerHTML = '';
    appendChatBubble(
      `Xin chào! ${shopConfig.name} có thể hỗ trợ tư vấn kích thước, chất liệu hoặc đặt hàng cho bạn ạ.`,
      'bot'
    );
    if (prefillQuestion) {
      appendChatBubble(prefillQuestion, 'user');
      setTimeout(() => {
        appendChatBubble(
          "Cảm ơn bạn đã nhắn tin! Sản phẩm hiện đang có sẵn các kích thước tiêu chuẩn và hỗ trợ giao hàng toàn quốc. Bạn có thể để lại SĐT hoặc nhấn 'Mua ngay' để được ưu tiên xử lý nhé.",
          'bot'
        );
      }, 400);
    }
    chatBackdrop.classList.remove('hidden');
    chatModal.classList.remove('hidden');
  }

  function closeChat() {
    chatBackdrop.classList.add('hidden');
    chatModal.classList.add('hidden');
  }

  if (!IS_ADMIN_PAGE) {
    document.querySelectorAll('#mobile-bottom-chips .question-chip').forEach((chip) => {
      chip.addEventListener('click', () => openChat(chip.dataset.question));
    });

    const btnDesktopAsk = document.getElementById('btn-desktop-ask');
    if (btnDesktopAsk) {
      btnDesktopAsk.addEventListener('click', () => openChat(''));
    }

    document.getElementById('btn-close-chat').addEventListener('click', closeChat);
    chatBackdrop.addEventListener('click', closeChat);

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;
      appendChatBubble(text, 'user');
      chatInput.value = '';
      setTimeout(() => {
        appendChatBubble(
          `${shopConfig.name} đã ghi nhận câu hỏi của bạn. Tư vấn viên sẽ phản hồi qua Hotline 0900 123 456 trong ít phút!`,
          'bot'
        );
      }, 500);
    });
  }

  // Init
  async function bootstrap() {
    await loadFromServer();
    if (IS_ADMIN_PAGE) {
      renderAdmin();
    } else {
      initMetaPixel();
      syncShopBranding();
      updateCartBadges();
      syncRoute();
    }
  }

  bootstrap();
})();
