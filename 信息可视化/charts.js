// 定义数据
const populationData = {
    年份数据: {
        years: ['2019', '2020', '2021', '2022', '2023'],
        total: [8200000, 8350000, 8500000, 8650000, 8800000],
    },
    区域分布: {
        districts: ['芙蓉区', '天心区', '岳麓区', '开福区', '雨花区', '望城区', '长沙县'],
        population: [1120000, 980000, 1350000, 1050000, 1180000, 680000, 1150000],
        density: [8526, 7231, 6891, 7845, 8123, 4521, 3654]
    },
    人口结构: {
        age: ['0-14岁', '15-24岁', '25-34岁', '35-44岁', '45-54岁', '55-64岁', '65岁以上'],
        ratio: [15.2, 12.8, 18.5, 16.3, 14.7, 12.5, 10]
    }
};

const economicData = {
    GDP增长: {
        years: ['2019', '2020', '2021', '2022', '2023'],
        gdp: [11900, 12300, 13100, 13800, 14500],
        growth: [7.8, 3.4, 6.5, 5.3, 5.1]
    },
    产业结构: {
        sectors: ['第一产业', '第二产业', '第三产业'],
        ratio: [2.5, 39.5, 58],
        growth: [3.2, 5.1, 5.8]
    },
    重点产业: {
        industries: ['文化创意', '电子信息', '智能制造', '新材料', '生物医药'],
        value: [2800, 3200, 2900, 2100, 1800],
        companies: [1200, 1500, 1100, 800, 600]
    }
};

const tourismData = {
    游客量: {
        years: ['2019', '2020', '2021', '2022', '2023'],
        domestic: [9800, 7200, 8500, 9200, 9900],
        international: [120, 45, 68, 95, 115]
    },
    收入构成: {
        categories: ['住宿', '餐饮', '交通', '购物', '景点门票', '娱乐', '其他'],
        revenue: [25, 30, 15, 12, 8, 7, 3]
    },
    热门景点: {
        spots: ['岳麓山', '橘子洲', '世界之窗', '省博物馆', '天心阁'],
        visitors: [520, 480, 380, 350, 290],
        satisfaction: [4.6, 4.7, 4.5, 4.8, 4.4]
    }
};

// 修改所有图表配置中的标题位置
const commonTitleConfig = {
    text: '',  // 移除图表标题，因为已经有了切换按钮
    left: 'center',
    top: 20
};

// 修改人口分布图表配置
const populationOption = {
    title: commonTitleConfig,
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
    },
    legend: {
        data: ['人口数量', '人口密度'],
        right: '10%',
        top: 20
    },
    grid: {
        top: 60,       // 减少顶部空间
        bottom: 60,
        left: '10%',
        right: '10%'
    },
    xAxis: {
        type: 'category',
        data: populationData.区域分布.districts,
        axisLabel: {
            interval: 0,
            rotate: 30
        }
    },
    yAxis: [
        {
            type: 'value',
            name: '人口数量',
            min: 0,
            axisLabel: {
                formatter: '{value}万'
            }
        },
        {
            type: 'value',
            name: '人口密度',
            min: 0,
            axisLabel: {
                formatter: '{value}/km²'
            }
        }
    ],
    series: [
        {
            name: '人口数量',
            type: 'bar',
            data: populationData.区域分布.population.map(v => (v/10000).toFixed(1)),
            itemStyle: {
                color: '#5470C6'
            }
        },
        {
            name: '人口密度',
            type: 'line',
            yAxisIndex: 1,
            data: populationData.区域分布.density,
            itemStyle: {
                color: '#91CC75'
            }
        }
    ]
};

// 修改人口年龄结构图表配置
const populationAgeOption = {
    title: commonTitleConfig,
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%'
    },
    legend: {
        orient: 'vertical',
        right: '5%',    // 调整到右侧
        top: 'middle',
        itemWidth: 10,  // 减小图例标记大小
        itemHeight: 10,
        textStyle: {
            fontSize: 12
        }
    },
    series: [
        {
            name: '年龄结构',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                formatter: '{b}: {c}%'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            },
            data: populationData.人口结构.age.map((age, index) => ({
                name: age,
                value: populationData.人口结构.ratio[index]
            }))
        }
    ]
};

// 修改经济发展图表配置
const economyOption = {
    title: commonTitleConfig,
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
    },
    legend: {
        data: ['GDP总量', 'GDP增长率', '第一产业', '第二产业', '第三产业'],
        top: 50,        // 将图例下移
        left: 'center', // 居中显示
        textStyle: {
            fontSize: 12
        }
    },
    grid: {
        top: 80,       // 为图例留出空间
        bottom: 60,
        left: '10%',
        right: '10%'
    },
    toolbox: {
        feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        },
        right: 20,
        top: 20        // 工具箱放在最上方
    },
    xAxis: [
        {
            type: 'category',
            data: economicData.GDP增长.years,
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: 'GDP(亿元)',
            min: 0,
            axisLabel: {
                formatter: '{value}'
            }
        },
        {
            type: 'value',
            name: '增长率(%)',
            min: 0,
            max: 10,
            axisLabel: {
                formatter: '{value}%'
            }
        }
    ],
    series: [
        {
            name: 'GDP总量',
            type: 'bar',
            data: economicData.GDP增长.gdp,
            itemStyle: {
                color: '#91CC75'
            }
        },
        {
            name: 'GDP增长率',
            type: 'line',
            yAxisIndex: 1,
            data: economicData.GDP增长.growth,
            itemStyle: {
                color: '#EE6666'
            }
        },
        {
            name: '第一产业',
            type: 'bar',
            stack: '产业',
            emphasis: {
                focus: 'series'
            },
            data: economicData.GDP增长.gdp.map(v => v * 0.025)  // 2.5%
        },
        {
            name: '第二产业',
            type: 'bar',
            stack: '产业',
            emphasis: {
                focus: 'series'
            },
            data: economicData.GDP增长.gdp.map(v => v * 0.395)  // 39.5%
        },
        {
            name: '第三产业',
            type: 'bar',
            stack: '产业',
            emphasis: {
                focus: 'series'
            },
            data: economicData.GDP增长.gdp.map(v => v * 0.58)  // 58%
        }
    ]
};

// 修改重点产业图表配置
const industryOption = {
    title: commonTitleConfig,
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
    },
    legend: {
        data: ['产值(亿元)', '企业数量'],
        top: 50,        // 将图例下移
        left: 'center', // 居中显示
        textStyle: {
            fontSize: 12
        }
    },
    grid: {
        top: 80,
        bottom: 60,
        left: '10%',
        right: '10%'
    },
    xAxis: [{
        type: 'category',
        axisLabel: {
            interval: 0,
            rotate: 30,  // 旋转标签避免重叠
            fontSize: 12
        }
    }],
    yAxis: [
        {
            type: 'value',
            name: '产值(亿元)',
            min: 0
        },
        {
            type: 'value',
            name: '企业数量',
            min: 0
        }
    ],
    series: [
        {
            name: '产值(亿元)',
            type: 'bar',
            data: economicData.重点产业.value,
            itemStyle: {
                color: '#91CC75'
            }
        },
        {
            name: '企业数量',
            type: 'bar',
            data: economicData.重点产业.companies,
            itemStyle: {
                color: '#EE6666'
            }
        }
    ]
};

// 修改旅游数据图表配置，添加多个视图选项
const tourismVisitorOption = {
    title: commonTitleConfig,
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
    },
    legend: {
        data: ['国内游客', '国际游客'],
        top: 50,
        left: 'center'
    },
    grid: {
        top: 100,
        bottom: 60,
        left: '10%',
        right: '10%'
    },
    xAxis: {
        type: 'category',
        data: tourismData.游客量.years,
        axisLabel: {
            interval: 0
        }
    },
    yAxis: [
        {
            type: 'value',
            name: '国内游客(万人次)',
            min: 0,
            position: 'left'
        },
        {
            type: 'value',
            name: '国际游客(万人次)',
            min: 0,
            position: 'right'
        }
    ],
    series: [
        {
            name: '国内游客',
            type: 'bar',
            data: tourismData.游客量.domestic,
            itemStyle: {
                color: '#5470C6'
            }
        },
        {
            name: '国际游客',
            type: 'line',
            yAxisIndex: 1,
            data: tourismData.游客量.international,
            itemStyle: {
                color: '#91CC75'
            },
            symbol: 'circle',
            symbolSize: 8
        }
    ]
};

// 添加收入构成饼图配置
const tourismRevenueOption = {
    title: commonTitleConfig,
    tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%'
    },
    legend: {
        orient: 'vertical',
        right: '5%',
        top: 'middle',
        textStyle: {
            fontSize: 12
        }
    },
    series: [
        {
            name: '旅游收入构成',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['40%', '50%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                formatter: '{b}: {c}%'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 16,
                    fontWeight: 'bold'
                }
            },
            data: tourismData.收入构成.categories.map((category, index) => ({
                name: category,
                value: tourismData.收入构成.revenue[index]
            }))
        }
    ]
};

// 添加景点分析图表配置
const tourismSpotsOption = {
    title: commonTitleConfig,
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
    },
    legend: {
        data: ['游客量', '满意度'],
        top: 50,
        left: 'center'
    },
    grid: {
        top: 100,
        bottom: 80,
        left: '10%',
        right: '10%'
    },
    xAxis: {
        type: 'category',
        data: tourismData.热门景点.spots,
        axisLabel: {
            interval: 0,
            rotate: 30
        }
    },
    yAxis: [
        {
            type: 'value',
            name: '游客量(万人次)',
            min: 0
        },
        {
            type: 'value',
            name: '满意度评分',
            min: 4,
            max: 5
        }
    ],
    series: [
        {
            name: '游客量',
            type: 'bar',
            data: tourismData.热门景点.visitors,
            itemStyle: {
                color: '#5470C6'
            }
        },
        {
            name: '满意度',
            type: 'line',
            yAxisIndex: 1,
            data: tourismData.热门景点.satisfaction,
            itemStyle: {
                color: '#91CC75'
            },
            symbol: 'circle',
            symbolSize: 8,
            label: {
                show: true,
                position: 'top',
                formatter: '{c}分'
            }
        }
    ]
};

// 修改初始化部分
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有图表
    const charts = {
        population: echarts.init(document.getElementById('population-chart')),
        economy: echarts.init(document.getElementById('economy-chart')),
        tourism: echarts.init(document.getElementById('tourism-chart'))
    };

    // 渲染初始图表
    charts.population.setOption(populationOption);
    charts.economy.setOption(economyOption);
    charts.tourism.setOption(tourismVisitorOption);

    // 添加标签切换功能
    const tabBtns = document.querySelectorAll('.tab-btn');
    const chartItems = document.querySelectorAll('.chart-item');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有活动状态
            tabBtns.forEach(b => b.classList.remove('active'));
            chartItems.forEach(c => c.classList.remove('active'));

            // 添加当前活动状态
            this.classList.add('active');
            const type = this.dataset.type;
            const chartItem = document.getElementById(`${type}-chart`);
            chartItem.classList.add('active');

            // 重新渲染当前图表
            setTimeout(() => {
                charts[type].resize();
                if (type === 'economy') {
                    // 如果是经济图表，检查当前视图
                    const activeEconomyTab = document.querySelector('.economy-tab.active');
                    if (activeEconomyTab) {
                        const view = activeEconomyTab.dataset.view;
                        charts.economy.setOption(view === 'overview' ? economyOption : industryOption);
                    }
                }
            }, 0);
        });
    });

    // 添加经济图表内部切换按钮
    const economyChart = document.getElementById('economy-chart');
    const economyTabs = `
        <div class="economy-tabs">
            <button class="economy-tab active" data-view="overview">总体概况</button>
            <button class="economy-tab" data-view="industry">重点产业</button>
        </div>
    `;
    economyChart.insertAdjacentHTML('afterbegin', economyTabs);

    // 添加经济图表切换功能
    const economyTabBtns = document.querySelectorAll('.economy-tab');
    economyTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            economyTabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            charts.economy.setOption(view === 'overview' ? economyOption : industryOption);
            charts.economy.resize();
        });
    });

    // 监听窗口大小变化
    window.addEventListener('resize', function() {
        Object.values(charts).forEach(chart => chart.resize());
    });

    // 添加人口图表内部切换按钮
    const populationChart = document.getElementById('population-chart');
    const populationTabs = `
        <div class="population-tabs">
            <button class="population-tab active" data-view="distribution">区域分布</button>
            <button class="population-tab" data-view="age">年龄结构</button>
        </div>
    `;
    populationChart.insertAdjacentHTML('afterbegin', populationTabs);

    // 添加人口图表切换功能
    const populationTabBtns = document.querySelectorAll('.population-tab');
    populationTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            populationTabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            charts.population.setOption(view === 'distribution' ? populationOption : populationAgeOption);
            charts.population.resize();
        });
    });

    // 添加旅游数据图表内部切换按钮
    const tourismChart = document.getElementById('tourism-chart');
    const tourismTabs = `
        <div class="tourism-tabs">
            <button class="tourism-tab active" data-view="visitor">游客统计</button>
            <button class="tourism-tab" data-view="revenue">收入构成</button>
            <button class="tourism-tab" data-view="spots">景点分析</button>
        </div>
    `;
    tourismChart.insertAdjacentHTML('afterbegin', tourismTabs);

    // 添加旅游数据图表切换功能
    const tourismTabBtns = document.querySelectorAll('.tourism-tab');
    tourismTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tourismTabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            let option;
            switch(view) {
                case 'visitor':
                    option = tourismVisitorOption;
                    break;
                case 'revenue':
                    option = tourismRevenueOption;
                    break;
                case 'spots':
                    option = tourismSpotsOption;
                    break;
            }
            charts.tourism.setOption(option);
            charts.tourism.resize();
        });
    });
}); 