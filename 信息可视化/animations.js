// 添加滚动动画
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    document.querySelectorAll('.chart-container, .tourism-card, .about-text, .city-stats').forEach(el => {
        observer.observe(el);
    });
});

// 添加滚动时的视差效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.parallax').forEach(element => {
        const speed = element.dataset.speed || 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// 添加图表动画
const animateCharts = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
};

const chartObserver = new IntersectionObserver(animateCharts, {
    threshold: 0.1
});

document.querySelectorAll('.chart-container').forEach(chart => {
    chart.style.transform = 'translateY(50px)';
    chart.style.opacity = '0';
    chart.style.transition = 'all 0.6s ease-out';
    chartObserver.observe(chart);
}); 