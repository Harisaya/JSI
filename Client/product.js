function getQueryParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

function getCachedProductById(productId) {
    try {
        const cached = sessionStorage.getItem('chototProducts');
        if (!cached) return null;
        const products = JSON.parse(cached);
        if (!Array.isArray(products)) return null;
        return products.find(product => {
            const id = String(product.ad_id || product.id || '');
            const rawId = product.raw ? String(product.raw.ad_id || product.raw.id || '') : '';
            return id === String(productId) || rawId === String(productId);
        }) || null;
    } catch (err) {
        console.warn('Could not read cached product from sessionStorage:', err.message);
        return null;
    }
}

function getCachedProducts() {
    try {
        const cached = sessionStorage.getItem('chototProducts');
        if (!cached) return [];
        const products = JSON.parse(cached);
        if (!Array.isArray(products)) return [];
        return products.map(product => product.raw || product).filter(Boolean);
    } catch (err) {
        console.warn('Could not read cached products from sessionStorage:', err.message);
        return [];
    }
}

function formatPrice(value) {
    if (value == null) return 'Liên hệ';
    if (typeof value === 'string' && value.trim()) return value;
    return value.toLocaleString('vi-VN') + ' đ';
}

function formatDate(timestamp) {
    if (!timestamp) return '-';
    const date = new Date(Number(timestamp));
    if (Number.isNaN(date.getTime())) return timestamp;
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatRelativeTime(timestamp) {
    if (!timestamp) return 'Mới đăng';
    
    // Convert to milliseconds if necessary
    let timeMs = Number(timestamp);
    if (timeMs === 0 || isNaN(timeMs)) return 'Mới đăng';
    
    if (timeMs < 1000000000000) {
        // Likely in seconds, convert to milliseconds
        timeMs = timeMs * 1000;
    }
    
    const date = new Date(timeMs);
    if (Number.isNaN(date.getTime())) return 'Mới đăng';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    // If timestamp is in the future or very recent, show as "Vừa đăng"
    if (diffMs < 0 || diffMs < 1000) return 'Vừa đăng';
    
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    
    // Handle time ranges
    if (diffMinutes < 60) return `${diffMinutes} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays === 1) return 'Hôm qua';
    if (diffDays < 7) return `${diffDays} ngày trước`;
    if (diffWeeks === 1) return '1 tuần trước';
    if (diffWeeks < 4) return `${diffWeeks} tuần trước`;
    if (diffMonths === 1) return '1 tháng trước';
    if (diffMonths < 12) return `${diffMonths} tháng trước`;
    
    const years = Math.floor(diffMonths / 12);
    return `${years} năm trước`;
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}

// Để chuỗi rỗng để dùng đường dẫn tương đối – hoạt động đúng trên Vercel
const API_PROXY_SERVER = '';

async function fetchChototApi(path) {
    const localUrl = path;
    const serverUrl = `${API_PROXY_SERVER}${path}`;
    const localProxyAvailable = sessionStorage.getItem('chototLocalProxyAvailable');

    if (location.port === '3000') {
        try {
            const localResp = await fetch(localUrl, { headers: { 'Accept': 'application/json' } });
            if (localResp.ok) return localResp;
        } catch (err) {
            console.warn('Local API fetch failed:', err.message);
        }
    }

    if (localProxyAvailable !== 'false') {
        try {
            const serverResp = await fetch(serverUrl, { headers: { 'Accept': 'application/json' } });
            sessionStorage.setItem('chototLocalProxyAvailable', 'true');
            if (serverResp.ok) return serverResp;
            console.warn('Server proxy returned non-ok status', serverUrl, serverResp.status);
        } catch (err) {
            sessionStorage.setItem('chototLocalProxyAvailable', 'false');
            console.warn('Server proxy failed for', serverUrl, err.message);
        }
    } else {
        console.log('Skipping local proxy because it was unavailable earlier');
    }

    const gatewayUrl = `https://gateway.chotot.com/v1/public/ad-listing?${path.split('?')[1] || ''}`;
    const fallbackProxies = [
        'https://corsproxy.io/?' + encodeURIComponent(gatewayUrl),
        'https://thingproxy.freeboard.io/fetch/' + encodeURIComponent(gatewayUrl)
    ];

    for (const proxyUrl of fallbackProxies) {
        try {
            const resp = await fetch(proxyUrl, { headers: { 'Accept': 'application/json' } });
            if (!resp.ok) {
                throw new Error(`Fallback proxy error ${resp.status}`);
            }
            const text = await resp.text();
            let data = null;
            try {
                data = JSON.parse(text);
            } catch (_) {
                data = null;
            }
            if (!data || typeof data !== 'object') {
                throw new Error('Fallback proxy returned invalid JSON');
            }
            return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
        } catch (err) {
            console.warn('Fallback proxy failed:', proxyUrl, err.message);
        }
    }

    throw new Error(`Không thể kết nối đến proxy server tại ${API_PROXY_SERVER}`);
}

function getImageUrls(product) {
    const urls = new Set();
    if (Array.isArray(product.images)) {
        for (const imageItem of product.images) {
            if (!imageItem) continue;
            if (typeof imageItem === 'string') {
                urls.add(imageItem);
            } else if (typeof imageItem === 'object') {
                const possible = imageItem.url || imageItem.path || imageItem.src || imageItem.image || imageItem.thumbnail || imageItem.original;
                if (possible) urls.add(possible);
            }
        }
    }
    [product.image, product.thumbnail_image, product.thumbnail, product.image_url, product.mediaUrl].forEach(value => {
        if (value) urls.add(value);
    });
    return Array.from(urls).filter(Boolean);
}

async function fetchProductDetail(id) {
    const resp = await fetchChototApi(`/api/chotot?adId=${encodeURIComponent(id)}`);
    if (!resp.ok) {
        throw new Error('Không thể lấy thông tin sản phẩm từ API');
    }
    const json = await resp.json();
    let product;
    if (Array.isArray(json.ads) && json.ads.length > 0) {
        product = json.ads[0];
    } else if (json.ad) {
        product = json.ad;
    } else if (json && typeof json === 'object' && (json.ad_id || json.id)) {
        product = json;
    } else {
        throw new Error('Không tìm thấy sản phẩm');
    }
    console.log('API Product fields:', Object.keys(product).sort());
    console.log('Timestamp fields:', {
        list_time: product.list_time,
        post_date: product.post_date,
        createdTime: product.createdTime,
        createTime: product.createTime,
        published_time: product.published_time,
        listTime: product.listTime
    });
    return product;
}

function buildImageGallery(images, title) {
    if (!Array.isArray(images) || images.length === 0) {
        return `<div class="product-image-fallback">Không có ảnh</div>`;
    }

    const items = images.map((src, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img src="${escapeHtml(src)}" class="d-block w-100" alt="${escapeHtml(title)}" onerror="this.onerror=null;this.src='../Img/qc1.jpg'">
        </div>
    `).join('');

    const indicators = images.map((src, index) => `
        <button type="button" data-bs-target="#productImageCarousel" data-bs-slide-to="${index}" ${index === 0 ? 'class="active" aria-current="true"' : ''} aria-label="Ảnh ${index + 1}" style="background-image:url('${escapeHtml(src)}')"></button>
    `).join('');

    return `
        <div id="productImageCarousel" class="carousel slide product-image-carousel" data-bs-ride="carousel">
            <div class="carousel-indicators">
                ${indicators}
            </div>
            <div class="carousel-inner">
                ${items}
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#productImageCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#productImageCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    `;
}

function renderProductDetail(product) {
    const root = document.getElementById('productDetailRoot');
    if (!root) return;

    // Get the actual timestamp field - try multiple field names
    const timestamp = product.list_time || product.post_date || product.createdTime || product.createTime || product.published_time || product.listTime;
    
    const images = getImageUrls(product);
    const title = product.subject || product.body || product.title || 'Sản phẩm Chợ Tốt';
    const price = product.price_string || formatPrice(product.price);
    const salePrice = product.price ? formatPrice(product.price) : (product.price_string || 'Liên hệ');
    const location = [product.ward_name, product.area_name, product.region_name].filter(Boolean).join(', ');
    const sellerName = product.account_name || product.full_name || (product.seller_info && product.seller_info.full_name) || 'Người bán';
    const sellerAds = product.seller_info && product.seller_info.live_ads ? product.seller_info.live_ads : '---';

    const detailRows = [
        { label: 'Danh mục', value: product.category_name || '-' },
        { label: 'Khu vực', value: location || product.location || '-' },
        { label: 'Đăng lúc', value: formatRelativeTime(timestamp) },
        { label: 'Trạng thái', value: product.status || '-' },
        { label: 'Diện tích', value: product.size ? `${product.size} ${product.size_unit_string || 'm²'}` : (product.living_size ? `${product.living_size} m²` : '-') },
        { label: 'Số phòng', value: product.rooms || '-' },
        { label: 'Số WC', value: product.toilets || '-' },
        { label: 'Số tầng', value: product.floors || '-' },
        { label: 'Loại nhà', value: product.house_type || '-' },
        { label: 'Giá', value: price }
    ];

    const infoRowHtml = detailRows.map(item => `
        <div class="detail-row">
            <span class="detail-label">${escapeHtml(item.label)}</span>
            <span class="detail-value">${escapeHtml(String(item.value))}</span>
        </div>
    `).join('');

    const description = escapeHtml(product.body || product.subject || 'Không có mô tả chi tiết.').replace(/\n/g, '<br>');

    const sellerAvatar = product.avatar || (product.seller_info && product.seller_info.avatar) || '';

    root.innerHTML = `
        <section class="product-detail-top">
            <div class="product-detail-grid">
                <div class="product-gallery">
                    ${buildImageGallery(images, title)}
                </div>
                <div class="product-summary-card">
                    <div class="product-summary-header">
                        <h1 class="product-title">${escapeHtml(title)}</h1>
                        <p class="product-subtitle">${escapeHtml(product.category_name || '')}</p>
                    </div>
                    <div class="product-price-block">
                        <div class="product-price">${escapeHtml(salePrice)}</div>
                        ${product.price ? `<div class="product-price-note">${escapeHtml(product.price_string || '')}</div>` : ''}
                    </div>
                    <div class="product-meta-row">
                        <div><span>📍</span> ${escapeHtml(location || 'Toàn quốc')}</div>
                        <div><span>🕒</span> ${escapeHtml(formatRelativeTime(timestamp))}</div>
                    </div>
                    <div class="product-actions-row">
                        <button class="btn-primary detail-action-btn" onclick="window.location.href='index.html'">Chat</button>
                        <button class="btn-secondary detail-action-btn">Hiện số</button>
                    </div>
                    <div class="seller-card">
                        <div class="seller-avatar">${sellerAvatar ? `<img src="${escapeHtml(sellerAvatar)}" alt="${escapeHtml(sellerName)}">` : '👤'}</div>
                        <div>
                            <div class="seller-name">${escapeHtml(sellerName)}</div>
                            <div class="seller-info">Tin đăng: ${escapeHtml(String(sellerAds))}</div>
                        </div>
                    </div>
                    <div class="product-quick-info">
                        <div><strong>Địa chỉ:</strong> ${escapeHtml(location || product.location || '---')}</div>
                        <div><strong>Loại:</strong> ${escapeHtml(product.type || '-')}</div>
                        <div><strong>Quận/Huyện:</strong> ${escapeHtml(product.area_name || '-')}</div>
                    </div>
                </div>
            </div>
        </section>

        <section class="product-detail-body">
            <div class="product-detail-left">
                <div class="product-section card-section">
                    <h2>Mô tả chi tiết</h2>
                    <p>${description}</p>
                </div>
                <div class="product-section card-section">
                    <h2>Thông số chi tiết</h2>
                    <div class="detail-grid">${infoRowHtml}</div>
                </div>
            </div>
            <aside class="product-detail-right">
                <div class="product-section card-section">
                    <h2>Thông tin liên hệ</h2>
                    <div class="contact-block">
                        <div><strong>Người đăng:</strong> ${escapeHtml(sellerName)}</div>
                        <div><strong>Số điện thoại:</strong> Ẩn</div>
                        <div><strong>Đã đăng:</strong> ${escapeHtml(formatRelativeTime(timestamp))}</div>
                    </div>
                </div>
                <div class="product-section card-section">
                    <h2>Vị trí</h2>
                    <div class="location-block">
                        <p>${escapeHtml(product.street_name || '')}</p>
                        <p>${escapeHtml(location)}</p>
                    </div>
                </div>
            </aside>
        </section>

        <section class="product-section card-section related-products-section">
            <h2>Gợi ý sản phẩm</h2>
            <div id="relatedProducts" class="related-products-grid">Đang tải gợi ý...</div>
        </section>
    `;
}

function renderRelatedProducts(products, currentId) {
    const container = document.getElementById('relatedProducts');
    if (!container) return;

    if (!Array.isArray(products) || products.length === 0) {
        container.innerHTML = '<div class="empty-related">Không có gợi ý phù hợp.</div>';
        return;
    }

    container.innerHTML = products.filter(item => (item.ad_id || item.id) != currentId).slice(0, 8).map(product => {
        const thumb = product.image || product.thumbnail_image || (product.images && product.images[0]) || '';
        const price = product.price_string || (product.price ? formatPrice(product.price) : 'Liên hệ');
        const title = product.subject || product.name || 'Tin đăng Chợ Tốt';

        return `
            <div class="related-card" onclick="window.location.href='product.html?id=${encodeURIComponent(product.ad_id || product.id)}'">
                <div class="related-image" style="background-image:url('${escapeHtml(thumb)}')"></div>
                <div class="related-info">
                    <div class="related-title">${escapeHtml(title)}</div>
                    <div class="related-price">${escapeHtml(price)}</div>
                    <div class="related-location">${escapeHtml(product.area_name || product.region_name || '')}</div>
                </div>
            </div>
        `;
    }).join('');
}

async function fetchRelatedProducts(categoryId, currentId) {
    if (!categoryId) return [];

    const cachedProducts = getCachedProducts();
    if (cachedProducts.length > 0) {
        return cachedProducts
            .filter(item => (item.ad_id || item.id) != currentId)
            .filter(item => {
                const itemCategory = item.category || item.category_name || item.categoryName || '';
                return String(itemCategory) === String(categoryId);
            })
            .slice(0, 12);
    }

    const resp = await fetchChototApi(`/api/chotot?cg=${encodeURIComponent(categoryId)}&limit=12`);
    if (!resp.ok) return [];
    const json = await resp.json();
    const ads = Array.isArray(json.ads) ? json.ads : (Array.isArray(json) ? json : []);
    return ads.filter(item => (item.ad_id || item.id) != currentId);
}

async function initProductPage() {
    const productId = getQueryParam('id');
    const root = document.getElementById('productDetailRoot');
    if (!productId) {
        if (root) root.innerHTML = '<div class="product-error">Không tìm thấy sản phẩm. Vui lòng quay lại trang trước.</div>';
        return;
    }

    try {
        let product = null;
        try {
            const selected = sessionStorage.getItem('chototSelectedProduct');
            if (selected) {
                const selectedProduct = JSON.parse(selected);
                if (selectedProduct && String(selectedProduct.ad_id || selectedProduct.id) === String(productId)) {
                    product = selectedProduct;
                    console.log('Loaded product detail from selected product cache for id', productId);
                }
            }
        } catch (err) {
            console.warn('Could not read selected product cache:', err.message);
        }

        if (!product) {
            product = getCachedProductById(productId);
            if (product) {
                console.log('Loaded product detail from cached list for id', productId);
            }
        }

        if (product) {
            if (product.raw) product = product.raw;
            renderProductDetail(product);
            const related = await fetchRelatedProducts(product.category || product.category_name || product.categoryName, product.ad_id || product.id || productId);
            renderRelatedProducts(related, product.ad_id || product.id || productId);
            return;
        }

        product = await fetchProductDetail(productId);
        renderProductDetail(product);
        const related = await fetchRelatedProducts(product.category || product.category_name || product.categoryName, product.ad_id || product.id || productId);
        renderRelatedProducts(related, product.ad_id || product.id || productId);
    } catch (err) {
        if (root) root.innerHTML = `<div class="product-error">Lỗi tải sản phẩm: ${escapeHtml(err.message)}</div>`;
    }
}

document.addEventListener('DOMContentLoaded', initProductPage);
