const state = {
  userChats: [], // Array to store user chats data
  activeChat: null, // Stores the currently active chat object
};
const getters = {
  getUserChats(state) {
    return state.userChats;
  },
  getActiveChat(state) {
    return state.activeChat;
  },
  getChatMessages(state) {
    return (chatId) => {
      const chat = state.userChats.find((chat) => chat.chatID === chatId);
      return chat ? chat.chatMessages : [];
    };
  },
};
const actions = {
  setUserChats({ commit }, chats) {
    commit('setUserChats', chats);
  },
  setActiveChat({ commit }, chat) {
    commit('setActiveChat', chat);
  },
  addMessageToChat({ commit }, { chatID, message }) {
    commit('addMessageToChat', { chatID, message });
  },
  // Add action for other actions like updating messages, deleting chats, etc.
};
const mutations = {
  setUserChats(state, chats) {
    state.userChats = chats;
  },
  setActiveChat(state, chat) {
    state.activeChat = chat;
  },
  addMessageToChat(state, { chatID, message }) {
    const chatIndex = state.userChats.findIndex((chat) => chat.chatID === chatID);
    if (chatIndex !== -1) {
      state.userChats[chatIndex].chatMessages.push(message);
    }
  },
  // Add mutation for other actions like updating messages, deleting chats, etc.
};

