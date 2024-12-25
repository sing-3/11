document.addEventListener('DOMContentLoaded', () => {
    // 微信二维码显示控制
    const weixinLink = document.getElementById('weixinLink');
    const weixinQR = document.getElementById('weixinQR');
    
    if (weixinLink && weixinQR) {
        // 默认隐藏二维码
        weixinQR.style.display = 'none';
        
        // 点击微信图标显示/隐藏二维码
        weixinLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (weixinQR.style.display === 'none') {
                weixinQR.style.display = 'block';
                // 添加动画效果
                weixinQR.style.animation = 'fadeIn 0.3s ease-in-out';
            } else {
                weixinQR.style.display = 'none';
            }
        });
    }

    // 为所有社交链接添加点击效果
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function() {
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-3px)';
            }, 150);
        });
    });

    // 路线切换功能
    const routeTabs = document.querySelectorAll('.route-tab');
    const routePanels = document.querySelectorAll('.route-panel');
    const routeOverlay = document.querySelector('.route-overlay');

    // 显示路线面板
    function showRoutePanel(panel) {
        routeOverlay.style.display = 'block';
        panel.style.display = 'block';
        
        // 强制重排以触发动画
        void panel.offsetWidth;
        
        requestAnimationFrame(() => {
            routeOverlay.classList.add('active');
            panel.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // 隐藏所有路线面板
    function hideRoutePanels() {
        const activePanel = document.querySelector('.route-panel.active');
        if (activePanel) {
            routeOverlay.classList.remove('active');
            activePanel.classList.remove('active');
            
            // 等待动画完成后隐藏元素
            setTimeout(() => {
                routeOverlay.style.display = 'none';
                activePanel.style.display = 'none';
                document.body.style.overflow = '';
            }, 300); // 与 CSS 过渡时间匹配
        }
    }

    // 标签点击事件
    routeTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.stopPropagation();
            const targetPanel = document.querySelector(`.route-panel[data-days="${this.dataset.days}"]`);
            if (targetPanel) {
                // 添加点击反馈动画
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                    hideRoutePanels();
                    showRoutePanel(targetPanel);
                }, 150);
            }
        });
    });

    // 点击遮罩层关闭面板
    routeOverlay.addEventListener('click', hideRoutePanels);

    // 点击关闭按钮关闭面板
    document.querySelectorAll('.route-panel .close-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            hideRoutePanels();
        });
    });

    // 防止点击面板内容时关闭
    routePanels.forEach(panel => {
        panel.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // ESC键关闭面板
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hideRoutePanels();
        }
    });
}); 