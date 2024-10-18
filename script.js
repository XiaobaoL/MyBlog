// 获取所有部分和导航链接
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

// 添加滚动事件监听器
window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").substring(1) === current) {
            link.classList.add("active");
        }
    });
});

// 平滑滚动到锚点
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 页头滚动效果
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 100) {
        header.style.padding = '0.5rem 0';
        header.style.fontSize = '0.9em';
    } else {
        header.style.padding = '1rem 0';
        header.style.fontSize = '1em';
    }
});

// AI聊天按钮点击事件（示例）
// document.getElementById('ai-chat-btn').addEventListener('click', () => {
//     alert('AI聊天功能正在开发中...');
// });

// 添加更多 JavaScript 功能...

// AI聊天功能
const aiChatButton = document.getElementById('ai-chat-button');
const aiChatWindow = document.getElementById('ai-chat-window');
const closeChatButton = document.getElementById('close-chat');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendMessageButton = document.getElementById('send-message');

// 在文件的适当位置添加一个新函数来清除聊天记录
function clearChatHistory() {
    const chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = ''; // 清空聊天消息容器
}

if (aiChatButton) {
    aiChatButton.addEventListener('click', () => {
        clearChatHistory(); // 清除聊天记录
        aiChatWindow.style.display = 'flex';
        aiChatButton.style.display = 'none';
        addMessage('AI', '你好！我是AI助手。有什么我可以帮助你的吗？');
    });
}

if (closeChatButton) {
    closeChatButton.addEventListener('click', () => {
        aiChatWindow.style.display = 'none';
        aiChatButton.style.display = 'flex';
    });
}

if (sendMessageButton) {
    sendMessageButton.addEventListener('click', sendMessage);
}

if (userInput) {
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage('User', message);
        userInput.value = '';
        // 显示加载动画
        showLoadingAnimation();
        // 调用 fetchAIResponse 函数
        fetchAIResponse(message);
    }
}

function addMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender.toLowerCase());
    messageElement.textContent = text;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 自动调整输入框高度
userInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

// 删除或注释掉这个函数
// function getAIResponse(message) {
//     // 这里应该是真正的AI逻辑，现在只是一个简单的模拟
//     if (message.toLowerCase().includes('简历')) {
//         return '您可以在"简历"部分查看我的详细工作经历和技能。';
//     } else if (message.toLowerCase().includes('作品')) {
//         return '我的作品集展示了我最近完成的项目，您可以在"作品集"部分查看。';
//     } else {
//         return '抱歉，我没明白你的意思。您可以问我关于简历或作品的问题。';
//     }
// }

// 简历部分的动画效果
document.addEventListener('DOMContentLoaded', () => {
    const resumeSection = document.querySelector('.resume-section');
    const resumeItems = resumeSection.querySelectorAll('.timeline-item, .skill-group, .project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    resumeItems.forEach(item => {
        observer.observe(item);
    });
});

// 作品集筛选和排��功能
document.addEventListener('DOMContentLoaded', () => {
    const projectFilter = document.getElementById('project-filter');
    const projectSort = document.getElementById('project-sort');
    const portfolioGrid = document.querySelector('.portfolio-grid');

    function filterAndSortProjects() {
        const category = projectFilter.value;
        const sortBy = projectSort.value;
        const projects = Array.from(portfolioGrid.children);

        projects.forEach(project => {
            if (category === 'all' || project.dataset.category === category) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });

        const visibleProjects = projects.filter(p => p.style.display !== 'none');
        visibleProjects.sort((a, b) => {
            if (sortBy === 'newest') {
                return new Date(b.querySelector('.project-date').textContent) - new Date(a.querySelector('.project-date').textContent);
            } else if (sortBy === 'popular') {
                // 这里可以添加一个受欢迎度的逻辑，现在只是随机排序
                return 0.5 - Math.random();
            }
        });

        visibleProjects.forEach(project => portfolioGrid.appendChild(project));
    }

    projectFilter.addEventListener('change', filterAndSortProjects);
    projectSort.addEventListener('change', filterAndSortProjects);

    // 初始筛选和排序
    filterAndSortProjects();
});

// 联系表单提交处理
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // 这里应该添加表单数据的验证逻辑
        
        // 模拟表单提交
        alert('感谢您的留言！我会尽快复您。');
        contactForm.reset();
    });
});

// 添加显示加载动画的函数
function showLoadingAnimation() {
    const loadingMessage = document.createElement('div');
    loadingMessage.classList.add('loading-message');
    loadingMessage.innerHTML = '<div class="loading"></div><span>AI 正在思考...</span>';
    chatMessages.appendChild(loadingMessage);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 添加隐藏加载动画的函数
function hideLoadingAnimation() {
    const loadingMessage = chatMessages.querySelector('.loading-message');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

// 确保fetchAIResponse函数正确实现
async function fetchAIResponse(message) {
    try {
        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 0684f450d3fcbe6bb3c4af0f12befab5.d3DNROaXH1wUuwQk'
            },
            body: JSON.stringify({
                model: "glm-4", // 使用GLM-4模型
                messages: [
                    { role: "user", content: message }
                ]
            })
        });

        if (!response.ok) {
            throw new Error('AI响应失败');
        }

        const data = await response.json();
        const aiReply = data.choices[0].message.content;
        // 隐藏加载动画
        hideLoadingAnimation();
        addMessage('AI', aiReply);
    } catch (error) {
        console.error('Error:', error);
        // 隐藏加载动画
        hideLoadingAnimation();
        addMessage('AI', '抱歉，我现在无法回答。请稍后再试。');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({behavior: 'smooth'});
        });
    });
});

// 在文件末尾添加以下代码

// 滚动效果
window.addEventListener('scroll', () => {
    const header = document.getElementById('main-header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// 主题切换
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    icon.classList.toggle('fa-moon');
    icon.classList.toggle('fa-sun');
});

// 汉堡菜单
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    hamburger.classList.toggle('active');
});

// 关闭移动端菜单当点击菜单项时
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        hamburger.classList.remove('active');
    });
});

// 滚动动画
function revealSections() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', revealSections);
window.addEventListener('load', revealSections);
