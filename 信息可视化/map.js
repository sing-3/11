// 确保地图容器有正确的高度
document.getElementById('map-container').style.height = '80vh';

// 初始化长沙市地图，设置中心点和缩放级别
const map = L.map('map-container').setView([28.193562, 112.975891], 14);

// 添加高德地图图层
L.tileLayer('https://webrd0{s}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}', {
    subdomains: ["1", "2", "3", "4"],
    attribution: '© 高德地图'
}).addTo(map);

// 定义不同类型的标注点
const landmarks = {
    景点: [
        {
            name: "岳麓山",
            coords: [28.177638, 112.931791],
            desc: "国家5A级旅游景区，是长沙三大名山之一。景区内包含：",
            details: [
                "爱晚亭 - 古代四大名亭之一，以杜甫《登岳阳楼》诗句闻名",
                "麓山寺 - 始建于东晋年间，千年古刹",
                "云麓宫 - 道教宫观，始建于东汉",
                "岳麓书院 - 千年学府，与白鹿洞书院等并称四大书院"
            ],
            images: ["yuelu-mountain.jpg"],
            openTime: "全天开放",
            ticket: "普通门票60元",
            tips: "建议游览时间：3-4小时"
        },
        {
            name: "橘子洲头",
            coords: [28.187345, 112.972336],
            desc: "湘江中的地标性景观，毛泽东诗词《沁园春·长沙》的创作地。特色景点：",
            details: [
                "青年毛泽东铜像 - 高度32米的大型铜像",
                "橘子洲音乐厅 - 现代化演出场所",
                "沙滩公园 - 适合休闲娱乐",
                "观景平台 - 欣赏长沙天际线的最佳位置"
            ],
            images: ["orange-isle.jpg"],
            openTime: "全天开放",
            ticket: "免费",
            tips: "建议傍晚前往，可以欣赏夜景"
        },
        {
            name: "世界之窗",
            coords: [28.176751, 112.986912],
            desc: "大型文化主题公园，集世界名建筑和各国文化于一体。主要景点：",
            details: [
                "埃菲尔铁塔 - 按1:3比例复制",
                "泰姬陵 - 印度建筑艺术代表",
                "悉尼歌剧院 - 世界现代建筑典范",
                "环球表演广场 - 各国特色表演"
            ],
            openTime: "09:00-21:30",
            ticket: "成人票248元",
            tips: "建议全天游览，节假日人流量大"
        },
        {
            name: "湖南省烈士公园",
            coords: [28.196873, 112.979246],
            desc: "长沙市区最大的综合性公园，革命纪念地。园内亮点：",
            details: [
                "烈士纪念塔 - 纪念革命先烈",
                "杜鹃花园 - 春季赏花胜地",
                "文化广场 - 市民休闲娱乐场所",
                "湖心亭 - 园内标志性建筑"
            ],
            openTime: "全天开放",
            ticket: "免费",
            tips: "清明节期间人流量大，建议错峰参观"
        }
    ],
    文化: [
        {
            name: "湖南省博物馆",
            coords: [28.195461, 112.987359],
            desc: "国家一级博物馆，馆藏文物丰富。主要展览：",
            details: [
                "马王堆汉墓陈列 - 展示西汉女性墓葬文物",
                "湖南人文历史陈列",
                "曾侯乙编钟复制品展示",
                "大型恐龙化石展"
            ],
            images: ["museum.jpg"],
            openTime: "周二至周日 9:00-17:00（16:00停止入场）",
            ticket: "免费（需要提前预约）",
            tips: "建议游览时间：2-3小时"
        },
        {
            name: "天心阁",
            coords: [28.190876, 112.972418],
            desc: "始建于明朝的古建筑，长沙市重要的历史文化景点。建筑特色：",
            details: [
                "五层木质结构 - 典型的明代建筑风格",
                "天心阁碑廊 - 收藏众多名人题词",
                "城市规划展览",
                "长沙历史文化展示"
            ],
            images: ["tianxin.jpg"],
            openTime: "8:30-17:30",
            ticket: "40元",
            tips: "登顶可俯瞰老城区风貌"
        },
        {
            name: "简牍博物馆",
            coords: [28.196983, 112.986826],
            desc: "全国首座简牍专题博物馆，展示长沙出土的珍贵简牍文物。展区：",
            details: [
                "走马楼简牍 - 三国时期长沙县衙档案",
                "简牍书写体验区 - 互动体验区",
                "简牍保护修复展示区",
                "临时特展区"
            ],
            openTime: "周二至周日 9:00-17:00",
            ticket: "免费（需要提前预约）",
            tips: "建议参观时间2小时，讲解员讲解精彩"
        },
        {
            name: "贾谊故居",
            coords: [28.191245, 112.972986],
            desc: "西汉著名文学家、政治家贾谊被贬长沙时的居所。景点特色：",
            details: [
                "贾谊祠堂 - 纪念贾谊的主体建筑",
                "古井 - 千年古迹",
                "文物陈列室 - 展示贾谊相关文物",
                "园林景观 - 典型的江南园林风格"
            ],
            openTime: "8:30-17:00",
            ticket: "20元",
            tips: "适合文史爱好者参观"
        }
    ],
    美食: [
        {
            name: "黄兴路步行街",
            coords: [28.193562, 112.975891],
            desc: "长沙最繁华的商业步行街，汇集各类特色美食。推荐美食：",
            details: [
                "文和友小龙虾 - 正宗长沙口味虾",
                "茶颜悦色 - 网红茶饮品牌",
                "臭豆腐 - 正宗长沙小吃",
                "糖油粑粑 - 传统特色小吃"
            ],
            images: ["food-street.jpg"],
            openTime: "全天营业（各店铺营业时间不同）",
            tips: "建议晚餐时间前往，人气美食需要提前排队"
        },
        {
            name: "坡子街",
            coords: [28.192456, 112.977234],
            desc: "长沙最古老的美食街之一，汇集传统小吃。特色美食：",
            details: [
                "长沙臭豆腐 - 正宗老字号",
                "火宫殿糖油粑粑 - 传统小吃",
                "刘记血粑鸭 - 地道湘味",
                "老长沙糖油糕 - 传统糕点"
            ],
            openTime: "全天营业",
            tips: "建议中午或傍晚前往，人气美食需排队"
        },
        {
            name: "太平街",
            coords: [28.192876, 112.976123],
            desc: "网红美食聚集地，新老长沙美食交融。推荐店铺：",
            details: [
                "文和友龙虾 - 网红小龙虾店",
                "茶颜悦色 - 网红茶饮",
                "湘西土匪猪脚 - 特色卤味",
                "长沙臭豆腐 - 传统小吃"
            ],
            openTime: "10:00-02:00",
            tips: "夜间人流量大，建议错峰用餐"
        }
    ],
    住宿: [
        {
            name: "五一商圈",
            coords: [28.194567, 112.978234],
            desc: "长沙主要商业区，住宿选择丰富。周边设施：",
            details: [
                "各类星级酒店",
                "地铁1、2号线交汇处",
                "平和堂、王府井等大型商场",
                "步行可达黄兴路步行街"
            ],
            tips: "交通便利，适合商务和旅游住宿"
        },
        {
            name: "解放西路商圈",
            coords: [28.191876, 112.969234],
            desc: "长沙传统商业区，交通便利。周边配套：",
            details: [
                "各类经济型连锁酒店",
                "地铁1号线沿线",
                "步行可达坡子街",
                "多条公交线路交汇"
            ],
            tips: "性价比高，适合预算有限的游客"
        },
        {
            name: "梅溪湖片区",
            coords: [28.219876, 112.892345],
            desc: "长沙新城区，环境优美。住宿特点：",
            details: [
                "高端酒店云集",
                "临近梅溪湖公园",
                "地铁2号线直达",
                "配套设施完善"
            ],
            tips: "适合商务出行和追求品质的游客"
        }
    ],
    交通: [
        {
            name: "长沙南站",
            coords: [28.137856, 113.056789],
            desc: "重要高铁枢纽，连接全国主要城市。交通信息：",
            details: [
                "可乘坐地铁2号线直达市区",
                "多条公交线路覆盖",
                "出租车站点设施完善",
                "站内设有商业区和餐饮区"
            ],
            tips: "建议提前1小时到达车站"
        },
        {
            name: "黄花国际机场",
            coords: [28.189756, 113.219876],
            desc: "湖南省最大的民用机场。交通方式：",
            details: [
                "磁浮列车 - 直达市区",
                "机场大巴 - 多条线路覆盖市区主要区域",
                "出租车 - 固定价格到市区",
                "网约车 - 设有专门上车点"
            ],
            tips: "国内航班提前2小时到达，国际航班提前3小时"
        },
        {
            name: "长沙火车站",
            coords: [28.196783, 113.011456],
            desc: "长沙市区重要交通枢纽。交通方式：",
            details: [
                "地铁2号线直达",
                "多条公交线路覆盖",
                "出租车站点完善",
                "站内设施齐全"
            ],
            tips: "老城区主要火车站，交通便利"
        },
        {
            name: "汽车西站",
            coords: [28.190234, 112.968567],
            desc: "长沙主要长途汽车站。站点信息：",
            details: [
                "覆盖湖南省内主要城市",
                "地铁1号线直达",
                "公交线路众多",
                "站内服务设施完善"
            ],
            tips: "前往省内各地市首选"
        }
    ]
};

// 创建不同类型的图标
const icons = {
    景点: L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-red.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    }),
    文化: L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-blue.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    }),
    美食: L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-gold.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    }),
    住宿: L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-green.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    }),
    交通: L.icon({
        iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-2x-violet.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34]
    })
};

// 添加标注点
Object.entries(landmarks).forEach(([type, points]) => {
    points.forEach(point => {
        const popupContent = `
            <div class="map-popup">
                <h3>${point.name}</h3>
                <p class="desc">${point.desc}</p>
                <div class="details">
                    <ul>
                        ${point.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                </div>
                ${point.openTime ? `<p class="open-time"><strong>开放时间：</strong>${point.openTime}</p>` : ''}
                ${point.ticket ? `<p class="ticket"><strong>门票：</strong>${point.ticket}</p>` : ''}
                ${point.tips ? `<p class="tips"><strong>小贴士：</strong>${point.tips}</p>` : ''}
                <div class="navigation-buttons">
                    <a href="https://uri.amap.com/navigation?to=${point.coords[1]},${point.coords[0]},${point.name}&mode=car&coordinate=gaode" 
                       target="_blank" 
                       class="nav-btn car-nav">
                        <i class="fas fa-car"></i> 驾车
                    </a>
                    <a href="https://uri.amap.com/navigation?to=${point.coords[1]},${point.coords[0]},${point.name}&mode=bus&coordinate=gaode" 
                       target="_blank" 
                       class="nav-btn bus-nav">
                        <i class="fas fa-bus"></i> 公交
                    </a>
                    <a href="https://uri.amap.com/navigation?to=${point.coords[1]},${point.coords[0]},${point.name}&mode=walk&coordinate=gaode" 
                       target="_blank" 
                       class="nav-btn walk-nav">
                        <i class="fas fa-walking"></i> 步行
                    </a>
                </div>
            </div>
        `;

        const marker = L.marker(point.coords, {icon: icons[type]})
            .bindPopup(popupContent, {
                maxWidth: 300,
                className: 'custom-popup'
            })
            .addTo(map);

        // 添加点击事件
        marker.on('click', function(e) {
            // 平滑飞行到标记点位置
            map.flyTo(point.coords, 16, {
                duration: 1.5,  // 动画持续时间（秒）
                easeLinearity: 0.25
            });
        });

        // 添加弹出窗口打开事件
        marker.on('popupopen', function(e) {
            // 稍微调整视图位置，确保弹出窗口完全可见
            const px = map.project(e.target.getLatLng());
            px.y -= e.popup._container.clientHeight/2;
            map.panTo(map.unproject(px), {
                animate: true,
                duration: 0.5
            });
        });
    });
});

// 添加图例
const legend = L.control({position: 'bottomright'});

legend.onAdd = function(map) {
    const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = `
        <div class="legend-title">图例说明</div>
        ${Object.keys(icons).map(type => `
            <div class="legend-item">
                <img src="${icons[type].options.iconUrl}" height="20">
                <span>${type}</span>
            </div>
        `).join('')}
    `;
    return div;
};

legend.addTo(map);

// 添加图例点击事件
document.querySelector('.legend').addEventListener('click', function(e) {
    const legendItem = e.target.closest('.legend-item');
    if (legendItem) {
        const type = legendItem.querySelector('span').textContent;
        // 找到该类型的第一个标记点
        const firstPoint = landmarks[type][0];
        if (firstPoint) {
            // 平滑飞行到该类型的第一个位置
            map.flyTo(firstPoint.coords, 14, {
                duration: 1.5,
                easeLinearity: 0.25
            });
        }
    }
});

// 添加缩放控制按钮
L.control.zoom({
    position: 'bottomright',
    zoomInTitle: '放大',
    zoomOutTitle: '缩小'
}).addTo(map);

// 添加重置视图按钮
const resetViewControl = L.Control.extend({
    options: {
        position: 'bottomright'
    },

    onAdd: function(map) {
        const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
        const button = L.DomUtil.create('a', 'reset-view-btn', container);
        button.innerHTML = '重置视图';
        button.href = '#';
        button.title = '重置地图视图';
        button.style.cssText = `
            background: white;
            padding: 5px 10px;
            color: #666;
            text-decoration: none;
            font-size: 14px;
        `;

        L.DomEvent.on(button, 'click', function(e) {
            L.DomEvent.preventDefault(e);
            // 平滑返回初始视图
            map.flyTo([28.228209, 112.938814], 13, {
                duration: 1.5,
                easeLinearity: 0.25
            });
        });

        return container;
    }
});

map.addControl(new resetViewControl());

// 更新地图样式
const additionalStyles = `
<style>
.reset-view-btn:hover {
    background-color: #f4f4f4 !important;
}

.leaflet-control {
    margin-bottom: 10px !important;
}

.legend {
    cursor: pointer;
}

.legend-item:hover {
    background-color: rgba(0,0,0,0.05);
    border-radius: 4px;
}

.custom-popup {
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
`;

// 添加新样式到页面
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// 添加导航按钮样式
const navigationStyles = `
<style>
.navigation-buttons {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #eee;
}

.nav-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;
    border-radius: 4px;
    text-decoration: none;
    color: white;
    font-size: 14px;
    transition: all 0.3s ease;
}

.nav-btn i {
    margin-right: 5px;
}

.car-nav {
    background-color: #4CAF50;
}

.bus-nav {
    background-color: #2196F3;
}

.walk-nav {
    background-color: #FF9800;
}

.nav-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.car-nav:hover {
    background-color: #45a049;
}

.bus-nav:hover {
    background-color: #1e88e5;
}

.walk-nav:hover {
    background-color: #f57c00;
}

/* 添加点击动画 */
.nav-btn:active {
    transform: translateY(0);
    box-shadow: none;
}

/* 优化弹出窗口样式 */
.map-popup {
    max-width: 300px;
}

.map-popup h3 {
    margin-bottom: 12px;
    color: #333;
    font-size: 18px;
    border-bottom: 2px solid #e54d42;
    padding-bottom: 8px;
}

.map-popup .desc {
    color: #666;
    margin-bottom: 10px;
    line-height: 1.5;
}

.custom-popup .leaflet-popup-content-wrapper {
    border-radius: 8px;
}

.custom-popup .leaflet-popup-content {
    margin: 16px;
}
</style>
`;

// 添加新样式到页面
document.head.insertAdjacentHTML('beforeend', navigationStyles);

// 确保地图在加载后重新计算大小
setTimeout(() => {
    map.invalidateSize();
}, 100); 