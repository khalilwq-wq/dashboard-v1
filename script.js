document.addEventListener('DOMContentLoaded', () => {
    console.log("3D Interactive Dashboard Initialized!");

    // عناصر الواجهة الأساسية
    const wrapper = document.getElementById('dashboardWrapper');
    const rotateBtn = document.getElementById('rotate3dBtn');
    const settingsModal = document.getElementById('settingsModal');
    const openSettingsBtn = document.getElementById('openSettingsBtn');
    const userProfileBtn = document.getElementById('userProfileBtn');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');
    const saveSettingsBtn = document.getElementById('saveSettingsBtn');
    
    const inputName = document.getElementById('inputName');
    const inputColor = document.getElementById('inputColor');
    
    const userNameEl = document.getElementById('userName');
    const welcomeTitle = document.getElementById('welcomeTitle');
    const userAvatar = document.getElementById('userAvatar');
    
    const navItems = document.querySelectorAll('.nav-item');
    const pageContent = document.getElementById('pageContent');

    // الحالة الافتراضية للمستخدم (بدون اسم ثابت، تبدأ عامة)
    let currentUserName = "Guest User";
    userNameEl.textContent = currentUserName;
    welcomeTitle.textContent = `Welcome back, ${currentUserName}!`;
    userAvatar.textContent = "G";
    inputName.value = currentUserName;

    // 1. تدوير 360 درجة بأنيميشن ناعمة
    let isRotated = false;
    rotateBtn.addEventListener('click', () => {
        if (!isRotated) {
            wrapper.style.transform = 'rotateY(12deg) rotateX(8deg) scale(0.97)';
            rotateBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> Reset View';
            isRotated = true;
        } else {
            wrapper.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
            rotateBtn.innerHTML = '<i class="fa-solid fa-cube"></i> Rotate 360°';
            isRotated = false;
        }
    });

    // 2. إدارة فتح وإغلاق نافذة الإعدادات (Settings Modal)
    const toggleModal = (show) => {
        settingsModal.style.display = show ? 'flex' : 'none';
    };

    openSettingsBtn.addEventListener('click', () => toggleModal(true));
    userProfileBtn.addEventListener('click', () => toggleModal(true));
    closeSettingsBtn.addEventListener('click', () => toggleModal(false));

    // حفظ إعدادات المستخدم والثيم
    saveSettingsBtn.addEventListener('click', () => {
        const newName = inputName.value.trim();
        const newColor = inputColor.value;

        if (newName) {
            currentUserName = newName;
            userNameEl.textContent = currentUserName;
            welcomeTitle.textContent = `Welcome back, ${currentUserName}!`;
            const initials = currentUserName.split(' ').map(n => n[0]).join('').toUpperCase();
            userAvatar.textContent = initials;
        }

        // تطبيق لون الثيم الجديد
        document.documentElement.style.setProperty('--accent', newColor);
        document.documentElement.style.setProperty('--border-glass', newColor + '40');

        toggleModal(false);
    });

    // 3. التنقل بين الصفحات (Overview & Analytics) وتفعيل الأزرار
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            const page = item.getAttribute('data-page');

            if (page === 'analytics') {
                // عرض صفحة التحليلات مع أنيميشن
                pageContent.innerHTML = `
                    <div class="analytics-view">
                        <h2>Analytics Overview</h2>
                        <p style="color: var(--text-muted); font-size: 0.85rem;">Performance metrics for the current month.</p>
                        <div class="analytics-card">
                            <h3>Monthly Revenue Chart</h3>
                            <div class="analytics-bars">
                                <div class="bar-col" style="height: 40%;" title="Week 1"></div>
                                <div class="bar-col" style="height: 70%;" title="Week 2"></div>
                                <div class="bar-col" style="height: 55%;" title="Week 3"></div>
                                <div class="bar-col" style="height: 90%;" title="Week 4"></div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (page === 'overview') {
                // استرجاع محتوى الصفحة الرئيسية (Overview)
                location.reload(); 
            } else if (page === 'settings') {
                toggleModal(true);
            }
        });
    });

    // ربط زر Analytics في القائمة مباشرة
    document.getElementById('analyticsNavBtn').addEventListener('click', () => {
        document.querySelector('[data-page="analytics"]').click();
    });

    document.getElementById('settingsNavBtn').addEventListener('click', (e) => {
        e.preventDefault();
        toggleModal(true);
    });

    // 4. إضافة معاملة جديدة (Add Transaction) للجدول بفاعلية
    let orderCount = 9822;
    document.addEventListener('click', (e) => {
        if (e.target && (e.target.id === 'addRowBtn' || e.target.closest('#addRowBtn'))) {
            orderCount++;
            const clients = ['Walid S.', 'Fatima Z.', 'Karim B.', 'Nadia H.', 'Rachid M.'];
            const randomClient = clients[Math.floor(Math.random() * clients.length)];
            const randomAmount = (Math.random() * 400 + 60).toFixed(2);

            const tableBody = document.getElementById('tableBody');
            if (tableBody) {
                const newRow = document.createElement('tr');
                newRow.innerHTML = `
                    <td>#LC-${orderCount}</td>
                    <td>${randomClient}</td>
                    <td>$${randomAmount}</td>
                    <td><span class="status">Completed</span></td>
                `;
                tableBody.insertBefore(newRow, tableBody.firstChild);

                // تحديث عداد الطلبات تلقائياً
                const kpiOrders = document.getElementById('kpiOrders');
                if (kpiOrders) {
                    let currentOrders = parseInt(kpiOrders.textContent);
                    kpiOrders.textContent = currentOrders + 1;
                }
            }
        }
    });
});