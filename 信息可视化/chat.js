class ChatUI {
    constructor() {
        this.messages = document.querySelector('.chat-messages');
        this.input = document.querySelector('.chat-input');
        this.setupUI();
        this.setupEventListeners();
        this.welcomeMessage();
        
        // 预设问答对
        this.qaDatabase = {
            '景点': '长沙著名景点包括：\n1. 岳麓山：国家5A级景区，有爱晚亭、麓山寺等景点\n2. 橘子洲：湘江中的地标性景观\n3. 天心阁：历史文化名胜\n4. 岳麓书院：千年学府\n5. IFS国金中心：现代商业地标',
            '美食': '长沙特色美食：\n1. 臭豆腐\n2. 糖油粑粑\n3. 长沙臭干子\n4. 茶颜悦色\n5. 文和友小龙虾',
            '交通': '到达长沙的主要方式：\n1. 飞机：长沙黄花国际机场\n2. 高铁：长沙南站\n3. 公路：京港澳高速\n市内交通：地铁1-6号线、公交车、出租车等',
            '住宿': '推荐住宿区域：\n1. 五一商圈：购物便利\n2. 天心区：文化气息浓厚\n3. 岳麓区：靠近大学城\n4. 开福区：近橘子洲',
            '天气': '长沙属于亚热带季风性湿润气候，四季分明：\n春季：温暖多雨\n夏季：炎热多雨\n秋季：凉爽宜人\n冬季：湿冷'
        };
    }

    welcomeMessage() {
        setTimeout(() => {
            this.addMessage('您好！我是长沙市智能助手。我可以为您提供以下信息：\n1. 景点介绍\n2. 美食推荐\n3. 交通指南\n4. 住宿建议\n5. 天气情况\n\n请告诉我您想了解什么？', false);
        }, 500);
    }

    setupUI() {
        this.input.innerHTML = `
            <input type="text" class="chat-input-field" placeholder="输入您的问题，如'长沙有什么景点？'">
            <button class="chat-send-btn">发送</button>
        `;
        
        this.input.style.padding = '15px';
        this.input.style.borderTop = '1px solid #eee';
        this.messages.style.height = 'calc(100% - 70px)';
        this.messages.style.overflow = 'auto';
        this.messages.style.padding = '15px';
    }

    processMessage(text) {
        const keywords = ['景点', '美食', '交通', '住宿', '天气'];
        for (let keyword of keywords) {
            if (text.includes(keyword)) {
                return this.qaDatabase[keyword];
            }
        }
        return '抱歉，我暂时无法理解您的问题。您可以询问关于长沙的景点、美食、交通、住宿或天气情况。';
    }

    setupEventListeners() {
        const inputField = this.input.querySelector('.chat-input-field');
        const sendBtn = this.input.querySelector('.chat-send-btn');

        const sendMessage = () => {
            const text = inputField.value.trim();
            if (text) {
                this.addMessage(text, true);
                inputField.value = '';
                setTimeout(() => {
                    const response = this.processMessage(text);
                    this.addMessage(response, false);
                }, 800);
            }
        };

        sendBtn.addEventListener('click', sendMessage);
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isUser ? 'user' : 'ai'}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${text.replace(/\n/g, '<br>')}
            </div>
        `;
        this.messages.appendChild(messageDiv);
        this.messages.scrollTop = this.messages.scrollHeight;
    }
}

// 初始化聊天界面
const chat = new ChatUI(); 