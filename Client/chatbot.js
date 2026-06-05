// ==================== CHATBOT SYSTEM ====================

class ChatBot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.isRecording = false;
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.init();
    }

    init() {
        this.createChatbotUI();
        this.setupEventListeners();
        this.loadMessages();
    }

    createChatbotUI() {
        // Create chatbot container if not exists
        if (document.getElementById('chatbot-widget')) return;

        const chatbotHTML = `
            <!-- CHATBOT WIDGET -->
            <div id="chatbot-widget" class="chatbot-widget">
                <!-- Chatbot Floating Button -->
                <button id="chatbot-btn" class="chatbot-btn" title="Mở trò chuyện">
                    💬
                </button>

                <!-- Chatbot Window -->
                <div id="chatbot-window" class="chatbot-window hidden">
                    <!-- Header -->
                    <div class="chatbot-header">
                        <div class="chatbot-title">
                            <h3>💬 Hỗ trợ khách hàng</h3>
                            <p>Chúng tôi sẵn sàng giúp bạn</p>
                        </div>
                        <button id="chatbot-close" class="chatbot-close">✕</button>
                    </div>

                    <!-- Messages Container -->
                    <div id="chatbot-messages" class="chatbot-messages">
                        <div class="chat-message bot-message">
                            <div class="message-content">
                                <p>👋 Xin chào! Tôi có thể giúp bạn những gì?</p>
                            </div>
                        </div>
                    </div>

                    <!-- Input Area -->
                    <div class="chatbot-input-area">
                        <div class="input-actions">
                            <label for="chatbot-image-input" class="action-btn" title="Gửi hình ảnh">
                                🖼️
                            </label>
                            <input type="file" id="chatbot-image-input" accept="image/*" style="display:none;">
                            
                            <button id="chatbot-voice-btn" class="action-btn" title="Ghi âm">
                                🎤
                            </button>
                        </div>

                        <div class="input-group">
                            <input 
                                type="text" 
                                id="chatbot-input" 
                                class="chatbot-input" 
                                placeholder="Nhập tin nhắn..."
                                autocomplete="off"
                            >
                            <button id="chatbot-send-btn" class="send-btn">📤</button>
                        </div>

                        <div id="voice-recording" class="voice-recording hidden">
                            <span class="recording-dot">●</span>
                            <span id="recording-time">00:00</span>
                            <button id="voice-cancel-btn" class="voice-action-btn">❌ Hủy</button>
                            <button id="voice-send-btn" class="voice-action-btn">✅ Gửi</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    setupEventListeners() {
        // Toggle chatbot window
        const chatbotBtn = document.getElementById('chatbot-btn');
        const chatbotClose = document.getElementById('chatbot-close');
        const chatbotWindow = document.getElementById('chatbot-window');

        chatbotBtn.addEventListener('click', () => this.toggleChat());
        chatbotClose.addEventListener('click', () => this.closeChat());

        // Message sending
        const sendBtn = document.getElementById('chatbot-send-btn');
        const input = document.getElementById('chatbot-input');

        sendBtn.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Image upload
        const imageInput = document.getElementById('chatbot-image-input');
        imageInput.addEventListener('change', (e) => this.handleImageUpload(e));

        // Voice recording
        const voiceBtn = document.getElementById('chatbot-voice-btn');
        voiceBtn.addEventListener('click', () => this.startVoiceRecording());

        const voiceCancelBtn = document.getElementById('voice-cancel-btn');
        const voiceSendBtn = document.getElementById('voice-send-btn');

        voiceCancelBtn.addEventListener('click', () => this.cancelVoiceRecording());
        voiceSendBtn.addEventListener('click', () => this.sendVoiceMessage());
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        const chatbotWindow = document.getElementById('chatbot-window');
        const chatbotBtn = document.getElementById('chatbot-btn');

        // Show confirmation dialog first time
        if (this.messages.length === 1) { // Only bot's greeting
            this.showInitialConfirmation();
            return;
        }

        chatbotWindow.classList.remove('hidden');
        chatbotBtn.classList.add('active');
        this.isOpen = true;
        this.scrollToBottom();
        document.getElementById('chatbot-input').focus();
    }

    closeChat() {
        const chatbotWindow = document.getElementById('chatbot-window');
        const chatbotBtn = document.getElementById('chatbot-btn');

        chatbotWindow.classList.add('hidden');
        chatbotBtn.classList.remove('active');
        this.isOpen = false;
    }

    showInitialConfirmation() {
        const confirmed = confirm('👋 Xin chào! Bạn có muốn trò chuyện với chúng tôi không?');
        if (confirmed) {
            const chatbotWindow = document.getElementById('chatbot-window');
            const chatbotBtn = document.getElementById('chatbot-btn');
            chatbotWindow.classList.remove('hidden');
            chatbotBtn.classList.add('active');
            this.isOpen = true;
            this.scrollToBottom();
            document.getElementById('chatbot-input').focus();
        }
    }

    sendMessage() {
        const input = document.getElementById('chatbot-input');
        const message = input.value.trim();

        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Simulate bot response
        setTimeout(() => {
            const responses = [
                '✓ Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm.',
                '😊 Tôi hiểu bạn. Vui lòng cho tôi thêm thông tin chi tiết.',
                '👍 Tuyệt vời! Tôi sẽ giúp bạn ngay.',
                '❓ Bạn có thể nói rõ hơn một chút không?',
                '⏳ Vui lòng đợi, tôi đang xử lý yêu cầu của bạn.',
                '🎉 Đó là một câu hỏi tuyệt vời! Hãy cho tôi biết nếu bạn cần giúp đỡ thêm.'
            ];

            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            this.addMessage(randomResponse, 'bot');
        }, 500);
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file
        if (!file.type.startsWith('image/')) {
            alert('⚠️ Vui lòng chọn một file hình ảnh hợp lệ');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('⚠️ File quá lớn! Giới hạn là 5MB');
            return;
        }

        // Read and display image
        const reader = new FileReader();
        reader.onload = (e) => {
            const imgData = e.target.result;
            this.addMessage(null, 'user', imgData);

            // Simulate bot response
            setTimeout(() => {
                this.addMessage('✓ Tôi đã nhận được hình ảnh của bạn. Cảm ơn!', 'bot');
            }, 500);
        };
        reader.readAsDataURL(file);

        // Reset input
        event.target.value = '';
    }

    startVoiceRecording() {
        if (this.isRecording) return;

        // Request microphone access
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                this.mediaRecorder = new MediaRecorder(stream);
                this.audioChunks = [];

                this.mediaRecorder.ondataavailable = (event) => {
                    this.audioChunks.push(event.data);
                };

                this.mediaRecorder.onstop = () => {
                    // Cleanup
                };

                this.mediaRecorder.start();
                this.isRecording = true;

                // Show recording UI
                const voiceRecording = document.getElementById('voice-recording');
                voiceRecording.classList.remove('hidden');

                // Update timer
                let seconds = 0;
                const timerInterval = setInterval(() => {
                    seconds++;
                    const mins = Math.floor(seconds / 60);
                    const secs = seconds % 60;
                    const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
                    document.getElementById('recording-time').textContent = timeStr;

                    if (!this.isRecording) {
                        clearInterval(timerInterval);
                    }
                }, 1000);

                // Disable voice btn
                document.getElementById('chatbot-voice-btn').disabled = true;
            })
            .catch(error => {
                console.error('Lỗi truy cập microphone:', error);
                alert('⚠️ Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập.');
            });
    }

    cancelVoiceRecording() {
        if (!this.mediaRecorder) return;

        this.mediaRecorder.stop();
        this.mediaRecorder.stream.getTracks().forEach(track => track.stop());
        this.isRecording = false;
        this.audioChunks = [];

        // Hide recording UI
        document.getElementById('voice-recording').classList.add('hidden');
        document.getElementById('chatbot-voice-btn').disabled = false;
        document.getElementById('recording-time').textContent = '00:00';
    }

    sendVoiceMessage() {
        if (!this.mediaRecorder) return;

        this.mediaRecorder.stop();
        this.mediaRecorder.stream.getTracks().forEach(track => track.stop());

        // Create audio blob
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);

        // Add voice message to chat
        this.addMessage(null, 'user', null, audioUrl);

        // Reset recording state
        this.isRecording = false;
        this.audioChunks = [];
        document.getElementById('voice-recording').classList.add('hidden');
        document.getElementById('chatbot-voice-btn').disabled = false;
        document.getElementById('recording-time').textContent = '00:00';

        // Simulate bot response
        setTimeout(() => {
            this.addMessage('🎙️ Cảm ơn bạn đã gửi tin nhắn thoại. Tôi đã ghi nhận!', 'bot');
        }, 500);
    }

    addMessage(text, sender, imageData = null, audioUrl = null) {
        const messagesContainer = document.getElementById('chatbot-messages');

        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}-message`;

        let contentHTML = '<div class="message-content">';

        if (imageData) {
            contentHTML += `<img src="${imageData}" alt="Image" class="message-image">`;
        } else if (audioUrl) {
            contentHTML += `<audio controls class="message-audio"><source src="${audioUrl}" type="audio/wav"></audio>`;
        } else if (text) {
            contentHTML += `<p>${this.escapeHtml(text)}</p>`;
        }

        contentHTML += '</div>';
        messageDiv.innerHTML = contentHTML;

        messagesContainer.appendChild(messageDiv);

        // Store message
        this.messages.push({
            text,
            sender,
            imageData,
            audioUrl,
            timestamp: new Date().toISOString()
        });

        this.saveMessages();
        this.scrollToBottom();
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbot-messages');
        setTimeout(() => {
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }, 0);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveMessages() {
        const messagesToSave = this.messages.map(msg => ({
            text: msg.text,
            sender: msg.sender,
            timestamp: msg.timestamp
        }));
        localStorage.setItem('chatbot-messages', JSON.stringify(messagesToSave));
    }

    loadMessages() {
        const saved = localStorage.getItem('chatbot-messages');
        if (saved) {
            try {
                const loadedMessages = JSON.parse(saved);
                loadedMessages.forEach(msg => {
                    if (msg.text) {
                        this.addMessage(msg.text, msg.sender);
                    }
                });
            } catch (e) {
                console.error('Lỗi tải tin nhắn:', e);
            }
        }
    }
}

// Initialize chatbot when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const chatbot = new ChatBot();
});
