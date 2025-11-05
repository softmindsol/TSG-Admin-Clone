const config = {
  auth: {
    login: "admin/login",
  },
  agents: {
    getAllAgents: "admin/agents",
    getAgentById: "admin/agents",
    getAgentPaymentInfo: "admin/agent/payment-info",
    getAgentNotes: "admin/agents",
    addAgentNote: "admin/agents",
    createAgent: "admin/create-agent",
    deleteAgent: "admin/delete-agent",
  },
  files: {
    uploadFile: "agents/upload-file",
    getFiles: "agents/files",
    deleteFile: "agents/files",
  },
  request: {
    getAllRequest: "admin/agents",
    approveAgentRequest: "admin/approve-agent",
    rejectAgentRequest: "admin/reject-agent",
  },
};

export default config;
