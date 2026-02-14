import API from "./api";

export const documentAPI = {
  // Upload a document
  uploadDocument: async (formData) => {
    try {
      const response = await API.post("/documents/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Upload document error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to upload document",
        }
      );
    }
  },

  // Get all documents
  getDocuments: async () => {
    try {
      const response = await API.get("/documents");
      return response.data;
    } catch (error) {
      console.error("Get documents error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to fetch documents",
        }
      );
    }
  },

  // Get single document
  getDocument: async (documentId) => {
    try {
      const response = await API.get(`/documents/${documentId}`);
      return response.data;
    } catch (error) {
      console.error("Get document error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to fetch document",
        }
      );
    }
  },

  // Delete document
  deleteDocument: async (documentId) => {
    try {
      const response = await API.delete(`/documents/${documentId}`);
      return response.data;
    } catch (error) {
      console.error("Delete document error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to delete document",
        }
      );
    }
  },

  // Get document stats
  getDocumentStats: async () => {
    try {
      const response = await API.get("/documents/stats/summary");
      return response.data;
    } catch (error) {
      console.error("Get stats error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to fetch document statistics",
        }
      );
    }
  },

  // Get category summary
  getCategorySummary: async () => {
    try {
      const response = await API.get("/documents/categories/summary");
      return response.data;
    } catch (error) {
      console.error("Get categories error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to fetch category summary",
        }
      );
    }
  },

  // Download document
  downloadDocument: async (filename) => {
    try {
      const response = await API.get(`/documents/file/${filename}`, {
        responseType: "blob",
      });
      return response.data;
    } catch (error) {
      console.error("Download error:", error);
      throw error;
    }
  },
  // Add to documentAPI object
  verifyDocument: async (token) => {
    try {
      const response = await API.post("/documents/verify", { token });
      return response.data;
    } catch (error) {
      console.error("Verify document error:", error);
      throw (
        error.response?.data || {
          success: false,
          message: "Failed to verify document",
        }
      );
    }
  },
};
